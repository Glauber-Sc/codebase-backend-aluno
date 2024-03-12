import { QueryTypes } from 'sequelize';

import clienteDB from '../../databases/clienteDB_sequelize.js';

class Adicionaralunos {
    async adicionar(adicionarBody) {
        const {
            aluno_matricula,
			aluno_curso,
			aluno_horario,
			aluno_idade,
			aluno_nome,
			aluno_email,
			aluno_data_nascimento,
        } = adicionarBody;

        const retornoAdicionar = await clienteDB.query(`
            INSERT INTO public.alunos (aluno_matricula, aluno_curso, aluno_horario, aluno_idade, aluno_nome, aluno_email, aluno_data_nascimento)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `, {
            bind: [aluno_matricula, aluno_curso, aluno_horario, aluno_idade, aluno_nome, aluno_email, aluno_data_nascimento],
            type: QueryTypes.SELECT,
        })
        if (retornoAdicionar.length === 0) return;

        return retornoAdicionar[0]
    }
        
}

export default new Adicionaralunos();
