export default () => ({
    database: {
        type: process.env.DATABASE_TYPE as 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT, // + converts to number
        username: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASSWORD,
        autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES), // Load entities without need especify // 1 === true
        synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE), // Syncronize with DB. This shoud not be used in production
    },
    environment: process.env.NODE_ENV || 'development',
})