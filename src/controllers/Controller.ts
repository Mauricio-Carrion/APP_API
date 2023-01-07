import { Request, Response } from 'express';
import Config from '../config/Config'

const config = new Config
export default class Controller {
  static getProduto: any;
  static putSaldoProduto: any;

  private async getProduto(req: Request, res: Response): Promise<void> {
    let codigo = req.params.codigo

    try {
      let produtoResposta

      if (config.db === "Firebird") {
        // await produtoResposta = await Model.getProdutoFirebirdModel(codigo)
      } else {
        // await produtoResposta = await Model.getProdutoMysqlModel(codigo)
      }

      res.status(200).send(produtoResposta)
    } catch (error) {

      res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })

    }
  }

  private async putSaldoProduto(codigo: number, saldo: number): Promise<void> {

  }
}