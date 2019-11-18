package controller

import (
	"context"
	"testing"
	"time"

	"github.com/inovex/cocktail-mash/backend/pkg/metrics"
	"github.com/inovex/cocktail-mash/backend/pkg/model"

	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
)

/*there will be a race detection in this test because watcher is reading into state and
the gpio mockup tries to write in the state -> add lock ? */

func TestGPIOController_Watch_ToggleSingle(t *testing.T) {
	color := "yellow"
	ctx := context.Background()
	ctxWatch, cancelWatch := context.WithCancel(ctx)
	defer cancelWatch()

	ctrl := NewGPIOController(ctxWatch, metrics.NewCollector(), model.NewState(), logrus.StandardLogger())

	watcherMock := NewWatcherMock()

	go ctrl.Watch(ctxWatch, color, 0, watcherMock, watcherMock.Notification)
	time.Sleep(time.Millisecond)

	watcherMock.SetHigh()
	time.Sleep(time.Millisecond)
	assert.True(t, ctrl.State.Get(color))
	watcherMock.SetLow()
	time.Sleep(time.Millisecond)
	assert.False(t, ctrl.State.Get(color))
}

func TestGPIOController_Watch_ToggleMultiple(t *testing.T) {

	color := "blue"

	ctx := context.Background()
	ctx, cancelCtx := context.WithCancel(ctx)
	ctrl := NewGPIOController(ctx, metrics.NewCollector(), model.NewState(), logrus.StandardLogger())

	watcherMock := NewWatcherMock()

	go ctrl.Watch(ctx, color, 0, watcherMock, watcherMock.Notification)

	oldState := watcherMock.Read()
	i := 0

	for range time.NewTicker(time.Millisecond).C {
		watcherMock.Toggle()
		assert.True(t, watcherMock.Read() != oldState)
		oldState = watcherMock.Read()

		if i++; i == 1000 {
			break
		}
	}
	cancelCtx()
}
