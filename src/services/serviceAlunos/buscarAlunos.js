import { QueryTypes } from 'sequelize';

import clienteDB from '../../databases/clienteDB_sequelize.js';

class Buscaralunos {
    async buscarTodos() {
        const todos = await clienteDB.query(`
            SELECT * FROM public.alunos            
        `, {
            type: QueryTypes.SELECT
        })
        if (todos.length === 0) return;

        return todos;
    }

    async buscarPorId(aluno_id) {
        const alunos = await clienteDB.query(`
            SELECT * FROM public.alunos a
            WHERE a.aluno_id = $1
        `, {
            bind: [aluno_id],
            type: QueryTypes.SELECT
        })
        if (alunos.length === 0) return;

        return alunos[0];
    }

    async verificarEmailExistente(email) {
        const aluno = await clienteDB.query(`
            SELECT * FROM public.alunos
            WHERE aluno_email = $1
        `, {
            bind: [email],
            type: QueryTypes.SELECT
        });

        return aluno.length > 0;
    }

}

export default new Buscaralunos();
