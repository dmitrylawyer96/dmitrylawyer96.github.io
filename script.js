const date1Input = document.getElementById("date1");
		const date2Input = document.getElementById("date2");
		const presetInput = document.getElementById("preset");
		const resultsTable = document.getElementById("resultsTable");

		let results = JSON.parse(localStorage.getItem("results")) || [];
		

		date1Input.addEventListener("input", function() {
			const date1 = new Date(date1Input.value);
			const minDate2 = new Date(date1);
			minDate2.setDate(minDate2.getDate() + 1);
			date2Input.min = minDate2.toISOString().slice(0, 10);

			if (date2Input.value < date1Input.value) {
				date2Input.value = date1Input.value;
			}
		});
		date2Input.addEventListener("input", function() {
			const date1 = new Date(date1Input.value);
			const date2 = new Date(date2Input.value);

			if (date2 < date1) {
				date2Input.value = date1Input.value;
			}
		});

		// Функція для додавання результату до масиву та збереження його в localStorage

		function addResultToStorage(result) {
			results.push(result);
			if (results.length > 10) {
			results.shift();
			}
			localStorage.setItem("results", JSON.stringify(results));
			renderResultsTable()
		}

			// Функція для розрахунку різниці між датами
		function calculateDifference(date1, date2, preset) {
			const timeDifference = date2.getTime() - date1.getTime();
			let result;
			switch(preset) {
				case "week":
					result = timeDifference / (1000 * 60 * 60 * 24 * 7);
					break;
				case "month":
					result = timeDifference / (1000 * 60 * 60 * 24 * 30);
					break;
				default:
					result = timeDifference / (1000 * 60 * 60 * 24);
			}
			// return result.toFixed(2);
			return result;
		}

		// Функція для відображення результату в HTML
		function displayResult(result) {
			const resultElement = document.getElementById("result");
			resultElement.innerText = `Результат: ${result} дн.`;
		}

		// Функція для оновлення таблиці результатів
		function renderResultsTable() {
			const tbody = resultsTable.querySelector("tbody");
			tbody.innerHTML = "";
			results.forEach((result) => {
				const tr = document.createElement("tr");
				const td1 = document.createElement("td");
				td1.innerText = result.date1.toDateString();
				const td2 = document.createElement("td");
				td2.innerText = result.date2.toDateString();
				const td3 = document.createElement("td");
				td3.innerText = result.result;
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tbody.appendChild(tr);
			});
		}

		// Функція для розрахунку та відображення результату
		function calculate() {
			const date1 = new Date(date1Input.value);
			const date2 = new Date(date2Input.value);
			const preset = presetInput.value;
			const result = calculateDifference(date1, date2, preset);
			displayResult(result);
			addResultToStorage({
				date1: date1,
				date2: date2,
				result: result,
			});
			renderResultsTable();
		}

		// Відображення таблиці при завантаженні сторінки
		 renderResultsTable();