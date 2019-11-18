package controller

import (
	"sync"

	"github.com/brian-armstrong/gpio"
)

type watcherMock struct {
	state        uint
	Notification chan gpio.WatcherNotification
	mux          sync.Mutex
}

func NewWatcherMock() *watcherMock {
	return &watcherMock{
		state:        0,
		Notification: make(chan gpio.WatcherNotification, 32),
	}
}

func (m watcherMock) Read() uint {
	return m.state
}

func (m *watcherMock) SetHigh() {
	m.mux.Lock()
	m.state = 1
	m.Notification <- gpio.WatcherNotification{
		Pin:   0,
		Value: 1,
	}
	m.mux.Unlock()
}

func (m *watcherMock) SetLow() {
	m.mux.Lock()
	m.state = 0
	m.Notification <- gpio.WatcherNotification{
		Pin:   0,
		Value: 0,
	}
	m.mux.Unlock()
}

func (m *watcherMock) Toggle() {
	if m.state == 0 {
		m.SetHigh()
	} else {
		m.SetLow()
	}
}

func (m *watcherMock) Close() {
	return
}
