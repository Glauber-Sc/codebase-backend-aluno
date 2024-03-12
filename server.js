/**
 * Classe que centraliza toda a lógica do backend.
 * Responsável pela inicialização do servidor express e pela sua configuração inicial.
 */

import express from 'express';
import cors from 'cors';

import roteadorGeral from './src/routes/roteadorGeral.js';

class Server {
  // Na função construtora da classe são chamadas todas as configurações e o servidor roda na porta especificada no .env
  constructor() {
    console.log('Variáveis de ambiente ' + process.env.AMBIENTE)
    this.server = express();
    this.configServer();
    this.configRotas();

    this.server.listen(process.env.PORT_SERVIDOR, () => {
      console.log(`Servidor iniciado na porta ${process.env.PORT_SERVIDOR}`)
    });
  }

  // Aqui são especificadas as preferências do servidor express.
  configServer() {
    this.server.use(express.json({ limit: '1mb' }));
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(cors())
  }

  // Aqui é configurado o roteador geral da aplicação, o qual envolve todas as outras rotas.
  configRotas() {
    this.server.use(roteadorGeral)
  }
}

export default Server;