import { Eureka } from 'eureka-js-client';
import '#Config/env.js';

const client = new Eureka({
    instance: {
        app: 'ms-usuarios',
        instanceId: 'ms-usuarios:' + process.env.HOSTNAME, // Utilizar el nombre del host del contenedor para el instanceId
        hostName: process.env.HOSTNAME, // Utilizar el nombre del host del contenedor para el hostName
        ipAddr: '127.0.0.1', // Dirección IP de la instancia
        port: {
            $: process.env.PORT || 8080, // Puerto configurado, 8080 por defecto
            '@enabled': 'true',
        },
        vipAddress: 'ms-usuarios', // Dirección VIP de tu servicio
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true, // Registrar esta instancia en Eureka
        fetchRegistry: true, // Obtener el registro de Eureka
    },
    eureka: {
        host: 'eureka-server', // Nombre del host del servidor Eureka
        port: 8761, // Puerto del servidor Eureka
        servicePath: '/eureka/apps/', // Ruta para acceder al servicio Eureka
    },
});

export default client;
