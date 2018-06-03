window.onload = login;
// LOGIN
var tries = 1;
var table;
var age;

function login() {
	var h1 = document.createElement('h1');
	h1.appendChild(document.createTextNode('GO AWAY'));
	age = prompt('What is your age', '');
	if (age.match(/^[0-9]*$/) && age >= 18) {
		var popup = document.getElementById('popup');
		var popup_close = document.getElementById('popup_close');
		popup.style.display = 'block';
		popup_close.onclick = function () {
			work();
		};
		window.onclick = function (event) {
			if (event.target == popup) {
				work();
			}
		};
		function work() {
			popup.style.display = 'none';
			loader();
			document.body.appendChild(buildTable(4, 9, randomNum));
			table = document.getElementById('table');
			count();
			removeValue();
			logout();
			inputs();
			girls();
		}
	}
	else {
		tries += 1;
		if (tries <= 2) {
			login()
		}
		else document.body.appendChild(h1);
	}
}

//LOADER
function loader() {
	var preloader = document.getElementById('preloader');
	var load = document.getElementById('load');
	preloader.style.display = 'block';
	setTimeout(function () {
		load.className = 'remove';
	}, 1500);
	setTimeout(function () {
		preloader.style.display = 'none';
	}, 3000);
}

//TABLE
function buildTable(x, y, func1) {
	var table = document.createElement('table');
	table.setAttribute('id', 'table');
	var table1 = [];
	for (var i = 1; i <= y; i++) {
		table1.push([]);
		for (var j = 1; j <= x; j++) table1[i - 1].push(func1());
	}
	// console.log(table1);
	table1.forEach(function (item) {
		var row = document.createElement('tr');
		item.forEach(function (item2) {
			var cell = document.createElement('td');
			cell.textContent = item2;
			row.appendChild(cell);
		});
		table.appendChild(row);
	});
	table.querySelector('tr').children[0].dataset.op = 'multiply';
	table.querySelector('tr').children[1].dataset.op = 'share';
	table.querySelector('tr').children[2].dataset.op = 'subtract';
	table.querySelector('tr').children[3].dataset.op = 'add';
	return table;
}

var randomNum = function () {
	return Math.floor(Math.random() * 100);
};


// COUNT ON HOVER
function count() {
	table.ops = {
		multiply: opMultiply,
		share: opShare,
		subtract: opSubstract,
		add: opAdd
	};
	var firstRow = table.querySelectorAll('tr:first-child td');
	firstRow.forEach(function (td) {
		td.addEventListener('mouseover', function () {
			var tdHover = this;
			var cells = table.querySelectorAll('td');
			var colCount = table.querySelector('tr').children.length;
			var middle = Math.ceil(table.querySelectorAll('tr').length / 2);
			var firstIndex = indexElement(this);
			var middleIndex = (middle - 1) * colCount + firstIndex;
			var lastIndex = cells.length - colCount + firstIndex;

			cells.forEach(function (td, i) {
				td.dataset.value = td.innerText;
				if (i !== firstIndex && i !== middleIndex && i !== lastIndex) {
					td.innerText = table.ops[tdHover.dataset.op](+td.innerText);
				}
			});
		});
		td.addEventListener('mouseleave', function () {
			table.querySelectorAll('td').forEach(function (td) {
				td.innerText = td.dataset.value;
			})

		});
	});
	function opMultiply(n) {
		return n * n;
	}

	function opShare(n) {
		return n ? n / n : '0!';
	}

	function opSubstract(n) {
		return n - n;
	}

	function opAdd(n) {
		return n + n;
	}

	function indexElement(elem) {
		var n = 0;
		while (elem = elem.previousElementSibling) n++;
		return n;
	}
}

// REMOVE 25
function removeValue() {
	table.addEventListener('click', function (e) {
		if (e.target.tagName !== 'TD') return false;
		if (+e.target.innerText >= 25) e.target.innerText = 0;
	});
}

