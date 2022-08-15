// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';
import fightResponseMock from './db/fightResponseMock.json';
import abilityIssueMock from './db/abilityIssueMock.json';

const handlers = [
  rest.get('awsurl', async (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(fightResponseMock),
  )),
  rest.get('ability', async (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(abilityIssueMock),
  )),
];

export const server = setupServer(...handlers);
