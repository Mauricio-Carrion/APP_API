import { Request, Response } from 'express';
import Config from '../config/config'
import Model from '../models/Model';

const config = new Config
const model = new Model
export default class Controller {

  async getProduto(req: Request, res: Response) {
    let codigo = req.params.codigo

    try {
      let produtoResposta

      if (config.db === "MySQL") {

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

    } catch (error) {

      res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })

    }
  }

  async putSaldoProduto(codigo: string, saldo: string) {

  }
}