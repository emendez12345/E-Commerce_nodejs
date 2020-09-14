const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const carts = require('../sample.json');

//console.log(carts);
router.get('/', (req, res) => {
  // res.send('carts');
  // console.log(carts);
  res.json(carts);
});

router.post('/', (req, res) => {
  const { created_at, updated_at, user, product } = req.body;
  if (created_at && updated_at && user && product) {
    const id = carts.length + 1;
    const newCart = { ...req.body, id };
    //En memoria
    // console.log(newCart);
    //Agregado//
    carts.push(newCart);
    res.json('saved');
  } else {
    //  res.send('wrong request');
    res.status(500).json({ error: 'There was an error' })
  }

  /*  console.log(req.body);
    res.send('received');*/

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  _.each(carts, (cart, i) => {
     
    if (cart.id == id) {
      carts.splice(i, 1);
    }
  });
  res.send(carts);

});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { created_at, updated_at, user, product } = req.body;
  if (created_at && updated_at && user && product) {
    _.each(carts, (cart, i) => {
      if (cart.id == id) {
        cart.created_at = created_at;
        cart.updated_at = updated_at;
        cart.user = user;
        cart.product = product;
      }
    });
    res.json(carts);
  } else {
    res.status(500).json({ error: 'There was an error' })
  }
});

module.exports = router;