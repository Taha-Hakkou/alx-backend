#!/usr/bin/node
// Uses the client to store a hash value
import redis from 'redis';

const client = redis.createClient()
  .on('error', error => console.error(`Redis client not connected to the server: ${error}`))
  .on('connect', () => console.log('Redis client connected to the server'));

const key = 'HolbertonSchools';
client.hset(key, 'Portland', '50', redis.print);
client.hset(key, 'Seattle', '80', redis.print);
client.hset(key, 'New York', '20', redis.print);
client.hset(key, 'Bogota', '20', redis.print);
client.hset(key, 'Cali', '40', redis.print);
client.hset(key, 'Paris', '2', redis.print);
client.hgetall(key, (_err, values) => console.log(values));
