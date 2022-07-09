function Gerador() {
    this.letras = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'x', 'z', 'y', 'w'
    ];

    this.especiais = [
        '!', '@', '#', '$', '&', '(', ')', '_', '+', '-',
        '*', '/', '.', ',', '?'
    ];

    this.randomNumber = (max) => {
        if (!max)
            max = 10;

        return Math.floor((Math.random() * max));
    }

    this.randomCaracter = () => {
        var tam = this.letras.length;
        var indice = this.randomNumber(tam);

        return this.letras[indice];
    }

    this.randomSpecial = () => {
        var tam = this.especiais.length;
        var indice = this.randomNumber(tam);

        return this.especiais[indice];
    }

    this.gerarPadrao = (quantidade, isEspecial, formato) => {
        var senha = new Array();
        this.aleatorio = this.randomNumber;
        var alternativas = 2;

        if (isEspecial)
            alternativas = 3;

        for (var i = 0; i < quantidade; i++) {
            var opcao = this.aleatorio(alternativas);
            var valor = null;

            if (opcao === 0) {
                valor = this.randomCaracter();
                valor = this.formatoSenha(valor, formato);
            }
            else if (opcao === 1)
                valor = this.randomNumber();
            else
                valor = this.randomSpecial();

            senha.push(valor);
        }
        return senha;
    }

    this.gerarLetras = (quantidade, isEspecial, formato) => {
        var senha = new Array();
        this.aleatorio = this.randomNumber;
        var alternativas = 1;

        if (isEspecial)
            alternativas = 2;

        for (var i = 0; i < quantidade; i++) {
            var opcao = this.aleatorio(alternativas);
            var valor = null;

            if (opcao === 0) {
                valor = this.randomCaracter();
                valor = this.formatoSenha(valor, formato);
            }
            else
                valor = this.randomSpecial();

            senha.push(valor);
        }

        return senha;
    }

    this.gerarNumeros = (quantidade) => {
        var senha = new Array();

        for (var i = 0; i < quantidade; i++) {
            var valor = null;

            valor = this.randomNumber();
            senha.push(valor);
        }

        return senha;
    }

    this.formatoSenha = (valor, formato) => {

        if (formato === 'PADRAO') {
            var opcao = this.randomNumber(2);
            if (opcao === 1)
                valor = valor.toUpperCase();
        }
        else if (formato === 'MAIUSCULO')
            valor = valor.toUpperCase();

        return valor;
    }
}

function Controle() {
    this.radio = document.getElementsByName('tipo');
    this.checkBox = document.getElementById('especiais');
    this.range = document.getElementById('quantidade');
    this.comboBox = document.getElementById('forma');
    this.botao = document.getElementsByClassName('botao')[0];
    this.senha = document.getElementsByClassName('senha')[0];

    this.init = (metodo) => {
        this.botao.addEventListener('click', metodo, false);
    }

    this.getSimbolo = () => {
        var marcado = null;

        this.radio.forEach((input) => {
            if (input.checked)
                marcado = input;
        });

        return marcado.value;
    }

    this.getCaracteresEspeciais = () => {
        return this.checkBox.checked;
    }

    this.getTamanho = () => {
        return this.range.value;
    }

    this.getFormato = () => {
        return this.comboBox.value;
    }
}

function App() {
    this.controle = new Controle();
    this.gerador = new Gerador();

    this.init = () => {
        this.controle.init(this.gerar);
    }

    this.getSenha = () => {
        var input = this.controle.getSimbolo();
        var tam = this.controle.getTamanho();
        var booleano = this.controle.getCaracteresEspeciais();
        var formato = this.controle.getFormato();
        var vetor = null;

        if (input === 'AMBOS')
            vetor = this.gerador.gerarPadrao(tam, booleano, formato);

        else if (input === 'NUMEROS')
            vetor = this.gerador.gerarNumeros(tam);

        else if (input === 'LETRAS')
            vetor = this.gerador.gerarLetras(tam, booleano, formato);

        return vetor
    }

    this.gerar = () => {
        var vetor = this.getSenha();
        var senha = '';
        vetor.forEach((valor) => {
            if (valor)
                senha += valor;
        });
        this.controle.senha.textContent = senha;
    }
}


const app = new App();
app.init();