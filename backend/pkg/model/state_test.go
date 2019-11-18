package model

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStateSet(t *testing.T) {
	testCaseColors := []struct {
		key   string
		value bool
	}{
		{"cyan", true},
		{"magenta", true},
		{"yellow", true},
		{"white", true},
	}

	t.Parallel()
	for _, testCase := range testCaseColors {
		t.Run("Simple State Test "+testCase.key, func(t *testing.T) {
			state := NewState()
			state.Set(testCase.key, testCase.value)
			assert.Equal(t, state.Get(testCase.key), testCase.value)
			state.Set(testCase.key, !testCase.value)
			assert.Equal(t, state.Get(testCase.key), !testCase.value)
		})
	}
}

func TestStateSet_Priorization(t *testing.T) {
	state := NewState()
	state.Set("color1", true)
	assert.Equal(t, onlyActive(state.States(), "color1"), true)

	state.Set("color2", true)
	assert.Equal(t, onlyActive(state.States(), "color2"), true)

	state.Set("color2", false)
	assert.Equal(t, onlyActive(state.States(), "color1"), true)

	state.Set("color2", true)
	assert.Equal(t, onlyActive(state.States(), "color2"), true)

	state.Set("color1", false)
	assert.Equal(t, onlyActive(state.States(), "color2"), true)

}

func onlyActive(state map[string]bool, searchKey string) bool {
	for k, v := range state {
		if k == searchKey {
			if v == true {
				continue
			}
			return false
		}
		if v == true {
			return false
		}
	}
	return true
}
