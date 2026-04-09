import { Model, DataTypes } from 'sequelize';
import sequelize from "./Database.js";

export default class Categoria extends Model {

    static associate (models){
        Categoria.hasMany(models.Produto,{
            foreignKey: 'categoriaId',
            as : 'produtos'
        })
    }

}

Categoria.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O nome não pode ser vazio' }
        }
    }
  },
  {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    paranoid: true,    // ativa soft delete
    timestamps: true
  }
);