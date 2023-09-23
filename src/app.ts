import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import { notFoundHandler, errorHandler } from './middleware';
import { sendEmail } from './controllers/sendEmail';

dotenv.config();

const port = process.env.PORT ?? 8080;
const app = express();

app.use(express.json());

app.get('/api/v1/send', sendEmail);

app.use(notFoundHandler);
app.use(errorHandler);

function startServer() {
    app.listen(port, () => {
        console.log(`Server Listening to port: ${port}...`);
    });
}

startServer();
