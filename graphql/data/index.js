import axios from 'axios';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const get = url => client.get(url).then(({ data }) => data);
