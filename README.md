# Workflow Tracker

Three-tier containerized application with Angular 17 frontend, Spring Boot 3.2.5 backend, and MongoDB database.
## Prerequisites
- Docker Engine 24.0+
- Docker Compose v2
- Git

## Quick Start

Clone the repository and start the stack:

git clone https://github.com/wackyeutiful/workflow-tracker.git
cd workflow-tracker
docker compose up --build

First build takes 5–10 minutes. Once complete, open http://localhost to access the Angular frontend.

Available endpoints:
Frontend: http://localhost
Backend API: http://localhost:8080/api/workflows
Health Check: http://localhost:8080/actuator/health

Project Structure:

workflow-tracker/
├── workflow-tracker/          Angular frontend
│   ├── Dockerfile
│   └── nginx.conf
├── tracker-backend/           Spring Boot backend
│   ├── Dockerfile
│   └── pom.xml
├── docker-compose.yml         Development stack
├── docker-compose.prod.yml    Production stack (GHCR images)
├── .github/workflows/
│   └── deploy.yml             CI/CD pipeline
├── prometheus.yml             Prometheus scrape configuration
├── scripts/
│   └── deploy.sh              Ubuntu server bootstrap script
├── grafana/provisioning/      Grafana datasources and dashboards
├── .env.example               Environment variable template
└── README.md

Monitoring Stack:
Start with Prometheus and Grafana:
docker compose --profile monitoring up --build

Additional endpoints:
Prometheus: http://localhost:9090
Grafana: http://localhost:3000 (login: admin / admin)
Grafana is pre-provisioned with a "Workflow Tracker" dashboard showing backend status, request rate, and response time.

Architecture:
Frontend: Angular 17 standalone components, multi-stage Docker build (Node → nginx). nginx serves static files and proxies /api to the backend container, eliminating CORS issues.
Backend: Spring Boot 3.2.5, REST API, Spring Data MongoDB, Micrometer Prometheus registry for metrics. Actuator exposes /actuator/health and /actuator/prometheus.
Database: MongoDB 7.0. Data persists in a Docker volume.
Reverse Proxy: nginx handles SPA routing with try_files and proxies API calls to the backend service.
CI/CD: GitHub Actions builds Docker images on every push to main and pushes to GitHub Container Registry (GHCR).

Monitoring: Prometheus scrapes the backend /actuator/prometheus endpoint every 15 seconds. Grafana connects to Prometheus as the default datasource and loads a pre-provisioned dashboard.
CI/CD Pipeline
The GitHub Actions workflow (.github/workflows/deploy.yml) triggers on every push to main:
Checks out the repository
Sets up Docker Buildx
Logs in to GitHub Container Registry (GHCR)
Builds and pushes frontend image to ghcr.io/wackyeutiful/workflow-tracker/frontend
Builds and pushes backend image to ghcr.io/wackyeutiful/workflow-tracker/backend
Includes a placeholder deployment step (replace with SSH or webhook for live deployment)
Images are tagged with the branch name and commit SHA.

Production Deployment:
Use pre-built images from GHCR:

docker compose -f docker-compose.prod.yml up -d
Or bootstrap a fresh Ubuntu 22.04 host with the automation script:
chmod +x scripts/deploy.sh
sudo ./scripts/deploy.sh
The script installs Docker, clones the repository, pulls the latest images from GHCR, and starts the stack.

Environment Variables:
Copy .env.example to .env and customize:
cp .env.example .env

Variables:
GRAFANA_ADMIN_PASSWORD: ****************
Health Checks:
All services expose Docker health checks for ordered startup:
MongoDB: mongosh ping command
Backend: HTTP request to /actuator/health
Frontend: HTTP request to /
Compose depends_on with condition: service_healthy ensures MongoDB starts before the backend, and the backend starts before the frontend.
