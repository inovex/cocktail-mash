package controller

import (
	"context"

	"github.com/inovex/cocktail-mash/backend/pkg/model"

	"github.com/brian-armstrong/gpio"
	"github.com/sirupsen/logrus"
)

type PinCollector interface {
	TrackColor(button string)
}

type GPIOController struct {
	collector PinCollector
	logger    logrus.FieldLogger
	State     *model.State
	ctx       context.Context
}

func NewGPIOController(ctx context.Context, collector PinCollector, state *model.State, logger logrus.FieldLogger) (controller *GPIOController) {
	return &GPIOController{
		logger:    logger,
		collector: collector,
		State:     state,
		ctx:       ctx,
	}
}

var mapping = map[uint]string{
	12: model.ColorWhite,
	16: model.ColorYellow,
	19: model.ButtonNext,
	20: model.ColorMagenta,
	21: model.ColorCyan,
	26: model.ButtonReset,
}

func (controller *GPIOController) Run() {
	for gpioNumber := range mapping {
		watcher := gpio.NewWatcher()
		watcher.AddPin(gpioNumber)
		go controller.Watch(controller.ctx, mapping[gpioNumber], gpioNumber, watcher, watcher.Notification)
	}

}

type watcherMockInterface interface {
	Close()
}

func (controller *GPIOController) Watch(ctx context.Context, color string, pinNumber uint, watcher watcherMockInterface, Notification <-chan gpio.WatcherNotification) {
	controller.State.Set(color, false)

	for {
		select {
		case <-ctx.Done():
			watcher.Close()
			controller.logger.
				WithFields(logrus.Fields{
					"color": color,
					"pin":   pinNumber,
				}).Debug("Stop watching the pin")
			return
		case pinNotification := <-Notification:
			isPinActive := pinNotification.Value == 1
			if controller.State.Set(color, isPinActive); isPinActive {
				controller.collector.TrackColor(color)
			}
		}
	}
}

func (controller *GPIOController) Close() {
	controller.ctx.Done()
}
