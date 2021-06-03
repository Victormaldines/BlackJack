let carta1 = document.getElementById('carta1');
let carta2 = document.getElementById('carta2');

let btnIniciar = document.getElementById('btnIniciar');
let btnReiniciar = document.getElementById('btnReiniciar');
let btnJogar1 = document.getElementById('btnJogar1');
let btnJogar2 = document.getElementById('btnJogar2');
let btnParar1 = document.getElementById('btnParar1');
let btnParar2 = document.getElementById('btnParar2');

let placar1 = document.getElementById('placar1');
let placar2 = document.getElementById('placar2');
let pontos1 = 0;
let pontos2 = 0;

let vencedor = document.getElementById('vencedor');
let resultado;

let parou1 = false;
let parou2 = false;

function iniciar() {
    $(btnIniciar).attr('disabled', 'disabled');
    $(btnIniciar).removeClass('btn-success');
    $(btnIniciar).addClass('btn-dark');

    liberarBtnJogar1();
    liberarBtnJogar2();
}

function valorAleatorio() {

    let min = Math.ceil(1);
    let max = Math.floor(13);

    let aleatorio = Math.floor(Math.random() * (max - min)) + min;

    return aleatorio;
}

function jogar1() {
    liberarReiniciar();

    parou2 = false

    let valor = valorAleatorio();
    pontos1 += valor;

    $(carta1).attr('src', '/images/' + valor + '.png');

    liberarBtnParar1();
    bloquearBtnJogar2();

    $(placar1).text(pontos1);

    // Lógica do jogo
    //Jogador 2 Ganhou! se retornar 1
    resultado = logica(pontos1, 1);

    if (resultado == 0 || resultado == 1 || resultado == 3) {
        $(vencedor).removeClass('invisible');

        if (resultado == 1) {
            $(vencedor).text('Jogador 2 venceu!');
        } else if (resultado == 3) {
            $(vencedor).text('Jogador 1 venceu!');
        } else if (resultado == 0) {
            $(vencedor).text('Jogadores empataram!');
        }
    }
}

function jogar2() {
    liberarReiniciar();

    parou1 = false;

    let valor = valorAleatorio();
    pontos2 += valor;

    $(carta2).attr('src', '/images/' + valor + '.png');

    liberarBtnParar2();
    bloquearBtnJogar1();

    $(placar2).text(pontos2);
    // Jogador 1 Ganhou! se retornar 2
    resultado = logica(pontos2, 2);

    if (resultado == 0 || resultado == 2 || resultado == 3) {
        $(vencedor).removeClass('invisible');

        if (resultado == 2) {
            $(vencedor).text('Jogador 1 venceu!');

        } else if (resultado == 3) {
            $(vencedor).text('Jogador 2 Venceu!');

        } else if (resultado == 0) {
            $(vencedor).text('Jogadores empataram!');
        }
    }

}

function parar1() {

    bloquearBtnJogar1();
    bloquearBtnParar1();

    parou1 = true;

    if (!parou1 || !parou2) {
        liberarBtnJogar2();
        liberarBtnParar2();
    }

    $(vencedor).text(logicaParou());
}

function parar2() {

    bloquearBtnJogar2();
    bloquearBtnParar2();

    parou2 = true;

    if (!parou1 || !parou2) {
        liberarBtnJogar1();
        liberarBtnParar1();
    }

    $(vencedor).text(logicaParou());
}

function logica(auxPontos, player) {

    if (auxPontos >= 21) { // Jogo Acaba
        bloquearBtnJogar1();
        bloquearBtnJogar2();

        bloquearBtnParar1();
        bloquearBtnParar2()

        pontos1 = 0;
        pontos2 = 0;
        if (auxPontos > 21) { // Jogador Perde
            return player;
        } else if (auxPontos == 21) { // Jogador Ganha
            return 3;
        } 
    }
}

function logicaParou() {
    if (parou1 == true && parou2 == true) {
        $(vencedor).removeClass('invisible');

        if (placar1.innerHTML == placar2.innerHTML) {
            return 'Jogadores empataram!';
        } else if (placar1.innerHTML > placar2.innerHTML) {
            return 'Jogador 1 venceu!';
        } else if (placar1.innerHTML < placar2.innerHTML) {
            return 'Jogador 2 venceu!';
        }
    }
}

function reiniciar() {
    bloquearReiniciar();
    
    $(placar1).text(0);
    $(placar2).text(0);

    $(vencedor).addClass('invisible');

    $(carta1).attr('src', './images/0.png');
    $(carta2).attr('src', './images/0.png');

    pontos1 = 0;
    pontos2 = 0;

    parou1 = false;
    parou2 = false;

    liberarBtnJogar1();
    liberarBtnJogar2();
    bloquearBtnParar1();
    bloquearBtnParar2();
}

// Reiniciar
function liberarReiniciar() {
    $(btnReiniciar).removeAttr('disabled');
    $(btnReiniciar).removeClass('btn-dark');
    $(btnReiniciar).addClass('btn-success');
}

function bloquearReiniciar() {
    $(btnReiniciar).attr('disabled', 'disabled');
    $(btnReiniciar).removeClass('btn-success');
    $(btnReiniciar).addClass('btn-dark');
}

// Liberar Jogadores
function liberarBtnJogar1() {
    $(btnJogar1).removeClass('btn-dark');
    $(btnJogar1).addClass('btn-success');
    $(btnJogar1).removeAttr('disabled');
}

function liberarBtnJogar2() {
    $(btnJogar2).removeClass('btn-dark');
    $(btnJogar2).addClass('btn-success');
    $(btnJogar2).removeAttr('disabled');
}

function liberarBtnParar1() {
    $(btnParar1).removeAttr('disabled');
    $(btnParar1).removeClass('btn-dark');
    $(btnParar1).addClass('btn-warning');
};

function liberarBtnParar2() {
    $(btnParar2).removeAttr('disabled');
    $(btnParar2).removeClass('btn-dark');
    $(btnParar2).addClass('btn-warning');
}
// Bloquear Jogadores
function bloquearBtnJogar1() {
    $(btnJogar1).attr('disabled', 'disabled');
    $(btnJogar1).removeClass('btn-success');
    $(btnJogar1).addClass('btn-dark');
}

function bloquearBtnJogar2() {
    $(btnJogar2).attr('disabled', 'disabled');
    $(btnJogar2).removeClass('btn-success');
    $(btnJogar2).addClass('btn-dark');
}

function bloquearBtnParar1() {
    $(btnParar1).attr('disabled', 'disabled');
    $(btnParar1).removeClass('btn-warning');
    $(btnParar1).addClass('btn-dark');
}

function bloquearBtnParar2() {
    $(btnParar2).attr('disabled', 'disabled');
    $(btnParar2).removeClass('btn-warning');
    $(btnParar2).addClass('btn-dark');
}