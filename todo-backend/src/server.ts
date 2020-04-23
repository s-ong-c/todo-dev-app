import app from './app';

import './env';

const { PORT } = process.env;

import db from './db';
db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log('FFM server is listening to port', PORT);
    });
  })
  .catch(e => {
    console.error(e);
  });
