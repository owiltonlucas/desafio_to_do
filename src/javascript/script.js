const button = document.getElementById('button');
const menu = document.getElementById('menu');
const fechar = document.getElementById('fechar');

button.addEventListener('click', () => {
    menu.classList.add('show');
});

fechar.addEventListener('click', () => {
    menu.classList.remove('show');
});
