

function renderTablles(data) {
    
    const DOM = document.getElementById('content');
    let HTML = '';
    const DOMfooter = document.getElementById('footer');
    let HTMLfooter = '';
    const DOMsummary = document.querySelector('.value');
    let HTMLsummary = '';
    balanceArr = [];

    // sort account[i].month didejancia tvarka
    for (let i =0; i<account.length; i++) {
        for (let j=0; j<i; j++) {
            if (account[i].month < account[j].month) {
                var temp = account[i];
                account[i] = account[j];
                account[j] = temp;
            }
        }
    }
    // renderinam lenteles duomenis 
    for (let i=0; i<data.length; i++) {
        let dataSet = data[i]; // kiekviena karta issaugom array account [i] objecta i dataSet, kurio duomenis panaudojame generuoti html duomenis
        
        // patikriname ar dataSet esamas objectas turi reiksme income/expense. jei neturi pridedame 0.
        if ( Object.keys(dataSet).indexOf('income') === -1 ) {
            dataSet.income = 0;
        }
        if ( Object.keys(dataSet).indexOf('expense') === -1 ) {
            dataSet.expense = 0;
        }
        // skaiciavimus rasome loope, nes dataSet duomenys kiekviena karta keiciasi + skaiciavimus atliekame tik po to kai patikrinimo indexOf 'income ir expense'
        let balance = (dataSet.income - dataSet.expense); 
        balanceArr.push(balance);
        
        HTML += `<div class="table-row">\
        <div class="cell">${dataSet.month}</div>\
        <div class="cell">${months[dataSet.month - 1]}</div>\
        <div class="cell">${dataSet.income} Eur</div>\
        <div class="cell">${dataSet.expense} Eur</div>\
        <div class="cell">${balance} Eur</div>\
        </div>`
        DOM.innerHTML = HTML;         
    } 
    // suskaiciuojame income ir expense suma + balance
    let incomeSum = 0;
    let expenseSum = 0;
    for ( let i = 0; i<account.length; i++) {
        incomeSum += account[i].income;
        expenseSum += account[i].expense;
    }
    let balanceSum = (incomeSum - expenseSum);

    // generuojame HTMLfooter turini
    HTMLfooter += ` <div class="cell"></div>\
        <div class="cell"></div>\
        <div class="cell">${incomeSum} Eur</div>\
        <div class="cell">${expenseSum} Eur</div>\
        <div class="cell">${balanceSum} Eur</div>`

    DOMfooter.innerHTML = HTMLfooter;    

    //mėnuo, kai buvo mažiausiai uždirbta,bet ne lygu nuliui
    let balanceMin = balanceArr[0];
    let balanceMinPosition = 0;
    for (let i=1; i<balanceArr.length; i++) {
        if (balanceArr[i] < balanceMin) {
            balanceMin = balanceArr[i];
            balanceMinPosition = balanceArr.indexOf(balanceArr[i]);
        }
    } 
    document.getElementById('value').innerHTML = months[balanceMinPosition];
    
    //generuojame footer turini --
    //mėnuo, kai buvo daugiausiai uždirbta
    let balanceMax = balanceArr[0];
    let balanceMaxPosition = 0;
    for (let i=1; i<balanceArr.length; i++) {
        if (balanceArr[i] > balanceMax && balanceArr[i] > 0 ) {
            balanceMax = balanceArr[i];
            balanceMaxPosition = balanceArr.indexOf(balanceArr[i]);
        }
    } 
    document.getElementById('value2').innerHTML = months[balanceMaxPosition];

    //mėnuo, kai buvo mažiausiai išlaidos, bet ne lygios nuliui + surandame surasto skaiciaus pozicija ir generuojame html
    let expenseMin = account[0].expense;
    let expenseMinPosition = 0;
    for (let i=1; i<account.length; i++) {
        if (account[i].expense < expenseMin && account[i].expense > 0 ) {
            expenseMin = account[i].expense;
            expenseMinPosition = account.indexOf(account[i]);
        }
    } 
    document.getElementById('value3').innerHTML = months[expenseMinPosition];
    
    //mėnuo, kai buvo didžiausios išlaidos
    let expenseMax = account[0].expense;
    let expenseMaxPosition = 0;
    for (let i=1; i<account.length; i++) {
        if (account[i].expense > expenseMax ) {
            expenseMax = account[i].expense;
            expenseMaxPosition = account.indexOf(account[i]);
        }
    }    
    // DOMsummary.innerHTML = months[expenseMaxPosition];
    document.getElementById('value4').innerHTML = months[expenseMaxPosition];
}  

