let flashcards =
    JSON.parse(localStorage.getItem("flashcards")) || [];

let indiceAtual = 0;
let mostrandoResposta = false;

let acertos =
    Number(localStorage.getItem("acertos")) || 0;

let erros =
    Number(localStorage.getItem("erros")) || 0;

function salvarFlashcards(){

    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );
}

function adicionar(){

    let pergunta =
        document.getElementById("pergunta").value.trim();

    let resposta =
        document.getElementById("resposta").value.trim();

    if(pergunta === "" || resposta === ""){
        alert("Preencha todos os campos.");
        return;
    }

    flashcards.push({
        pergunta: pergunta,
        resposta: resposta
    });

    salvarFlashcards();

    document.getElementById("pergunta").value = "";
    document.getElementById("resposta").value = "";

    listar();
}

function excluir(indice){

    flashcards.splice(indice,1);

    salvarFlashcards();

    listar();
}

function listar(){

    let lista =
        document.getElementById("lista");

    if(!lista){
        return;
    }

    lista.innerHTML = "";

    flashcards.forEach((card,indice)=>{

        lista.innerHTML += `
        <div class="item">
            <strong>Pergunta:</strong>
            ${card.pergunta}
            <br><br>

            <strong>Resposta:</strong>
            ${card.resposta}
            <br><br>

            <button onclick="excluir(${indice})">
                Excluir
            </button>
        </div>
        `;
    });
}

function atualizarEstudo(){

    let card =
        document.getElementById("card");

    let contador =
        document.getElementById("contador");

    if(!card){
        return;
    }

    if(flashcards.length === 0){

        card.innerHTML =
            "Nenhum flashcard cadastrado";

        contador.innerHTML = "";

        return;
    }

    if(indiceAtual >= flashcards.length){
        indiceAtual = 0;
    }

    if(mostrandoResposta){
        card.innerHTML =
            flashcards[indiceAtual].resposta;
    }
    else{
        card.innerHTML =
            flashcards[indiceAtual].pergunta;
    }

    contador.innerHTML =
        "Flashcard " +
        (indiceAtual + 1) +
        " de " +
        flashcards.length;
}

function mostrarResposta(){

    mostrandoResposta =
        !mostrandoResposta;

    atualizarEstudo();
}

function proximo(){

    if(flashcards.length === 0){
        return;
    }

    indiceAtual++;

    if(indiceAtual >= flashcards.length){
        indiceAtual = 0;
    }

    mostrandoResposta = false;

    atualizarEstudo();
}

function anterior(){

    if(flashcards.length === 0){
        return;
    }

    indiceAtual--;

    if(indiceAtual < 0){
        indiceAtual =
            flashcards.length - 1;
    }

    mostrandoResposta = false;

    atualizarEstudo();
}

function atualizarPlacar(){

    let placar =
        document.getElementById("placar");

    if(!placar){
        return;
    }

    let total = acertos + erros;

    let porcentagem = 0;

    if(total > 0){
        porcentagem =
            ((acertos / total) * 100).toFixed(1);
    }

    placar.innerHTML =
        "✅ Acertos: " + acertos +
        " | ❌ Erros: " + erros +
        " | 📊 Aproveitamento: " +
        porcentagem + "%";
}

function acertou(){

    acertos++;

    localStorage.setItem(
        "acertos",
        acertos
    );

    atualizarPlacar();

    proximo();
}

function errou(){

    erros++;

    localStorage.setItem(
        "erros",
        erros
    );

    atualizarPlacar();

    proximo();
}

function resetarPontuacao(){

    acertos = 0;
    erros = 0;

    localStorage.setItem(
        "acertos",
        0
    );

    localStorage.setItem(
        "erros",
        0
    );

    atualizarPlacar();
}
function virarCard(){

    if(flashcards.length === 0){
        return;
    }

    mostrandoResposta = !mostrandoResposta;

    atualizarEstudo();
}
function limpar(){

    flashcards = [];

    localStorage.removeItem("flashcards");

    listar();
    atualizarEstudo();
}
listar();
atualizarEstudo();
atualizarPlacar();