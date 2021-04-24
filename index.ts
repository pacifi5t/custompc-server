import express from 'express';
import cors from 'cors';
import db from 'db';
import router from 'routers';
import errorHandler from 'middleware/errorHandler';

const PORT = process.env.PORT || 9999;

const app = express();
app.use(errorHandler)
app.use(cors());
app.use(express.json());
app.use('/api/v1', router);

async function start() {
  try {
    await db.authenticate();
    //await db.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (er) {
    console.error(er);
  }
}

start();
