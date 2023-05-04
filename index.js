'use strict';

const backend = require('./backend/main');
const port = process.argv[2] || 3030;

backend.start(port);