//LIST ITEMS
const guess1 = document.getElementById('guess1');
const guess2 = document.getElementById('guess2');
const guess3 = document.getElementById('guess3');
const guess4 = document.getElementById('guess4');
const guess5 = document.getElementById('guess5');

//INPUTS
const guess1Input = guess1.getElementsByTagName('input')[0];
const guess2Input = guess2.getElementsByTagName('input')[0];
const guess3Input = guess3.getElementsByTagName('input')[0];
const guess4Input = guess4.getElementsByTagName('input')[0];
const guess5Input = guess5.getElementsByTagName('input')[0];

//EMOJIS
const emoji1 = document.getElementById('emoji1');
const emoji2 = document.getElementById('emoji2');
const emoji3 = document.getElementById('emoji3');
const emoji4 = document.getElementById('emoji4');
const emoji5 = document.getElementById('emoji5');

//FILME DIÁRIO
let dailyMovie = "";

//INICIA
guess1Input.removeAttribute('readonly');
guess1Input.focus();
guess1Input.setAttribute('placeholder', 'Digite o nome do filme')
guess1.querySelector(".icon").src = "assets/images/write.svg"; //Muda o icon para outro SVG;

//CONFIRMAR O INPUT
for (let i = 1; i <= 5; i++) {
    const currentInput = document.getElementById('guess' + i).getElementsByTagName('input')[0];

    currentInput.addEventListener('keydown', function (event) {
        if (event.code === "Enter" && currentInput.value) {
            selectNext(i);
        }
    });
}

//FUNÇÃO PARA SELECIONAR O PRÓXIMO INTPUT E VALIDAR A RESPOSTA VISUALMENTE
function selectNext(order) {

    ///VALIDÇÃO VISUAL
    const currentLi = document.getElementById("guess" + order);
    const currentInput = currentLi.getElementsByTagName('input')[0];

    ///SE ACERTAR
    if (checkMovie(currentInput.value)) {
        validModal(order, true);
        ////MOSTRAR OS PRÓXIMOS EMOJIS COM DELAY
        function delayEmoji() {
            showEmoji(order);
            order++;
            setTimeout(function () {
                if (order <= 5)
                    delayEmoji();
                else if (order == 5)
                    party.confetti(element);
            }, 500);
        }
        delayEmoji();

        ////MUDAR A COR
        console.log(currentLi)

        currentLi.querySelector(".icon").src = "assets/images/check.svg"; //Muda o icon para outro SVG;
        currentLi.classList.remove('input');
        currentLi.classList.add('correct');

        currentInput.setAttribute('readonly', true);
        currentInput.value = dailyMovie.name;

    }///SE ERRAR
    else {
        currentLi.querySelector(".icon").src = "assets/images/x.svg"; //Muda o icon para outro SVG;
        currentLi.classList.add('wrong');
        currentLi.classList.remove('input');

        currentInput.setAttribute('readonly', true);
    }


    ///SELECIONAR O PRÓXIMO
    if (order < 5 && checkMovie(currentInput.value) === false) {
        const nextLi = document.getElementById("guess" + (order + 1));
        const nextInput = nextLi.getElementsByTagName('input')[0];

        nextLi.classList.add('input');
        nextLi.classList.remove('toAns');
        nextLi.querySelector(".icon").src = "assets/images/write.svg"; //Muda o icon para outro SVG;


        nextInput.removeAttribute('readonly');
        nextInput.setAttribute('placeholder', 'Digite o nome do filme')
        nextInput.focus();

        showEmoji(order + 1);
    }
}


//FUNÇÃO PARA SELECIONAR O PRÓXIMO EMOJI
function showEmoji(order) {
    const nextEmoji = document.getElementById('emoji' + order);

    nextEmoji.classList.add('visible');
}


//CHECAGEM DO FILME
function checkMovie(input) {

    ///REMOVENDO ACENTOS
    const inputToCheck = input.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    const movieFound = dailyMovie.acceptableNames.find(acceptableName=>inputToCheck.toLowerCase() === acceptableName.toLowerCase())
    return !!movieFound;
}

function validModal(order, isValid) {
    const modal = document.getElementById('sayValid');
    modal.classList.remove('closeSay');

    if (isValid) {

        if (order === 1)
            modal.innerText = "CINÉFILO!"
        else if (order === 2)
            modal.innerText = "PERFEITO!"
        else if (order === 3)
            modal.innerText = "MUITO BEM!"
        else if (order === 4)
            modal.innerText = "MANDOU BEM!"
        else if (order === 5)
            modal.innerText = "POR POUCO!"
        modal.classList.add('sayC');
    }
    else {
        modal.innerText = "FILME INVÁLIDO"
        modal.classList.add('sayW');
    }

    setTimeout(function () {
        modal.classList.add('closeSay');
    }, 3000);

    setTimeout(function () {
        modal.classList.remove('sayW');
        modal.classList.remove('sayC');
    }, 3500);

}

//teste de pegar json

//SORTEANDO NÚMERO ALEATÓRIO
function sortNumber(max) {
    return Math.floor(Math.random() * max)
}

//NÃO FUNFO
function getDatabase() {
    fetch("database.json")
        .then(response => response.json())
        .then(database => {
            outDatabase(database);
        });
}

getDatabase();


function outDatabase(val) {
    
    const i = sortNumber(val.length);
    const movie = val[i];

    dailyMovie = movie;

    emoji1.innerText = movie.emoji[0];
    emoji2.innerText = movie.emoji[1];
    emoji3.innerText = movie.emoji[2];
    emoji4.innerText = movie.emoji[3];
    emoji5.innerText = movie.emoji[4];

    console.log(movie.emoji);
}