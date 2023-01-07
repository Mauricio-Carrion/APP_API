import express from "express";
import Controller from "./controllers/Controller";

const router = express.Router()

//GET produto
router.get('/produto', Controller.getProduto())

//PUT(edita) Saldo Produto
router.put('/produto', Controller.putSaldoProduto())