import amqp from 'amqplib';
import '#Config/env.js';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const CREAR_USUARIO_QUEUE = 'crear_usuario';

let channel = null;

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue(CREAR_USUARIO_QUEUE, { durable: true });

        console.log('Conectado a RabbitMQ');
    } catch (error) {
        console.error('Error conectando a RabbitMQ', error);
    }
};

export const getChannel = () => channel;
