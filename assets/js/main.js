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

//BUTTONS
const howtoplay = document.getElementById('howtoplay');
const info = document.getElementById('info');
const daily = document.getElementById('daily');
const answerModal = document.getElementById('answerModal');
const overlay = document.getElementById("overlay");

let dailyMovie;

//INICIA
guess1Input.focus();
const dayLocalStore = dayjs(localStorage.getItem('day')) || dayjs().format("YYYY-MM-DD");
if (dayjs().isAfter(dayLocalStore, 'day')){
    //MUDOU O DIA
    localStorage.setItem('day', dayjs());
    console.log('mudou o dia');
    nextDay();
}
else {
    //CONTINUA NO MESMO DIA
    localStorage.setItem('day', dayjs().format("YYYY-MM-DD"));
    console.log('continua o mesmo dia');
    sameDay();
}

async function sameDay(){
    dailyMovie = JSON.parse(localStorage.getItem('answer'));
    await setEmojis();
}
async function nextDay(){
    getDatabase();
    dailyMovie = JSON.parse(localStorage.getItem('answer'));
}

async function setEmojis() {

    emoji1.innerText = await dailyMovie.emoji[0];
    emoji2.innerText = await dailyMovie.emoji[1];
    emoji3.innerText = await dailyMovie.emoji[2];
    emoji4.innerText = await dailyMovie.emoji[3];
    emoji5.innerText = await dailyMovie.emoji[4];
}

//PUXANDO O BANCO DE DADOS
async function getDatabase() {
    const response = await fetch("database.json");//ler a database dos filmes cadastrados e retornar o array completo
    const database = await response.json();//transformar em json

    const responseBd = await fetch(`https://api.adrianoneres.me/cinefilo-api/daily-movie?max=${database.length - 1}`);//ler api e retornar o filme
    const movieDay = await responseBd.json();//transformar a resposta em json

    outDatabase(database, movieDay.id_movie);//passar os valores para outra função
};

async function outDatabase(val, indice) {

    const movie = await val[indice];
    let moviesDatabase = await val;

    await localStorage.setItem('answer', JSON.stringify(movie));
    await setEmojis();
}

//MODAL CONFIG
howtoplay.addEventListener('click', function () {
    document.getElementById("howtoplayModal").style.display = "block";
    overlay.style.display = "block";
})
info.addEventListener('click', function () {
    document.getElementById("infoModal").style.display = "block";
    overlay.style.display = "block";
})
daily.addEventListener('click', function () {
    document.getElementById("dailyModal").style.display = "block";
    overlay.style.display = "block";
})

overlay.addEventListener('click', function () {
    document.getElementById("howtoplayModal").style.display = "none";
    document.getElementById("infoModal").style.display = "none";
    document.getElementById("dailyModal").style.display = "none";
    document.getElementById("answerModal").style.display = "none";
    overlay.style.display = "none";
})

//MODAL DE RESPOSTA
function checkModal(order) {
    answerModal.getElementsByTagName('h3')[0].innerText = (`Resposta: ${dailyMovie.name}`);
    answerModal.style.display = "block";
    overlay.style.display = "block";
}

//COPIAR PROGRESSO
const copyButton = document.getElementById('clip');
function copyToClipboard(correct, order) {
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
    if (correct) {
        navigator.clipboard.writeText(`Joguei cinefi.lol #${order} ${emoji1.innerText} | ${order}/5`);
    }
    else
        navigator.clipboard.writeText(`Joguei cinefi.lol #${order} ${emoji1.innerText} | X/5`);
}

//RESIZE
function setWindowHeight() {
    const height = `${window.innerHeight - 50}px`;
    document.getElementById('container').style.height = height;
}
window.addEventListener("resize", setWindowHeight, false);
setWindowHeight();

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
function selectNext(order) {
    ///VALIDÇÃO VISUAL
    const currentLi = document.getElementById("guess" + order);
    const currentInput = currentLi.getElementsByTagName('input')[0];

    ///SE ACERTAR
    if (checkMovie(currentInput.value)) {
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

        ///VOCÊ PERDEU
        if (order === 5) {
            copyButton.addEventListener('click', function () {
                copyToClipboard(false, order);
            });
            setTimeout(function () {
                checkModal(order);
            }, 1500);
        }
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