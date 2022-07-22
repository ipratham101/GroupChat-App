const socket = io()
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
let name;

do {
   name =  prompt("Enter your name here: ")
} while (!name);

textarea.addEventListener('keyup', (e)=>{
    if(e.key == 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }

    //now append this message to show this message in the right side of the window

appendMessage(msg, 'outgoing')
textarea.value = '';
scrollToBottom();



//send to server
socket.emit('message',msg)



}
function appendMessage(msg, type){
let mainDev = document.createElement('div');
let className = type;
mainDev.classList.add(className, 'message');


let markup = `
<h4>${msg.user}</h4>
<p>
${msg.message}

`
mainDev.innerHTML = markup;
messageArea.appendChild(mainDev);
}

//receive messages

socket.on('message', (msg)=>{
   appendMessage(msg, 'incoming');
   scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}