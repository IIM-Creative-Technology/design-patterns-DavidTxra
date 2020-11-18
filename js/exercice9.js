let historical = []
let users = []
const moneyStart = 1000
const moneyPayment = 100

class Person {
    constructor(name, card, money) {
      this.name = name;
      this.card = card;
      this.money = money;
    }
};


document.querySelector('.bt-payment').addEventListener('click', function() {
    
    let validCard = document.getElementById("valid");
    let validMoney = document.getElementById("sum");
    let listHistorical = document.getElementById("historical");
    let card = document.getElementById("card").value;
    let name = document.getElementById("name").value;
    let tag = document.createElement("p");
    let user = new Person(name, card, moneyStart)
    
    users.push(user)

    if(user.money <= 0) {
        validCard.innerText = 'No money';
        validCard.style.color = 'red';
    }
    else {
        update(card)
        user.money -= moneyPayment
        validMoney.innerText = user.money
        historical.push(user)

        listHistorical.innerHTML = ""

        historical.forEach((element) => {

            let nameElement = element.name;
            let cardElement = element.card;
    
            listHistorical.innerHTML += "Nom : " + nameElement + " | Carte : " + cardElement + "<br/>"; 
          
        });
    }

})


function validateCreditCardNumber(cardNumber) {
	cardNumber = cardNumber.split(' ').join("");
	if (parseInt(cardNumber) <= 0 || (!/\d{15,16}(~\W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
		return false;
	}
	let carray = new Array();
	for (let i = 0; i < cardNumber.length; i++) {
		carray[carray.length] = cardNumber.charCodeAt(i) - 48;
	}
	carray.reverse();
	let sum = 0;
	for (let i = 0; i < carray.length; i++) {
		let tmp = carray[i];
		if ((i % 2) != 0) {
			tmp *= 2;
			if (tmp > 9) {
				tmp -= 9;
			}
		}
		sum += tmp;
	}
	return ((sum % 10) == 0);
}


function cardType(cardNumber) { 
	cardNumber = cardNumber.split(' ').join("");
    let o = {
        electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
        maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
        dankort: /^(5019)\d+$/,
        interpayment: /^(636)\d+$/,
        unionpay: /^(62|88)\d+$/,
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    }
    for(let k in o) {
        if(o[k].test(cardNumber)) {
            return k;
        }
    }
    return null;
}

function update(cardNumber) {
    let validCard = document.getElementById("valid");
    let validName = document.getElementById("name").value;

    if(validateCreditCardNumber(cardNumber) && validName != "") {
    
        validCard.innerText = 'Carte valide';
        validCard.style.color = 'green';    
    }
    else {
        validCard.innerText = 'Carte non valide';
        validCard.style.color = 'red';
    }
}
