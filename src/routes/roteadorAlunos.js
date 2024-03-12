import { Router } from 'express';
import controllerAlunos from '../controllers/controllerAlunos.js';

const roteadorAlunos = Router();

roteadorAlunos.get('/buscarTodos', controllerAlunos.buscarTodos);

roteadorAlunos.get('/buscar/:aluno_id', controllerAlunos.buscarPorId);

roteadorAlunos.post('/adicionar', controllerAlunos.adicionarNovo);

roteadorAlunos.put('/alterar/:aluno_id', controllerAlunos.alterar);

roteadorAlunos.delete('/deletar/:aluno_id', controllerAlunos.deletar);

export default roteadorAlunos;
