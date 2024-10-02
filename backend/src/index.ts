import { Hono } from 'hono';
import { cors } from 'hono/cors';
import pulp from './routes/pulp';

const app = new Hono();

app.use('*', cors());
app.route('/', pulp);

app.notFound((c) => c.json({ msg: 'not found' }, 404));

export default app;
