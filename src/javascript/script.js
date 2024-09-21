const button = document.getElementById("button");
const menu = document.getElementById("menu");
const fechar = document.getElementById("fechar");
const salvar = document.getElementById("salvar");
const closed = document.getElementById("closed");
const nome = document.getElementById("nome_content");
const desc = document.getElementById("desc_content")
const span1 = document.querySelector('.span-1')
const span2 = document.querySelector('.span-2')

function addTask() {
    button.addEventListener('click', function() {
        menu.classList.add("opened")
    })
    
    fechar.addEventListener('click', function() {
        menu.classList.remove("opened")
    })
}

addTask();

function salvarTask() {
    salvar.addEventListener('click', function() {
        menu.classList.remove("opened")
    })
}

salvarTask();

closed.addEventListener('click', function() {
    menu.classList.remove("opened")
})

let arrayObject = []
let usedIds = new Set(); 

salvar.addEventListener('click', function(e) {
    e.preventDefault();
    const name = nome.value;
    const descricao = desc.value;
    let idAleatorio;
    do {
        idAleatorio = Date.now()
    } while (usedIds.has(idAleatorio)); 

    usedIds.add(idAleatorio);
    
    const objetoTarefa = {
        name,
        descricao, 
        id: idAleatorio,
        selected: false
    };

    arrayObject.push(objetoTarefa)

    arrayObject.forEach(function(arrayObject) {
        console.log(arrayObject)
    })
});

