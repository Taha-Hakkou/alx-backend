#!/usr/bin/node
// Creates a queue job forEach job in jobs

const createPushNotificationsJobs = (jobs, queue) => {
  if (!Array.isArray(jobs)) {
    throw Error('Jobs is not an array');
  }
  for (const job of jobs) {
    const queueJob = queue.create('push_notification_code_3', job)
      .save(() => console.log(`Notification job created: ${queueJob.id}`))
      .on('complete', () => console.log(`Notification job ${queueJob.id} completed`))
      .on('failed', (err) => console.log(`Notification job ${queueJob.id} failed: ${err}`))
      .on('progress', (progress) => console.log(`Notification job ${queueJob.id} ${progress}% complete`));
  }
}

export default createPushNotificationsJobs;
