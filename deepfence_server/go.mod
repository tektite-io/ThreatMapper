module github.com/deepfence/ThreatMapper/deepfence_server

go 1.19

replace github.com/deepfence/ThreatMapper/deepfence_utils => ../deepfence_utils/

replace github.com/deepfence/ThreatMapper/deepfence_worker => ../deepfence_worker/

replace github.com/weaveworks/scope => ../deepfence_agent/tools/apache/scope/

replace github.com/deepfence/df-utils => ../deepfence_agent/tools/apache/deepfence/df-utils

require (
	github.com/casbin/casbin/v2 v2.57.1
	github.com/deepfence/ThreatMapper/deepfence_utils v0.0.0-00010101000000-000000000000
	github.com/deepfence/ThreatMapper/deepfence_worker v0.0.0-00010101000000-000000000000
	github.com/go-chi/chi/v5 v5.0.7
	github.com/go-chi/jwtauth/v5 v5.1.0
	github.com/go-redis/redis/v8 v8.11.5
	github.com/google/uuid v1.3.0
	github.com/neo4j/neo4j-go-driver/v4 v4.4.4
	github.com/opentracing/opentracing-go v1.2.0
	github.com/sirupsen/logrus v1.4.2
	github.com/swaggest/openapi-go v0.2.26
	github.com/ugorji/go v0.0.0-20170918222552-54210f4e076c
	github.com/weaveworks/scope v1.13.2
)

require (
	github.com/Knetic/govaluate v3.0.1-0.20171022003610-9aa49832a739+incompatible // indirect
	github.com/cespare/xxhash/v2 v2.1.2 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/decred/dcrd/dcrec/secp256k1/v4 v4.1.0 // indirect
	github.com/deepfence/df-utils v0.0.0-00010101000000-000000000000 // indirect
	github.com/dgryski/go-rendezvous v0.0.0-20200823014737-9f7001d12a5f // indirect
	github.com/goccy/go-json v0.9.11 // indirect
	github.com/golang/protobuf v1.5.2 // indirect
	github.com/gorilla/websocket v0.0.0-20160221213430-5c91b59efa23 // indirect
	github.com/hibiken/asynq v0.23.0 // indirect
	github.com/k-sone/critbitgo v1.2.0 // indirect
	github.com/konsorten/go-windows-terminal-sequences v1.0.1 // indirect
	github.com/lestrrat-go/blackmagic v1.0.1 // indirect
	github.com/lestrrat-go/httpcc v1.0.1 // indirect
	github.com/lestrrat-go/httprc v1.0.4 // indirect
	github.com/lestrrat-go/iter v1.0.2 // indirect
	github.com/lestrrat-go/jwx/v2 v2.0.6 // indirect
	github.com/lestrrat-go/option v1.0.0 // indirect
	github.com/mattn/go-colorable v0.1.12 // indirect
	github.com/mattn/go-isatty v0.0.14 // indirect
	github.com/robfig/cron/v3 v3.0.1 // indirect
	github.com/rs/zerolog v1.28.0 // indirect
	github.com/spf13/cast v1.3.1 // indirect
	github.com/swaggest/jsonschema-go v0.3.42 // indirect
	github.com/swaggest/refl v1.1.0 // indirect
	github.com/weaveworks/common v0.0.0-20200310113808-2708ba4e60a4 // indirect
	github.com/weaveworks/ps v0.0.0-20160725183535-70d17b2d6f76 // indirect
	golang.org/x/crypto v0.0.0-20220427172511-eb4f295cb31f // indirect
	golang.org/x/sys v0.0.0-20220928140112-f11e5e49a4ec // indirect
	golang.org/x/time v0.0.0-20190308202827-9d24e82272b4 // indirect
	google.golang.org/protobuf v1.28.1 // indirect
	gopkg.in/yaml.v2 v2.4.0 // indirect
)
