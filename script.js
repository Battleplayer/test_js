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
      document.body.appendChild(buildTable(4, 9, randomNum));
      count();
    };
    window.onclick = function (event) {
      if (event.target == popup) {
        popup.style.display = 'none';
        loader();
        document.body.appendChild(buildTable(4, 9, randomNum));
        // tableSwap();
        count();
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
function buildTable(x, y, func1) {
  var table = document.createElement('table');
  table.setAttribute('id', 'table');
  var table1 = [];
  for (var i = 1; i <= y; i++) {
    var table2 = [];
    for (var j = 1; j <= x; j++) {
      table2.push(func1());
    }
    table1.push(table2);
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
  return table;
}

var randomNum = function () {
  return Math.floor(Math.random() * 10)
};


// COUNT ON HOVER
function count() {
  var table = document.getElementById('table');
  table.addEventListener('mouseover', function (target) {
    var t_row = target.path[1].rowIndex;
    // var t_cell = target.target.cellIndex; use in feature
    var cell = document.getElementsByTagName("td");
    var cell_new = [];
    var multiply = function () {
      for (var i = 0; i < 36; i++) {
        (i > 3 && i !== 16 && i !== 17 && i !== 18 && i !== 19 && i < 32) ?
          cell_new[i] = cell[i].innerText * cell[i].innerText : cell_new[i] = cell[i].innerText
      }
      return cell_new
    };
    var share = function () {
      for (var i = 0; i < 36; i++) {
        (i > 3 && i !== 16 && i !== 17 && i !== 18 && i !== 19 && i < 32) ?
          (cell_new[i] = cell[i].innerText / cell[i].innerText) : cell_new[i] = cell[i].innerText
      }
      return cell_new
    };
    var subtract = function () {
      for (var i = 0; i < 36; i++) {
        (i > 3 && i !== 16 && i !== 17 && i !== 18 && i !== 19 && i < 32) ?
          (cell_new[i] = cell[i].innerText - cell[i].innerText) : cell_new[i] = cell[i].innerText
      }
      return cell_new
    };
    var add = function () {
      for (var i = 0; i < 36; i++) {
        (i > 3 && i !== 16 && i !== 17 && i !== 18 && i !== 19 && i < 32) ?
          (cell_new[i] = parseInt(cell[i].innerText) + parseInt(cell[i].innerText)) : cell_new[i] = cell[i].innerText
      }
      return cell_new
    };
    var one =
      // function () {
      multiply().map(function (item) {
        return item;
      });
    // };
    if (document.querySelectorAll('table').length >2) document.body.removeChild(document.querySelectorAll('table')[1]);
    if (t_row === 0) {
      switch (target.target.cellIndex) {

        case 0:
          document.body.appendChild(buildTable(4, 9, multiply()));
          // document.body.appendChild(buildTable(4, 9, one(multiply())));
          break;
        case 1:
          document.body.appendChild(buildTable(4, 9, share));
          break;
        case 2:
          document.body.appendChild(buildTable(4, 9, subtract));
          break;
        case 3:
          document.body.appendChild(buildTable(4, 9, add));
          break;
      }
      return cell_new;
    }
  });
}


// ROTATE TABLE
// function tableSwap() {
//   var t = document.getElementById('table'),
//     r = t.getElementsByTagName('tr'),
//     cols = r.length, rows = r[0].getElementsByTagName('td').length,
//     cell, next, tem, i = 0, tbod = document.createElement('table');
//   while (i < rows) {
//     cell = 0;
//     tem = document.createElement('tr');
//     while (cell < cols) {
//       next = r[cell++].getElementsByTagName('td')[0];
//       tem.appendChild(next);
//     }
//     tbod.appendChild(tem);
//     ++i;
//   }
//   tbod.setAttribute('id', 'table');
//   t.parentNode.replaceChild(tbod, t);
// }

