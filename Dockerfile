# Use the official Node.js 18 image as the base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port for the Next.js app
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]