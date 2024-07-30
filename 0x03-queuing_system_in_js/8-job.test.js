#!/usr/bin/node
//
import createPushNotificationsJobs from './8-job.js';
import kue from 'kue';

const queue = kue.createQueue();

describe('createPushNotificationsJobs', () => {
  it('display a error message if jobs is not an array', () => {
    expect().to.be;
  });
});
