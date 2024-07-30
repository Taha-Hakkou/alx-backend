#!/usr/bin/node
// Connects to the running redis server
import redis from 'redis';
import util from 'util';

const client = redis.createClient()
  .on('error', error => console.error(`Redis client not connected to the server: ${error}`))
  .on('connect', () => console.log('Redis client connected to the server'));

const getAsync = util.promisify(client.get).bind(client);

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print);
}

const displaySchoolValue = async (schoolName) => {
  const value = await getAsync(schoolName);
  console.log(value);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
