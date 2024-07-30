#!/usr/bin/node
// 
import kue from 'kue';

const blackList = ['4153518780', '4153518781'];

const sendNotification = (phoneNumber, message, job, done) => {
  if (blackList.includes(phoneNumber)) {
    throw Error(`Phone number ${phoneNumber} is blacklisted`);
  } else {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  }
}

const queue = kue.createQueue();
queue.process('push_notification_code_2', );
