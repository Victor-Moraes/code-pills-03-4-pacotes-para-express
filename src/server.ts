import 'express-async-errors';
import express from 'express';
import routes from './routes';
import helmet from 'helmet';
import compression from 'compression';
import statusMonitor from 'express-status-monitor';

const app = express();
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(routes);

app.use(statusMonitor({ path: '/monitor' }));

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
