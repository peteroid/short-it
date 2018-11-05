#!/bin/sh

set -ue

echo_header () {
  echo "###########################"
  echo
  echo $1
  echo
  echo "###########################"
}

echo_header "Updating yum ..."
sudo yum -y update

echo_header "Installing node ..."
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -

echo_header "Installing yarn ..."
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum -y install yarn

echo_header "Creating a local npm global directory"
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo "export PATH=~/.npm-global/bin:$PATH" >> ~/.bashrc
source ~/.bashrc

echo_header "Installing pm2 ..."
npm i pm2@latest -g

echo_header "Finishing the setup ..."
source ~/.bashrc
