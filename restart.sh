#!/bin/bash
echo "Restarting SIA"
pm2 delete sia
pm2 delete sia-upload
sudo kill -9 $(sudo lsof -t -i:3232)
yarn build
pm2 start --name="sia" npm -- start
pm2 start server --name="sia-upload"
pm2 log