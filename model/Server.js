//modelo del servidor

const express  = require("express");

const cors = require("cors");
const { dbConnections } = require("../database/db");


class Server {
  //constructor
  constructor() {
    this.app = express();
    this.port = 8080;

    // paths de rutas
    this.paths = {
      usuarios: "/api/users",
      digitaciones: "/api/digitacion",
      asesores: "/api/asesores",
    };

    this.middleware();
    this.conectarDD();
    //rutas de la aplicacion
     this.routes();
  
  }

  //para que escuche
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Backend corriendo en http://localhost:${this.port}`);
    });
  }

  async conectarDD() {
    await dbConnections();
  }
  //middlewares de mi app
  middleware() {
    // uso de cors
    this.app.use(cors());
    //lectura y pareson de json
    this.app.use(express.json());
    //acepta archiva desde peticiones rest es una configuracion
    // this.app.use(
    //   // fileUpload({
    //   //   useTempFiles: true,
    //   //   tempFileDir: "/tmp/",
    //   //   createParentPath: true, //mucho cuidado que esto crea carpeta donde sea
    //   // })
    // );
  }

  // //importar Rutas
  routes() {
    this.app.use(this.paths.usuarios, require("../routes/User"));
    this.app.use(this.paths.digitaciones, require("../routes/digitacion"));
    this.app.use(this.paths.asesores, require("../routes/Asesor"));
  }
}
//exportar
module.exports = Server;
