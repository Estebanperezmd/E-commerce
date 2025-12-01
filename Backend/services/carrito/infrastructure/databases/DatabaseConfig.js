
const databaseConfig = {
  type: "postgres",
  host: process.env.DB_HOST || "hopper.proxy.rlwy.net",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 22340,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "MTZZMkPnvJCbpPMdAcVNXLtwddTHlXMo",
  database: process.env.DB_NAME || "railway",
  entities: [],          
  synchronize: false,    
};

module.exports = databaseConfig;
