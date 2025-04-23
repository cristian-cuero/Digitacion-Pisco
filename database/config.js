const Firebird = require('node-firebird');

// Configuración de la conexión
const options = {
    host: '192.99.247.180',  // Cambia si tu Firebird está en otro servidor
    port: 3051,         // Puerto por defecto de Firebird
    database: 'C:\\Users\\Administrator\\Downloads\\FUNERARIASGAS.FDB',  // Ruta a tu base de datos
    user: 'SYSDBA',      // Usuario de Firebird
    password: 'masterkey',  // Contraseña
    lowercase_keys: true,  // Convierte claves a minúsculas en los resultados
    role: null,           // Si usas roles en Firebird, agrégalo aquí
    pageSize: 4096 ,       // Tamaño de página (puede variar según tu configuración)
};

// Crear un pool de conexiones para reutilizar conexiones abiertas
const pool = Firebird.pool(5, options);

module.exports = pool;
