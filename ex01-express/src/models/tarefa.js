// /src/models/tarefa.js
const getTarefaModel = (sequelize, { DataTypes }) => {
  const Tarefa = sequelize.define('tarefa', {
    // O objectId será a chave primária, gerada automaticamente.
    // O Sequelize por padrão cria um 'id' auto-incrementável que servirá para isso.
    // Vamos manter a definição simples e deixar o Sequelize trabalhar.
    descricao: {
      type: DataTypes.STRING,
      allowNull: false, // Obrigatória
      validate: {
        notEmpty: true, // Não pode ser uma string vazia
      },
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Padrão é 'false'
    },
  });

  return Tarefa;
};

export default getTarefaModel;