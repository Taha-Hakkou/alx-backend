#!/usr/bin/node
//
import redis from 'redis';
import util from 'util';
import kue from 'kue';
import express from 'express';

const client = redis.createClient();
const getAsync = util.promisify(client.get).bind(client);

const reserveSeat = (number) => {
  client.set('available_seats', number);
}

const getCurrentAvailableSeats = async () => await getAsync('available_seats');

reserveSeat(50);
let reservationEnabled = true;

//*******************************************************//

const queue = kue.createQueue();

//*******************************************************//

const app = express();
const PORT = 1245;

app.get('/available_seats', (_req, res) => {
  res.json({'numberOfAvailableSeats': getCurrentAvailableSeats()});
});

app.get('/reserve_seat', (req, res) => {
  if (reservationEnabled) {
    const job = queue.create('reserve_seat')
      .save((err) => {
        if (err) {
          res.json({'status': 'Reservation failed'});
	} else {
          res.json({'status': 'Reservation in process'});
	}
      })
      .on('complete', () => console.log(`Seat reservation job ${job.id} completed`))
      .on('failed', (err) => console.log(`Seat reservation job ${job.id} failed: ${err.message}`));
  } else {
    res.json({'status': 'Reservation are blocked'});
  }
});

app.get('/process', (req, res) => {
  
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
