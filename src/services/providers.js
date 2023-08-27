const db = require('../db.js');

function createProvider(firstname, lastname, email, phone){

}

function listProviders(){
  db.connect((connectedDb) => {
    let providers = db.query(connectedDb, 'select * from providers');
    db.close(connectedDb);
    return providers;
  });
}

module.exports = {createProvider, listProviders};