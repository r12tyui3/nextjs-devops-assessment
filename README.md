# Containerized Next.js Deployment (Docker + GHCR + Minikube)

> **DevOps Internship Assessment** by **Ritika Singh**  
> Production-ready reference implementation demonstrating modern DevOps practices.

## 🌟 Overview

This project demonstrates the complete DevOps lifecycle for a modern web application:

- **Next.js 14** web application with health-check API routes
- **Docker** multi-stage build for optimized, secure production images
- **GitHub Actions** CI/CD pipeline with automated builds and GHCR publishing
- **GitHub Container Registry (GHCR)** for container image storage
- **Kubernetes (Minikube)** deployment with replicas, health probes, and security best practices

## 👩‍💻 Author Information

- **Name**: Ritika Singh
- **Email**: singhritika7488@gmail.com
- **GitHub**: [@r12tyui3](https://github.com/r12tyui3)
- **Project**: DevOps Internship Assessment

## 🧰 Prerequisites

| Tool        | Version (or newer) | Purpose |
|-------------|-------------------|---------||
| Node.js     | 18.17.0           | Runtime environment |
| npm         | 9.x               | Package manager |
| Docker      | 24.x              | Containerization |
| Git         | Latest            | Version control |
| Minikube    | 1.32+             | Local Kubernetes |
| kubectl     | 1.28+             | Kubernetes CLI |
| GitHub account with GHCR access | - | Container registry |

## 🚀 Quick Start

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/r12tyui3/nextjs-devops-assessment.git
cd nextjs-devops-assessment

# Install dependencies
npm install

# Run development server
npm run dev
```

### 2. Access Points
- **Main Application**: [http://localhost:3000](http://localhost:3000)
- **Health Check API**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## 🐳 Docker Usage

### Local Docker Build & Run
```bash
# Build the image locally
docker build -t nextjs-devops-assessment:local .

# Run the container
docker run --rm -p 3000:3000 nextjs-devops-assessment:local

# Test the application
curl http://localhost:3000
curl http://localhost:3000/api/health
```

## 🔐 GitHub Container Registry Setup

### Step 1: Create Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes: `write:packages`, `read:packages`, `repo`
4. Copy the generated token

### Step 2: Add Repository Secret
1. In your repository: Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `GHCR_TOKEN`
4. Value: Your PAT from Step 1

### Step 3: Automatic Publishing
- Push to `main` branch triggers the workflow
- Images are published as:
  - `ghcr.io/r12tyui3/nextjs-devops-assessment:latest`
  - `ghcr.io/r12tyui3/nextjs-devops-assessment:sha-<commit-hash>`

## ☸️ Kubernetes Deployment on Minikube

### Step 1: Start Minikube
```bash
# Start Minikube with Docker driver
minikube start --driver=docker

# Verify cluster is running
kubectl cluster-info
```

### Step 2: Create GHCR Credentials (if using private repo)
```bash
kubectl create secret docker-registry ghcr-creds \
  --docker-server=ghcr.io \
  --docker-username=r12tyui3 \
  --docker-password=YOUR_GHCR_PAT \
  --docker-email=singhritika7488@gmail.com
```

### Step 3: Deploy to Kubernetes
```bash
# Apply all manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get deployments,pods,services

# Watch pods come online
kubectl get pods -w
```

### Step 4: Access the Application
```bash
# Option 1: Use Minikube service
minikube service nextjs-service --url
# Example output: http://127.0.0.1:49231

# Option 2: Port forwarding
kubectl port-forward service/nextjs-service 8080:80
# Visit: http://localhost:8080
```

## ✅ Verification Checklist

### Application Health
- [ ] `kubectl get pods` shows 3 replicas in `Running` state
- [ ] `kubectl describe pod <pod-name>` shows passing readiness/liveness probes
- [ ] `curl <service-url>/api/health` returns JSON with `status: "ok"`
- [ ] Web interface loads correctly with styled content

### Container Registry
- [ ] GitHub Actions workflow completes successfully
- [ ] Image appears in GHCR: `https://github.com/r12tyui3/nextjs-devops-assessment/pkgs/container/nextjs-devops-assessment`
- [ ] Image can be pulled: `docker pull ghcr.io/r12tyui3/nextjs-devops-assessment:latest`

### Kubernetes Features
- [ ] Rolling updates work: `kubectl set image deployment/nextjs-app nextjs-app=ghcr.io/r12tyui3/nextjs-devops-assessment:new-tag`
- [ ] Health probes prevent bad deployments
- [ ] Resource limits prevent resource exhaustion
- [ ] Security context runs as non-root user

## 🛠 Troubleshooting Guide

| Issue | Symptoms | Solution |
|-------|----------|----------|
| **ImagePullBackOff** | Pods stuck in pending | Check GHCR token permissions, verify image exists |
| **Probe Failures** | ReadinessProbe failing | Ensure `/api/health` returns 200, check container logs |
| **Service Unreachable** | Can't access app | Use `minikube service` command or check NodePort |
| **CI Pipeline Fails** | GitHub Actions red | Verify `GHCR_TOKEN` secret exists and has correct permissions |
| **Build Slow** | Docker build timeout | Ensure BuildKit cache is working, check base image availability |

### Debug Commands
```bash
# Check pod logs
kubectl logs -f deployment/nextjs-app

# Describe pod for events
kubectl describe pod <pod-name>

# Check service endpoints
kubectl get endpoints nextjs-service

# Port forward for direct access
kubectl port-forward deployment/nextjs-app 3000:3000
```

## 🏗 Architecture Details

### Docker Multi-Stage Build
1. **deps**: Install production dependencies
2. **builder**: Build Next.js application
3. **runner**: Minimal runtime image with security hardening

### Kubernetes Features
- **Replica Management**: 3 pods for high availability
- **Rolling Updates**: Zero-downtime deployments
- **Health Probes**: Automatic failure detection and recovery
- **Resource Limits**: CPU/Memory constraints for stability
- **Security Context**: Non-root user, read-only filesystem
- **Service Discovery**: ClusterIP with NodePort exposure

### CI/CD Pipeline
- **Trigger**: Push to main branch
- **Build**: Multi-architecture (AMD64, ARM64)
- **Cache**: GitHub Actions cache for faster builds
- **Security**: Provenance attestation and SBOM generation
- **Registry**: Automatic push to GHCR with multiple tags

## 📊 Performance Metrics

### Resource Usage
- **CPU Request**: 100m (0.1 CPU core)
- **CPU Limit**: 500m (0.5 CPU core)
- **Memory Request**: 128Mi
- **Memory Limit**: 256Mi

### Availability
- **Replicas**: 3 (High Availability)
- **Max Unavailable**: 1 (Rolling Update)
- **Max Surge**: 1 (Rolling Update)

## 🔒 Security Features

- ✅ **Non-Root User**: Container runs as UID 1001
- ✅ **Read-Only Filesystem**: Prevents runtime modifications
- ✅ **Dropped Capabilities**: Minimal required permissions
- ✅ **Security Context**: Pod and container level security
- ✅ **Image Scanning**: Automatic vulnerability detection
- ✅ **Provenance**: Build attestation and SBOM

## 📁 Project Structure

```
nextjs-devops-assessment/
├── 📄 Dockerfile              # Multi-stage container build
├── 📄 README.md              # This comprehensive guide
├── 📄 next.config.js         # Next.js configuration
├── 📄 package.json           # Dependencies and scripts
├── 📁 pages/                 # Next.js pages
│   ├── 📄 _app.jsx          # App component
│   ├── 📄 index.jsx         # Home page
│   └── 📁 api/              # API routes
│       └── 📄 health.js     # Health check endpoint
├── 📁 public/               # Static assets
│   └── 📄 favicon.svg       # Application icon
├── 📁 styles/               # CSS stylesheets
│   ├── 📄 globals.css       # Global styles
│   └── 📄 Home.module.css   # Component styles
├── 📄 .dockerignore         # Docker build exclusions
├── 📁 .github/              # GitHub configuration
│   └── 📁 workflows/        # CI/CD pipelines
│       └── 📄 deploy.yml    # Build and push workflow
└── 📁 k8s/                  # Kubernetes manifests
    ├── 📄 deployment.yaml   # Application deployment
    └── 📄 service.yaml      # Service configuration
```

## 📨 Assessment Submission

### Required Information
- **Repository URL**: https://github.com/r12tyui3/nextjs-devops-assessment
- **GHCR Image URL**: https://ghcr.io/r12tyui3/nextjs-devops-assessment:latest
- **Live Demo**: Available after Minikube deployment
- **Author**: Ritika Singh (singhritika7488@gmail.com)

### Email Template
```
Subject: DevOps Assessment Submission - Ritika Singh

Dear Hiring Team,

I have completed the DevOps assessment as requested. Here are the details:

Repository: https://github.com/r12tyui3/nextjs-devops-assessment
Container Image: https://ghcr.io/r12tyui3/nextjs-devops-assessment:latest
Author: Ritika Singh
Email: singhritika7488@gmail.com

The project includes:
✅ Containerized Next.js application
✅ GitHub Container Registry integration
✅ Kubernetes deployment manifests
✅ CI/CD pipeline with GitHub Actions
✅ Production-ready security configurations

Please let me know if you need any additional information.

Best regards,
Ritika Singh
```

## 🤝 Contributing

This project is part of a DevOps assessment. For improvements or suggestions:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description

## 📜 License

This project is created for educational and assessment purposes.

---

**Created with ❤️ by Ritika Singh for DevOps Internship Assessment**