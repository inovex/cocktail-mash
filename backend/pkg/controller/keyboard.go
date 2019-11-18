package controller

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"time"

	"github.com/inovex/cocktail-mash/backend/pkg/model"

	"github.com/sirupsen/logrus"
	_ "github.com/stianeikeland/go-rpio"
)

type KeyboardController struct {
	collector PinCollector
	logger    logrus.FieldLogger
	state     *model.State
	ctx       context.Context
}

func NewKeyboardController(ctx context.Context, collector PinCollector, state *model.State, logger logrus.FieldLogger) (controller *KeyboardController) {
	return &KeyboardController{
		logger:    logger,
		collector: collector,
		state:     state,
		ctx:       ctx,
	}
}

func (controller *KeyboardController) Run() {
	go func() {

		interval := 10 * time.Millisecond

		mapping := map[byte]string{
			'a': model.ColorCyan,
			's': model.ColorMagenta,
			'd': model.ColorYellow,
			'f': model.ColorWhite,
			'o': model.ButtonReset,
			'j': model.ButtonNext,
		}

		reader := bufio.NewReader(os.Stdin)
		_, err := reader.ReadByte()

		if err != nil {
			controller.logger.
				WithError(err).
				Error("Couldn't notify a Keyboard")
			return
		}

		for range time.NewTicker(interval).C {
			select {
			case <-controller.ctx.Done():
				fmt.Println("Stop watching Keyboard!")
				return
			default:
				keyPressed, _ := reader.ReadByte()
				if colorName, contains := mapping[keyPressed]; contains {

					controller.state.Set(colorName, true)
					controller.collector.TrackColor(colorName)

					fmt.Printf("Button pressed: %s \n", string(keyPressed))
				}

				//reset all unpressed states
				for key, colorName := range mapping {
					if keyPressed != key {
						controller.state.Set(colorName, false)
					}
				}
			}
		}
	}()

}

func (controller *KeyboardController) Close() {
	controller.ctx.Done()
}
