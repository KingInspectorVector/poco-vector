class Password {

	constructor(passwordField, password) {
		this.password = "";
		this.passwordField = passwordField;
		this.lastPasswordLenght = 0;
		this.wrongSymbols = [];
		this.lastSymbolOld = "";
	}

	validationByLength() {
		const minimalPasswordLengthField = document.getElementById("minimalPasswordLength");

		if (this.password.length < 8) {
			minimalPasswordLengthField.style.color = "red";
		} else {
			minimalPasswordLengthField.style.color = "green";
		}
	}

	validationByUppercase() {
		const uppercaseRequirementField = document.getElementById("uppercaseRequirement");

		if (/[A-Z]/.test(this.password)) {
			uppercaseRequirementField.style.color = "green";
		} else {
			uppercaseRequirementField.style.color = "red";
		}
	}

	validationByLowercase() {
		const lowercaseRequirementField = document.getElementById("lowercaseRequirement");

		if (/[a-z]/.test(this.password)) {
			lowercaseRequirementField.style.color = "green";
		} else {
			lowercaseRequirementField.style.color = "red";
		}
	}

	validationByNumbers() {
		const numbersRequirementField = document.getElementById("numbersRequirement");

		if (/[1-9]/.test(this.password)) {
			numbersRequirementField.style.color = "green";
		} else {
			numbersRequirementField.style.color = "red";
		}
	}

	validationBySymbols() {
		const symbolsRequirementField = document.getElementById("symbolsRequirement");

		if (/[-!@#$%^&*()+=;:,./?|`~{}_]/.test(this.password)) {
			symbolsRequirementField.style.color = "green";
		} else {
			symbolsRequirementField.style.color = "red";
		}
	}

	validationForNotRequirementSymbols() {
		const notRequirementField = document.getElementById("notRequirement");

		if (/((?=[\W_])[^-!@#$%^&*()+=;:,./?|`~{}_]|^$)/g.test(this.password)) {
			this.wrongSymbols = [];
			this.password.split('').forEach(element => {
				// текущий элемент не обязательный?
				if (/((?=[\W_])[^-!@#$%^&*()+=;:,./?|`~{}_]|^$)/g.test(element) && !(this.wrongSymbols.includes(element))) {
					this.wrongSymbols.push(element);
				}
				let wanningText = "";
				this.wrongSymbols.forEach(function (symbol) {
					wanningText += " " + symbol + ",";
				});
				wanningText = `This symbols usually not aceptable by password fields:` + wanningText;
				wanningText = wanningText.slice(0, -1);
				notRequirementField.textContent = wanningText;
				notRequirementField.style.color = "red";
				//да добавить в массив
				// собрать строку
				// вывести строку
			});
			/*notRequirementField.style.color = "red";
			if (this.lastPasswordLenght < this.password.length) {
				if (/((?=[\W_])[^!@#$%^&*()-+=;:,./?|`~{}_]|^$)/g.test(this.password[this.password.length - 1]) && !(this.wrongSymbols.includes(this.password[this.password.length - 1]))) {
					this.wrongSymbols.push(this.password[this.password.length - 1]);
					let wanningText = "";
					this.wrongSymbols.forEach(function(symbol) {
						wanningText += " " + symbol + ",";
					});
					wanningText = `This symbols usually not aceptable by password fields:` + wanningText;
					wanningText = wanningText.slice(0, -1);
					notRequirementField.textContent = wanningText;
					// отображение
				}
			} else {
				//let regexpByArr = `/${this.wrongSymbols}/`;
				//let regexpBySymbol = `/[${this.lastSymbolOld}]/`;
				if (this.wrongSymbols.includes(this.lastSymbolOld) && !(this.password.includes(this.lastSymbolOld))) {
					// удалить символ из массива
					console.log("Success");
				}
			}*/
			// если 
		} else {
			notRequirementField.textContent = "Doesn't contain rest of the symbols";
			notRequirementField.style.color = "green";
			// вывести позитивную строку
			// если массив побочных спец символов не 0, то очистить массив и отрисовать стандартный текст
		}
	}

	passwordValidation() {
		this.validationByLength();
		this.validationByUppercase();
		this.validationByLowercase();
		this.validationByNumbers();
		this.validationBySymbols();
		this.validationForNotRequirementSymbols();
	}

	passwordGenerating() {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-!@#$%^&*()+=;:,./?|`~{}_';
		const characterArray = new Uint8Array(12);
		window.crypto.getRandomValues(characterArray);
		let result = '';
		characterArray.forEach(value => {
			result += characters[value % characters.length];
		});
		console.log(result);
		return result;
	}
}


function main() {

	const pass = new Password(document.getElementById("passwordField"));
	const passwordWrotenByUserField = document.getElementById("passwordWrotenByUser");
	const generateButton = document.getElementById("generateButton");
	const copyButton = document.getElementById("copyButton");
	const toast = document.getElementById("toast");

	/* doesn't work
	function passwordFieldHandler () {

		pass.password = passwordField.value;
		passwordWrotenByUserField.textContent = "You type: " + pass.password;
		pass.passwordValidation();
		pass.lastPasswordLenght = pass.password.length;
		pass.lastSymbolOld = pass.password[pass.password.length - 1];
	}*/

	// take password which is typed pass by user
	passwordField.addEventListener("input", function () {

		pass.password = passwordField.value;
		passwordWrotenByUserField.textContent = "You type: " + pass.password;
		pass.passwordValidation();
		pass.lastPasswordLenght = pass.password.length;
		pass.lastSymbolOld = pass.password[pass.password.length - 1];
	});

	copyButton.addEventListener("click", function () {
		navigator.clipboard.writeText(pass.password).then(function () {
			console.log("Success");
			toast.textContent = "Copied succesfully";
			toast.style.display = "block";
			setTimeout(() => {
				toast.style.display = "none";
			}, 3000);
		}, function (err) {
			console.error('Произошла ошибка при копировании текста: ', err);
		})
	});

	generateButton.addEventListener("click", function () {
		pass.passwordField.value = pass.passwordGenerating();
		//pass.passwordValidation();
	});
};

main();

// requirements:
// • min-lenght
// • letters
// • uppercase letters
// • numbers
// • charackters
// • only latin symbols

/* patterns that I tried
	const mailru = "/[!@#$%^&*()-_+=;:,./?\|`~{}]/";
	const all = "/[\W_]/g";
	const exceptions = "/[\W_&&[^\!@#$%^&*()-_+=;:,./?\|`~{}]]/g";
	const unknown = "/[^\w\s]/"
*/