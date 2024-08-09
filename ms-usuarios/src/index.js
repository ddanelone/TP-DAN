import { connectDB } from '#Config/db.js';
import '#Config/env.js';
import httpServer from '#Config/http.js';
import client from './eureka-client.js';
import { connectRabbitMQ, getChannel } from '#Config/rabbitMQ.js';

import userRegisterController from '#Controllers/user-register.controller.js';

const CREAR_USUARIO_QUEUE = 'crear_usuario';

const startServer = async () => {
    try {
        await connectDB();
        await connectRabbitMQ();

        // Iniciar el cliente Eureka
        client.start((error) => {
            if (error) {
                console.error('Error al iniciar el cliente Eureka:', error);
                return;
            }
            console.log('Cliente Eureka iniciado correctamente');
        });

        // Iniciar el servidor HTTP
        httpServer.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
        });

        // Configurar la cola y consumir mensajes
        const channel = getChannel();
        if (channel) {
            await channel.assertQueue(CREAR_USUARIO_QUEUE, {
                durable: true,
            });

            channel.consume(CREAR_USUARIO_QUEUE, async (message) => {
                if (message !== null) {
                    console.log(
                        'Mensaje recibido:',
                        message.content.toString()
                    );

                    // Procesar el mensaje y registrar un nuevo usuario
                    const user = JSON.parse(message.content.toString());
                    if (user.nombre && user.apellido) {
                        // Generar la contraseña combinando nombre, apellido y dni
                        const nombre = user.nombre;
                        const apellido = user.apellido;
                        const dni = user.dni;

                        const password =
                            nombre.charAt(0).toUpperCase() +
                            apellido.charAt(0).toLowerCase() +
                            dni;

                        // Construir el objeto usuario
                        const usuario = {
                            name: user.nombre,
                            surname: user.apellido,
                            email: user.correoElectronico,
                            dni: user.dni,
                            password: password,
                            role: 0,
                        };

                        // Crear un request simulado para el controlador
                        const req = { body: usuario };
                        const res = {
                            status: (code) => ({
                                send: (response) =>
                                    console.log(`Response: ${code}`, response),
                            }),
                        };

                        await userRegisterController(req, res);
                        channel.ack(message);
                    } else {
                        channel.ack(message);
                        console.log(
                            'Mensaje no procesado: nombre o apellido vacío'
                        );
                    }
                }
            });

            console.log(
                `Consumiendo mensajes de la cola ${CREAR_USUARIO_QUEUE}`
            );
        } else {
            console.error('Canal de RabbitMQ no disponible');
        }
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();
