import  Categoria  from './Categoria.js';
import Produto from './Produto.js';
import Pedido from './Pedido.js';
import Entrega from './Entrega.js';
import Avaliacao from './Avaliacao.js';

const models = [Categoria, Produto, Pedido, Entrega, Avaliacao];

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});