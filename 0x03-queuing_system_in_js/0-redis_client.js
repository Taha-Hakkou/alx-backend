#!/usr/bin/node
// Connects to the running redis server
import redis from 'redis';

const client = redis.createClient()
  .on('error', error => console.error(`Redis client not connected to the server: ${error}`))
  .on('connect', () => console.log('Redis client connected to the server'));
