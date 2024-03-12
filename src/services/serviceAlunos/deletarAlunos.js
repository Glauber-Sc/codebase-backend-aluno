import { QueryTypes } from 'sequelize';

import clienteDB from '../../databases/clienteDB_sequelize.js';

class Deletaralunos {
    async deletar(aluno_id) {
        const [retornoDeletado] = await clienteDB.query(`
            DELETE FROM public.alunos a
            WHERE a.aluno_id = $1
            RETURNING *;        
        `, {
            bind: [aluno_id],
            type: QueryTypes.SELECT
        })
        if (retornoDeletado.length === 0) return;

        return retornoDeletado;
    }

    async buscar(aluno_id) {
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

}

export default new Deletaralunos();
