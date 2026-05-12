import { createMiddleware } from 'hono/factory'

export const apiKeyAuth = createMiddleware(async (c, next) => {
  const key = c.req.header('x-api-key')
  if (key !== process.env.POST_API_KEY) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  await next()
})