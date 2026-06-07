#!/bin/bash
set -euo pipefail

REPO_URL="https://github.com/wackyeutiful/workflow-tracker.git"
PROJECT_DIR="workflow-tracker"
GRAFANA_PASSWORD="${GRAFANA_PASSWORD:-admin}"

install_docker() {
    if command -v docker &> /dev/null && docker compose version &> /dev/null; then
        echo "Docker already installed"
        return 0
    fi
    apt-get update
    apt-get install -y ca-certificates curl gnupg lsb-release
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    systemctl enable docker
    systemctl start docker
}

clone_repo() {
    if [ -d "$PROJECT_DIR" ]; then
        echo "Project exists, pulling latest"
        cd "$PROJECT_DIR"
        git pull
    else
        git clone "$REPO_URL" "$PROJECT_DIR"
        cd "$PROJECT_DIR"
    fi
}

start_stack() {
    export GRAFANA_ADMIN_PASSWORD="$GRAFANA_PASSWORD"
    docker compose -f docker-compose.prod.yml pull
    docker compose -f docker-compose.prod.yml up -d
}

main() {
    install_docker
    clone_repo
    start_stack
    echo "Stack deployed successfully"
    echo "Frontend: http://$(hostname -I | awk '{print $1}')"
    echo "Backend API: http://$(hostname -I | awk '{print $1}'):8080"
    echo "Grafana: http://$(hostname -I | awk '{print $1}'):3000"
}

main "$@"