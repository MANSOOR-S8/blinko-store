// test/utils.ts
import axios, { AxiosInstance } from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import FormData from 'form-data';

export const apiClient = (baseURL: string, token?: string): AxiosInstance => {
  const instance = axios.create({ baseURL });
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return instance;
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateDummyImage = (filename: string): string => {
  const filePath = path.resolve(__dirname, filename);
  // Simple 1x1 PNG base64
  const pngBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+Lz2UAAAAASUVORK5CYII=';
  const buffer = Buffer.from(pngBase64, 'base64');
  fs.writeFileSync(filePath, buffer);
  return filePath;
};

export const createFormData = (filePath: string) => {
  const form = new FormData();
  form.append('image', fs.createReadStream(filePath));
  return form;
};
