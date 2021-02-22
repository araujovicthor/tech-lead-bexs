import { Router } from 'express';

import tripRouter from '@modules/trip/infra/http/routes/trip.routes';

const routes = Router();

routes.use('/trip', tripRouter);

export default routes;
