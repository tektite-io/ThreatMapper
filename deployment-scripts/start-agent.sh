#!/bin/bash
#Any change made in this script needs to be made in upgrade-agent.sh script and
#in the golang code that uses that script
usage() {

  cat <<EOF

	usage: $0 <options>

	OPTIONS:
        -h Show this message
        -r IP Address / domain of Deepfence management console (Mandatory)
        -o Port of Deepfence management console (Mandatory. Default is 443)
        -k Deepfence key for auth
        -n Hostname to use in deepfence agent (Optional)
        -t User defined tags, comma separated string (Optional)
        -i Add cloud instance id as suffix for hostname (Y/N) (Optional. Default is "N")
EOF
}

MGMT_CONSOLE_URL=""
MGMT_CONSOLE_PORT="443"
# Optional - only set a value if agent needs to go via a proxy
# Example: http://172.17.0.1:3128
MGMT_CONSOLE_HTTP_PROXY=""
MGMT_CONSOLE_HTTPS_PROXY=""
NO_PROXY=""

# Log level: debug / info / error
DF_LOG_LEVEL="info"
# Comma separated tags
# Example: CUSTOM_TAGS="dev,server"
CUSTOM_TAGS=""
DEEPFENCE_KEY=""
DF_HOSTNAME=""
INSTANCE_ID_SUFFIX="N"
IMAGE_REPOSITORY=${IMAGE_REPOSITORY:-quay.io/deepfenceio}

check_options() {
  if [ "$#" -lt 1 ]; then
    usage
    exit 0
  fi
  while getopts "f:c:p:s:k:i:n:r:o:t:h" opt; do
    case $opt in
    h)
      usage
      exit 0
      ;;
    r)
      MGMT_CONSOLE_URL=$OPTARG
      ;;
    o)
      MGMT_CONSOLE_PORT=$OPTARG
      ;;
    k)
      DEEPFENCE_KEY=$OPTARG
      ;;
    n)
      DF_HOSTNAME=$OPTARG
      ;;
    t)
      CUSTOM_TAGS="$OPTARG"
      ;;
    i)
      if [ "$OPTARG" == "Y" ] || [ "$OPTARG" == "y" ]; then
        INSTANCE_ID_SUFFIX="Y"
      else
        INSTANCE_ID_SUFFIX="N"
      fi
      ;;
    *)
      usage
      exit 0
      ;;
    esac
  done
  if [ "$MGMT_CONSOLE_URL" == "" ]; then
    usage
    exit 0
  fi
  if [ "$MGMT_CONSOLE_PORT" == "" ]; then
    usage
    exit 0
  fi
  if [ "$DF_HOSTNAME" == "" ]; then
    DF_HOSTNAME=$(hostname)
  fi
}

kill_agent() {
  agent_running=$(docker ps --format '{{.Names}}' | grep "deepfence-agent")
  if [ "$agent_running" != "" ]; then
    docker rm -f deepfence-agent
  fi
}

start_agent() {
  docker run -dit \
    --cpus=".2" \
    --ulimit core=0 \
    --name=deepfence-agent \
    --restart on-failure \
    --pid=host \
    --net=host \
    --log-driver json-file \
    --log-opt max-size=50m \
    --privileged=true \
    -v /sys/kernel/debug:/sys/kernel/debug:rw \
    -v /var/log/fenced \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /:/fenced/mnt/host/:ro \
    -e DF_LOG_LEVEL=$DF_LOG_LEVEL \
    -e DF_ENABLE_PROCESS_REPORT="true" \
    -e DF_ENABLE_CONNECTIONS_REPORT="true" \
    -e INSTANCE_ID_SUFFIX="$INSTANCE_ID_SUFFIX" \
    -e CUSTOM_TAGS="$CUSTOM_TAGS" \
    -e MGMT_CONSOLE_URL="$MGMT_CONSOLE_URL" \
    -e MGMT_CONSOLE_PORT="$MGMT_CONSOLE_PORT" \
    -e SCOPE_HOSTNAME="$DF_HOSTNAME" \
    -e DEEPFENCE_KEY="$DEEPFENCE_KEY" \
    -e DF_USE_DUMMY_SCOPE="$DF_USE_DUMMY_SCOPE" \
    -e DF_USE_FAT_DUMMY_SCOPE="$DF_USE_FAT_DUMMY_SCOPE" \
    -e http_proxy="$MGMT_CONSOLE_HTTP_PROXY" \
    -e https_proxy="$MGMT_CONSOLE_HTTPS_PROXY" \
    -e no_proxy="$NO_PROXY" \
    "$IMAGE_REPOSITORY"/deepfence_agent_ce:"${DF_IMG_TAG:-2.5.7}"
}

main() {
  check_options "$@"
  kill_agent
  start_agent
}

main "$@"
