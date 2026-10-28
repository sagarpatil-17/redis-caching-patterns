# redis-caching-patterns

A backend architecture project demonstrating advanced caching strategies, optimization techniques, and data access patterns using Redis alongside MongoDB.

## 🚀 Overview

This repository serves as a blueprint for implementing high-performance caching patterns in backend services. It provides a local multi-container development environment to experiment with strategies like cache-aside, write-through, and cache-expiration to drastically reduce database load and improve application response times.

## 🛠️ Tech Stack

*   **Primary Cache:** Redis 7 (Alpine)
*   **Database:** MongoDB 7
*   **Containerization:** Docker Compose

---

## ⚡ Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
*   [Docker Desktop](https://docker.com)
*   Git

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd redis-caching-patterns
   ```

2. **Spin up the local infrastructure:**
   Launch the containerized Redis and MongoDB instances in detached mode:
   ```bash
   docker compose up -d
   ```

3. **Verify the services are running:**
   *   **Redis:** Check connectivity on port `6379`
   *   **MongoDB:** Initialized with database `local_redis` on port `27017`

---

## 📁 Project Structure

```text
redis-caching-patterns/
├── docker-compose.yml       # Local infrastructure (Redis & MongoDB)
└── setup-local-redis/       # Setup scripts and configurations
```

## 💾 Infrastructure Configurations

### Redis Setup
*   Runs on version `7-alpine`
*   Data persistence is enabled via Append Only File (`--appendonly yes`)
*   Named volume `redis-data` ensures data persists across container restarts

### MongoDB Setup
*   Runs on version `7`
*   Initializes a default database named `local_redis`
*   Named volume `mongo-data` handles database persistence