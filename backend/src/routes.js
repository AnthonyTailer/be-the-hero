const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Login a ONG
routes.post('/sessions', SessionController.create);

// list ALL ONGS
routes.get('/ongs', OngController.index);
// create a ONG
routes.post('/ongs', OngController.create);

// list ALL INCIDENTS
routes.get('/incidents', IncidentController.index);
// create a INCIDENT
routes.post('/incidents', IncidentController.create);
// DELETE a INCIDENT
routes.delete('/incidents/:id', IncidentController.delete);

// LIST all INCIDENTS from a specific ONG
routes.get('/profile', ProfileController.index);


module.exports = routes;