const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Protegemos las rutas con el middleware de JWT que haremos después
// Por ahora, para probar la DB, puedes quitar 'authMiddleware' si quieres probar sin login
router.post('/', authMiddleware, productController.createProduct);
router.get('/', authMiddleware, productController.getProducts);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;