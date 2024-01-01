const { createProduct, getProduct, deleteProduct } = require("../controller/ProductController");
const router = require("express").Router();

router.post('/create', createProduct);
router.get('/get-product', getProduct);
router.delete('/delete-product/:productId', deleteProduct)


module.exports = router;