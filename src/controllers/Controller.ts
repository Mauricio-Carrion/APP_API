import { Request, Response } from 'express';
import Config from '../config/Config'
import Model from '../models/Model';

const config = new Config
const model = new Model
export default class Controller {

  private async existeProduto(codigo: string): Promise<any> {

    let existe

    try {

      if (config.db === "MySQL" && config.dbName) {
        existe = await model.existeProdutoMysqlQuery(codigo)
      }

      if (config.db === "Firebird") {
        existe = await model.existeProdutoFirebirdQuery(codigo)
      }

      existe ? true : false

    } catch (error) {

      console.log(error)

    }
  }

  async getProduto(req: Request, res: Response) {
    let codigo = req.params.codigo

    try {
      let produtoResposta: any

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

        return res.status(200).send(produtoResposta)
      }

      return res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })

    } catch (error) {

      res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })

    }
  }

  async putSaldoProduto(req: Request, res: Response) {
    let codigo = req.body.codigo
    let saldo = req.body.saldo

    if (!codigo) {
      return res.status(402).send({ msg: 'Código é obrigatório' })
    }

    if (!saldo) {
      return res.status(402).send({ msg: 'Saldo é obrigatório' })
    }

    if (!config.db || !config.dbName) {
      return res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })
    }

    if (!(await this.existeProduto(codigo))) {
      return res.status(502).send({ msg: 'Produto não encontrado!' })
    }

    try {
      let produtoSaldo: any

      if (config.db === "MySQL") {

        produtoSaldo = await model.putSaldoProdutoMysqlQuery(codigo, saldo)

        return res.status(200).send(produtoSaldo)
      }

      if (config.db === "Firebird") {

        produtoSaldo = await model.putSaldoProdutoMysqlQuery(codigo, saldo)

        return res.status(200).send(produtoSaldo)

      }

    } catch (error) {

      res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })

    }
  }
}