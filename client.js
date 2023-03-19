const socket = io('https://syed74293.glitch.me');

const form = document.getElementById('msgform');
const message = document.getElementById('msg');
const render = document.querySelector('#chat');
const audio = new Audio('./alert.mp3');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = message.value;
    appendmsg('You', msg, 'right');
    socket.emit('send', msg);
    message.value = '';
});

const append = (msg, pos) => {
    let element = document.createElement('div');
    element.classList.add('msg');
    element.classList.add(pos);
    element.innerHTML = `<h6>${msg}</h6>`;
    render.appendChild(element);
    audio.play();
    if ((render.scrollTop) > (render.scrollHeight - 700))
        render.scrollTo(0, render.scrollHeight);
}

const appendmsg = (user, msg, pos) => {
    let element = document.createElement('div');
    element.classList.add('msg');
    element.classList.add(pos);
    element.innerHTML = `<h6>${user}:</h6><h4>${msg}</h4>`;
    render.appendChild(element);
    if (pos == 'left')
        audio.play();
    if ((render.scrollTop) > (render.scrollHeight - 700))
        render.scrollTo(0, render.scrollHeight);
}

let name = prompt('Enter Your Name to Join Chat Bot');

socket.emit('new-user-joined', name);
socket.on('user-joined', name => {
    append(`${name} joined Chat Bot`, 'left');
});

socket.on('receive', data => {
    appendmsg(data.name, data.message, 'left');
});

socket.on('leave', name => {
    append(`${name} left Chat Bot`, 'left');
});
