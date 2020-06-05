import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.get('/users', (request, response) => {
  response.json({ ok: true, false: false });
});

app.listen(3000);
