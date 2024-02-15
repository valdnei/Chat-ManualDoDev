//Login Elements
const login = document.querySelector('.login');
const loginForm = login.querySelector('.login-form');
const loginInput = login.querySelector('.login-input');

//Chat Elements
const chat = document.querySelector('.chat');
const chatForm = chat.querySelector('.chat-form');
const chatInput = chat.querySelector('.chat-input');
const chatMessage = chat.querySelector('.chat-message');

    const colors = [
        'cadetblue',
        'darkgoldenrod',
        'cornflowerblue',
        'orange',
        'darkkhaki',
        'hotpink',
        'gold',
    ]
    const user = {
        id : "",
        name : "",
        color: "",
    }

    let websocket;

    const createMessageSelfElement = (content) => {
    
        const div = document.createElement("div");
        div.classList.add("message-self");
        div.innerHTML = content;

        return div;
    }

    const createMessageOtherElement = (content, sender, senderColor) => {
    
        const div = document.createElement("div");
        const span = document.createElement("span");

        div.classList.add("message-other");
        span.classList.add("message-sender");
        span.style.color = senderColor;

        div.appendChild(span);

        span.innerHTML = sender;
        div.innerHTML += content;

        return div;
    }
    
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    const scrollScreen = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        })
    }
    const processMessage = ({data}) => {
        const {userId, userName, userColor, content} = JSON.parse(data);

        const message = userId == user.id 
        ? createMessageSelfElement(content)
        : createMessageOtherElement(content, userName, userColor);
        
        chatMessage.appendChild(message);

        scrollScreen();
    }

    const handleLogin = (event) => {
        event.preventDefault(); // inibe o envio da página
        user.id = crypto.randomUUID(); // crypto é uma função nativa do JavaScript
        user.name = loginInput.value;
        user.color = getRandomColor();

        login.style.display = "none";
        chat.style.display = "flex";

        websocket = new WebSocket('ws://localhost:8080');
        websocket.onmessage = processMessage
    }
    
    const sendMessage = (event) => {
        event.preventDefault(); // inibe o envio da pág
        
        const message = {
            userId: user.id,
            userName: user.name,
            userColor: user.color,
            content: chatInput.value,
        }

        websocket.send(JSON.stringify(message));

        chatInput.value = "";
    }

    loginForm.addEventListener('submit', handleLogin);
    chatForm.addEventListener('submit', sendMessage);