"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const Model_1 = __importDefault(require("../models/Model"));
const config = new config_1.default;
const model = new Model_1.default;
class Controller {
    getProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let codigo = req.params.codigo;
            try {
                let produtoResposta;
                if (config.db === "MySQL") {
                    produtoResposta = yield model.getProdutoMysqlQuery(codigo);
                    if (produtoResposta) {
                        return res.status(200).send(produtoResposta);
                    }
                    else {
                        return res.status(404).send({ msg: "Produto não encontrado!" });
                    }
                }
                if (config.db === "Firebird") {
                    produtoResposta = yield model.getProdutoFirebirdQuery(codigo);
                    if (produtoResposta) {
                        return res.status(200).send(produtoResposta);
                    }
                    else {
                        return res.status(404).send({ msg: "Produto não encontrado!" });
                    }
                }
            }
            catch (error) {
                res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' });
            }
        });
    }
    putSaldoProduto(codigo, saldo) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = Controller;
