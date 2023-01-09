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
const Config_1 = __importDefault(require("../config/Config"));
const config = new Config_1.default;
class Controller {
    getProduto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let codigo = req.params.codigo;
            try {
                let produtoResposta;
                if (config.db === "MySQL") {
                    // await produtoResposta = await Model.getProdutoFirebirdModel(codigo)
                    produtoResposta = 'Mysql';
                    return res.status(200).send(produtoResposta);
                }
                if (config.db === "Firebird") {
                    // await produtoResposta = await Model.getProdutoMysqlModel(codigo)
                    produtoResposta = 'Firebird';
                    return res.status(200).send(produtoResposta);
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
