module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    testTimeout: 30000,
    moduleNameMapper: {
        '^#Schemas/(.*)$': '<rootDir>/src/schemas/$1',
    },
    transformIgnorePatterns: ['node_modules/(?!(chai|chai-http|jose)/)'],
};
