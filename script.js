window.onload = login;

// LOGIN
var tries = 1;
var table;

function login() {
  var h1 = document.createElement('h1');
  h1.appendChild(document.createTextNode('GO AWAY'));
  var age = prompt('What is your age', '');
  if (age >= 18) {
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
    table1.push([]);
    for (var j = 1; j <= x; j++) table1[i - 1].push(func1());
  }
  // console.log(table1);
  // table1.forEach(function (item) {
  //   var row = document.createElement('tr');
  //   item.forEach(function (item2) {
  //     var cell = document.createElement('td');
  //     cell.textContent = item2;
  //     row.appendChild(cell);
  //   });
  //   table.appendChild(row);
  // });
  var html = '';
  table1.forEach(function (tr) {
    html += '<tr>';
    tr.forEach(function (td) {
      html += '<td>' + td + '</td>';
    });
    html += '</tr>';
  });
  table.innerHTML = html;
  table.querySelector('tr').children[0].dataset.op = 'multiply';
  table.querySelector('tr').children[1].dataset.op = 'share';
  table.querySelector('tr').children[2].dataset.op = 'subtract';
  table.querySelector('tr').children[3].dataset.op = 'add';
  return table;
}

var randomNum = function () {
  return Math.floor(Math.random() * 10 )
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
      var currentIndex = indexElement(this);
      var middleIndex = (middle - 1) * colCount + currentIndex;
      var lastIndex = cells.length - colCount + currentIndex;

      cells.forEach(function (td, i) {
        td.dataset.value = td.innerText;
        if (i !== currentIndex && i !== middleIndex && i !== lastIndex) {
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
    return n ? n / n : 'inf';
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

function removeValue() {
  table.addEventListener('click', function (e) {
    if (e.target.tagName !== 'TD') return false;
    if (+e.target.innerText >= 25) e.target.innerText = 0;
  });
}