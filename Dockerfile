# Use minimal base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Secure Practice: Run as non-root user
RUN adduser -D appuser
USER appuser

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
