import amqp from 'amqplib';
import '#Config/env.js';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

let channel = null;

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Conectado a RabbitMQ');
    } catch (error) {
        console.error('Error conectando a RabbitMQ', error);
    }
};

export const getChannel = () => channel;

export const sendClientCreationMessage = async (clienteData) => {
    if (!channel) {
        console.error('Canal de RabbitMQ no disponible');
        return;
    }

    try {
        const queue = 'crear_cliente';
        const msg = JSON.stringify(clienteData);

        await channel.assertQueue(queue, {
            durable: true,
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    } catch (error) {
        console.error('Error al enviar el mensaje a RabbitMQ:', error);
    }
};
