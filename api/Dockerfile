# Use base image of Node.js
FROM node:14

# Define work directory in the container
WORKDIR /app

# Copy o package.json e package-lock.json to container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy all other files from current dir to container
COPY . .

# Expose port 4000 (same defined in docker-compose.yml)
EXPOSE 4000

# Start Node.js server
CMD ["npm", "run", "dev"]