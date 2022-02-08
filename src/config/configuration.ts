export default () => ({
    database: process.env.DB_NAME,
    type: 'sqlite',
    synchronize: true,
})