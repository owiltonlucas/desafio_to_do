const button = document.getElementById("button");
const menu = document.getElementById("menu");
const fechar = document.getElementById("fechar");
const salvar = document.getElementById("salvar");
const closed = document.getElementById("closed");
const nome = document.getElementById("nome_content");
const desc = document.getElementById("desc_content")
const span1 = document.querySelector('.span-1');
const span2 = document.querySelector('.span-2');
const editar = document.getElementById('button-edit');
const deletar = document.getElementById('button-delete');
const emptystate = document.querySelector('.empty-state')

function openForm() {
    menu.classList.add("opened")
}

function closeForm() {
    menu.classList.remove("opened");
}

let arrayObject = []
let usedIds = new Set(); 

function salvarTask() {
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

    arrayObject.forEach(function(item) {
        console.log(item)

        if (arrayObject.lenght === 0) {
            emptystate.style.display = 'block'
        } else {
            emptystate.style.display = 'none';
            const itemLista = document.createElement('li');
            itemLista.textContent = item;
            appendChild(itemLista);
        }
    })
}
