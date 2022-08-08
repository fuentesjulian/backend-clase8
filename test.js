const ProductosApi = require("./api/productos.js");
const productosApi = new ProductosApi();

const prodObj = { nombre: "Julian", apellido: "Fuentes" };
const prodObj2 = { nombre: "Julian2", apellido: "Fuentes" };
productosApi.guardar(prodObj);
productosApi.guardar(prodObj);
productosApi.guardar(prodObj);
console.log("Listo todos");
console.log(productosApi.listarAll());
console.log("Listo 1");
console.log(productosApi.listar(1));
console.log("Borro 1");
productosApi.borrar(1);
console.log("Listo todos");
console.log(productosApi.listarAll());
productosApi.actualizar(prodObj2, 2);
console.log("Actualizo");
console.log(productosApi.listarAll());
