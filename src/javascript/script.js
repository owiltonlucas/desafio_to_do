const button = document.getElementById('button');
const menu = document.getElementById('menu');
const fechar = document.getElementById('fechar');
const salvar = document.getElementById('salvar');

// Função para carregar as tarefas do localStorage e exibir na interface
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tarefasContainer = document.querySelector('.tarefas');

    if (tarefas.length > 0) {
        tarefasContainer.innerHTML = '';
        tarefas.forEach((tarefa, index) => {
            const tarefaItem = document.createElement('div');
            tarefaItem.classList.add('tarefa-item');
            tarefaItem.innerHTML = `
                <span>${tarefa.nome}</span>
                <button class="editar">
                    <img src="src/images/edit.svg" alt="Editar" />
                </button>
                <button class="excluir">
                    <img src="src/images/delete.svg" alt="Excluir" />
                </button>
            `;

            // Função para excluir a tarefa
            tarefaItem.querySelector('.excluir').addEventListener('click', function() {
                excluirTarefa(index);
            });

            // Função para editar a tarefa
            tarefaItem.querySelector('.editar').addEventListener('click', function() {
                editarTarefa(index);
            });

            tarefasContainer.appendChild(tarefaItem);
        });
    } else {
        tarefasContainer.innerHTML = `
            <span class="span-1">Você ainda não criou nenhuma tarefa</span>
            <span class="span-2">Não se preocupe, suas novas tarefas irão aparecer aqui.</span>
        `;
    }
}

// Função para salvar uma nova tarefa
salvar.addEventListener('click', () => {
    const nomeTarefa = document.getElementById('nome_content').value;

    if (nomeTarefa.trim() !== '') {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push({ nome: nomeTarefa });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        carregarTarefas();
        menu.classList.remove('show');
        document.getElementById('nome_content').value = '';
    }
});

// Função para excluir uma tarefa
function excluirTarefa(index) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    carregarTarefas();
}

// Função para editar uma tarefa
function editarTarefa(index) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    document.getElementById('nome_content').value = tarefas[index].nome;
    tarefas.splice(index, 1); // Remove a tarefa que está sendo editada temporariamente
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    menu.classList.add('show');
}

// Mostrar o menu ao clicar no botão "Adicionar tarefas"
button.addEventListener('click', () => {
    menu.classList.add('show');
});

// Fechar o menu ao clicar no botão "Fechar"
fechar.addEventListener('click', () => {
    menu.classList.remove('show');
});

// Carregar as tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', carregarTarefas);
