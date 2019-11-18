package metrics

import "github.com/prometheus/client_golang/prometheus"

const (
	collectorNamespace = "go_days"
	keyButtonName      = "buttonName"
	keyColorName       = "color"
	keyLevel           = "level"
)

type Collector struct {
	totalStagesPoints  *prometheus.CounterVec
	totalStagesColors  *prometheus.CounterVec
	totalPoints        *prometheus.CounterVec
	totalButtonsPushed *prometheus.CounterVec
	totalSpilled       prometheus.Counter
	totalSocketUpdates prometheus.Counter
}

func NewCollector() *Collector {
	return &Collector{
		totalStagesPoints: prometheus.NewCounterVec(
			prometheus.CounterOpts{
				Namespace: collectorNamespace,
				Name:      "stages_points_total",
				Help:      "Counts the total points of a stage.",
			}, []string{keyLevel},
		),
		totalStagesColors: prometheus.NewCounterVec(
			prometheus.CounterOpts{
				Namespace: collectorNamespace,
				Name:      "colors_stage_total",
				Help:      "Counts the total used colors of a stage.",
			}, []string{keyColorName, keyLevel},
		),
		totalPoints: prometheus.NewCounterVec(
			prometheus.CounterOpts{
				Namespace: collectorNamespace,
				Name:      "points_total",
				Help:      "Counts the total points of the game.",
			}, []string{},
		),
		totalButtonsPushed: prometheus.NewCounterVec(
			prometheus.CounterOpts{
				Namespace: collectorNamespace,
				Name:      "buttons_pushed_total",
				Help:      "Counts the total pushed buttons.",
			}, []string{keyButtonName},
		),
		totalSpilled: prometheus.NewCounter(
			prometheus.CounterOpts{
				Namespace: collectorNamespace,
				Name:      "count_spilled_total",
				Help:      "Counts the total cocktail spilled.",
			},
		),
		totalSocketUpdates: prometheus.NewCounter(
			prometheus.CounterOpts{
				Namespace: collectorNamespace,
				Name:      "socket_updates_total",
				Help:      "Counts all socket updates about the socket.",
			},
		),
	}
}

func (collector Collector) Describe(ch chan<- *prometheus.Desc) {
	prometheus.DescribeByCollect(collector, ch)
}

func (collector Collector) Collect(ch chan<- prometheus.Metric) {
	collector.totalStagesColors.Collect(ch)
	collector.totalStagesPoints.Collect(ch)
	collector.totalPoints.Collect(ch)
	collector.totalButtonsPushed.Collect(ch)
	collector.totalSpilled.Collect(ch)
	collector.totalSocketUpdates.Collect(ch)
}

func (collector *Collector) TrackSpilled() {
	collector.totalSpilled.Inc()
}

func (collector *Collector) TrackSocketUpdates() {
	collector.totalSocketUpdates.Inc()
}

func (collector *Collector) TrackColor(button string) {
	collector.totalButtonsPushed.With(prometheus.Labels{keyButtonName: button}).Inc()
}

func (collector *Collector) TrackStagesPoints(level string, points float64) {
	collector.totalStagesPoints.With(prometheus.Labels{
		keyLevel: level,
	}).Add(points)
}

func (collector *Collector) TrackStagesColor(level, color string, value float64) {
	collector.totalStagesColors.With(prometheus.Labels{
		keyLevel:     level,
		keyColorName: color,
	}).Add(value)
}

func (collector *Collector) TrackPoints(points float64) {
	collector.totalPoints.With(nil).Add(points)
}
