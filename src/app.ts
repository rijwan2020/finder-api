import { Elysia } from "elysia";
import { sequelize } from "@lib/db";
import { folderRoute } from "@routes/folderRoute";

const app = new Elysia()
    .use(folderRoute);

const port = process.env.API_PORT || 3000;

await sequelize.sync({ alter: true });

Bun.serve({
    fetch: app.handle,
    port,
});

console.log(`🚀 Server running at http://localhost:${port}`);