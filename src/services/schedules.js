const db = require('../db.js');


function listSchedules(){
  db.connect((connectedDb) => {
    let schedules = db.query(connectedDb, 'select * from schedules;');
    db.close(connectedDb);
    return schedules;
  });
}

function submitSchedule(providerId, startTime){

}

function updateSchedule(scheduleId, startTime){

}

function deleteSchedule(scheduleId){

}


module.exports = { listSchedules, submitSchedule, updateSchedule, deleteSchedule };