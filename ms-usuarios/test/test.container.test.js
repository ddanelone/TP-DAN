import { GenericContainer } from 'testcontainers';
import { Sequelize } from 'sequelize';
import { execSync } from 'child_process';

let container;
let sequelize;

beforeAll(async () => {
    container = await new GenericContainer('postgres')
        .withEnv('POSTGRES_USER', 'test')
        .withEnv('POSTGRES_PASSWORD', 'test')
        .withEnv('POSTGRES_DB', 'test')
        .withExposedPorts(5432)
        .start();

    const port = container.getMappedPort(5432);
    const host = container.getHost();

    sequelize = new Sequelize('test', 'test', 'test', {
        host,
        port,
        dialect: 'postgres',
    });

    await sequelize.authenticate();

    execSync(`npx sequelize-cli db:migrate`, {
        env: {
            ...process.env,
            DB_HOST: host,
            DB_PORT: port,
            DB_USERNAME: 'test',
            DB_PASSWORD: 'test',
            DB_NAME: 'test',
        },
    });
});

afterAll(async () => {
    await sequelize.close();
    await container.stop();
});
