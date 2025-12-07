import { Hono } from 'hono'
import { renderer } from './renderer'
import { drizzle } from 'drizzle-orm/d1';

type Bindings = {
  exampleDB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)

app.get('/', async (c) => {
  const db = drizzle(c.env.exampleDB)

  const {results} = await c.env.exampleDB
    .prepare("SELECT * FROM Customers WHERE CompanyName = ?")
    .bind("Bs Beverages")
    .run();

  return c.json(results)
})

export default app
