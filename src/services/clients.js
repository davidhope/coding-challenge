const db = require('../db.js');

function createClient(firstname, lastname, email, phone){

}

function listClients(){
  db.connect((connectedDb) => {
    let clients = db.query(connectedDb,'select * from Clients;', []);
    db.close(connectedDb);
    return clients;
  });
}

module.exports = {createClient, listClients};