package web

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"reflect"
	"strconv"
	"time"

	"github.com/inovex/cocktail-mash/backend/pkg/model"

	"github.com/prometheus/client_golang/prometheus/promhttp"

	"github.com/googollee/go-socket.io"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

type APICollector interface {
	TrackSpilled()
	TrackSocketUpdates()
	TrackStagesPoints(level string, points float64)
	TrackStagesColor(level, color string, value float64)
	TrackPoints(points float64)
}

type API struct {
	logger    logrus.FieldLogger
	collector APICollector
	state     *model.State
}

func NewAPI(state *model.State, collector APICollector, logger logrus.FieldLogger) API {
	return API{
		logger:    logger,
		collector: collector,
		state:     state,
	}
}

func (api *API) CreateREST() http.Handler {
	router := mux.NewRouter()

	internal := router.PathPrefix("/internal").Subrouter()
	internal.PathPrefix("/metrics").Handler(promhttp.Handler())

	v1 := router.PathPrefix("/api/v1").Subrouter()

	v1.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
			next.ServeHTTP(w, r)
		})
	})

	v1.Methods(http.MethodPost).PathPrefix("/stats/stages").HandlerFunc(api.UpdateStatsStages)
	v1.Methods(http.MethodPost).PathPrefix("/stats").HandlerFunc(api.UpdateStats)
	v1.Methods(http.MethodPost).PathPrefix("/spilled").HandlerFunc(api.UpdateSpilled)
	v1.Methods(http.MethodGet).PathPrefix("/state").HandlerFunc(api.States)
	v1.PathPrefix("/socketio").Handler(api.GetWebSocket())

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./resource/site")))

	return router
}

func (api *API) States(writer http.ResponseWriter, request *http.Request) {
	content, err := json.Marshal(api.state)
	if err != nil {
		api.logger.
			WithError(err).
			Error("Couldn't marshal the response.")
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusOK)
	if _, err := writer.Write(content); err != nil {
		api.logger.WithError(err).Error("Could not write the content to the response body")
	}
}

const WebSocketCocktailMashRoom = "cocktail-mash"

func (api *API) GetWebSocket() http.Handler {
	server, err := socketio.NewServer(nil)
	if err != nil {
		api.logger.WithError(err).Error("Couldn't start socket endpoint")
		return nil
	}

	server.OnConnect("/", func(conn socketio.Conn) error {
		conn.Join(WebSocketCocktailMashRoom)

		server.BroadcastToRoom(WebSocketCocktailMashRoom, "init:states", api.state.States())
		return nil
	})

	go func() {
		var states map[string]bool
		for range time.NewTicker(100 * time.Millisecond).C {
			if !reflect.DeepEqual(api.state.States(), states) {
				api.collector.TrackSocketUpdates()
				states = api.state.States()
				api.logger.WithFields(func(states map[string]bool) map[string]interface{} {
					result := map[string]interface{}{}
					for k, v := range states {
						result[k] = v
					}
					return result
				}(states)).Info("Update frontend client.")
				server.BroadcastToRoom(WebSocketCocktailMashRoom, "key:states", states)
			}
		}
	}()

	server.OnError("/", func(e error) {
		api.logger.WithError(err).Error("Could not interact with the socket.io api")
	})

	server.OnDisconnect("", func(conn socketio.Conn, s string) {
		if err := conn.Close(); err != nil {
			api.logger.WithError(err).Error("Could not close the socket.io connection")
		}
	})

	return server
}

func (api *API) UpdateSpilled(writer http.ResponseWriter, request *http.Request) {
	api.collector.TrackSpilled()
	api.logger.Info("Oh, no! SPILLED!")
	writer.WriteHeader(http.StatusOK)
}

func (api *API) UpdateStatsStages(writer http.ResponseWriter, request *http.Request) {
	var stages model.Stages

	body, err := ioutil.ReadAll(request.Body)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := json.Unmarshal(body, &stages); err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	for k, v := range stages.Map() {
		api.collector.TrackStagesColor(strconv.Itoa(stages.Level), k, v)
	}
	api.collector.TrackStagesPoints(strconv.Itoa(stages.Level), stages.Points)

	writer.WriteHeader(http.StatusCreated)
	api.logger.Info("Update informations about the single stage")
}

func (api *API) UpdateStats(writer http.ResponseWriter, request *http.Request) {
	content := struct {
		Points float64 `json:"points"`
	}{}

	body, err := ioutil.ReadAll(request.Body)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := json.Unmarshal(body, &content); err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	api.collector.TrackPoints(content.Points)

	writer.WriteHeader(http.StatusCreated)
	api.logger.Info("Update informations about the whole stages")
}
