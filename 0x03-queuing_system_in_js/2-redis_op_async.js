#!/usr/bin/node
// Connects to the running redis server
import redis from 'redis';
import util from 'util';

const client = redis.createClient()
  .on('error', error => console.error(`Redis client not connected to the server: ${error}`))
  .on('connect', () => {
    console.log('Redis client connected to the server');
    main()
  });

const getAsync = util.promisify(client.get).bind(client);

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print);
}

const displaySchoolValue = async (schoolName) => {
  const value = await getAsync(schoolName);
  if (value) console.log(value);
}

const main = async () => {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}
