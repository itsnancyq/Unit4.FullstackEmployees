import db from "#db/client";
import { createEmployee } from "./queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  await client.connect()

  await createEmployee("Spongebob", '1986-07-14', 1)

  await client.end()
}
