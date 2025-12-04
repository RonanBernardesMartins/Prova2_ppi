var resultadoElement = document.getElementById('resultado');

function insert(caracter) {
    var expressaoAtual = resultadoElement.innerHTML;
    resultadoElement.innerHTML = expressaoAtual + caracter;
}

function insertDot() {
    var expressaoAtual = resultadoElement.innerHTML;
    
    if (expressaoAtual === "") {
        resultadoElement.innerHTML = "0.";
        return;
    }
    
    var partes = expressaoAtual.split(/[\+\-\*\/]/g);
    var ultimaParte = partes[partes.length - 1];
    
    if (ultimaParte.includes('.')) {
        return;
    }
    
    if (ultimaParte === "") {
        resultadoElement.innerHTML += "0.";
    } else {
        resultadoElement.innerHTML += ".";
    }
}

function clean() {
    resultadoElement.innerHTML = "";
}

function calcular() {
    var expressao = resultadoElement.innerHTML;
    
    if (expressao) {
        try {
            resultadoElement.innerHTML = eval(expressao);
        } catch (e) {
            resultadoElement.innerHTML = "Erro";
        }
    } else {
        resultadoElement.innerHTML = "";
    }
}