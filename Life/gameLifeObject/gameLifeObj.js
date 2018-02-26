var canvas = document.getElementById('Life');
var ctx = canvas.getContext('2d');

function Unit(x, y) {
	this.x = x;
	this.y = y;
	this.status = "live"; // die, born
	this.neighbors = 0;
	this.age = 0;
};

var arrUnits = [];
init();

//создаем новый юнит
function setUnitXY(x, y) {
	var unit = new Unit(x, y);
	arrUnits.push(unit);
}

//функция возвращает номер в массиве, если в масиве есть обьект с переданными координатами, или -1 если нет.
function testUnitXY(x, y) {
	for (var i = 0; i < arrUnits.length; i++) {
		if (arrUnits[i].x == x && arrUnits[i].y == y) {
			return i;
		}
	}
	return -1;
}



function checker(x, y) {
	var a = testUnitXY(x, y)
	if (a == -1) {
		setUnitXY(x, y);
	} else {
		arrUnits.splice(a, 1);
	}
}

//вешаем обработчик на клик и на кнопку
function init() {
	canvas.addEventListener("click", function (event) {
		var positionX = event.offsetX;
		var positionY = event.offsetY;
		positionX = Math.floor(positionX / 20);
		positionY = Math.floor(positionY / 20);
		checker(positionX, positionY);
		render();
	});

	var btn = document.getElementById('start');
	btn.onclick = function () {
		game();
	};
};

function game() {



};

function render() {
	//очистка холста (не обязательно)
	ctx.clearRect(0, 0, 600, 600);
	for (var i = 0; i < arrUnits.length; i++) {
		var x = arrUnits[i].x;
		var y = arrUnits[i].y;
		if (arrUnits[i].status == "live") {
			ctx.beginPath();
			ctx.arc(x * 20 + 10, y * 20 + 10, 10, 0, Math.PI * 2);
			ctx.closePath();
			ctx.strokeStyle = "#000";
			ctx.stroke();
			ctx.fillStyle = "#000";
			ctx.fill();
		} else if (arrUnits[i].status == "born") {
			ctx.beginPath();
			ctx.arc(x * 20 + 10, y * 20 + 10, 10, 0, Math.PI * 2);
			ctx.closePath();
			ctx.strokeStyle = "green";
			ctx.stroke();
		} else if (arrUnits[i].status == "die") {
			ctx.beginPath();
			ctx.arc(x * 20 + 10, y * 20 + 10, 10, 0, Math.PI * 2);
			ctx.closePath();
			ctx.strokeStyle = "red";
			ctx.stroke();
		}
	}
};