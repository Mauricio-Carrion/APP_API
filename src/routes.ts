import express from "express";
import Controller from "./controllers/Controller";

const controller = new Controller

const router = express.Router()

//GET produto
router.get('/produto', controller.getProduto)

//PUT(edita) Saldo Produto
//router.put('/produto', controller.putSaldoProduto)

export default router