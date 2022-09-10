import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_AWS_URL}`,
  timeout: 3000,
  headers: { 'X-AUTH-HEADER': 'foobar' },
});

export { axiosInstance };
