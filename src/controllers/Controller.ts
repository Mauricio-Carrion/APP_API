import { Request, Response } from 'express';
import Config from '../config/Config'

export default class Controller {
  static getProduto: any;
  static putSaldoProduto: any;

  async getProduto(req: Request, res: Response): Promise<void> {
    let codigo = req.params.codigo
    let produto

    // produto = await Model.getProdutoFirebirdModel(codigo)

    // produto = await Model.getProdutoMysqlModel(codigo)
  }

  async putSaldoProduto(codigo: number, saldo: number): Promise<void> {

  }
}