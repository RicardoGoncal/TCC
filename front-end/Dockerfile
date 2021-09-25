# Base Image
FROM node:12.18.1

# set Working directory
WORKDIR /app

# Add /app/node_modules/bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9


# Add app

COPY . /app

CMD ng s --host 0.0.0.0
