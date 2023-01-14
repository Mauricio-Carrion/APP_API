import { Request, Response, NextFunction } from "express";
import Config from "../config/Config";

const config = new Config
export default class Middleware {

  authentication(req: Request, res: Response, next: NextFunction) {
    let authUser = req.headers.user
    let authPassword = req.headers.password

    if (authUser !== config.userName && authPassword !== config.userPassword) {
      return res.status(402).send({ msg: 'Usuário e senha incorretos.' })
    }

    if (authUser !== config.userName) {
      return res.status(402).send({ msg: 'Usuário incorreto.' })
    }

    if (authPassword !== config.userPassword) {
      return res.status(402).send({ msg: 'Senha incorreta.' })
    }

    if (authUser === config.userName && authPassword === config.userPassword) {
      next()
    }

  }

}