import express from "express";
import Controller from "./controllers/Controller";
import Middleware from "./middlewares/Middleware";

const controller = new Controller
const middleware = new Middleware

const router = express.Router()
//POST usuario

router.post('/usuario', controller.verificaUsuario)

//GET produto
router.get('/produto/:codigo', middleware.authentication, controller.getProduto)

//PUT(edita) Saldo Produto
router.put('/produto', middleware.authentication, controller.putSaldoProduto)

export default router