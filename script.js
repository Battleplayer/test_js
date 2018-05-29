window.onload = login;

// LOGIN
var tries = 1;

function login() {
	var h1 = document.createElement('h1');
	h1.appendChild(document.createTextNode('GO AWAY'));

	var age = prompt('What is your age', '');
	if (age >= 18) {
		var popup = document.getElementById('popup');
		var popup_close = document.getElementById('popup_close');

		popup.style.display = 'block';
		popup_close.onclick = function () {
			popup.style.display = 'none';
			loader();
			document.body.appendChild(buildTable());
			tableSwap();
		};
		window.onclick = function (event) {
			if (event.target == popup) {
				popup.style.display = 'none';
				loader();
			}
		}
	}
	else {
		tries += 1;
		if (tries <= 2) {
			login()
		}
		else document.body.appendChild(h1);
	}
	console.log(new Date().toUTCString(), 'age=' + age);
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
	}, 300);
}

//TABLE

function buildTable() {
	var table = document.createElement('table');
	table.setAttribute('id', 'table');
	var table1 = [];

	var randomNum = function () {
		return Math.floor(Math.random() * i * 10)
	};
	for (var i = 1; i <= 4; i++) {
		var table2 = [];
		for (var j = 1; j <= 9; j++) {
			table2.push(randomNum());
		}
		table1.push(table2);
	}
	console.log(table1);
	table1.forEach(function (item) {
		var row = document.createElement('tr');
		item.forEach(function (item2) {
			var cell = document.createElement('td');
			cell.textContent = item2;
			row.appendChild(cell);
		});
		table.appendChild(row);
	});
	return table;
}
// ROTATE TABLE
function tableSwap() {
	var t = document.getElementById('table'),
		r = t.getElementsByTagName('tr'),
		cols = r.length, rows = r[0].getElementsByTagName('td').length,
		cell, next, tem, i = 0, tbod = document.createElement('table');
	while (i < rows) {
		cell = 0;
		tem = document.createElement('tr');
		while (cell < cols) {
			next = r[cell++].getElementsByTagName('td')[0];
			tem.appendChild(next);
		}
		tbod.appendChild(tem);
		++i;
	}
	t.parentNode.replaceChild(tbod, t);
}


// COUNT ON HOVER
function count() {
	document.getElementById('table').addEventListener('mouseover', function (event) {
		console.log(event)
	});
}

