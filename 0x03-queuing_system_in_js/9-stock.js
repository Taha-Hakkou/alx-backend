#!/usr/bin/node
//
import express from 'express';
import redis from 'redis';
import util from 'util';

const listProducts = [
  {'Id': 1, 'name': 'Suitcase 250', 'price': 50, 'stock': 4},
  {'Id': 2, 'name': 'Suitcase 450', 'price': 100, 'stock': 10},
  {'Id': 3, 'name': 'Suitcase 650', 'price': 350, 'stock': 2},
  {'Id': 4, 'name': 'Suitcase 1050', 'price': 550, 'stock': 5}
];

const getItemById = (id) => {
  return listProducts.find((product) => product.Id === id);
}

//*************************************************************//

const client = redis.createClient();
const getAsync = util.promisify(client.get).bind(client);

const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock);
}

const getCurrentReservedStockById = async (itemId) => {
  const value = await getAsync(`item.${itemId}`);
  return value;
}

//*************************************************************//

const app = express();
const PORT = 1245;

app.get('/list_products', (req, res) => {
  res.json(listProducts.map((product) => ({
    'itemId': product.Id,
    'itemName': product.name,
    'price': product.price,
    'initialAvailableQuantity': product.stock
  })));
});

app.get('/list_products/:itemId', (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = getItemById(itemId);
  if (item === undefined) {
    res.json({'status':'Product not found'});
  } else {
    res.json({
      'itemId': itemId,
      'itemName': item.name,
      'price': item.price,
      'initialAvailableQuantity': item.stock,
      'currentQuantity': getCurrentReservedStockById(itemId)
    });
  }
});

app.get('/reserve_product/:itemId', (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = getItemById(itemId);
  if (item === undefined) {
    res.json({'status': 'Product not found'});
  } else {
    const currentStock = getCurrentReservedStockById(itemId);
    if (currentStock < 1) {
      res.json({
        'status': 'Not enough stock available',
        'itemId': itemId
      });
    } else {
      reserveStockById(itemId, currentStock - 1);
      res.jsno({
        'status': 'Reservation confirmed',
        'itemId': itemId
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
