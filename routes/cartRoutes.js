const express = require('express');
const { addToCartDoors, getDoorsCartItems, getDoorsCartById, deleteDoorsCartItem, updateCartQuantity } = require('../controllers/cartController');

// const upload = require('../middleware/upload');

const router = express.Router();

// Add to cart doors route
router.post("/doors/add-cart", addToCartDoors);
router.get("/doors/all-carts", getDoorsCartItems);
router.get("/doors/cart-details/:id", getDoorsCartById);
router.delete("/doors/cart-delete/:id", deleteDoorsCartItem);
router.patch('/doors/cart-quantity/:id', updateCartQuantity); 

module.exports = router;
