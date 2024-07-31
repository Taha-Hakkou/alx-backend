#!/usr/bin/node
// Tests job queuing system in 8-job.js
import createPushNotificationsJobs from './8-job.js';
import kue from 'kue';
import {expect} from 'chai';
import sinon from 'sinon';

describe('createPushNotificationsJobs', () => {
  const queue = kue.createQueue();
  before(() => queue.testMode.enter());
  afterEach(() => queue.testMode.clear());
  after(() => queue.testMode.exit());

  it('display a error message if jobs is not an array', () => {
    const jobs = { phoneNumber: '499494', message: 'Your one time pin is 1245' };
    expect(() => createPushNotificationsJobs(jobs, queue)).to.throw('Jobs is not an array');
  });
  it('create two new jobs to the queue', () => {
    const spy = sinon.spy(console, 'log');
    const jobs = [
      { phoneNumber: '499494', message: 'Your one time pin is 1245' },
      { phoneNumber: '908187', message: 'Your one time pin is 1453' }
    ];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(spy.calledTwice).to.be.true;
  });
  it('adds jobs with the right data', () => {
    const jobs = [
      { phoneNumber: '499494', message: 'Your one time pin is 1245' }
    ];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs[0].data).to.equal(jobs[0]);
  });
});
