import sequelize from "./Database";
import { DataTypes, Model } from "sequelize";

export default class Entrega extends Model {
    static associate(models) {
        Entrega.belongsTo(models.Pedido, {
            foreignKey: 'pedido_id',
            as: 'pedido'
        })
    }
}

Entrega.init({
    pedido_id :{
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true
    },
    codigo_rastreio:{
        type: DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    endereco :{
        type: DataTypes.STRING,
        allowNull : false
    }
},sequelize,
{
    tableName : 'entregas',
    timestamps : true, // criar os campos deleteAt e updatedAt
    paranoid : true
})