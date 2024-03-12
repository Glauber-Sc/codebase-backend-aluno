import buscarAlunos from '../services/serviceAlunos/buscarAlunos.js';
import adicionarAlunos from '../services/serviceAlunos/adicionarAlunos.js';
import alterarAlunos from '../services/serviceAlunos/alterarAlunos.js';
import deletarAlunos from '../services/serviceAlunos/deletarAlunos.js';

class ControllerAlunos {
    async buscarTodos(req, res) {
        try {
            const todos = await buscarAlunos.buscarTodos();
            if (!todos) return res.status(404).json({
                message: "Alunos n�o encontrados"
            })

            return res.json(todos)
        } catch (error) {
            console.log('Erro no controller alunos buscar todos', error)
            return res.status(500).json({
                message: "Erro interno ao buscar todos alunos controller",
                error: error.message
            })
        }
    }

    async buscarPorId(req, res) {
        try {
            const { aluno_id } = req.params;

            const alunos = await buscarAlunos.buscarPorId(aluno_id);
            if (!alunos) return res.status(404).json({
                message: "Alunos n�o encontrado(a)"
            })

            return res.json(alunos)
        } catch (error) {
            console.log('Erro no controller alunos buscar', error)
            return res.status(500).json({
                message: "Erro interno ao buscar por id de alunos",
                error: error.message
            })
        }
    }

  
    async adicionarNovo(req, res) {
        try {
            const adicionarBody = req.body;

            const { aluno_email } = adicionarBody;

            // Verifica se o email já existe
            const emailExistente = await buscarAlunos.verificarEmailExistente(aluno_email);
            
            if (emailExistente) {
                throw new Error('Este email já está em uso.');
            }

            const retornoAdicionar = await adicionarAlunos.adicionar(adicionarBody);
            if (!retornoAdicionar) throw new Error('Não foi possível adicionar o aluno');

            return res.status(201).json(retornoAdicionar);
        } catch (error) {
            console.log('Erro no controller alunos adicionar', error);
            return res.status(500).json({
                message: 'Erro interno ao adicionar novo aluno.',
                error: error.message
            });
        }
    }


    async alterar(req, res) {
        try {

            const alterarBody = req.body;

            const retornoEdicao = await alterarAlunos.alterar(alterarBody);
            if (!retornoEdicao) throw new Error('N�o foi poss�vel adicionar o(a) alunos')

            return res.json(retornoEdicao)
        } catch (error) {
            console.log('Erro no controller alunos alterar', error)
            return res.status(500).json({
                message: 'Erro interno ao alterar alunos.',
                error: error.message
            })
        }
    }

    async deletar(req, res) {
        try {
            const { aluno_id } = req.params;

            const exclusaoRetorno = await deletarAlunos.deletar(aluno_id);
            if (!exclusaoRetorno) throw new Error('N�o foi poss�vel deletar o(a) alunos')

            return res.json(exclusaoRetorno)
        } catch (error) {
            console.log('Erro no controller alunos deletar', error)
            return res.status(500).json({
                message: 'Erro interno ao deletar alunos.',
                error: error.message
            })
        }
    }
}

export default new ControllerAlunos();
