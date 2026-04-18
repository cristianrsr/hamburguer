# Hamburgueria API - Copilot Instructions

## Project Overview
A Node.js/Express REST API for managing a burger restaurant with order, delivery, product, category, and rating management systems.

**Tech Stack**: Express.js 5.2 | Sequelize 6.37 | MySQL2 | Sequelize-CLI

## Architecture Overview

### Layered MVC Pattern
- **Models** (`/models`): Sequelize ORM definitions with associations
- **Controllers** (`/controllers`): Request handlers with business logic
- **Routes** (`/routes`): HTTP endpoint definitions
- **Migrations** (`/migrations`): Database schema versioning

### Core Concepts

**Associations Pattern**: All models define relationships via `static associate(models)`:
- `Categoria` → `hasMany` → `Produto` (as: 'produtos')
- `Pedido` → `hasOne` → `Entrega` (as: 'entrega')
- `Pedido` → `hasMany` → `Avaliacao` (as: 'avaliacoes')
- `Produto` → `belongsTo` → `Categoria` (as: 'categoria')
- `Avaliacao` → `belongsTo` → `Pedido` (as: 'pedido')

**Soft Deletes**: All models use `paranoid: true` for soft delete with `deletedAt` timestamp. Use `{paranoid: false}` in queries to include deleted records.

**Eager Loading**: Controllers use `include` for eager loading related records to prevent N+1 queries:
```javascript
Pedido.findAll({
  include: [
    { model: Entrega, as: 'entrega' },
    { model: Avaliacao, as: 'avaliacoes' }
  ]
})
```

## Key Files & Patterns

### Models
- **Avaliacao.js**: Rating (nota 1-5) with foreign key to Pedido
- **Pedido.js**: Order with mesa (table), nome_cliente, and relationships
- **Entrega.js**: Delivery with codigo_rastreio and endereco
- **Produto.js**: Product with categoriaId foreign key
- **Categoria.js**: Category container for Produtos

### Controllers
- Use `try-catch` for error handling with 500 status codes
- Missing resource returns 404
- Creation returns 201 with eager-loaded relations
- Update operations return refreshed data with `findByPk(...include)`

### Routing Convention
- POST / → Create
- GET / → FindAll (with eager loading)
- GET /:id → FindById
- PUT /:id → Update
- DELETE /:id → Destroy
- PUT /restaure/:id → Restore (soft delete recovery)
- GET /pedido/:pedido_id → Custom queries (Avaliacao only)

## Critical Workflows

### Adding a New Model-Controller-Route
1. Create model in `/models` with `static associate()` definition
2. Update `models/index.js` to import and register model
3. Update related models' `associate()` methods to define relationships
4. Create migration matching Sequelize model schema (use ON CASCADE for FKs)
5. Create controller with eager loading `include` in all find operations
6. Create routes file in `/routes`
7. Register route in `app.js`

### Running Migrations
```bash
npx sequelize-cli db:migrate         # Apply pending migrations
npx sequelize-cli db:migrate:undo    # Rollback last migration
```

### Modifying Controllers for Eager Loading
- Always include `include` array in `findAll()` and `findByPk()` calls
- After update operations, re-fetch with eager loading before returning
- Example: `Categoria.findByPk(id, { include: { model: Produto, as: 'produtos' } })`

## Avaliacao (Rating) System
- **Foreign Key**: `pedido_id` (CASCADE delete/update)
- **Nota**: Integer 1-5 with validation
- **Optional**: `comentario` (TEXT field)
- **Routes**: POST /avaliacao, GET /avaliacao, GET /avaliacao/:id, PUT /avaliacao/:id, DELETE /avaliacao/:id
- **Special Route**: GET /avaliacao/pedido/:pedido_id (find by order)

## Important Constraints
- Entrega uses `pedido_id` as both foreign key AND primary key (one delivery per order)
- Produto.id lacks explicit `autoIncrement: true` in definition - ensure migration handles it
- All responses use lowercase status property for errors: `{ error: 'message' }` OR `{ erro: 'message' }` (Produto uses 'erro')
- Timestamps: createdAt, updatedAt, deletedAt for paranoid soft deletes

## API Endpoints Summary
- `/categoria` - CRUD + restore
- `/pedido` - Create, FindAll (with Entrega + Avaliacoes)
- `/entrega` - CRUD
- `/produto` - CRUD
- `/avaliacao` - CRUD + FindByPedido + Restore
