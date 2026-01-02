import { Hono } from 'hono'
import { renderer } from './renderer'
import { drizzle } from 'drizzle-orm/d1';
import { usersTable } from "./db/schema";

type Bindings = {
  exampleDB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)

app.get('/', async (c) => {
  const db = drizzle(c.env.exampleDB)

  const result = await db.select().from(usersTable).all()

  return c.json(result)
})

export default app
