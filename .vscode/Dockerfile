# Use an official Nginx image as a base image
FROM nginx:alpine

# Copy static files to the Nginx server's public directory
COPY ./dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
