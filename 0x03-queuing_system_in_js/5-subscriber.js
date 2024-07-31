#!/usr/bin/node
// Creates a redis client that subscribes to a channel
import redis from 'redis';

const client = redis.createClient()
  .on('connect', () => console.log('Redis client connected to the server'))
  .on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));

client.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe(channel);
    client.quit();
  }
});

client.subscribe('holberton school channel');
