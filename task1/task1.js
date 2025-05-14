let expenses = [];

function addExpense() {
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (category && amount) {
        expenses.push({ category, amount });
        updateExpensesList();
        clearForm();
    } else {
        alert('Please fill in both category and amount!');
    }
}

function clearForm() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesList();
}

function updateExpensesList() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>
                <button onclick="deleteExpense(${index})" class="btn-delete">Delete</button>
            </td>
        `;
        expensesList.appendChild(row);
    });
}

function calculateExpenses() {
    if (expenses.length === 0) {
        alert('Please add some expenses first!');
        return;
    }

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const averageDaily = total / 30;

    const top3 = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    document.getElementById('totalExpenses').textContent = 
        `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    document.getElementById('averageExpense').textContent = 
        `$${averageDaily.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = top3
        .map(expense => `<li>${expense.category}: $${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>`)
        .join('');
}

function addSampleData() {
    const sampleExpenses = [
        { category: 'Groceries', amount: 15000 },
        { category: 'Rent', amount: 40000 },
        { category: 'Transportation', amount: 5000 },
        { category: 'Entertainment', amount: 10000 },
        { category: 'Communication', amount: 2000 },
        { category: 'Gym', amount: 3000 }
    ];
    
    expenses = sampleExpenses;
    updateExpensesList();
}
