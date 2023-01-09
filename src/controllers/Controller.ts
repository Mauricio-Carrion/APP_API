import { Request, Response } from 'express';
import Config from '../config/Config'

const config = new Config
export default class Controller {

  async getProduto(req: Request, res: Response) {
    let codigo = req.params.codigo

    try {
      let produtoResposta

      if (config.db === "MySQL") {
        // await produtoResposta = await Model.getProdutoFirebirdQuery(codigo)
        produtoResposta = 'Mysql'

        return res.status(200).send(produtoResposta)
      }

      if (config.db === "Firebird") {
        // await produtoResposta = await Model.getProdutoMysqlQuery(codigo)

        produtoResposta = 'Firebird'

        return res.status(200).send(produtoResposta)
      }


    } catch (error) {

      res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })

    }
  }

  async putSaldoProduto(codigo: number, saldo: number) {

  }
}