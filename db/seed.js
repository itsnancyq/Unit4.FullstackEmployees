import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  await createEmployee({name: "Spongebob Squarepants", birthday: '1986-07-14', salary: 1})
  await createEmployee({name: "Bob Belcher", birthday: '1980-01-15', salary: 200})
  await createEmployee({name: "Meredith Grey", birthday: '1978-04-20', salary: 6000})
  await createEmployee({name: "Nancy Q", birthday: '1999-6-29', salary: 25})
  await createEmployee({name: "Luke Skywalker", birthday: '1970-03-18', salary: 600})
  await createEmployee({name: "Squidward Tentacles", birthday: '1979-04-11', salary: 15})
  await createEmployee({name: "Gene Belcher", birthday: '2006-05-29', salary: 0})
  await createEmployee({name: "JoJo Joestar", birthday: '1975-02-19', salary: 350})
  await createEmployee({name: "Finn the Human", birthday: '2001-06-20', salary: 800})
  await createEmployee({name: "Taylor Swift", birthday: '1989-12-13', salary: 13000})
}

// seed database look @ class demno 1:03:00