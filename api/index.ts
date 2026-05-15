// api/index.ts
// workaround for vercel 
import app from '../src/index'
import { handle } from 'hono/vercel'

export default handle(app)