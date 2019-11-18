package model

type Stages struct {
	Level   int     `json:"level"`
	Cyan    float64 `json:"cyan"`
	Magenta float64 `json:"magenta"`
	White   float64 `json:"white"`
	Yellow  float64 `json:"yellow"`
	Points  float64 `json:"points"`
}

func (s *Stages) Map() map[string]float64 {
	return map[string]float64{
		"cyan":    s.Cyan,
		"magenta": s.Magenta,
		"yellow":  s.Yellow,
		"white":   s.White,
	}
}
