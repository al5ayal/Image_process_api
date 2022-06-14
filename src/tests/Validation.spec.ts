import supertest from 'supertest';
import app from '../index';

// create a request object
const request = supertest(app);

describe('Test api/images endpoints response Validations', () => {
  it(`Validate /api/images without Parameters Error`, async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Bad Request Please provide valid parameters');
  });

  it(`Validate /api/images?filename=fjord with only filename that exist`, async () => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(200);
    // expect(response.body.error).toBe('Bad Request Please provide valid parameters');
  });
  it(`Validate /api/images?filename=badimage with only filename that does not exist`, async () => {
    const response = await request.get('/api/images?filename=badimage');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Image File not found');
  });
  describe('Test /api/images?filename=fjord/.jpg only filename with/without extension', () => {
    it('Test /api/images?filename=fjord.jpg with file extension should return full size image if file exist', async () => {
      const response = await request.get('/api/images?filename=fjord.jpg');
      expect(response.status).toBe(200);
      // expect(response.body.error).toBe('Bad Request Please provide valid parameters');
    });
    it('Test /api/images?filename=fjord without file extension should return full size image if file exist', async () => {
      const response = await request.get('/api/images?filename=fjord');
      expect(response.status).toBe(200);
      // expect(response.body.error).toBe('Bad Request Please provide valid parameters');
    });
  });
  describe('Test api/images Validate width and height provided and valid', () => {
    it('Test /api/images?filename=fjord.jpg&height=200 hight without width validation Error', async () => {
      const response = await request.get('/api/images?filename=fjord.jpg&height=200');
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Width is missing');
    });
    it('Test /api/images?filename=fjord.jpg&width=200 width without height validation Error', async () => {
      const response = await request.get('/api/images?filename=fjord.jpg&width=200');
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Height is missing');
    });
    it('Test /api/images?filename=fjord.jpg&width=200ff&height=200 bad width non numeric value validation Error', async () => {
      const response = await request.get('/api/images?filename=fjord.jpg&width=200ff&height=200');
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('width is not valid number');
    });
    it('Test /api/images?filename=fjord.jpg&width=200&height=200ff bad hieght non numeric value validation Error', async () => {
      const response = await request.get('/api/images?filename=fjord.jpg&width=200&height=200ff');
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('height is not valid number');
    });
  });
});
