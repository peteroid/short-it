# Short It
- a url shortener built on aws services

### AWS services
- EC2
- DynamoDB

### Getting started
```
# get the repo
git clone https://github.com/peteroid/short-it.git

# setup up the EC2
cd short-it
./setup-ec2.sh

# init the service
yarn
pm2 start app.js --name app

# the app runs now
# check ./config.js for more configurations
```
