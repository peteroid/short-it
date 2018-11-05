# Short It
- a url shortener built on aws services

### AWS services
- EC2
- DynamoDB

### Getting started
```
# get the repo
git clone https://github.com/peteroid/short-it.git

# or get the repo via wget
wget https://github.com/peteroid/short-it/archive/master.zip
mkdir short-it
cd short-it
unzip ../short-it-master.zip

# setup up the EC2
cd short-it
./setup-ec2.sh

# init the service
yarn
pm2 start app.js --name app

# the app runs now
# check ./config.js for more configurations
```

### Start the service when bootup
```
# register the service into boot process
# need to copy and execute the output
pm2 startup
```

### Route the traffics to port 80 (HTTP)
```
# also append this to /etc/rc.local
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```
