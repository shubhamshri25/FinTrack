// import User from "../models/user.model.js";
import Expense from "../models/expense.model.js";

export const createExpense = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;
        const userId = req.user.id; // Extract user ID from JWT payload or session 

        if (!amount || !category || !description || !date) {
            return res.status(400).json({ message: "ALL fields are required" })
        }

        const expense = new Expense({
            amount,
            category,
            description,
            date,
            user: userId,
        });

        await expense.save();
        res.status(201).json({ message: 'Expense created successfully', expense });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// get all expenses 
export const getAllExpenses = async (req, res) => {
    try {
        const userId = req.user.id;

        const expenses = await Expense.find({ user: userId }).sort({ date: -1 }); // Sort by most recent
        res.status(200).json({ message: "Expenses retrieved successfully", expenses });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// edit an expense 
export const updateExpense = async (req, res) => {
    try {
        const { expenseId } = req.params; // Expense ID from request params
        const { amount, category, description, date } = req.body;
        const userId = req.user.id;

        const expense = await Expense.findOne({ _id: expenseId, user: userId });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        // Update the expense fields
        if (amount) expense.amount = amount;
        if (category) expense.category = category;
        if (description) expense.description = description;
        if (date) expense.date = date;

        await expense.save();
        res.status(200).json({ message: "Expense updated successfully", expense });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// delete an expense 
export const deleteExpense = async (req, res) => {
    try {
        const { expenseId } = req.params; // Expense ID from request params
        const userId = req.user.id; // Extract user ID from JWT payload or session

        const expense = await Expense.findOneAndDelete({ _id: expenseId, user: userId });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
