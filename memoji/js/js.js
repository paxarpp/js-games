window.onload = function () {

    var cardMax = 24;
    var score = 0;
    var scoreSec = 0;
    var scoreMin = 0;
    var timerID;

    setField();
    setPositionTime();
    start();

    function start() {
        score = 0;
        scoreSec = 0;
        scoreMin = 0;
        clearField();
        changeArrCard();
        setFieldImg();
        show();
        var clear = document.querySelector('main h3');
        // @ts-ignore
        clear.innerText = '';

        setTimeout(show, 3000);
        setTimeout(setControl, 3100);
        timerID = setInterval(scoreCount, 100);
    }


    function setPositionTime() {
        var h2 = document.createElement('h2');
        var gameover = document.createElement('h3');
        document.querySelector('main').appendChild(h2);
        document.querySelector('main').appendChild(gameover);
    }


    function setField() {
        for (var i = 0; i < cards.length; i++) {
            var main = document.querySelector('main');

            var divWrap = document.createElement('div');
            var divFront = document.createElement('div');
            var divBack = document.createElement('div');
            divWrap.classList.add('card');
            divWrap.classList.add('block');
            divWrap.classList.add('rotate');
            divFront.classList.add('front');
            divFront.classList.add('side');
            divBack.classList.add('back');
            divBack.classList.add('side');

            main.appendChild(divWrap);
            divWrap.appendChild(divFront);
            divWrap.appendChild(divBack);
        }

    }

    function scoreCount() {
        score++;
        if (score == 10) {
            score = 0;
            scoreSec++;
            if (scoreSec == 60) {
                scoreSec = 0;
                scoreMin++;
            }
        }
        var h2 = document.querySelector('h2');
        var inputTime = scoreMin + ':' + scoreSec + ':' + score;
        h2.innerText = inputTime;
        return;
    }
    //обработчик
    function setControl() {
        var card = document.querySelectorAll('.card');
        for (var i = 0; i < card.length; i++) {
            // card[i].addEventListener('click', rotateCard);// так множественное открытие идет
            card[i].
            // @ts-ignore
            onclick = rotateCard;
        }
    }

    function rotateCard() {
        var newClass = event.currentTarget;


        // @ts-ignore
        if (newClass.getAttribute('fixed') == 'true') {
            return;

            // @ts-ignore
        } else if (newClass.getAttribute('on') == 'true') {

            // @ts-ignore
            setAttributeParrentTarget(newClass.firstChild, 'false'); //атрибут on у card
            // @ts-ignore
            newClass.classList.toggle('rotate');
            // @ts-ignore
            newClass.childNodes[0].classList.remove('red');
            arrOpenCard[0].childNodes[0].classList.remove('red');
            removeArrOpenCard(newClass);

        } else {

            // @ts-ignore
            setAttributeParrentTarget(newClass.firstChild, 'true');
            // @ts-ignore
            newClass.classList.toggle('rotate');
            render(newClass);
            countOpenCard(newClass);



        }
    }
    var arrOpenCard = [];

    function removeArrOpenCard(params) {
        var nameCard = params.childNodes[0].childNodes[0].getAttribute('src');
        nameCard = nameCard.slice(4);
        for (var i = 0; i < arrOpenCard.length; i++) {
            var name = arrOpenCard[i].childNodes[0].childNodes[0].getAttribute('src');
            name = name.slice(4);
            if (nameCard == name) {
                arrOpenCard.splice(i, 1);
            }
        }
    }

    function countOpenCard(newClass) {

        if (newClass.getAttribute('fixed') == 'true') {

            if (arrOpenCard.length == 2) {
                arrOpenCard[0].firstChild.classList.remove('red');
                arrOpenCard[1].firstChild.classList.remove('red');
                if (arrOpenCard[0].getAttribute('fixed') == "true") {
                    arrOpenCard.splice(0, 1);
                } else {
                    arrOpenCard.splice(1, 1);
                }
            }
            youAreWin()
            return;
        }
        arrOpenCard.push(newClass);

        if (arrOpenCard.length == 2) {

            renderRed(arrOpenCard);

        } else if (arrOpenCard.length == 3) { //карт открыто 3
            arrOpenCard[0].childNodes[0].classList.remove('red');
            arrOpenCard[1].childNodes[0].classList.remove('red');
            arrOpenCard[0].childNodes[0].parentNode.classList.add('rotate');
            arrOpenCard[0].childNodes[0].parentNode.setAttribute('on', 'false');
            arrOpenCard[1].childNodes[0].parentNode.classList.add('rotate');
            arrOpenCard[1].childNodes[0].parentNode.setAttribute('on', 'false');
            arrOpenCard[2].childNodes[0].classList.remove('red');
            arrOpenCard.splice(0, 2);
        }
    }

    function renderRed(arr) {
        for (var i = 0; i < arr.length; i++)
            arr[i].childNodes[0].classList.add('red');
    }

    function show() {
        var card = document.querySelectorAll('.card');
        for (var i = 0; i < card.length; i++) {
            card[i].classList.toggle('rotate');
        }

    }

    function clearField() {
        var cardField = document.querySelectorAll('.card .front');
        for (var i = 0; i < cardField.length; i++) {
            // @ts-ignore
            cardField[i].innerText = '';
        }
    }

    function setFieldImg() {
        var cardImg = document.querySelectorAll('.card .front');
        for (var i = 0; i < cards.length; i++) {
            var path = cards[i].img;
            var img = document.createElement('img');
            img.setAttribute('src', path);
            setAttributeParrentTarget(cardImg[i], 'false');
            cardImg[i].appendChild(img);

            // так в массив cards добавляются их ДОМ элементы
            // не для текущей реализации
            cards[i].dom=cardImg[i];
        }
    }

    function setAttributeParrentTarget(target, value) {
        var atr = target.parentNode;
        atr.setAttribute('on', value);
    }

    function changeArrCard() {
        var changeArr = cardMax + random(cardMax * cardMax);
        for (var i = 0; i < changeArr; i++) {
            var rnd = random(cardMax);
            var elem = cards.splice(rnd, 1);
            rnd = random(cardMax);
            cards.splice(rnd, 0, elem[0])
        }
    }

    function random(max) {
        return max = Math.floor(Math.random() * max);
    }

    function render(ncl) {
        var name = ncl.childNodes[0].childNodes[0].getAttribute('src');
        name = name.slice(4);
        for (var i = 0; i < arrOpenCard.length; i++) {
            var nameNew = arrOpenCard[i].firstChild.firstChild.getAttribute('src');
            nameNew = nameNew.slice(4);
            if (name == nameNew) { //одинаковые
                setFixedAttribute(ncl, arrOpenCard[i]); //атрибут фиксед
                setClassColor(ncl, arrOpenCard[i], 'green'); //класс грин
                arrOpenCard[i].childNodes[0].classList.remove('red');
                arrOpenCard.splice(i, 1);
                if (arrOpenCard[0] ==null) {
                    return;
                }
                arrOpenCard[0].childNodes[0].classList.remove('red');
            }
        }
    }

    function setClassColor(params1, params2, color) {
        params1.childNodes[0].classList.add(color);
        params2.childNodes[0].classList.add(color);
    }

    function setFixedAttribute(params1, params2) {
        params1.setAttribute('fixed', 'true');
        params2.setAttribute('fixed', 'true');
    }

    function winner() {
        clearInterval(timerID);
        var gameover = document.querySelector('h3');
        gameover.classList.add('animated');
        gameover.classList.add('jackInTheBox');
        gameover.innerText = 'Победа !';
        var answer = +prompt('повтор нажми 1');
        if (answer == 1) {
            start();
        };

    }

    function youAreWin() {
        var win = document.querySelectorAll('.card');
        var count = 0;
        for (var i = 0; i < win.length; i++) {
            if (win[i].getAttribute('fixed')) {
                count++;
            }
        }
        if (count == win.length) {
            winner();
        }
    }

}



var cards = [{
        img: 'img/1.png',
    },
    {
        img: 'img/2.png',
    },
    {
        img: 'img/3.png',
    },
    {
        img: 'img/4.png',
    },
    {
        img: 'img/5.png',
    },
    {
        img: 'img/6.png',
    },
    {
        img: 'img/1.png',
    },
    {
        img: 'img/2.png',
    },
    {
        img: 'img/3.png',
    },
    {
        img: 'img/4.png',
    },
    {
        img: 'img/5.png',
    },
    {
        img: 'img/6.png',
    },
    {
        img: 'img/7.png',
    },
    {
        img: 'img/7.png',
    },
    {
        img: 'img/8.png',
    },
    {
        img: 'img/8.png',
    },
    {
        img: 'img/9.png',
    },
    {
        img: 'img/9.png',
    },
    {
        img: 'img/10.png',
    },
    {
        img: 'img/10.png',
    },
    {
        img: 'img/11.png',
    },
    {
        img: 'img/11.png',
    },
    {
        img: 'img/12.png',
    },
    {
        img: 'img/12.png',
    },
]