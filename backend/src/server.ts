import fastify from 'fastify';
import routes from './routes';
import cors from "@fastify/cors";

const app = fastify({
  trustProxy: true,
})

// app.register(cors, {
//   origin: [
//     "http://localhost:3000",
//   ],
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "Content-Disposition", "Authorization"],
//   credentials: true,
//   preflightContinue: false
// });

app.register(routes);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

const start = async () => {
  try {
    await app.listen({
      host: "0.0.0.0",
      port: port
    })
      .then(() => {
        console.log(`Listen on port http://localhost:${port} 🚀`);
      });
  } catch (error) {
    app.log.error(error);
  }
};

start();