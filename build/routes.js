"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = __importDefault(require("./controllers/Controller"));
const controller = new Controller_1.default;
const router = express_1.default.Router();
//GET produto
router.get('/produto', controller.getProduto);
//PUT(edita) Saldo Produto
//router.put('/produto', controller.putSaldoProduto)
exports.default = router;
