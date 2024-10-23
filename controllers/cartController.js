const Cart = require("../models/cartModel");
const doorsModel = require("../models/doorsModel");

const addToCartDoors = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const sessionId = req.sessionID || req.body.sessionId;

    if (!productId || !quantity) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Product ID and quantity are required",
      });
    }
    // Verify that the product exists
    const product = await doorsModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "Product not found",
      });
    }
    // Check if the item is already in the cart
    let cartItem = await Cart.findOne({ productId, sessionId });
    if (cartItem) {
      // If product is already in the cart, update quantity
      cartItem.quantity += quantity;
    } else {
      // If not in cart, create a new entry
      cartItem = new Cart({
        productId,
        quantity,
        sessionId,
      });
    }
    await cartItem.save();
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Product added to cart successfully",
      data: cartItem,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Internal error..!",
      error: error.message,
    });
  }
};

const getDoorsCartItems = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const query = sessionId ? { sessionId } : {};
    const carts = await Cart.find(query);

    if (carts.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "No items in cart",
      });
    }
    res.status(200).json({
      statusCode: 200,
      status: "success",
      data: carts,
    });
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Error fetching carts",
      error: error.message,
    });
  }
};

const getDoorsCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "Cart Item not found.",
      });
    }
    res.status(200).json({
      statusCode: 200,
      status: "success",
      data: cartItem,
    });
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Error fetching cart item",
      error: error.message,
    });
  }
};

const deleteDoorsCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Error deleting cart item",
      error: error.message,
    });
  }
};

const updateCartQuantity = async (req, res) => {
    try {
      const { id } = req.params; 
      const { quantity, action } = req.body;
      const cartItem = await Cart.findById(id);
      console.log(cartItem);
      if (!cartItem) {
        return res.status(404).json({
          statusCode: 404,
          status: "error",
          message: "Cart item not found",
        });
      }
      if (action === 'increase' && quantity) {
        cartItem.quantity += quantity;
      } else if (action === 'decrease' && quantity) {
        if (cartItem.quantity - quantity < 0) {
          return res.status(400).json({
            statusCode: 400,
            status: "error",
            message: "Quantity cannot be negative",
          });
        }
        cartItem.quantity -= quantity;
      } else if (quantity) {
        cartItem.quantity = quantity; 
      } else {
        return res.status(400).json({
          statusCode: 400,
          status: "error",
          message: "Invalid input. Please provide quantity and action or just quantity.",
        });
      }
      await cartItem.save(); 
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Cart item quantity updated successfully",
        data: cartItem,
      });
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      res.status(500).json({
        statusCode: 500,
        status: "error",
        message: "Error updating cart quantity",
        error: error.message,
      });
    }
  };
  

module.exports = {
  addToCartDoors,
  getDoorsCartItems,
  getDoorsCartById,
  deleteDoorsCartItem,
  updateCartQuantity
};
