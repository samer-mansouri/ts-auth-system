import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import 'dotenv/config';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use((morgan('dev')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserRoutes = require('./routes/UserRoutes');



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use('/api/v1/users', UserRoutes);