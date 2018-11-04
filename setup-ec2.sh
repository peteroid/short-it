#!/bin/sh

echo "Updating yum ..."
sudo yum -y update

echo "Installing node ..."
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -

echo "Installing yarn"
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum -y install yarn

echo "Creating a local npm global directory"
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo "export PATH=~/.npm-global/bin:$PATH" >> ~/.bashrc
source ~/.bashrc

echo "Installing pm2"
npm i pm2@latest -g
