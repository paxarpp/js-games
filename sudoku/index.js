import style from './style.css';

class Sudoku {
  constructor() {
    this.arrItems = [];
    Sudoku.ARR_ROW = 9;
    Sudoku.ARR_COL = 9;
    this.win = 0;
    this.complication = 0.5;
  }
  render() {
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
  }
  addNumberInTable() {
    this.arrItems = Array.from(Array(Sudoku.ARR_ROW), (elem, x) => {
      return Array.from(Array(Sudoku.ARR_COL), (elem, y) => {
        let res = x + y + 1;
        if (res >= Sudoku.ARR_COL + 1) {
          res -= Sudoku.ARR_COL;
        }
        return res;
      });
    });
  }
  someClear() {
    for (let i = 0; i < Sudoku.ARR_ROW; i++) {
      for (let j = 0; j < Sudoku.ARR_COL; j++) {
        if (Math.random() > this.complication) {
          this.arrItems[i][j] = '';
        }
      }
    }
  }
  // транспаранция строк ,колонок, переворот таблицы
  // переворот таблицы
  transparentTable() {
    for (let i = 0; i < this.arrItems.length; i++) {
      for (let j = i; j < this.arrItems[i].length; j++) {
        const temp = this.arrItems[i][j];
        this.arrItems[i][j] = this.arrItems[j][i];
        this.arrItems[j][i] = temp;
      }
    }
  }
  setValue(i, j, value) {
    this.arrItems[i][j] = +value;
  }
  // меняем строки в пределах сектора (0-2)
  rowChange() {
    const rnd = Math.floor(Math.random() * Sudoku.ARR_COL); // от 0 до 8
    const temp = [];

    let rndDelta = Math.floor(Math.random() * 2 + 1);
    const change = () => {
      for (let i = 0; i < Sudoku.ARR_COL; i++) {
        this.arrItems[rnd][i] = this.arrItems[rnd + rndDelta][i];
        this.arrItems[rnd + rndDelta][i] = temp[i];
      }
    };
    for (let i = 0; i < Sudoku.ARR_COL; i++) {
      temp.push(this.arrItems[rnd][i]);
    }
    if (rnd === 0 || rnd === 3 || rnd === 6) {
      change();
    }
    if (rnd === 1 || rnd === 4 || rnd === 7) {
      if (rndDelta === 2) {
        rndDelta = -1;
      }
      change();
    }
    if (rnd === 2 || rnd === 5 || rnd === 8) {
      rndDelta *= -1;
      change();
    }
  }
  // меняем столбцы
  colChange() {
    const rnd = Math.floor(Math.random() * Sudoku.ARR_COL); // от 0 до 8
    const temp = [];

    let rndDelta = Math.floor(Math.random() * 2 + 1);
    const change = () => {
      for (let i = 0; i < Sudoku.ARR_COL; i++) {
        this.arrItems[i][rnd] = this.arrItems[i][rnd + rndDelta];
        this.arrItems[i][rnd + rndDelta] = temp[i];
      }
    };
    for (let i = 0; i < Sudoku.ARR_COL; i++) {
      temp.push(this.arrItems[i][rnd]);
    }
    if (rnd === 0 || rnd === 3 || rnd === 6) {
      change();
    }
    if (rnd === 1 || rnd === 4 || rnd === 7) {
      if (rndDelta === 2) {
        rndDelta = -1;
      }
      change();
    }
    if (rnd === 2 || rnd === 5 || rnd === 8) {
      rndDelta *= -1;
      change();
    }
  }
  checkCorrectTable() {
    for (let i = 0; i < this.arrItems.length; i++) {
      for (let j = 0; j < this.arrItems[i].length; j++) {
        const value = this.arrItems[i][j];
        if (value === '') {
          this.error();
          return;
        }
        for (let t = j + 1; t < this.arrItems[i].length; t++) {
          if (this.arrItems[i][j] === this.arrItems[i][t]) {
            this.error();
            return;
          }
          if (this.arrItems[j][i] === this.arrItems[t][i]) {
            this.error();
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
          this.error();
          return;
        }
      }
    }
    this.gameWin();
  }
  error() {
    const errorField = document.querySelector('.errorField');
    errorField.classList.add('show');
    setTimeout(() => {
      const errorField = document.querySelector('.errorField');
      errorField.classList.remove('show');
    }, 2000);
  }
  gameWin() {
    this.win += 1;
    alert('победа');
    const countWin = document.querySelector('.countWin');
    countWin.textContent = this.win;
    this.prepareNewGame();
  }
  prepareNewGame() {
    this.arrItems = [];
    this.startGame();
    const table = document.querySelector('.gameField');
    table.textContent = '';
    table.appendChild(this.render());
    table.addEventListener('click', () => {
      this.inputValue(event);
    });
  }
  startGame() {
    this.addNumberInTable();
    for (let i = 0, max = Math.random() * 100 + 100; i < max; i++) {
      const rnd = Math.random();
      if (rnd <= 0.33) {
        this.transparentTable();
      } else if (rnd <= 0.66) {
        this.rowChange();
      } else {
        this.colChange();
      }
    }
    this.someClear();
  }
  inputValue(event) {
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
            this.setValue(i, j, value);
          } else {
            event.target.textContent = '';
          }
        });
      }
    }
  }
}

const sudoku = new Sudoku();
sudoku.prepareNewGame();

document.getElementById('checkButton').addEventListener('click', () => {
  sudoku.checkCorrectTable();
});
document.querySelector('.complication').addEventListener('change', () => {
  sudoku.complication = +event.target.value;
  sudoku.prepareNewGame();
});
