/**
 * Controller da categoria.
 * Tem a função de tratar os dados recebidos da requisição
 * e tratar também a resposta retornada ao usuário.
 * Normalmente precisa chamar um serviço para cumprir seu objetivo total.
 */

import jwt from 'jsonwebtoken';

import sessaoService from "../services/SessaoService/index.js";
import { verificaSenha } from '../utils/verificarSenha.js';
import md5 from 'md5';



class SessaoController {
  async login(req, res) {
    try {
      const { usuario_email, usuario_senha } = req.body;

      const usuario = await sessaoService.procuraUsuario(usuario_email)
      if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });


      if (!(await verificaSenha(usuario_senha, usuario.usuario_senha)))
        return res.status(401).json({ message: 'E-mail ou senha incorretos.' })

      const {
        usuario_id,
        usuario_nome,
        usuario_nascimento,
        usuario_ativo,
      } = usuario

      console.log("AQUI E LOGIN", usuario)

      return res.status(200).json({
        usuario_id,
        usuario_nome,
        usuario_nascimento,
        usuario_ativo,
        token: jwt.sign({ usuario_id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        })
      })
    } catch (error) {
      console.log('Erro no controller de sessao login', error)
      return res.status(500).json('Erro interno ao tentar efetuar login.')
    }
  }


  async cadastrarUsuario(req, res) {
    try {
      const { usuario_nome, usuario_email, usuario_senha, usuario_nascimento } = req.body;

      // Verificar se o usuário já existe pelo e-mail
      const usuarioExistente = await sessaoService.procuraUsuario(usuario_email);
      if (usuarioExistente) {
        return res.status(400).json({ message: 'Usuário já cadastrado com este e-mail.' });
      }

      // Gerar o hash da senha
      const senhaHash = md5(usuario_senha); // Gere o hash MD5 da senha

      // Criar novo usuário
      const novoUsuario = await sessaoService.criarUsuario({
        usuario_nome,
        usuario_email,
        usuario_senha: senhaHash,
        usuario_nascimento,
        usuario_ativo: true // Definir o usuário como ativo por padrão
      });

      const {
        usuario_id,
        usuario_ativo
      } = novoUsuario;

      return res.status(201).json({
        usuario_id,
        usuario_ativo,
        message: 'Usuário cadastrado com sucesso.'
      });
    } catch (error) {
      console.log('Erro no controller de sessao cadastrarUsuario', error);
      return res.status(500).json('Erro interno ao tentar cadastrar usuário.');
    }
  }
}

export default new SessaoController();