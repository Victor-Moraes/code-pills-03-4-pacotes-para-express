import express from 'express';
import routes from './routes';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(routes);

app.get('/users', (request, response) => {
  response.json({ ok: true, false: false });
});

app.listen(3000);
