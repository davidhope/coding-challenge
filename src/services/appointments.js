const db = require('../db.js');

function addAppointment(clientId, providerId, startTime){

    db.connect((connectedDb) => {

      let inserted = db.query(connectedDb, 'insert into appointments(providerId, clientId, startTime) values(' + providerId + ',' + clientId + ',' + startTime +');');

      res.json(
                {
                  'message':'appointment accepted. Please confirm within 30 minutes.',
                  'link': 'http://localhost:8000/apointments/confirm/' + inserted
                }
              );
    });
}

function confirmAppointment(appointmentId){
  const { apointmentId } = req.params;
  let available = provider.verifyAppt(providerId, startTime);

  if (available) {

    db.connect((connectedDb) => {

      let inserted = db.query(connectedDb, 'update appointments set confirmed = 1 where appointmentId = ' + appointmentId + ';');
      
      return inserted > 0;

    });
  } else {
    
  }
}

function verifyAppointment(providerId, startTime){
  db.connect((connectedDb) => {
    let available = db.query(connectedDb, 'select * from appointments where providerId = ' + providerId + ' and startTime > ' + startTime + ';');
    return available.count();
  });
}

function cancelAppointment(appointmentId){
  db.connect((connectedDb) => {
    let inserted = db.query(connectedDb, 'delete from appointments where appointmentId = ' + appointmentId + ';');
  });
}

module.exports = { addAppointment, confirmAppointment, cancelAppointment, verifyAppointment};