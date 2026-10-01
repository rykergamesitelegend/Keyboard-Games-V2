const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatWindow = document.querySelector('.chat-window');

const defaultMessages = [
  { user: 'Milo', text: 'Yep, the chat is active and the vibes are good.' },
  { user: 'Zoe', text: 'Love the new cleaner layout.' },
  { user: 'Kai', text: 'Staff is online and ready to help.' },
];

function addMessage(user, text, isSelf = false) {
  const message = document.createElement('div');
  message.className = `message ${isSelf ? 'message-self' : ''}`;

  const userLabel = document.createElement('span');
  userLabel.className = 'user';
  userLabel.textContent = user;

  const messageText = document.createElement('p');
  messageText.textContent = text;

  message.appendChild(userLabel);
  message.appendChild(messageText);
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function saveMessages() {
  const messages = [...chatWindow.querySelectorAll('.message')].map((messageNode) => {
    const user = messageNode.querySelector('.user')?.textContent || 'Guest';
    const text = messageNode.querySelector('p')?.textContent || '';
    return { user, text };
  });

  localStorage.setItem('keyboard-games-v2-chat', JSON.stringify(messages));
}

function seedMessages() {
  const saved = localStorage.getItem('keyboard-games-v2-chat');

  if (!saved) {
    defaultMessages.forEach((item) => addMessage(item.user, item.text));
    localStorage.setItem('keyboard-games-v2-chat', JSON.stringify(defaultMessages));
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    parsed.forEach((item) => addMessage(item.user, item.text, item.user === 'You'));
  } catch (error) {
    localStorage.removeItem('keyboard-games-v2-chat');
    seedMessages();
  }
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = chatInput.value.trim();

  if (!value) {
    return;
  }

  addMessage('You', value, true);
  chatInput.value = '';
  saveMessages();
});

seedMessages();