// INPUTS
function inputs() {
	var input = [];
	var buttons = [];
	var min, max;
	var inputArr = [];
	//inputs
	for (var i = 0; i < 2; i++) {
		input[i] = document.createElement("input");
		input[i].name = 'input_' + i;
		input[i].id = 'input_' + i;
		input[i].type = 'number';
		input[i].placeholder = 'Enter number here';
		document.body.appendChild(input[i]);
	}

	var button = document.createElement("button");
	button.id = 'submit';
	button.innerHTML = 'Submit numbers';
	document.body.appendChild(button);
	var span = document.createElement("span");
	document.body.appendChild(span);
	var p = document.createElement("p");
	p.setAttribute('id', 'array');
	p.innerHTML = "Waiting for numbers..";
	document.body.appendChild(p);

	//buttons
	for (var j = 1; j < 4; j++) {
		buttons[j] = document.createElement("button");
		buttons[j].id = 'button_' + j;
		var span1 = document.createElement("span");
		document.body.appendChild(span1);
		span1.appendChild(buttons[j]);
	}
	buttons[1].innerHTML = 'Arr to Key';
	buttons[2].innerHTML = 'Sort keys Z>A';
	buttons[3].innerHTML = 'Copy to clipboard';

	document.getElementById('submit').addEventListener('click', function () {
		document.querySelector('span').innerHTML = '';
		inputArr = [];
		var newObj;
		var inputFirst = parseInt(document.getElementById('input_0').value);
		var inputSecond = parseInt(document.getElementById('input_1').value);
		if (isNaN(inputFirst) || isNaN(inputSecond)) {
			alert('wrong numbers');
			return false
		}
		if (inputFirst === inputSecond) {
			document.querySelector('span').innerHTML = 'Content identical, it\'s won\'t work!';
			return false;
		}
		if (inputFirst > inputSecond) {
			min = inputSecond;
			max = inputFirst;
		}
		else {
			min = inputFirst;
			max = inputSecond;
		}

		getArr(min, max);

		// CLICK ON BUTTONS, B1
		document.getElementById('button_1').addEventListener('click', function () {
			function toObject(arr) {
				var arrObj = {};
				for (var i = 0; i < arr.length; i++)
					arrObj[String.fromCharCode(65 + i)] = arr[i];
				return arrObj;
			}

			newObj = toObject(inputArr);
			var elem = document.getElementById("object");
			if (elem) elem.parentElement.removeChild(elem);
			// DISPLAY OBJ
			var p = document.createElement("p");
			document.body.appendChild(p);
			p.setAttribute('id', 'object');
			document.getElementById('object').innerHTML = JSON.stringify(newObj);
			return newObj
		});
		//B 2
		document.getElementById('button_2').addEventListener('click', function () {
			var list = document.getElementsByClassName("newElm");
			for (var j = list.length - 1; 0 <= j; j--)
				if (list[j] && list[j].parentElement)
					list[j].parentElement.removeChild(list[j]);
			for (var i = 0; i < 2; i++) {
				var p = [];
				p[i] = document.createElement("p");
				p[i].setAttribute('class', 'newElm');
				document.body.appendChild(p[i]);
			}
			var sA = inputArr.sort(function (a, b) {
				return a - b;
			});
			var sortedArr = sA.reverse();
			var newElm = document.querySelectorAll('.newElm');
			newElm[0].innerHTML = "reversed arr=" + sortedArr;
			newElm[1].innerHTML = "reversed obj=" + JSON.stringify(reverseObject(newObj));
		});
		// B3
		document.getElementById('button_3').addEventListener('click', function (event) {
			var word = '';
			for (key in newObj) {
				word = word + key;
			}
			copyToClipboard(word.toString());
		});

		function getArr(min, max) {
			inputArr = [];
			for (var i = 0; i < 5; i++) {
				inputArr[i] = (Math.floor(Math.random() * (max - min + 1) + min));
			}
			document.querySelector('p').innerHTML = inputArr;
			return inputArr
		}

		function reverseObject(object) {
			var newObject = {};
			var keys = [];
			for (var key in object) {
				keys.push(key);
			}
			for (var i = keys.length - 1; i >= 0; i--) {
				var value = object[keys[i]];
				newObject[keys[i]] = value;
			}
			return newObject;
		}

		// COPY FUNCTION
		function copyToClipboard(text) {
			var textarea = document.createElement("textarea");
			textarea.textContent = text;
			textarea.style.position = "fixed";
			document.body.appendChild(textarea);
			textarea.select();
			try {
				return document.execCommand("copy");
			} catch (ex) {
				console.warn("Copy to clipboard failed.", ex);
				return false;
			} finally {
				document.body.removeChild(textarea);
			}
		}
	})
}

function girls() {
	var select = document.createElement("select");
	document.body.appendChild(select);
	var selector = document.querySelector('select');
	selector.addEventListener("change", pickGirl);
	var option = [];
	var keys = [];
	for (var g in girlsObj) keys.push(g);
	for (var i = 0; i < 3; i++) {
		option[i] = document.createElement("option");
		option[i].innerHTML = Object.values(girlsObj)[i].name;
		option[i].value = keys[i];
		select.appendChild(option[i]);
	}
	// LIST of assoc	
	var selected = 'girl1';
	var p = document.createElement("p");
	p.id = 'lengthGirl';
	p.innerText = girlsObj[selected].name + ' association length=' + girlsObj[selected].association.length;
	document.body.appendChild(p);
	//INPUT for enter
	var input = document.createElement("input");
	input.name = 'girls';
	input.id = 'inputGirl';
	input.placeholder = 'Enter girl association';
	document.body.appendChild(input);
	var button = document.createElement("button");
	button.id = 'pushGirl';
	button.innerHTML = 'Save association';
	document.body.appendChild(button);
	var lengthGirl = document.getElementById('lengthGirl');
	// ONCHANGE func
	function pickGirl() {
		selected = selector.options[selector.selectedIndex].value;
		lengthGirl.innerHTML = girlsObj[selected].name + ' association length=' + girlsObj[selected].association.length;
		return selected
	}
	document.getElementById('pushGirl').addEventListener('click', function () {
		girlsObj[selected].association.push(document.getElementById('inputGirl').value);
		lengthGirl.innerHTML = girlsObj[selected].name + ' association length=' + girlsObj[selected].association.length;
	})
}

var girlsObj = {
	girl1: {name: "Kate", association: ["clever", "beautiful"]},
	girl2: {name: "Masha", association: ["smart"]},
	girl3: {name: "Darina", association: ["adorable", "funny", "clever"]}
};

// LOGOUT
function logout() {
	var button = document.createElement("button");
	button.id = 'logout';
	button.innerHTML = 'logout';
	document.body.appendChild(button);
	document.getElementById('logout').addEventListener('click', function () {
		var number = prompt('Enter the number', '');
		if (number.match(/^[0-9]*$/)) {
			document.getElementById('log').style.display = 'block';
			console.log('number=' + number + ' ' + 'date=' + new Date(new Date().getTime()), ' age=' + age);
		}
	})
}