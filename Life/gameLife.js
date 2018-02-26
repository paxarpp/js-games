var canvas = document.getElementById('Life');
var context = canvas.getContext('2d');

var arrLife = [];
var arrLifeMaxX = 30;
var arrLifeMaxY = 30;
var step = [];
var stepTemp = 0;
var dieUnit = [];
var bornUnit = [];
var liveUnit = [];
var stringDisplay = '';
var scoreGame = 500;
var scoreGameValue = scoreGame;

//старт игры

init();
render();

function game() {
	update();
	render();

	setTimeout(newlife, scoreGameValue / 5);
	stepTemp++;
	step.unshift(stepTemp);
	step.splice(3, 1);
}

function displayCountUnit() {
	context.fillStyle = "#000000";
    context.font = "italic 18px Arial";
	context.fillText("Ход:"+step.join(' | '), 15, 30);	
	context.fillText("Жив:"+liveUnit.join(' | '), 10, 50);
	context.fillStyle = "red";
	context.fillText("Умер:"+dieUnit.join(' | '), 0, 70);
	context.fillStyle = "green";
    context.fillText("Род:"+bornUnit.join(' | '), 10, 90);
}

function newlife() {
	changStatus();
	render();
}

//начальные установки
function init() {
	canvas.addEventListener("click", function (event) {
		var positionX = event.offsetX;
		var positionY = event.offsetY;
		positionX = Math.floor(positionX / 20);
		positionY = Math.floor(positionY / 20);
		if (arrLife[positionX][positionY] == 1) {
			arrLife[positionX][positionY] = 0;
		} else {
			arrLife[positionX][positionY] = 1;
		}
		render();
	});
	for (var i = 0; i < arrLifeMaxY; i++) {
		arrLife[i] = [];
		for (var j = 0; j < arrLifeMaxX; j++) {
			arrLife[i][j] = 0;
		}

	}
	var btn = document.getElementById('start');
	btn.onclick = function () {
		var size = +document.getElementById("range").value;
		scoreGameValue = scoreGame + size;
		setInterval(game, scoreGameValue);
	}

}

//функция обновления состояния игры
function update() {
	for (var i = 0; i < arrLifeMaxY; i++) {
		for (var j = 0; j < arrLifeMaxX; j++) {
			var count = 0;
			if (arrLife[borderCheck(i - 1)][borderCheck(j - 1)] == 1 || arrLife[borderCheck(i - 1)][borderCheck(j - 1)] == 9) {
				count++;
			}
			if (arrLife[borderCheck(i - 1)][j] == 1 || arrLife[borderCheck(i - 1)][j] == 9) {
				count++;
			}
			if (arrLife[borderCheck(i - 1)][borderCheck(j + 1)] == 1 || arrLife[borderCheck(i - 1)][borderCheck(j + 1)] == 9) {
				count++;
			}

			if (arrLife[i][borderCheck(j - 1)] == 1 || arrLife[i][borderCheck(j - 1)] == 9) {
				count++;
			}
			if (arrLife[i][borderCheck(j + 1)] == 1 || arrLife[i][borderCheck(j + 1)] == 9) {
				count++;
			}

			if (arrLife[borderCheck(i + 1)][borderCheck(j - 1)] == 1 || arrLife[borderCheck(i + 1)][borderCheck(j - 1)] == 9) {
				count++;
			}
			if (arrLife[borderCheck(i + 1)][j] == 1 || arrLife[borderCheck(i + 1)][j] == 9) {
				count++;
			}
			if (arrLife[borderCheck(i + 1)][borderCheck(j + 1)] == 1 || arrLife[borderCheck(i + 1)][borderCheck(j + 1)] == 9) {
				count++;
			}

			if (count == 3 && arrLife[i][j] == 0) {
				arrLife[i][j] = 3; // рождение
			} else if ((count < 2 || count > 3) && arrLife[i][j] == 1) {
				arrLife[i][j] = 9; // смерть
			}
		}
	}
};

function borderCheck(params) {
	if (params == -1) {
		return params = arrLife.length - 1;
	} else if (params == arrLife.length) {
		return params = 0;
	}
	return params;
}

function changStatus() {
	var dieUnitTemp = 0;
	var bornUnitTemp = 0;
	var liveUnitTemp = 0;
	for (var i = 0; i < arrLifeMaxY; i++) {
		for (var j = 0; j < arrLifeMaxX; j++) {
			if (arrLife[i][j] == 3) {
				arrLife[i][j] = 1;
				bornUnitTemp++;
				liveUnitTemp++;
			} else if (arrLife[i][j] == 9) {
				arrLife[i][j] = 0;
				dieUnitTemp++;
			} else if (arrLife[i][j] == 1) {
				liveUnitTemp++;
			}
		}
	}
	liveUnit.unshift(liveUnitTemp);
	liveUnit.splice(3, 1);
	bornUnit.unshift(bornUnitTemp);
	bornUnit.splice(3, 1);
	dieUnit.unshift(dieUnitTemp);
	dieUnit.splice(3, 1);
};

function render() {
	//очистка холста (не обязательно)
	context.clearRect(0, 0, 600, 600);

	displayCountUnit();

	for (var i = 0; i < arrLifeMaxY; i++) {
		for (var j = 0; j < arrLifeMaxX; j++) {
			if (arrLife[i][j] == 1) {
				// context.fillStyle = "grey"; 
				// context.fillRect(i * 20, j * 20, 20, 20);// это квадрат
				context.beginPath();
				context.arc(i * 20 + 10, j * 20 + 10, 10, 0, Math.PI * 2, false);
				context.closePath();
				context.strokeStyle = "#000";
				context.stroke();
				context.fillStyle = "#000";
				context.fill();
			}
			if (arrLife[i][j] == 3) {
				// context.fillStyle = "rgb(179, 230, 129)";
				// context.fillRect(i * 20, j * 20, 20, 20);// это квадрат
				context.beginPath();
				context.arc(i * 20 + 10, j * 20 + 10, 10, 0, Math.PI * 2, false);
				context.closePath();
				context.strokeStyle = "green";
				context.stroke();
			}
			if (arrLife[i][j] == 9) {
				// context.fillStyle = "rgb(49, 59, 39)";
				// context.fillRect(i * 20, j * 20, 20, 20);// это квадрат
				context.beginPath();
				context.arc(i * 20 + 10, j * 20 + 10, 10, 0, Math.PI * 2, false);
				context.closePath();
				context.strokeStyle = "red";
				context.stroke();
			}
		}

	}
};