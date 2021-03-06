require('dotenv').config();

module.exports = {
        "type": "mysql",
        "host": process.env.TYPEORM_HOST,
        "port": process.env.TYPEORM_PORT,
        "username": process.env.TYPEORM_USERNAME,
        "password": process.env.TYPEORM_PASSWORD,
        "database": process.env.TYPEORM_DATABASE,
        "entities": ["src/entity/*.ts"],
        "synchronize": process.env.TYPEORM_SYNCHRONIZE,
};
