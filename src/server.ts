import 'express-async-errors';
import express from 'express';
import routes from './routes';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(routes);

app.use((
    error: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    console.error(error);
    return response.status(500).json({ msg: error.message });
});

app.listen(3000);
