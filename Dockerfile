
#### Stage 2: Serve the React application from Nginx 
FROM bitnami/nginx:latest


# Copy our custom nginx config
COPY nginx.conf /opt/bitnami/nginx/conf/nginx.conf

# Copy the react build from Stage 1
COPY build /app

# Copy our custom nginx config
#COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 to the Docker host, so we can access it 
# from the outside.
EXPOSE 8080
