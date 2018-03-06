function Sudoku() {
  this.arrItems = [];
  Sudoku.ARR_ROW = 9;
  Sudoku.ARR_COL = 9;
}
Sudoku.prototype.render = function () {
  const table = document.createElement('table');
  for (let i = 0; i < Sudoku.ARR_ROW; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < Sudoku.ARR_COL; j++) {
      const td = document.createElement('td');
      if (this.arrItems[i][j] === '') {
        td.setAttribute('ready', 'on');
      } else {
        td.classList.add('begin');
      }
      td.textContent = this.arrItems[i][j];
      if (i === 2 || i === 5) {
        tr.classList.add('line');
      }
      if (j === 2 || j === 5) {
        td.classList.add('vert');
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
};
Sudoku.prototype.addNumberInTable = function () {
  for (let i = 0; i < Sudoku.ARR_ROW; i++) {
    const arrTemp = [];
    for (let j = 0; j < Sudoku.ARR_COL; j++) {
      arrTemp.push(this.getNumber(i, j));
    }
    this.arrItems.push(arrTemp);
  }
};
Sudoku.prototype.someClear = function () {
  for (let i = 0; i < Sudoku.ARR_ROW; i++) {
    for (let j = 0; j < Sudoku.ARR_COL; j++) {
      if (Math.random() > 0.5) {
        this.arrItems[i][j] = '';
      }
    }
  }
};
// начальный массив.
Sudoku.prototype.getNumber = function (i, j) {
  switch (i) {
    case 0:
      return j + 1;
    case 1:
      if (j >= 6) {
        return j - 5;
      }
      return j + 4;
    case 2:
      if (j >= 3) {
        return j - 2;
      }
      return j + 7;
    case 3:
      if (j >= 8) {
        return j - 7;
      }
      return j + 2;
    case 4:
      if (j >= 5) {
        return j - 4;
      }
      return j + 5;
    case 5:
      if (j >= 2) {
        return j - 1;
      }
      return j + 8;
    case 6:
      if (j >= 7) {
        return j - 6;
      }
      return j + 3;
    case 7:
      if (j >= 4) {
        return j - 3;
      }
      return j + 6;
    case 8:
      if (j >= 1) {
        return j;
      }
      return j + 9;
    default:
      return 0;
  }
};

// транспаранция строк ,колонок, переворот таблицы
// переворот таблицы
Sudoku.prototype.transparentTable = function () {
  for (let i = 0; i < this.arrItems.length; i++) {
    for (let j = i; j < this.arrItems[i].length; j++) {
      const temp = this.arrItems[i][j];
      this.arrItems[i][j] = this.arrItems[j][i];
      this.arrItems[j][i] = temp;
    }
  }
};
Sudoku.prototype.setValue = function (i, j, value) {
  this.arrItems[i][j] = +value;
};
// меняем строки в пределах сектора (0-2)
Sudoku.prototype.rowChange = function () {
  const rnd = Math.floor(Math.random() * Sudoku.ARR_COL); // от 0 до 8
  const temp = [];

  function getRnd() {
    return Math.floor(Math.random() * 2 + 1); // 1 или 2
  }
  let rndDelta = getRnd();

  function change() {
    for (let i = 0; i < Sudoku.ARR_COL; i++) {
      this.arrItems[rnd][i] = this.arrItems[rnd + rndDelta][i];
      this.arrItems[rnd + rndDelta][i] = temp[i];
    }
  }
  for (let i = 0; i < Sudoku.ARR_COL; i++) {
    temp.push(this.arrItems[rnd][i]);
  }
  if (rnd === 0 || rnd === 3 || rnd === 6) {
    change.call(this);
  }
  if (rnd === 1 || rnd === 4 || rnd === 7) {
    if (rndDelta === 2) {
      rndDelta = -1;
    }
    change.call(this);
  }
  if (rnd === 2 || rnd === 5 || rnd === 8) {
    rndDelta *= -1;
    change.call(this);
  }
};
// меняем столбцы
Sudoku.prototype.colChange = function () {
  const rnd = Math.floor(Math.random() * Sudoku.ARR_COL); // от 0 до 8
  const temp = [];

  function getRnd() {
    return Math.floor(Math.random() * 2 + 1); // 1 или 2
  }
  let rndDelta = getRnd();

  function change() { // вызываем
    for (let i = 0; i < Sudoku.ARR_COL; i++) {
      this.arrItems[i][rnd] = this.arrItems[i][rnd + rndDelta];
      this.arrItems[i][rnd + rndDelta] = temp[i];
    }
  }

  for (let i = 0; i < Sudoku.ARR_COL; i++) {
    temp.push(this.arrItems[i][rnd]);
  }
  if (rnd === 0 || rnd === 3 || rnd === 6) {
    change.call(this);
  }
  if (rnd === 1 || rnd === 4 || rnd === 7) {
    if (rndDelta === 2) {
      rndDelta = -1;
    }
    change.call(this);
  }
  if (rnd === 2 || rnd === 5 || rnd === 8) {
    rndDelta *= -1;
    change.call(this);
  }
};

Sudoku.prototype.checkCorrectTable = function () {
  for (let i = 0; i < this.arrItems.length; i++) {
    for (let j = 0; j < this.arrItems[i].length; j++) {
      const value = this.arrItems[i][j];
      if (value === '') {
        return;
      }
      for (let t = j + 1; t < this.arrItems[i].length; t++) {
        if (this.arrItems[i][j] === this.arrItems[i][t]) {
          return;
        } else if (this.arrItems[j][i] === this.arrItems[t][i]) {
          return;
        }
      }
    }
  }
  for (let di = 0; di < this.arrItems.length; di += 3) {
    for (let dj = 0; dj < this.arrItems[di].length; dj += 3) {
      let temp = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          temp += this.arrItems[i + di][j + dj];
        }
      }
      if (temp !== 45) {
        return;
      }
    }
  }
  console.log('win');
};

function inputValue(event) {
  if (event.target.nodeName !== 'INPUT' && event.target.attributes.length !== 0) {
    if (event.target.attributes[0].name === 'ready') {
      const valueCell = event.target.textContent;
      event.target.textContent = '';
      const input = document.createElement('input');
      input.value = valueCell;
      event.target.appendChild(input);
      input.focus();
      input.addEventListener('blur', () => {
        const value = event.target.firstChild.value;
        event.target.firstChild.remove();
        if (value >= 1 && value <= 9) {
          event.target.textContent = value;
          const i = event.toElement.parentElement.rowIndex;
          const j = event.toElement.cellIndex;
          sudoku.setValue(i, j, value);
        } else event.target.textContent = '';
      });
    }
  }
}

// (i*n + i/n + j) % (n*n) + 1 - генерация значений (округление может?)

let sudoku = new Sudoku();
sudoku.addNumberInTable();
for (let i = 0, max = (Math.random() * 100) + 100; i < max; i++) {
  const rnd = Math.random();
  if (rnd <= 0.33) {
    sudoku.transparentTable();
  } else if (rnd <= 0.66) {
    sudoku.rowChange();
  } else sudoku.colChange();
}
sudoku.someClear();
const table = document.body.appendChild(sudoku.render());
table.addEventListener('click', () => {
  inputValue(event);
});

document.getElementById('checkButton').addEventListener('click', () => {
  sudoku.checkCorrectTable();
});