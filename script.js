let flashcards =
    JSON.parse(localStorage.getItem("flashcards")) || [];

let indiceAtual = 0;
let mostrandoResposta = false;

function salvar(){
    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );
}

function adicionar(){

    let pergunta =
        document.getElementById("pergunta").value;

    let resposta =
        document.getElementById("resposta").value;

    if(!pergunta || !resposta){
        return;
    }

    flashcards.push({
        pergunta,
        resposta
    });

    salvar();

    document.getElementById("pergunta").value = "";
    document.getElementById("resposta").value = "";

    listar();
}

function excluir(indice){

    flashcards.splice(indice,1);

    salvar();

    listar();
}

function listar(){

    let lista =
        document.getElementById("lista");

    if(!lista) return;

    lista.innerHTML = "";

    flashcards.forEach((card,indice)=>{

        lista.innerHTML += `
        <div class="item">
            <b>${card.pergunta}</b>
            <br>
            ${card.resposta}
            <br><br>
            <button onclick="excluir(${indice})">
                Excluir
            </button>
        </div>`;
    });
}

function atualizarEstudo(){

    let card =
        document.getElementById("card");

    let contador =
        document.getElementById("contador");

    if(!card) return;

    if(flashcards.length === 0){
        card.innerHTML =
            "Nenhum flashcard cadastrado";
        return;
    }

    card.innerHTML = mostrandoResposta
        ? flashcards[indiceAtual].resposta
        : flashcards[indiceAtual].pergunta;

    contador.innerHTML =
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

    indiceAtual++;

    if(indiceAtual >= flashcards.length){
        indiceAtual = 0;
    }

    mostrandoResposta = false;

    atualizarEstudo();
}

function anterior(){

    indiceAtual--;

    if(indiceAtual < 0){
        indiceAtual =
            flashcards.length - 1;
    }

    mostrandoResposta = false;

    atualizarEstudo();
}

listar();
atualizarEstudo();