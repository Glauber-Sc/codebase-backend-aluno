/**
 * Arquivo de serviço da categoria "login" dedicado a busca de informações no banco.
 * Sua função principal é retornar informações úteis para o login de volta para o controller.
 */

import { QueryTypes } from "sequelize";

import clienteDB_aluno from "../../databases/clienteDB_sequelize.js";

class SessaoService {
  async procuraUsuario(usuario_email) {
    try {
      const [usuario] = await clienteDB_aluno.query(
        `
        SELECT * FROM public.usuarios u
        WHERE u.usuario_email = $1
      `,
        {
          bind: [usuario_email],
          type: QueryTypes.SELECT,
        }
      );

      return usuario;
    } catch (error) {
      console.log("Erro no serviço de sessáo procura usuario", error);
      return null;
    }
  }

    async criarUsuario(usuarioData) {
    try {
      const novoUsuario = await clienteDB_aluno.query(`
        INSERT INTO public.usuarios
        (usuario_nome, usuario_email, usuario_senha, usuario_nascimento, usuario_ativo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `, {
        bind: [
          usuarioData.usuario_nome,
          usuarioData.usuario_email,
          usuarioData.usuario_senha,
          usuarioData.usuario_nascimento,
          usuarioData.usuario_ativo
        ],
        type: QueryTypes.INSERT
      });

      return novoUsuario[0]; // Retorna o novo usuário criado
    } catch (error) {
      console.log('Erro no serviço de sessão criar usuário', error);
      return null;
    }
  }
}

export default new SessaoService();
