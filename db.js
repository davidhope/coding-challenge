
const sqlite3 = require('sqlite3').verbose();

function connect(callback) { 

  let db = new sqlite3.Database(':memory:', (err) => {

    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  callback(db);

}

function close(db){
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}

function init(db){

  let providersSql = ' \
                         CREATE TABLE Providers ( \
                            ProviderId INTEGER PRIMARY KEY,\
                            FirstName TEXT NOT NULL,\
                            LastName TEXT NOT NULL,\
                            Email TEXT NOT NULL,\
                            Phone TEXT NOT NULL \
                          );';

  let clientsSql = ' \
                        CREATE TABLE Clients( \
                        ClientId INTEGER PRIMARY KEY,\
                        FirstName TEXT NOT NULL,\
                        LastName TEXT NOT NULL,\
                        Email TEXT NOT NULL,\
                        Phone TEXT NOT NULL \
                      );';

  let AppointmentsSql = ' \
                      CREATE TABLE Appointments( \
                      AppointmentId INTEGER PRIMARY KEY,\
                      ProviderId INTEGER NOT NULL,\
                      ClientId INTEGER NOT NULL,\
                      StartTime TEXT NOT NULL,\
                      Created TEXT DEFAULT CURRENT_TIMESTAMP,\
                      Confirmed INTEGER \
                    );';

  let SchedulesSql = ' \
                    CREATE TABLE Schedules( \
                    ScheduleId INTEGER PRIMARY KEY,\
                    ProviderId INTEGER NOT NULL,\
                    StartTime TEXT NOT NULL,\
                    Duration INTEGER NOT NULL \
                  );';                

  let provisionStatements = [providersSql, clientsSql, AppointmentsSql, SchedulesSql];

  provisionStatements.map((provsql) => {
    run(db, provsql, (err) => {
      if(err){
        console.error(err);
        return err;
      }
    });

    
  });
}

function provision(db){
  let providerInsert = 'insert into Providers(FirstName, LastName, Email, Phone) VALUES("provider", "smith", "smith@gmail.com", "5555555555")';
  let clientInsert = 'insert into Clients(FirstName, LastName, Email, Phone) VALUES("client", "jones", "jones@gmail.com", "9999999999")';
  let scheduleInsert = '\
                          INSERT INTO Schedules (ProviderId,StartTime, Duration) \
                          VALUES( 1, "2023-08-13 08:00", 7); \
                        ';
  let populateStatements = [providerInsert, clientInsert, scheduleInsert];
  populateStatements.map((popsql) => {
    run(db, popsql, (err) => {
      if(err){
        console.error(err);
        return err;
      }
    });
  });
}

function run(db, sql){
  db.run(sql, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows inserted ${this.changes}`);
  });
}

function query(db, sql){
  db.all(sql,params,(err, rows ) => {
    if(err){
      console.error(err.message);
    }

    return rows;
  });
}

module.exports = { 
  connect,
  close,
  init,
  provision,
  run,
  query
}