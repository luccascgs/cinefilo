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


overlay.addEventListener('click', function () {
    document.getElementById("answerModal").style.display = "none";
})

//TIMER
var today = new Date();

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

var diffMs = (tomorrow - today); // milliseconds between now & Christmas
var minutes = Math.floor((diffMs / 1000) / 60);

countdown(minutes);

function countdown(minutes) {

    var target_date = new Date().getTime() + ((minutes * 60) * 1000); // set the countdown date
    var days, hours, minutes, seconds; // variables for time units

    var countdown = document.getElementById("countdown"); // get tag element

    getCountdown();

    setInterval(function () { getCountdown(); }, 1000);

    function getCountdown() {

        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;

        if (seconds_left >= 0) {

            days = pad(parseInt(seconds_left / 86400));
            seconds_left = seconds_left % 86400;

            hours = pad(parseInt(seconds_left / 3600));
            seconds_left = seconds_left % 3600;

            minutes = pad(parseInt(seconds_left / 60));
            seconds = pad(parseInt(seconds_left % 60));

            // format countdown string + set tag value
            countdown.innerText = hours + ":" + minutes + ":" + seconds;
        }
    }

    function pad(n) {
        return (n < 10 ? '0' : '') + n;
    }
}

//INICIA
guess1Input.focus();

const dayLocalStorage = localStorage.getItem('day');
const day = dayLocalStorage ? dayjs(dayLocalStorage).format("YYYY-MM-DD") : storeToday();
function storeToday() {
    localStorage.setItem('complete', '0');
    const today = dayjs().format("YYYY-MM-DD");
    localStorage.setItem('day', today);
    return today;
}

const statsLocalStorage = localStorage.getItem('stats');
function createStats() {
    const newStats = '[0,0,0,0,0,0]';
    localStorage.setItem('stats', newStats);
    return newStats;
}

function getStats() {
    const statsValue = statsLocalStorage ? statsLocalStorage : createStats();
    const stats = JSON.parse(statsValue);
    for (let i = 1; i <= 6; i++) {
        const counter = document.getElementById('p' + i).getElementsByTagName('span')[0];
        counter.innerText = stats[i - 1];
    }
}
getStats();

function storeStats(order) {
    const statsValue = statsLocalStorage ? statsLocalStorage : createStats();
    const stats = JSON.parse(statsValue);
    const guess = document.getElementById('p' + order);
    const counter = guess.getElementsByTagName('span')[0];
    if (order === 6)
        guess.classList.add('wrong');
    else
        guess.classList.add('correct');

    if (localStorage.getItem('complete') == 0) {
        stats[order - 1]++;
        localStorage.setItem('stats', JSON.stringify(stats));
        counter.innerText = stats[order - 1];
    }
}

async function checkDay() {
    if (dayjs().isAfter(day, 'day')) {
        //MUDOU O DIA
        localStorage.setItem('day', dayjs().format("YYYY-MM-DD"));
        localStorage.setItem('tries', "[]");
        localStorage.setItem('complete', '0');
        getDatabase();
        dailyMovie = localStorage.getItem('answer');
    }
    else {
        //CONTINUA NO MESMO DIA
        await setEmojis();
    }
}
checkDay();

async function getDailyMovie() {
    let dailyMovie = localStorage.getItem('answer');
    if (!dailyMovie) {
        await getDatabase()
        dailyMovie = localStorage.getItem('answer');
    }
    return dailyMovie;
}

async function setEmojis() {
    const dailyMovieValue = await getDailyMovie();
    const dailyMovie = JSON.parse(dailyMovieValue);

    emoji1.innerText = dailyMovie.emoji[0];
    emoji2.innerText = dailyMovie.emoji[1];
    emoji3.innerText = dailyMovie.emoji[2];
    emoji4.innerText = dailyMovie.emoji[3];
    emoji5.innerText = dailyMovie.emoji[4];
}

//PUXANDO O BANCO DE DADOS
async function getDatabase() {
    const response = await fetch("../database.json");//ler a database dos filmes cadastrados e retornar o array completo
    const database = await response.json();//transformar em json

    const responseBd = await fetch(`https://api.adrianoneres.me/cinefilo-api/daily-movie?max=${database.length - 1}`);//ler api e retornar o filme
    const movieDay = await responseBd.json();//transformar a resposta em json

    await outDatabase(database, movieDay.id_movie);//passar os valores para outra função
};

