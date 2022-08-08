const express = require("express");
const { Router } = express;

const ProductosApi = require("./api/productos.js");
const productosApi = new ProductosApi();

// creo el router
const productosRouter = new Router();

productosRouter.use(express.json());
productosRouter.use(express.urlencoded({ extended: true }));

// si no define el id, obtiene todos los items con el metodo listarAll de la api
productosRouter.get("/", (req, res) => {
  res.send(productosApi.listarAll());
});

// toma el id en la ruta desde params y corre el metodo listar de la api
// el api checkea que el id existe, si no existe devuelve error
productosRouter.get("/:id", (req, res) => {
  res.send(productosApi.listar(parseInt(req.params.id)));
});

// con el post agrega un producto
productosRouter.post("/", (req, res) => {
  const id = productosApi.guardar(req.body);
  res.send(productosApi.listar(id));
});

// con el put modifica un producto existente (el api checkea que exista, si no existe devuelve error)
productosRouter.put("/:id", (req, res) => {
  // obtengo el id
  const { id } = req.params;
  // corro el comando para actualizar
  productosApi.actualizar(req.body, id);
  // utilizo el listar
  res.send(productosApi.listar(id));
});

// el comando delete toma el id de los parametros del request y elimina el item con dicho id
productosRouter.delete("/:id", (req, res) => {
  const msg = productosApi.borrar(parseInt(req.params.id));
  res.send(msg);
});


// creo el server
const app = express();
app.use(express.static("public"));
app.use("/api/productos", productosRouter);

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

// msg de error del servidor
server.on("error", (error) => console.log(`Error en servidor ${error}`));
