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
let moviesDatabase = [];
let allAcceptableNames = [];

overlay.addEventListener('click', function () {
    document.getElementById('answerModal').style.display = "none";
})


async function getDatabase() {
    const response = await fetch("../../database.json");//ler a database dos filmes cadastrados e retornar o array completo
    const database = await response.json();
    await outDatabase(database);
}

async function outDatabase(val) {

    let i = 0;
    do {
        i = sortNumber(val.length);
    }
    while (val[i].id != 1)

    const movie = val[i];

    moviesDatabase = val;
    dailyMovie = movie;

    randomizeEmojis(movie);
}

function orderAcceptableNames() {
    allAcceptableNames = moviesDatabase.reduce((acc, movie) => {
        const normalizedAcceptableNames = movie.acceptableNames.map((element) => element.toLowerCase());
        acc = acc.concat(normalizedAcceptableNames);
        return acc;
    }, []);
}

//BOTÃO DE REINICIAR
document.getElementById('refresh').addEventListener('click', function () {
    location.reload();
});

//INICIA
guess1Input.focus();

//MODAL DE RESPOSTA
function checkModal(streak) {
    answerModal.getElementsByTagName('h3')[0].innerText = (`Resposta: ${dailyMovie.name}`);
    answerModal.getElementsByTagName('h1')[0].innerText = streak;
    answerModal.style.display = "block";
    overlay.style.display = "block";
}

//COPIAR PROGRESSO
const copyButton = document.getElementById('clip');
function copyToClipboard(streak = 0) {
    const toast = document.getElementById('toastValid');

    toast.classList.remove('closeToast');
    toast.innerText = 'COPIADO!';
    toast.classList.add('toastC');

    setTimeout(function () {
        toast.classList.add('closeToast');
    }, 1000);

    setTimeout(function () {
        toast.classList.remove('toastC');
    }, 1500);
    navigator.clipboard.writeText(`Joguei cinefi.lol de terror ${emoji1.innerText} | 🔥${streak}`);
}


//CONFIRMAR O INPUT
async function confirmInput() {
    for (let i = 1; i <= 5; i++) {
        const currentInput = document.getElementById('guess' + i).getElementsByTagName('input')[0];

        currentInput.addEventListener('keydown', function (event) {
            if ((event.code === "Enter" || event.keyCode === 13) && currentInput.value) {
                selectNext(i);
            }
        });
    }
}

//FUNÇÃO PARA SELECIONAR O PRÓXIMO INTPUT E VALIDAR A RESPOSTA VISUALMENTE
async function selectNext(order) {

    ///VALIDÇÃO VISUAL
    const currentLi = document.getElementById("guess" + order);
    const currentInput = currentLi.getElementsByTagName('input')[0];
    const streak = localStorage.getItem('horrorStreak');

    const isMovieCorrect = checkMovie(currentInput.value);
    const isAcceptableName = allAcceptableNames.includes(normalizeName(currentInput.value));
    if (isAcceptableName) {
        ///SE ACERTAR
        if (isMovieCorrect) {
            const guess = order;
            validToast(order, true);
            ////MOSTRAR OS PRÓXIMOS EMOJIS COM DELAY
            function delayEmoji() {
                showEmoji(order);
                order++;
                setTimeout(function () {
                    if (order <= 5)
                        delayEmoji();
                }, 500);
            }
            delayEmoji();

            ////MUDAR A COR
            currentLi.querySelector(".icon").src = "../../assets/images/check.svg"; //Muda o icon para outro SVG;
            currentLi.classList.remove('input');
            currentLi.classList.add('correct');
            currentInput.setAttribute('readonly', true);
            currentInput.value = dailyMovie.name;

        }///SE ERRAR
        else {
            currentLi.querySelector(".icon").src = "../../assets/images/x.svg"; //Muda o icon para outro SVG;
            currentLi.classList.add('wrong');
            currentLi.classList.remove('input');
            currentInput.setAttribute('readonly', true);

            ///VOCÊ PERDEU
            if (order === 5) {
                storeStats(6);
                localStorage.setItem('complete', '1');
                copyButton.addEventListener('click', function () {
                    copyToClipboard(false, order);
                });
                setTimeout(async function () {
                    await checkModal(order);
                }, 1500);
            }
        }
        ///SELECIONAR O PRÓXIMO
        if (order < 5 && !isMovieCorrect) {
            const nextLi = document.getElementById("guess" + (order + 1));
            const nextInput = nextLi.getElementsByTagName('input')[0];

            nextLi.classList.add('input');
            nextLi.classList.remove('toAns');
            nextLi.querySelector(".icon").src = "../../assets/images/write.svg"; //Muda o icon para outro SVG;


            nextInput.removeAttribute('readonly');
            nextInput.setAttribute('placeholder', 'Digite um título')
            nextInput.focus();

            showEmoji(order + 1);
        }
    }
    else
        validToast(undefined, false);

}


