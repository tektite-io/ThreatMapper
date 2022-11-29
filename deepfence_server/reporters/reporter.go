package reporters

import "context"

type TopologyReporter interface {
	JSONGraph(ctx context.Context) (string, error)
}
