// coded by Dikidjatar
(function() {
  
  const sendMessage = document.querySelector('.send');
  const socket = io();
  
  sendMessage.addEventListener("click", function() {
    let message = document.querySelector('.publisher-input').value;
    if (message.length == 0) return;
    renderMessage({text:message});
    socket.emit('prompt', {text:message});
    message = '';
  });
  
  socket.on('chatbot', function(message) {
    const containerBot = document.querySelector('.area-chat');
    const el = document.createElement('div');
    let messageHtml = `
      <div class="media media-chat">
        <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
        <p>${message.chat}</p>
      </div>
    `;
    el.innerHTML = messageHtml;
    containerBot.appendChild(el);
  });
  
  function renderMessage(message) {
    const containerMessage = document.querySelector('.area-chat');
    let el = document.createElement('div');
    let messageHtml = `
      <div class="media media-chat media-chat-reverse">
         <div clas="media-body">
            <p>${message.text}</p>
         </div>
      </div>
    `;
    el.innerHTML = messageHtml;
    containerMessage.appendChild(el);
  }
  
})();