//FUNÇÃO PARA SELECIONAR O PRÓXIMO EMOJI
function showEmoji(order) {
    const nextEmoji = document.getElementById('emoji' + order);

    nextEmoji.classList.add('visible');
}

function normalizeName(input) {
    return input?.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '').toLowerCase();
}

//CHECAGEM DO FILME
function checkMovie(input) {
    ///REMOVENDO ACENTOS
    const inputToCheck = normalizeName(input);

    const movieFound = dailyMovie.acceptableNames.find(acceptableName => inputToCheck === acceptableName.toLowerCase())
    return !!movieFound;
}

//VERIFICAR SE O FILME EXISTE NO BANCO DE DADOS
async function checkMovieInDatabase(input) {
    const inputToCheck = normalizeName(input);
    const movieFound = moviesDatabase.map((element) => {
        const inputFound = element.acceptableNames.find(acceptableName => inputToCheck === acceptableName.toLowerCase());
        return !!inputFound;
    });
    return movieFound;
}


function storeSrike() {
    localStorage.setItem('horrorStreak', 0);
    return 0;
}

//TOAST
function validToast(order, isValid) {

    const streakStoreage = localStorage.getItem('horrorStreak');
    const streak = streakStoreage ? streakStoreage : storeSrike();
    localStorage.setItem('horrorStreak', (Number(streak) + 1));

    const toast = document.getElementById('toastValid');
    toast.classList.remove('closeToast');

    if (isValid) {

        if (order === 1)
            toast.innerText = "CINÉFILO!"
        else if (order === 2)
            toast.innerText = "PERFEITO!"
        else if (order === 3)
            toast.innerText = "MUITO BEM!"
        else if (order === 4)
            toast.innerText = "MANDOU BEM!"
        else if (order === 5)
            toast.innerText = "POR POUCO!"
        toast.classList.add('toastC');

        setTimeout(function () {
            location.reload();
        }, 3500);
    }
    else {
        toast.innerText = "FILME INVÁLIDO"
        toast.classList.add('toastW');
    }

    setTimeout(function () {
        toast.classList.remove('toastW');
        toast.classList.add('closeToast');
    }, 3000);

}

//SORTEANDO NÚMERO ALEATÓRIO
function sortNumber(max) {
    return Math.floor(Math.random() * max)
}

function randomizeEmojis(movie) {

    const numerosSorteados = [];
    while (numerosSorteados.length < 5) {
        const numero = Math.floor(Math.random() * 5);
        if (numerosSorteados.indexOf(numero) === -1) {
            numerosSorteados.push(numero);
        }
    }

    emoji1.innerText = movie.emoji[numerosSorteados[0]];
    emoji2.innerText = movie.emoji[numerosSorteados[1]];
    emoji3.innerText = movie.emoji[numerosSorteados[2]];
    emoji4.innerText = movie.emoji[numerosSorteados[3]];
    emoji5.innerText = movie.emoji[numerosSorteados[4]];
}

getDatabase().then(_ => orderAcceptableNames()).then(_ => confirmInput());