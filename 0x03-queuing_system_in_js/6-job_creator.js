#!/usr/bin/node
// Creates a basic job queue
import kue from 'kue';

const queue = kue.createQueue();
const job_data = {
  phoneNumber: '+212 666666666',
  message: 'first job'
};
const job = queue.create('push_notification_code', job_data)
  .save((err) => {
    if (!err) console.log(`Notification job created: ${job.id}`)
  })
  .on('complete', () => console.log('Notification job completed'))
  .on('failed', () => console.log('Notification job failed'));
