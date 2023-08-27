'use strict';

const express = require('express')
const app = express()
const db = require('./db.js');

const appointmentService = require('./services/appointments.js');
const clientService = require('./services/clients.js');
const providerService = require('./services/providers.js');
const scheduleService = require('./services/schedules.js');

app.use(express.json());

app.get('/api', async (req, res) => {
  res.json('healthy');
});

// List Providers
app.get('/api/providers', (req, res) => {

  try{
    let providers = providerService.listProviders();

    if (providers) {
        res.json(providers);
    } else {
        res.sendStatus(404);
    }
  }catch(err){
    res.send(err.message);
  }

});

app.get('/api/clients', (req, res) => {
  try{
    let clients = clientService.listClients();
    console.log
    if (clients) {
        res.json(clients);
    } else {
        res.sendStatus(404);
    }
  }catch(err){
    res.send(err.message);
  }
})


app.get('/api/schedules', (req, res) => {
  try{
    let schedules = scheduleService.listSchedules();

    if (schedules) {
        res.json(schedules);
    } else {
        res.sendStatus(404);
    }
  }catch(err){
    res.send(err.message);
  }
})


// Confirm Appoinment
app.get('/api/appointments/confirm:apointmentId', async (req, res) => {
  const { appointmentId } = req.params;
  
  try{
    appointmentService.confirmAppointment(appointmentId);
    res.sendStatus(200);
  } catch(err){
    res.send(err.message)
  }
});

// Request Appointment
app.post('/api/appointments/:clientId', async (req, res) => {
    const { clientId } = req.params;
    const { providerId, startTime } = req.body;

    let verified = appointmentService.verifyAppointment(providerId, startTime);

    if(verified){
      let added = addAppointment(clientId, providerId, startTime);

      if(added){
        res.json(
          {
            'message':'appointment accepted. Please confirm within 30 minutes.',
            'link': 'http://localhost:8000/apointments/confirm/' + inserted
          }
        );
      }else{
        res.send(400, 'appointment could not be added.');
      }
    } else {
      res.send(400, 'Appointment not available.');
    }
    
});

db.connect((connectedDb) => {

  console.log('Successfully connected to database!');

  db.init(connectedDb, ()=> {
    console.log('initialization complete.');

    db.provision(connectedDb, () => {
      console.log('provisioning complete');
    }, (err) => {
      console.error('provisioning: ' + err.message);
    });
  }, (err) => {
    console.error(err.message);
  });
  
  let showTables =  'SELECT name FROM sqlite_schema WHERE type =\'table\' AND name NOT LIKE \'sqlite_%\'';
  
  console.log(db.query(connectedDb, showTables, []));

  app.listen(8000, () => {
    db.close(connectedDb);
    console.log('Server is listening on port 8000');
  });
})