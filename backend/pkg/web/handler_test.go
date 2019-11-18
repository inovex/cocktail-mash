package web

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/inovex/cocktail-mash/backend/pkg/metrics"
	"github.com/inovex/cocktail-mash/backend/pkg/model"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/sirupsen/logrus"
)

func TestAPI_Stats(t *testing.T) {

	logger := logrus.StandardLogger()
	collector := metrics.NewCollector()
	prometheus.MustRegister(collector)
	state := model.NewState()

	api := NewAPI(state, collector, logger)

	tests := []struct {
		handlerFunc func(http.ResponseWriter, *http.Request)

		reqMethod string
		reqURL    string
		reqBody   interface{}

		resBody   string
		resStatus int
	}{
		{api.States,
			"GET",
			"",
			nil,
			`{}`,
			http.StatusOK,
		},

		{api.UpdateSpilled,
			"POST",
			"",
			nil,
			"",
			http.StatusOK,
		},

		{api.UpdateStatsStages,
			"POST",
			"",
			model.Stages{
				1,
				55,
				55,
				55,
				55,
				5000,
			},
			"",
			http.StatusCreated,
		},

		{api.UpdateStatsStages,
			"POST",
			"",
			"wrong input",
			"",
			http.StatusBadRequest,
		},

		{api.UpdateStats,
			"POST",
			"",
			struct {
				Points float64 `json:"points"`
			}{1000},
			"",
			http.StatusCreated,
		},

		{api.UpdateStats,
			"POST",
			"",
			struct {
				Points string `json:"points"`
			}{"wrong input"},
			"",
			http.StatusBadRequest,
		},
	}

	for testNum, test := range tests {
		req, err := buildNewRequest(t, test.reqMethod, test.reqURL, test.reqBody)

		if err != nil {
			t.Fatal(err)
		}

		// We create a ResponseRecorder
		res := httptest.NewRecorder()
		handler := http.HandlerFunc(test.handlerFunc)
		handler.ServeHTTP(res, req)

		// Check if the status code is what we expect.
		if status := res.Code; status != test.resStatus {
			t.Errorf("Test number %d handler returned wrong status code: got %v want %v",
				testNum, status, test.resStatus)
		}

		// Check if the response body is what we expect.
		if res.Body.String() != test.resBody {
			t.Errorf("Test number %d handler returned unexpected body: got %v want %v",
				testNum, res.Body.String(), test.resBody)
		}
	}
	x, _ := json.MarshalIndent(state.States, "", "  ")
	fmt.Println(string(x))
}

func buildNewRequest(t *testing.T, method string, url string, body interface{}) (*http.Request, error) {

	var newBody io.Reader

	if body != nil {
		marshall, err := json.Marshal(body)

		if err != nil {
			t.Fatal(err)
		}
		newBody = bytes.NewReader(marshall)
	}

	req, err := http.NewRequest(method, url, newBody)

	return req, err
}
