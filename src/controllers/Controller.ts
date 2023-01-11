import { Request, Response } from 'express';
import Config from '../config/Config'
import Model from '../models/Model';

const config = new Config
const model = new Model
export default class Controller {

  async getProduto(req: Request, res: Response) {
    let codigo = req.params.codigo

    try {
      let produtoResposta

      if (!config.db) {
        return res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })
      }

      if (config.db === "MySQL" && config.dbName) {

        produtoResposta = await model.getProdutoMysqlQuery(codigo)

        if (produtoResposta) {

          return res.status(200).send(produtoResposta)

        } else {

          return res.status(404).send({ msg: "Produto não encontrado!" })

        }
      }

      if (config.db === "Firebird") {

        produtoResposta = await model.getProdutoFirebirdQuery(codigo)

        if (produtoResposta) {

          return res.status(200).send(produtoResposta)

        } else {

          return res.status(404).send({ msg: "Produto não encontrado!" })

        }
      }

      return res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })

    } catch (error) {

      res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })

    }
  }

  async putSaldoProduto(req: Request, res: Response) {
    let codigo = req.body.codigo
    let saldo = req.body.saldo
  }
}