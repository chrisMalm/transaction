# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Debug step: List files in /app
RUN ls -la

# Copy package.json and package-lock.json (relative to current context)
COPY package.json package-lock.json ./

# Debug step: List files in /app after copying
RUN ls -la

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
