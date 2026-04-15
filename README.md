# Secure Healthcare API: End-to-End DevSecOps Pipeline

A production-grade DevSecOps implementation featuring a containerized Node.js API deployed to a Kubernetes (Minikube) cluster. This project demonstrates a "Shift Left" security approach, integrating automated security gates at every stage of the CI/CD lifecycle.

## 🛠 Tech Stack & Tools
| Stage | Tool | Purpose |
| :--- | :--- | :--- |
| **CI/CD Orchestration** | Jenkins | Automated Build & Deploy pipelines |
| **SAST** | SonarQube | Static analysis for code quality & security flaws |
| **SCA/Container Scan** | Trivy | Identifying CVEs in Docker image layers |
| **Orchestration** | Kubernetes (Minikube) | Resilient container management |
| **DAST** | OWASP ZAP | Dynamic "Attack" simulation on the running API |
| **Monitoring** | Prometheus & Grafana | Real-time observability of system vitals |

## 🚀 The DevSecOps Lifecycle
1. **Source Control:** Code pushed to GitHub triggers a Jenkins Webhook.
2. **Static Analysis:** SonarQube scans the Node.js source for vulnerabilities.
3. **Containerization:** Docker image is built and scanned by Trivy for OS-level vulnerabilities.
4. **Deployment:** The "secure-api" is deployed to a Minikube cluster via specialized manifests.
5. **Dynamic Testing:** OWASP ZAP performs a baseline scan against the live Kubernetes service.
6. **Observability:** Prometheus monitors the cluster, with Grafana visualizing resource spikes during security scans.

## 🧠 Technical Challenges (The "Hardest Part")
The most significant challenge was managing the **networking abstraction layers** between the host AWS EC2 instance and the isolated Minikube Docker driver. 

* **The Problem:** The Kubernetes cluster lived inside a private Docker network, making it invisible to the external OWASP ZAP scanner and the Grafana dashboard.
* **The Solution:** I implemented **Kubernetes Port-Forwarding tunnels** and utilized the `--network="host"` Docker mode to bridge the gap, allowing the security tools to "attack" and "monitor" the internal pods in real-time.

## 📈 Key Security Findings
* **DAST Results:** Successfully identified missing security headers (X-Frame-Options, CSP) and server information leaks (X-Powered-By).
* **Monitoring:** Observed a measurable CPU utilization spike (from ~6% to ~20%) during the DAST "Spidering" phase, providing empirical evidence of the resource cost of security probing.

---
*Developed as part of a Virtual Lab Environment (VLE) focused on DevSecOps and Cloud Infrastructure.*
