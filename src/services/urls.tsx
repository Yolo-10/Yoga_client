var mode = process.env.NODE_ENV;
var API_SERVER = 'http://localhost';

if (mode === 'development') {
  API_SERVER = 'http://localhost:8000/api';
  // API_SERVER='http://110.42.230.161',
}

if (mode === 'production') {
  // API_SERVER = 'http://localhost:8000'
  API_SERVER = 'http://110.42.230.161/api';
}

export { API_SERVER };
