package model

import (
	"sync"
)

const (
	ColorCyan    = "cyan"
	ColorMagenta = "magenta"
	ColorYellow  = "yellow"
	ColorWhite   = "white"

	ButtonReset = "reset"
	ButtonNext  = "continue"
)

type State struct {
	mutex sync.RWMutex
	state map[string]int
	clock int
}

func NewState() *State {
	return &State{
		state: map[string]int{},
		clock: 0,
	}
}

func (s *State) Set(key string, value bool) {
	s.mutex.Lock()
	if value == true {
		s.state[key] = s.clock
		s.clock++
	} else {
		s.state[key] = -1
	}
	s.mutex.Unlock()
}

func (s *State) Get(key string) (value bool) {
	isPressed := false
	s.mutex.RLock()
	if s.state[key] >= 0 {
		isPressed = true
	}
	s.mutex.RUnlock()
	return isPressed
}

func (s *State) States() map[string]bool {
	result := map[string]bool{}
	s.mutex.RLock()
	defer s.mutex.RUnlock()

	highestValue := -1
	var highestKey string

	for k, v := range s.state {
		if v > highestValue {
			highestValue = v
			highestKey = k
		}
		result[k] = false
	}
	if highestValue != -1 {
		result[highestKey] = true
	}
	return result
}
