import express from 'express';
import cors from 'cors';

import { supabase } from './lib/supabaseClient';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const baseRoute = '/api';

app.get(`${baseRoute}/health`, (_req, res) => {
  return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get(`${baseRoute}/supabase/health`, async (_req, res) => {
  const { error } = await supabase.from('formations').select('id').limit(1);
  if (error) {
    return res.status(200).json({ status: 'ok', message: 'Supabase reachability checked', error: error.message });
  }
  return res.status(200).json({ status: 'ok', message: 'Supabase ready' });
});

const port = Number(process.env.PORT ?? 4000);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`certiGen backend lancé sur http://localhost:${port}`);
  });
}

export default app;
