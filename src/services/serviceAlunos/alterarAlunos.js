import { QueryTypes } from 'sequelize';

import clienteDB from '../../databases/clienteDB_sequelize.js';

class Alteraralunos {
    async alterar(atualizarBody) {
        const {
            aluno_id,
			aluno_matricula,
			aluno_curso,
			aluno_horario,
			aluno_idade,
			aluno_nome,
			aluno_email,
			aluno_data_nascimento,
        } = atualizarBody;

        const [retornoAtualizar] = await clienteDB.query(`
            UPDATE public.alunos
            SET aluno_matricula = $2, aluno_curso = $3, aluno_horario = $4, aluno_idade = $5, aluno_nome = $6, aluno_email = $7, aluno_data_nascimento = $8
            WHERE aluno_id = $1
            RETURNING *
        `, {
            bind: [aluno_id, aluno_matricula, aluno_curso, aluno_horario, aluno_idade, aluno_nome, aluno_email, aluno_data_nascimento],
            type: QueryTypes.SELECT,
        })

        return retornoAtualizar;
    }
        
}

export default new Alteraralunos();
