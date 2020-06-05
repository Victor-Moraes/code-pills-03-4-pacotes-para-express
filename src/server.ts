import express from 'express';
import routes from './routes';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(routes);

app.listen(3000);
