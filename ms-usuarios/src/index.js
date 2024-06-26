import { connectDB } from '#Config/db.js';
import '#Config/env.js';
import httpServer from '#Config/http.js';
import client from './eureka-client.js';
import { connectRabbitMQ, getChannel } from '#Config/rabbitMQ.js';

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
            const queue = 'clientesHabilitados';

            await channel.assertQueue(queue, {
                durable: true,
            });

            channel.consume(queue, (message) => {
                if (message !== null) {
                    console.log('Mensaje recibido:', message.content.toString());
                    // Aquí puedes procesar el mensaje
                    channel.ack(message);
                }
            });

            console.log(`Consumiendo mensajes de la cola ${queue}`);
        } else {
            console.error('Canal de RabbitMQ no disponible');
        }
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();
