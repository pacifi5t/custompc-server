import express from 'express';

const PORT = process.env.PORT || 9999;

const app = express();

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (er) {
    console.log(er);
  }
}

start();
