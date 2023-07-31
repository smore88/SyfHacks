#!/bin/sh
#-e MYSQL_ROOT_PASSWORD=my-secret-pw  \

docker run --name svmnew-mysql8 -d \
    -p 3306:3306        \
    -e MYSQL_ROOT_PASSWORD=my-secret-pwd  \
    -v /Users/shubham/ShubCode/testDocker/db/data_vol:/var/lib/mysql \
        svmnew-mysql8