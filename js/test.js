const itemDescription = document.querySelector('#description')
const itemAmount = document.querySelector('#amount')
const addButton = document.querySelector('.btn-add')
const select = document.querySelector('#selection')
const option = document.querySelectorAll('option')
const incomeBox = document.querySelector('.income-box');
const incomeData = document.querySelector('.income-data')
const expenseData = document.querySelector('.expense-data')
const sectionBalance = document.querySelector('.section-balance');

const accountBalance = {
    name: 'Koray',
    lastName: 'Dündar',
    incomes: [
        {
            description: 'salary',
            amount: 2000,
            time: displayDateTime()
        }, {
            description: 'Bonus',
            amount: 500,
            time: displayDateTime()
        }
    ],
    expenses: [
        {
            description: 'rent',
            amount: 7000,
            time: displayDateTime()
        },
        {
            description: 'food',
            amount: 500,
            time: displayDateTime()
        }
    ], addIncome: function (description, amount) {

        let time = displayDateTime();

        this.incomes.push({ description, amount, time });


        let json = localStorage.getItem('incomes');
        const retreivedFromLocal = JSON.parse(json);
        retreivedFromLocal.push({ description, amount, time });
        localStorage.setItem('incomes', JSON.stringify(retreivedFromLocal), undefined, 2)
        console.log(retreivedFromLocal);

    },
    addExpense: function (description, amount) {
        let time = displayDateTime();
        this.expenses.push({ description, amount, time });

        let json = localStorage.getItem('expenses');
        const retreivedFromLocal = JSON.parse(json);
        retreivedFromLocal.push({ description, amount, time });
        localStorage.setItem('expenses', JSON.stringify(retreivedFromLocal), undefined, 2);
    },
    totalIncome: function () {
        let sum = 0;
        this.incomes.forEach(element => {
            sum = sum + element.amount;

        });
        return sum;
    },
    totalExpense: function () {
        let sum = 0;
        this.expenses.forEach(element => {
            sum = sum + element.amount;

        });
        return sum;
    },
    calculateBalance: function () {
        let balance = this.totalIncome() - this.totalExpense();
        return balance;
    },

    getIncomeData: function () {
        let dataIncome = JSON.parse(localStorage.getItem('incomes'));
        let result;
        incomeData.innerHTML = '';

        result = dataIncome.forEach(data => {
            incomeData.innerHTML += `<div class="incomes"><p>${data.description}</p><br>
                <p>${data.amount}</p><br><p>${data.time}</p><br></div>`;
        })

        return result;

    },
    getExpenseData: function () {

        let dataExpense = JSON.parse(localStorage.getItem('expenses'));


        expenseData.innerHTML = '';

        let result = dataExpense.forEach(data => {
            expenseData.innerHTML += `<div class="incomes"><p>${data.description}</p><br>
                <p>${data.amount}</p><br><p>${data.time}</p><br></div>`;
        })

        return result;

    }
}

// localStorage.setItem('incomes', JSON.stringify(accountBalance.incomes, undefined, 2));
// localStorage.setItem('expenses', JSON.stringify(accountBalance.expenses, undefined, 2));



addButton.addEventListener('click', function () {

    let selectedValue = select.options[select.selectedIndex].value;

    if (selectedValue === 'income') {
        accountBalance.addIncome(itemDescription.value, parseInt(itemAmount.value));

    } else if (selectedValue === 'expense') {
        accountBalance.addExpense(itemDescription.value, parseInt(itemAmount.value));
    } else {
        console.log('Please select an option');
    }

    accountBalance.calculateBalance();
    accountBalance.getIncomeData();
    accountBalance.getExpenseData();
})


function displayDateTime() {
    var myDate = new Date();

    var dd = myDate.getDate();
    var mm = myDate.getMonth() + 1;
    var yyyy = myDate.getFullYear();
    var hrs = myDate.getHours();
    var min = myDate.getMinutes();

    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm;
    }

    var setDate = `${dd}/${mm}/${yyyy} ${hrs}:${min} `;

    return setDate;
}
accountBalance.getIncomeData();
accountBalance.getExpenseData(); 