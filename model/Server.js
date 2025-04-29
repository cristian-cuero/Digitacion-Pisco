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
      asesores: "/api/employee",
      directores: "/api/director",
      convenios: "/api/convenios",
      departamentos: "/api/department",
      empresas: "/api/empresas",
      planes: "/api/plan"
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
    this.app.use(this.paths.digitaciones, require("../routes/Digitacion"));
    this.app.use(this.paths.asesores, require("../routes/Asesor"));
    this.app.use(this.paths.directores, require("../routes/Director"));
    this.app.use(this.paths.convenios, require("../routes/Convenios"));
    this.app.use(this.paths.departamentos, require("../routes/Departamentos"));
    this.app.use(this.paths.empresas, require("../routes/Empresas"));
    this.app.use(this.paths.planes, require("../routes/Planes"));
  }
}
//exportar
module.exports = Server;
