/**
 * Roteador específico da categoria "login".
 * Define qual o método da rota chamada e chama a função responsável no controller da categoria.
 */

import { Router } from "express";

import sessaoController from "../controllers/sessaoController.js";

const roteadorSessao = new Router();

roteadorSessao.post('/login', sessaoController.login)
roteadorSessao.post('/cadastrar', sessaoController.cadastrarUsuario)



export default roteadorSessao;