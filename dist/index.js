"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const user_1 = __importDefault(require("./routes/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_1 = __importDefault(require("express"));
const server = new server_1.default();
// const mongoose = require("mongoose");
//configurar cors 
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//FileUpload
server.app.use((0, express_fileupload_1.default)());
//Directorio Publico
server.app.use(express_1.default.static('public'));
server.app.use(express_1.default.json({ limit: '50mb' }));
server.app.use(express_1.default.urlencoded({ limit: '50mb' }));
//rutas de mi aplicacion
server.app.use('/user', usuario_1.default);
server.app.use('/user1', user_1.default);
server.app.use('/admin', require('./routes/admin'));
server.app.use('/proyecto', require('./routes/proyecto'));
server.app.use('/personal', require('./routes/personal'));
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default
    .connect('mongodb+srv://developer:developer@cluster0.sqf1s.mongodb.net/gestion_app?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log('BD CONECTADAA');
//levantar express
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
