const express = require('express');
const { createSpotlightDealsProduct, allSpotlightDealsProduct, spotlightDealsProductById } = require('../controllers/spotlightDealsControllers');
const { createProduct, allProducts, prductById, } = require('../controllers/ourProductController');
const { createBlog, allBlogs, blogById, } = require('../controllers/blogsController');
const { createFeedback, allCustomerFeedback, customerFeedbackById, } = require('../controllers/feedbackController');
const { createRequest, allRequestEstimation, deleteRequestEstitmation } = require('../controllers/requestEstController');
const { createDoors, updateDoors, allDoorsProduct, doosProductById, deleteDoorsProduct } = require('../controllers/doorsProductController');

// add to cart of doors
// const { addToCart } = require('../controllers/cartController');

const upload = require('../middleware/upload');

const router = express.Router();

router.post('/create-spotlight', upload.single('image'), createSpotlightDealsProduct);
router.get('/all-deals', allSpotlightDealsProduct);
router.get('/spotlight-deals/:id', spotlightDealsProductById);

// product 
router.post('/create-product', upload.single('image'), createProduct);
router.get('/all-product', allProducts);
router.get('/product/:id', prductById);

// blogs route
router.post('/create-blog', upload.single('image'), createBlog);
router.get('/all-blogs', allBlogs);
router.get('/blog/:id', blogById);

// customer feedback route
router.post('/create-feedback', upload.single('image'), createFeedback);
router.get('/all-feedback', allCustomerFeedback);
router.get('/customer-feekback/:id', customerFeedbackById);

// Request Estimation route
router.post('/create-request', createRequest);
router.get('/all-request', allRequestEstimation);
router.delete('/delete-request-estimation/:id', deleteRequestEstitmation);

// Doors Product route
router.put("/doors/update-doors/:id", upload.array('image'), updateDoors);
router.get("/doors/all-doors", allDoorsProduct);
router.get("/doors/doors-details/:id", doosProductById);
router.delete("/doors/delete-doors/:id", deleteDoorsProduct);

// Add to cart doors route
// router.post("/doors/cart/add", addToCart);

module.exports = router;
