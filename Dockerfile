# ============================================================
# Multi-stage Dockerfile for Flash Flood & Landslide Predictor
# Builds React Vite Frontend & runs FastAPI Backend with ML
# ============================================================

# Stage 1: Build the React + Vite frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Python Backend & serving the built frontend
FROM python:3.11-slim
WORKDIR /app

# Install minimal OS dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install PyTorch CPU first (saves ~1.5GB CUDA bloat, fits free cloud tier RAM)
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu

# Install backend dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application code
COPY . .

# Copy built frontend assets from stage 1 into dist
COPY --from=frontend-builder /app/dist ./dist

# Standard Cloud Run / Render / Railway port handling
ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn backend.app:app --host 0.0.0.0 --port ${PORT:-8000}"]
