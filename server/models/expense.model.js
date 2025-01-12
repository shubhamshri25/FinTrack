
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Please provide the amount'],
        min: [0, 'Amount must be greater than or equal to 0'],
    },

    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: {
            values: ['Food', 'Transport', 'Entertainment', 'Bills', 'Health', 'Other'],
            message: '{VALUE} is not a valid category',
        },
    },

    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true,
        maxLength: [200, 'Description cannot exceed 200 characters']
    },
    date: {
        type: Date,
        required: [true, 'Please provide a date'],
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Expense must belong to a user']
    }
}, {
    timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;




