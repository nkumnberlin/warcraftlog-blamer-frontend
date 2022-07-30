// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';
import fightResponseMock from './db/fightResponseMock.json';

const handler = rest.get('awsurl', async (req, res, ctx) => res(
  ctx.status(200),
  ctx.json(fightResponseMock),
));

export const server = setupServer(handler);
