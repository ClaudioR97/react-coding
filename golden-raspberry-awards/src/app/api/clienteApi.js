import axios from 'axios';

export const clienteApi = axios.create({
  baseURL: 'https://challenge.outsera.tech/api',
});
