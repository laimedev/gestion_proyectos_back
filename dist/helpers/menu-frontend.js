"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuFrontEnd = void 0;
const getMenuFrontEnd = (role = '0') => {
    const menu = [
        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Inicio', url: '/' },
            ]
        },
        {
            titulo: 'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: []
        },
    ];
    // ROLE 2 = ADMIN
    if (role === '2') {
        menu[1].submenu.unshift({ titulo: 'Administración', url: 'usuarios' });
        menu[1].submenu.unshift({ titulo: 'Usuarios APP', url: 'usuariosapp' });
        menu[1].submenu.unshift({ titulo: 'Categorias', url: 'categorias' });
        menu[1].submenu.unshift({ titulo: 'Productos', url: 'productos' });
        menu[1].submenu.unshift({ titulo: 'Pedidos', url: 'pedidos' });
        menu[1].submenu.unshift({ titulo: 'Zonas', url: 'zonas' });
        menu[1].submenu.unshift({ titulo: 'Vehiculos', url: 'vehiculos' });
    }
    // ROLE 0  = MONITOREO
    if (role === '0') {
        menu[1].submenu.unshift({ titulo: 'Usuarios APP', url: 'usuariosapp' });
        menu[1].submenu.unshift({ titulo: 'Ubicaciones', url: 'ubicaciones' });
    }
    return menu;
};
exports.getMenuFrontEnd = getMenuFrontEnd;
module.exports = {
    getMenuFrontEnd: exports.getMenuFrontEnd
};
