// test/api_test.ts
import { spawn } from 'child_process';
import { apiClient, delay, generateDummyImage, createFormData } from './utils';
import axios from 'axios';
import * as fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5000/api';

async function waitForServer(retries = 30, interval = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.get(`${BASE_URL}`);
      if (res.status === 200) return;
    } catch (_) {}
    await delay(interval);
  }
  throw new Error('Server did not become ready in time');
}

async function loginAndGetToken() {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    email: 'admin@example.com',
    password: 'Admin@12345',
  });
  return res.data.accessToken as string;
}

async function testProductRoutes(token: string) {
  const client = apiClient(`${BASE_URL}/products`, token);
  // GET all
  const list = await client.get('/');
  console.log('GET /products', list.status);
  // POST new
  const newProd = {
    name: 'Test Product',
    price: 9.99,
    discountPercentage: 0,
    category: '60d5f9c2e1b2c40015d5d8a1', // placeholder, will be replaced by first existing category
    brand: '60d5f9c2e1b2c40015d5d8b2',
    description: 'Auto generated test product',
    stock: 10,
    images: ['/images/products/placeholder.png'],
    thumbnail: '/images/products/placeholder.png',
    sku: 'TESTSKU123',
  };
  // fetch first category and brand IDs
  const cats = await client.get('/');
  const firstCat = cats.data[0];
  const brandsRes = await apiClient(`${BASE_URL}/brands`, token).get('/');
  const firstBrand = brandsRes.data[0];
  newProd.category = firstCat._id;
  newProd.brand = firstBrand._id;

  const created = await client.post('/', newProd);
  const prodId = created.data._id;
  console.log('POST /products', created.status);
  // GET by id
  const fetched = await client.get(`/${prodId}`);
  console.log('GET /products/:id', fetched.status);
  // PATCH update
  const patched = await client.patch(`/${prodId}`, { price: 14.99 });
  console.log('PATCH /products/:id', patched.status);
  // DELETE
  const del = await client.delete(`/${prodId}`);
  console.log('DELETE /products/:id', del.status);
}

async function testUploadRoutes(token: string) {
  const client = apiClient(`${BASE_URL}/upload`, token);
  const imgPath = generateDummyImage('dummy.png');
  const formSingle = createFormData(imgPath);
  const singleRes = await client.post('/single', formSingle, {
    headers: formSingle.getHeaders(),
  });
  console.log('POST /upload/single', singleRes.status);

  const formMultiple = new (require('form-data'))();
  formMultiple.append('images', fs.createReadStream(imgPath));
  formMultiple.append('images', fs.createReadStream(imgPath));
  const multiRes = await client.post('/multiple', formMultiple, {
    headers: formMultiple.getHeaders(),
  });
  console.log('POST /upload/multiple', multiRes.status);
}

async function runTests() {
  await waitForServer();
  const token = await loginAndGetToken();
  await testProductRoutes(token);
  await testUploadRoutes(token);
  // Add more route tests as needed
  console.log('API testing completed');
}

runTests().catch((err) => {
  console.error('Test failed', err);
  process.exit(1);
});
