import { Elysia } from "elysia";
import { sequelize } from "@lib/db";
import { finder } from "@routes/finder.route";

const app = new Elysia()
    .use(finder);

const port = process.env.API_PORT || 3000;

await sequelize.sync({ alter: true });

Bun.serve({
    fetch: app.handle,
    port,
});

console.log(`🚀 Server running at http://localhost:${port}`);