import { isDevelopment } from 'utils/environment';

export const BACKEND_HOST = isDevelopment() ? 'http://localhost:5000' : '';
