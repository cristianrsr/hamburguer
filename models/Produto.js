import { Model, DataTypes } from "sequelize";
import sequelize from "./Database.js";

export default class Produto extends Model {
  static associate(models) {
    Produto.belongsTo(models.Categoria, {
      foreignKey: 'categoriaId',
      as: 'categoria'
    });
  }
}
Produto.init({
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 }
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  categoriaId: { type: DataTypes.INTEGER }
}, {
  sequelize,
  modelName: 'Produto',
  tableName: 'produtos',
  paranoid: true,
  timestamps: true
});