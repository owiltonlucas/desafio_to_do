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

// Inicialização do array para armazenar as tarefas
let arrayObject = [];
let usedIds = new Set();

function openForm() {
    menu.classList.add("opened")
}

function closeForm() {
    menu.classList.remove("opened");
}

function closeFormButton() {
    menu.classList.remove("opened");
}

// Função para salvar as tarefas no localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(arrayObject));
}

// Função para carregar as tarefas do localStorage
function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        arrayObject = JSON.parse(savedTasks);
    }
}

function salvarTask() {
    const name = nome.value;
    const descricao = desc.value;

    if (name === null || name === '') {
        return;
    }

    let idAleatorio;
    do {
        idAleatorio = Date.now();
    } while (usedIds.has(idAleatorio));

    usedIds.add(idAleatorio);

    const objetoTarefa = {
        name,
        descricao,
        id: idAleatorio,
        selected: false
    };

    arrayObject.push(objetoTarefa);

    // Salva no localStorage após adicionar a tarefa
    saveToLocalStorage();

    renderTasks();
    closeForm();
    nome.value = '';
    desc.value = '';
}

// Adicione as funções abaixo de salvarTask

function editarTask(index) {
    const tarefa = arrayObject[index];

    nome.value = tarefa.name;
    desc.value = tarefa.descricao;

    openForm();

    salvar.onclick = function () {
        const novoNome = nome.value;
        const novaDescricao = desc.value;

        if (novoNome === null || novoNome === '') {
            return;
        }

        arrayObject[index].name = novoNome;
        arrayObject[index].descricao = novaDescricao;

        // Salva no localStorage após editar a tarefa
        saveToLocalStorage();

        renderTasks();
        closeForm();
        nome.value = '';
        desc.value = '';

        salvar.onclick = salvarTask;
    };
}

function deletarTask(index) {
    arrayObject.splice(index, 1);

    // Salva no localStorage após deletar a tarefa
    saveToLocalStorage();

    renderTasks();
    salvar.onclick = salvarTask;
}



// Função para renderizar as tarefas
function renderTasks() {
    const emptyStateContainer = document.querySelector('.empty-state-container'); 

    // Limpa o container antes de adicionar novas tarefas
    emptyStateContainer.innerHTML = '';

    // Verifica se o array está vazio
    if (arrayObject.length === 0) {
        emptyStateContainer.style.display = 'block';
        emptyStateContainer.innerHTML = '<span class="span-1">Você ainda não criou nenhuma tarefa</span></br><span class="span-2">Não se preocupe, suas novas tarefas irão aparecer aqui.</span>';
    } else {
        emptyStateContainer.style.display = 'block';

        arrayObject.forEach(function(item, index) {
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task-container');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.selected;
            checkbox.onchange = function () {
                item.selected = checkbox.checked;
                // Atualiza o localStorage quando o checkbox é alterado
                saveToLocalStorage();
            };

            const taskText = document.createElement('span');
            taskText.textContent = `${item.name} ${item.descricao}`;

            const editButton = document.createElement('button');
            editButton.innerHTML = `<img src="./src/images/edit.svg">`;
            editButton.onclick = function () {
                editarTask(index);
            };

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `<img src="./src/images/delete.svg">`;
            deleteButton.onclick = function () {
                deletarTask(index);
            };

            taskContainer.appendChild(checkbox);
            taskContainer.appendChild(taskText);
            taskContainer.appendChild(editButton);
            taskContainer.appendChild(deleteButton);

            emptyStateContainer.appendChild(taskContainer);
        });
    }
}
// Carrega as tarefas do localStorage ao iniciar a página
window.onload = function() {
    loadFromLocalStorage();
    renderTasks();
};