# =============================================================================
# Multi-Stage Dockerfile for Spring Boot Backend
# Base: Eclipse Temurin OpenJDK 21
# =============================================================================

# Stage 1: Build JAR with Maven
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Cache dependency layer
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal Production JRE Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create unprivileged system user for container security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy packaged jar from builder stage
COPY --from=builder /app/target/portfolio-backend-1.0.0.jar app.jar

# JVM Performance & Memory tuning for containers
ENV JAVA_OPTS="-XX:+UseZGC -XX:+ZGenerational -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"

# Healthcheck probe using actuator
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/v1/actuator/health || exit 1

EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
