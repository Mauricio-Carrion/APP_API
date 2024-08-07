import { Request, Response } from 'express';
import Config from '../config/Config'
import Model from '../models/Model';

const config = new Config
const model = new Model
export default class Controller {

  verificaUsuario(req: Request, res: Response) {
    if (req.headers.usuario == config.userName && req.headers.senha == config.userPassword) {
      res.status(200).send({ msg: 'Usuário e senha corretos' })
    } else {
      res.status(401).send({ msg: 'Usuário ou senha incorretos.' })
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
    let empresa = req.body.empresa
    let codigo = req.body.codigo
    let produto = req.body.produto
    let saldo = req.body.saldo
    let saldoAnterior = req.body.saldoAnterior

    if (!empresa) {
      return res.status(402).send({ msg: 'Empresa é obrigatório' })
    }

    if (!codigo) {
      return res.status(402).send({ msg: 'Código é obrigatório' })
    }

    if (!produto) {
      return res.status(402).send({ msg: 'Produto é obrigatório' })
    }

    if (!saldo) {
      return res.status(402).send({ msg: 'Saldo é obrigatório' })
    }

    if (!saldoAnterior) {
      return res.status(402).send({ msg: 'Saldo anterior é obrigatório' })
    }

    if (!config.db) {
      return res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde!' })
    }

    try {
      let produtoSaldo: any

      if (config.db === "MySQL") {

        produtoSaldo = await model.putSaldoProdutoMysqlQuery(empresa, codigo, produto, saldo, saldoAnterior)

        return res.status(200).send({ msg: 'Saldo alterado com sucesso!' })
      }

      if (config.db === "Firebird") {

        produtoSaldo = await model.putSaldoProdutoFirebirdQuery(empresa, codigo, produto, saldo, saldoAnterior)

        return res.status(200).send({ msg: 'Saldo alterado com sucesso!' })

      }

    } catch (error) {

      console.error(error);


      res.status(502).send({ msg: 'Ocorreu um erro no servidor, tente mais tarde! deu ruim' })

    }
  }
}
