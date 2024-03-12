/**
 * Roteador geral do backend
 * Engloba toda as rotas a serem utilizadas definindo um padrão "/(categoria)"
 * Faz a chamada do middleware para autenticação da requisição
 * e caso seja aceita direciona para o roteador especifico da categoria.
 */

import { Router } from "express";

import autenticarUsuario from '../middlewares/autenticarUsuario.js';


import roteadorSessao from './roteadorSessao.js';

import roteadorAlunos from "./roteadorAlunos.js";

const router = new Router();

// O roteador de sessão não utiliza a autenticação, pois somente a partir dele o usuário recebe o token.
router.use('/user', roteadorSessao);

router.use('/alunos', autenticarUsuario, roteadorAlunos);

export default router;