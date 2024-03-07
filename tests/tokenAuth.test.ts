import supertest from 'supertest';
import { server } from "../src/app"

describe('Authentication API', () => {
  it('POST /auth - Successfully authenticate', async () => {
    const response = await supertest(server)
      .post('http://localhost:3000/api/token')
      .send({
        email: 'user',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('token'); // Assuming a token is returned
  });
});
