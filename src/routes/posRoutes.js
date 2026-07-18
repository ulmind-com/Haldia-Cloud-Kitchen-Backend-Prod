const express = require('express');
const router = express.Router();
const { protect, staff } = require('../middleware/authMiddleware');
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getTables,
    createTable,
    updateTable,
    deleteTable,
    updateTableStatus,
} = require('../controllers/tableController');

// All POS routes require an authenticated staff member (Admin or Manager).
router.use(protect, staff);

// ── Table sections ──
router.route('/table-categories')
    .get(getCategories)
    .post(createCategory);
router.route('/table-categories/:id')
    .put(updateCategory)
    .delete(deleteCategory);

// ── Tables ──
router.route('/tables')
    .get(getTables)
    .post(createTable);
router.route('/tables/:id')
    .put(updateTable)
    .delete(deleteTable);
router.put('/tables/:id/status', updateTableStatus);

module.exports = router;
