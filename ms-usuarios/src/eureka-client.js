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
        vipAddress: 'ms-usuarios',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true, // Registrar esta instancia en Eureka
        fetchRegistry: true, // Obtener el registro de Eureka
    },
    eureka: {
        host: 'eureka-server',
        port: 8761,
        servicePath: '/eureka/apps/',
    },
});

export default client;
