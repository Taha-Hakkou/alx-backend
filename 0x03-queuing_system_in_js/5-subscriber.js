#!/usr/bin/node
// Creates a redis client that subscribes to a channel
import redis from 'redis';

const client = redis.createClient()
  .on('connect', () => console.log('Redis client connected to the server'))
  .on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));

client.subscribe('holberton school channel', (msg) => {
  console.log(msg);
  if (msg === 'KILL_SERVER') {
    client.unsubscribe('holberton school channel');
    client.quit();
  }
});
