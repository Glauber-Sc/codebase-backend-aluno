import { Sequelize } from "sequelize";

// Processo de configuração do banco de dados utilizando uma nova instância do Sequelize.
const clienteDB_aluno = new Sequelize(
  process.env.DB_ALUNO_NAME,
  process.env.DB_ALUNO_USER,
  process.env.DB_ALUNO_LOGIN,
  {
    host: process.env.DB_ALUNO_HOST,
    port: Number(process.env.DB_ALUNO_PORT),
    dialect: 'postgres',
    // A configuração abaixo não roda em bancos localhost
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // }
  }
)

// Tenta conectar com o banco configurado.
clienteDB_aluno.authenticate()
  .then(() => {
    console.log(`Conectado ao banco ${process.env.DB_ALUNO_NAME}`)
  })
  .catch((error) => {
    console.log(`Erro ao conectar com ${process.env.DB_ALUNO_NAME}`, error)
  })

export default clienteDB_aluno;