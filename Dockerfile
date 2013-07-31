# Node Sandbox
#
# Version   0.0.1

from    ubuntu:12.04
maintainer    Matthew Mueller "mattmuelle@gmail.com"

# make sure the package repository is up to date
run    echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
run    apt-get update

# Install node.js
run    apt-get install -y curl
run    curl http://nodejs.org/dist/v0.10.13/node-v0.10.13-linux-x64.tar.gz | tar -C /usr/local/ --strip-components=1 -zxv

# Add files
add    . /src

# Write a file in home
run    touch /home/index.js

# Install dependencies
run    cd /src; npm install

# Export HOME
env    SANDBOX /home

# Start webserver
cmd ["node", "/src/index.js", "80"]
