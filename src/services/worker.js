import Queue from 'bull'
import v4 from 'uuid'


const redisConfig = {
    //this is not ideal will remove after the test
    password: 'zPmqHYy6ZcAt3hxrelukWCzPAcZQzLnZ',
    host: 'redis-10543.c328.europe-west3-1.gce.cloud.redislabs.com',
    port: 10543
};