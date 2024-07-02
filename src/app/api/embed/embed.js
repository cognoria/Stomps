// Function to embed the Chatbase chatbot
async function embedChatbaseChatbot() {
    // Check if the chatbot is already embedded
    if (window.embeddedChatbotConfig?.embedded) return;

    // Constants for styling
    const buttonHeight = '60px';
    const buttonWidth = '60px';
    const iconSize = '24px';
    const buttonColor = '#0077b6';

    const currentUrl = new URL(document.currentScript.src);
    let origin = currentUrl.origin;

    let stompsSrc = document.currentScript.getAttribute('domain') ||
        window.embeddedChatbotConfig?.domain

    let chatbotId = document.currentScript.getAttribute('chatbotId') ||
        window.embeddedChatbotConfig?.chatbotId ||
        document.id;

    // Create elements for the chatbot button and window
    const chatButton = document.createElement('div');
    chatButton.setAttribute('id', 'stomps-bubble-button');

    const chatWindow = document.createElement('iframe');
    chatWindow.setAttribute('id', 'stomps-bubble-window');

    // Styling for the chat button
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '16px';
    chatButton.style.right = '16px';
    chatButton.style.width = window.innerWidth < 440 ? '50px' : buttonWidth;
    chatButton.style.height = window.innerWidth < 440 ? '50px' : buttonHeight;
    chatButton.style.display = 'flex';
    chatButton.style.alignItems = 'center';
    chatButton.style.justifyContent = 'center';
    chatButton.style.borderRadius = '50%';
    chatButton.style.backgroundColor = buttonColor;
    chatButton.style.color = 'black';
    chatButton.style.fontSize = '16px';
    chatButton.style.fontWeight = 'bold';
    chatButton.style.cursor = 'pointer';
    chatButton.innerHTML = getClosedChatHTML(buttonColor);

    // Styling for the chat window
    chatWindow.style.position = 'fixed';
    chatWindow.style.bottom = window.innerWidth < 440 ? '60px' : '80px';
    chatWindow.style.right = window.innerWidth < 440 ? '5%' : '50px';
    chatWindow.style.width = '90%';
    chatWindow.style.maxWidth = '400px';
    chatWindow.style.height = '85vh';
    chatWindow.style.border = 'none';
    chatWindow.style.backgroundColor = 'white';
    chatWindow.style.display = 'none';
    chatWindow.style.borderRadius = '30px';

    // Set the source URL for the chat window iframe
    chatWindow.src = `${stompsSrc}/widget/${chatbotId}?host=${origin}`;

    // Event listener to toggle chat window visibility
    chatButton.addEventListener('click', () => {
        if (chatWindow.style.display === 'none') {
            chatWindow.style.display = 'block'
            chatButton.innerHTML = getOpenChatHTML(buttonColor);
            sendMessageIframe({ openChat: true });
        } else {
            chatButton.innerHTML = getClosedChatHTML(buttonColor);
            chatWindow.style.display = 'none'
            sendMessageIframe({ closeChat: true });
        }
    });


    // Add event listeners for button hover
    chatButton.addEventListener('mouseenter', () => {
        chatButton.style.transform = 'scale(1.08)';
    });
    chatButton.addEventListener('mouseleave', () => {
        chatButton.style.transform = 'scale(1)';
    });

    function sendMessageIframe(message) {
        const iframe = document.getElementById('stomps-bubble-window');
        const childWindow = iframe.contentWindow;
        childWindow.postMessage(message, '*');
    }

    // Handle window resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth < 440) {
            chatWindow.style.right = '5%';
            chatWindow.style.bottom = '60px'
            chatButton.style.width = '50px';
            chatButton.style.height = '50px';
        } else {
            chatWindow.style.right = '50px';
            chatWindow.style.bottom = '80px'
            chatButton.style.width = buttonWidth;
            chatButton.style.height = buttonHeight;
        }
    });

    window.addEventListener('message', function (event) {
        if (event.origin !== stompsSrc) return;

        // Check the message content
        if (event.data.closeWidget) {
            chatButton.innerHTML = getClosedChatHTML(buttonColor);
            chatWindow.style.display = 'none'
        }
    });

    // Append elements to the document body
    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);

    // Set the flag indicating the chatbot is embedded
    window.embeddedChatbotConfig.embedded = true;
}

// Function to get the HTML for the open chat state
function getOpenChatHTML(buttonColor) {
    return `
      <svg id="chatIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.3" stroke="${buttonColor}">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    `;
}

// Function to get the HTML for the closed chat state
function getClosedChatHTML(buttonColor) {
    return `
      <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.3" stroke="${buttonColor}">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    `;
}


function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(embedChatbaseChatbot)
