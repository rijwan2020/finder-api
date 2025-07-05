import { Elysia } from "elysia";
import { sequelize } from "@lib/db";

const app = new Elysia();

const port = process.env.API_PORT || 4000;

await sequelize.sync({ alter: true });

Bun.serve({
    fetch: app.handle,
    port,
});

console.log(`🚀 Server running at http://localhost:${port}`);