import Koa from 'koa';
import routes from './routes';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

/* setup middlewares */
app.use(bodyParser());
app.use(routes.routes()).use(routes.allowedMethods());
if (process.env.NODE_ENV === 'development') {
  app.use(logger());
}

export default app;
