import userRouter from '#Routes/user.routes.js';
import express from 'express';
//import cors from 'cors';

const app = express();

// Middleware CORS para permitir solicitudes desde http://localhost:3000
// Desactivar CORS explícitamente
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// Middlewares adicionales
app.use(express.json());

// Routes
app.use('/api/usuarios', userRouter);

export default app;
