// Use your existing JavaScript code

// Chat Feature Logic
const chatMessages = document.getElementById('chat-messages');
const userMessageInput = document.getElementById('userMessage');
const sendMessageButton = document.getElementById('sendMessage');

// Handle AI Responses
function handleAIResponse(message) {
    let response = '';
    if (message.includes('hello') || message.includes('hi')) {
        response = 'Hello! How can I assist you today?';
    } else if (message.includes('weather')) {
        response = 'Try saying, "What is the weather in [City Name]?"';
    } else if (message.includes('time')) {
        response = `The current time is ${new Date().toLocaleTimeString()}`;
    } else {
        response = 'Sorry, I am still learning and could not understand that.';
    }
    return response;
}

// Chat Message Logic
sendMessageButton.addEventListener('click', () => {
    const userMessage = userMessageInput.value.trim();
    if (!userMessage) return;

    const userMsgDiv = document.createElement('div');
    userMsgDiv.textContent = `You: ${userMessage}`;
    userMsgDiv.style.color = 'blue';
    chatMessages.appendChild(userMsgDiv);

    const aiResponse = handleAIResponse(userMessage.toLowerCase());
    const aiMsgDiv = document.createElement('div');
    aiMsgDiv.textContent = `AI: ${aiResponse}`;
    aiMsgDiv.style.color = 'green';
    chatMessages.appendChild(aiMsgDiv);

    userMessageInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
