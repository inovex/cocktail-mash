package main

import (
	"context"
	"net/http"
	"os"

	"github.com/inovex/cocktail-mash/backend/pkg/controller"
	"github.com/inovex/cocktail-mash/backend/pkg/metrics"
	"github.com/inovex/cocktail-mash/backend/pkg/model"
	"github.com/inovex/cocktail-mash/backend/pkg/web"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/urfave/cli"

	"github.com/sirupsen/logrus"
)

func main() {
	app := cli.NewApp()
	app.Flags = []cli.Flag{
		cli.BoolFlag{
			Name:   "k, keyboard",
			Usage:  "Sets the input controller to the keyboard instead of the GPIO",
			EnvVar: "INPUT_CONTROLLER_KEYBOARD",
		},
	}

	app.Action = run
	if err := app.Run(os.Args); err != nil {
		logrus.
			WithField("PID", os.Getpid()).
			WithError(err).
			Fatalf("The process was unexpected terminated")
	}
}

type PinController interface {
	Run()
	Close()
}

func run(ctx *cli.Context) error {
	logger := logrus.StandardLogger()
	logger.WithFields(logrus.Fields{
		"PID": os.Getpid(),
	}).Info("Start service")

	collector := metrics.NewCollector()
	prometheus.MustRegister(collector)

	state := model.NewState()

	var ctrl PinController = controller.NewGPIOController(context.Background(), collector, state, logger)
	if ctx.Bool("keyboard") {
		ctrl = controller.NewKeyboardController(context.Background(), collector, state, logger)
	}

	defer ctrl.Close()
	ctrl.Run()

	api := web.NewAPI(state, collector, logger)

	return http.ListenAndServe(":8080", api.CreateREST())
}
