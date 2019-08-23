import user from './user';
import express from 'express';
import bing from './bing';

const app = express();

user(app);
bing(app);

export default app;