import express from "express";
const router = express.Router();

import { createExpense, getAllExpenses, deleteExpense, updateExpense } from "../controllers/expense.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.post('/', authMiddleware, createExpense);
router.get('/', authMiddleware, getAllExpenses);
router.put('/:expenseId', authMiddleware, updateExpense);
router.delete('/:expenseId', authMiddleware, deleteExpense);


export default router;