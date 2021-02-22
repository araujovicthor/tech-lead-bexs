import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TripController from '../controllers/TripController';

const tripRouter = Router();
const tripController = new TripController();

tripRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      to: Joi.string().required(),
      from: Joi.string().required(),
    },
  }),
  tripController.show,
);

tripRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      to: Joi.string().required(),
      from: Joi.string().required(),
      price: Joi.number().min(0).required()
    },
  }),
  tripController.create,
);

export default tripRouter;