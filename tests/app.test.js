const request = require('supertest');
const app = require('../src/app');

describe('API', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /add returns the sum', async () => {
    const res = await request(app).get('/add?a=2&b=4');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 6, even: true });
  });

  test('GET /add with bad input returns 400', async () => {
    const res = await request(app).get('/add?a=x&b=4');
    expect(res.status).toBe(400);
  });

  test('POST /todos creates a todo', async () => {
    const res = await request(app).post('/todos').send({ title: 'Write tests' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: 'Write tests', done: false });

    const list = await request(app).get('/todos');
    expect(list.body).toHaveLength(1);
  });

  test('POST /todos without title returns 400', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.status).toBe(400);
  });

  test('unknown route returns 404', async () => {
    const res = await request(app).get('/nope');
    expect(res.status).toBe(404);
  });
});