async function outDatabase(val, indice) {
    const movie = val[indice];
    let moviesDatabase = val;

    localStorage.setItem('answer', JSON.stringify(movie));
    await setEmojis();
}


//MODAL DE RESPOSTA
async function checkModal(order) {
    const dailyMovieValue = await getDailyMovie();
    const dailyMovie = JSON.parse(dailyMovieValue);

    answerModal.getElementsByTagName('h3')[0].innerText = (`Resposta: ${dailyMovie.name}`);
    answerModal.style.display = "block";
    overlay.style.display = "block";
}

//COPIAR PROGRESSO
const copyButton = document.getElementById('clip');
function copyToClipboard(correct, order) {
    const toast = document.getElementById('toastValid');
    const id = dayjs().diff('2023-10-07', 'day');
    console.log(id);

    toast.classList.remove('closeToast');
    toast.innerText = 'COPIADO!';
    toast.classList.add('toastC');

    setTimeout(function () {
        toast.classList.add('closeToast');
    }, 1000);

    setTimeout(function () {
        toast.classList.remove('toastC');
    }, 1500);
    if (correct) {
        navigator.clipboard.writeText(`Joguei cinefi.lol #${id} ${emoji1.innerText} | ${order}/5`);
    }
    else
        navigator.clipboard.writeText(`Joguei cinefi.lol #${id} ${emoji1.innerText} | X/5`);
}

//CONFIRMAR O INPUT
for (let i = 1; i <= 5; i++) {

    const tries = JSON.parse(localStorage.getItem('tries')) || [];
    const currentInput = document.getElementById('guess' + (i)).getElementsByTagName('input')[0];

    if (tries[i - 1]) {
        currentInput.value = tries[i - 1];
        selectNext(i);
    }
    else {
        currentInput.addEventListener('keydown', function (event) {
            if ((event.code === "Enter" || event.keyCode === 13) && currentInput.value) {
                saveDataToLocalStorage(currentInput.value);
                selectNext(i);
            }
        });
    }
}

//SALVAR OS INPUTS PARA O LOCALSTORAGE
function saveDataToLocalStorage(data) {
    let tries = [];
    tries = JSON.parse(localStorage.getItem('tries')) || [];//verifica os valores que tem
    tries.push(data);//adiciona o palpite
    localStorage.setItem('tries', JSON.stringify(tries));
}

//FUNÇÃO PARA SELECIONAR O PRÓXIMO INTPUT E VALIDAR A RESPOSTA VISUALMENTE
async function selectNext(order) {
    const dailyMovie = JSON.parse(await getDailyMovie());

    ///VALIDÇÃO VISUAL
    const currentLi = document.getElementById("guess" + order);
    const currentInput = currentLi.getElementsByTagName('input')[0];

    const isMovieCorrect = await checkMovie(currentInput.value);
    ///SE ACERTAR
    if (isMovieCorrect) {
        storeStats(order);
        localStorage.setItem('complete', '1');
        const guess = order;
        copyButton.addEventListener('click', function () {
            copyToClipboard(true, guess);
        });
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
        currentLi.querySelector(".icon").src = "../assets/images/check.svg"; //Muda o icon para outro SVG;
        currentLi.classList.remove('input');
        currentLi.classList.add('correct');
        currentInput.setAttribute('readonly', true);
        currentInput.value = dailyMovie.name;

    }///SE ERRAR
    else {
        currentLi.querySelector(".icon").src = "../assets/images/x.svg"; //Muda o icon para outro SVG;
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
        nextLi.querySelector(".icon").src = "../assets/images/write.svg"; //Muda o icon para outro SVG;


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
async function checkMovie(input) {
    const dailyMovie = JSON.parse(await getDailyMovie());
    ///REMOVENDO ACENTOS
    const inputToCheck = input.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    const movieFound = dailyMovie.acceptableNames.find(acceptableName => inputToCheck.toLowerCase() === acceptableName.toLowerCase())
    return !!movieFound;
}

//TOAST
function validToast(order, isValid) {
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
    }
    else {
        toast.innerText = "FILME INVÁLIDO"
        toast.classList.add('toastW');
    }

    setTimeout(function () {
        toast.classList.add('closeToast');
    }, 3000);

    setTimeout(function () {
        toast.classList.remove('toastW');
        toast.classList.remove('toastC');
        party.confetti(answerModal);
        checkModal(order);
    }, 3500);

}

//teste de pegar json

//SORTEANDO NÚMERO ALEATÓRIO
function sortNumber(max) {
    return Math.floor(Math.random() * max)
}