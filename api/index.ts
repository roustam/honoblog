// api/index.ts
// workaround for vercel 
import app from '../src/index'
import { handle } from 'hono/vercel'

export const config = { runtime: 'nodejs' }

app.get('/hello', (c) => c.json({ message: 'Hello from 123 321 Hono!' }))

export default handle(app)