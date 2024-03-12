import 'dotenv/config';
import Server from './server.js';

/**
 * Este é o arquivo executado pelo node.
 * Ele é responsável por criar uma nova instância da classe Server onde toda lógica do backend é envolvida.
 * Além disso também faz o import das configurações do dotenv, disponibilizando-o para toda a aplicação.
 */

const app = new Server();