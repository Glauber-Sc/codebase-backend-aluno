/**
 * Middleware que realiza a autenticação do token recebido (ou não) da requisição.
 * Tem as seguintes funções:
 *  - Verificar a existência do token.
 *  - Caso exista, verificar a autenticidade desse token.
 *  - Caso seja autêntico, configura o ID do usuário no corpo da requisição
 *    que pode (e vai) ser utilizado nas lógicas de controllers, e em seguida,
 *    passa para o próximo passo da rota.
 */

import jsonwebtoken from "jsonwebtoken";
import { QueryTypes } from "sequelize";
import clienteDB_aluno from "../databases/clienteDB_sequelize.js";

function autenticarUsuario(req, res, next) {
  const authHeaders = req.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  jsonwebtoken.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    try {
      if (err) return res.status(500).json({ message: 'Falha na autenticação do token' })

      const [usuario] = await clienteDB_aluno.query(`
        SELECT * FROM public.usuarios u
        WHERE u.usuario_id = $1
      `, {
        bind: [decoded.usuario_id],
        type: QueryTypes.SELECT
      })

      if (!usuario.usuario_ativo)
        return res.status(401).json({ message: 'Usuário inativo' })


      req.usuario_id = decoded.usuario_id

      next();
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Erro interno ao consultar autenticação'
      })
    }
  })
}

export default autenticarUsuario;