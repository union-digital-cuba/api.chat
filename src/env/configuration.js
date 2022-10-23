import dotenv from 'dotenv'

// cargando las variables de entorno
dotenv.config()

// cargando puertos de configuracion
export const Configuration = {
  PORT: process.env.PORT || 4000,
  SERVER: process.env.SERVER || 'localhost',
  APPNAME: process.env.APPNAME || 'api.chat',
  FRONTHOST: process.env.FRONTHOST || 'http://localhost:3000',
  DB_SYNC: process.env.DB_SYNCHRONIZE || 'force',
}
