import micro, { text } from 'micro';
import fetch from 'node-fetch';
import listen from 'test-listen';
import detect from '../';

let service;
let server;

beforeAll(async () => {
  service = micro(detect);
  server = await listen(service);
});

afterAll(() => {
  service.close();
})

it('should detect the language of code', async () => {
  expect.hasAssertions();
  const res = await fetch(server, { method: 'POST', body: 'const a = "b";' });
  const body = await res.text();
  expect(body).toEqual('JavaScript');
})

it('should return an error if language wasn\'t detected', async () => {
  expect.hasAssertions();
  const error = console.error.bind(console);
  console.error = () => {};
  const res = await fetch(server, { method: 'POST', body: 'Not code' });
  expect(res.status).toEqual(400);
  console.error = error;
})

it('should return an error if no body is provided', async () => {
  expect.hasAssertions();
  const error = console.error.bind(console);
  console.error = () => {};
  const res = await fetch(server, { method: 'POST' });
  expect(res.status).toEqual(400);
  console.error = error;
})
