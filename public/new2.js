async function embedChatbaseChatbot() {
    const widgetConfig = window.embeddedChatbotConfig;
    if (widgetConfig?.embedded) return;

    const buttonSize = window.innerWidth < 440 ? '50px' : '60px';
    const iconSize = window.innerWidth < 440 ? '20px' : '24px';
    const buttonColor = '#0077b6';

    const currentUrl = new URL(document.currentScript.src);
    const origin = currentUrl.origin;
    const stompsSrc = document.currentScript.getAttribute('domain') || widgetConfig?.domain;
    const chatbotId = document.currentScript.getAttribute('chatbotId') || widgetConfig?.chatbotId || document.id;

    const widgetStyle = await getWidgetStyle(stompsSrc, chatbotId);

    const chatButton = createButton();
    const chatWindow = createWindow();

    chatWindow.src = `${stompsSrc}/widget/${chatbotId}?host=${origin}`;
    
    if (widgetStyle) {
        applyButtonStyle(chatButton, widgetStyle);
    }

    const bubbleContainer = document.createElement('div');
    bubbleContainer.id = 'stomps-bubble-window';
    bubbleContainer.style.display = 'block';
    bubbleContainer.style.position = 'fixed';
    bubbleContainer.style.zIndex = '2147483646';
    bubbleContainer.style.bottom = window.innerWidth < 440 ? '60px' : '80px';
    bubbleContainer.style.minWidth = 'fit-content';
    bubbleContainer.style[widgetStyle?.placement.toLowerCase() === 'left' ? 'left' : 'right'] = '16px';
    chatButton.appendChild(bubbleContainer);

    appendInitialMessages(bubbleContainer, widgetStyle);

    chatButton.addEventListener('click', toggleChatWindow);
    chatButton.addEventListener('mouseenter', () => scaleButtonAndContainer(chatButton, bubbleContainer, 1.08));
    chatButton.addEventListener('mouseleave', () => scaleButtonAndContainer(chatButton, bubbleContainer, 1));

    window.addEventListener('resize', () => {
        const size = window.innerWidth < 440 ? '50px' : '60px';
        chatButton.style.width = size;
        chatButton.style.height = size;
        chatWindow.style.right = window.innerWidth < 440 ? '5%' : '50px';
        chatWindow.style.bottom = window.innerWidth < 440 ? '60px' : '80px';
    });

    window.addEventListener('message', handleMessage);

    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);

    window.embeddedChatbotConfig.embedded = true;

    function createButton() {
        const button = document.createElement('div');
        button.id = 'stomps-bubble-button';
        button.style.position = 'fixed';
        button.style.bottom = '16px';
        button.style[widgetStyle?.placement.toLowerCase() === 'left' ? 'left' : 'right'] = '16px';
        button.style.width = buttonSize;
        button.style.height = buttonSize;
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.borderRadius = '50%';
        button.style.backgroundColor = widgetStyle?.launcherIcon.startsWith("#") ? widgetStyle.launcherIcon : buttonColor;
        button.style.fontSize = '16px';
        button.style.fontWeight = 'bold';
        button.style.cursor = 'pointer';
        return button;
    }

    function createWindow() {
        const window = document.createElement('iframe');
        window.id = 'stomps-bubble-window';
        window.style.position = 'fixed';
        window.style.bottom = window.innerWidth < 440 ? '60px' : '80px';
        window.style.right = window.innerWidth < 440 ? '5%' : '50px';
        window.style.width = '90%';
        window.style.maxWidth = '400px';
        window.style.height = '85vh';
        window.style.border = 'none';
        window.style.backgroundColor = 'black';
        window.style.display = 'none';
        window.style.borderRadius = '30px';
        return window;
    }

    function applyButtonStyle(button, style) {
        button.style.backgroundColor = style.launcherIcon.startsWith("#") ? style.launcherIcon : buttonColor;
        button.innerHTML = `<img src="${style.launcherIcon}" style="width: ${iconSize}; height: ${iconSize};"/>`;
    }

    function appendInitialMessages(widgetStyle, bubbleContainer) {
        // Append the initial chat messages
        if (widgetStyle && widgetStyle.welcomeMessages && widgetStyle.welcomeMessages.length > 0) {
            widgetStyle.welcomeMessages.reverse().forEach((message, index) => {
                const messageContainer = document.createElement('div');
                messageContainer.style.display = 'flex';
                messageContainer.style.justifyContent =
                    widgetStyle.placement.toLowerCase() === 'left' ? 'flex-start' : 'flex-end';

                const messageElement = document.createElement('div');
                messageElement.style.backgroundColor =
                    widgetStyle.widgetTheme.toLowerCase() === 'dark' ? '#333' : '#fff';
                messageElement.style.color =
                    widgetStyle.widgetTheme.toLowerCase() === 'dark' ? '#fff' : '#333';
                messageElement.style.padding = '8px 14px';
                messageElement.style.borderRadius = '16px';
                messageElement.style.fontFamily = 'sans-serif';
                messageElement.style.fontSize = '0.75rem';
                messageElement.style.marginBottom = '8px';
                messageElement.style.opacity = '0';
                messageElement.style.transform = 'scale(0.8)';
                messageElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                messageElement.style.minWidth = 'fit-content';

                messageElement.textContent = message;

                messageContainer.appendChild(messageElement);
                bubbleContainer.appendChild(messageContainer);

                // Show the initial messages after a delay
                if (widgetStyle.popupDelay >= 0) {
                    setTimeout(() => {
                        if (window.innerWidth < 640) return;
                        if (sessionStorage.getItem('message_bubbles_have_been_shown') === 'yes') return;

                        messageElement.style.opacity = '1';
                        messageElement.style.transform = 'scale(1)';
                        if (index === widgetStyle.welcomeMessages.length - 1) {
                            sessionStorage.setItem('message_bubbles_have_been_shown', 'yes');
                        }
                    }, widgetStyle.popupDelay + index * 100);
                }
            });
        }
    }

    function toggleChatWindow() {
        if (chatWindow.style.display === 'none') {
            chatWindow.style.display = 'block';
            chatButton.innerHTML = getClosedChatHTML(buttonColor);
            sendMessageIframe({ openChat: true });
        } else {
            chatButton.innerHTML = "";
            chatButton.appendChild(createLauncherIcon(widgetStyle.launcherIcon));
            chatWindow.style.display = 'none';
            sendMessageIframe({ closeChat: true });
        }
    }

    function handleMessage(event) {
        if (event.origin !== stompsSrc) return;
        if (event.data.closeWidget) {
            chatButton.innerHTML = "";
            chatButton.appendChild(createLauncherIcon(widgetStyle.launcherIcon));
            chatWindow.style.display = 'none';
        }
    }

    function createLauncherIcon(src) {
        const launcherIcon = document.createElement("img");
        launcherIcon.src = src;
        launcherIcon.style.width = iconSize;
        launcherIcon.style.height = iconSize;
        return launcherIcon;
    }

    function sendMessageIframe(message) {
        const iframe = document.getElementById('stomps-bubble-window');
        const childWindow = iframe.contentWindow;
        childWindow.postMessage(message, '*');
    }

    function scaleButtonAndContainer(button, container, scale) {
        button.style.transform = `scale(${scale})`;
        container.style.transform = `scale(${1 / scale})`;
    }
}

// Function to get the HTML for the open chat state
function getOpenChatHTML(color) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="${color}>
        <path d="M50 80L20 20h60z" fill="#000"/>
     </svg>
    `;
}

// Function to get the HTML for the closed chat state
function getClosedChatHTML(buttonColor) {
    return `
      <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="${buttonColor}">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    `;
}

async function getWidgetStyle(src, chatbotId) {
    const response = await fetch(`${src}/api/v1/embed/${chatbotId}/widget-style`).catch(error => console.error('Error fetching chatbot data:', error));

    return await response.json();
}

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(embedChatbaseChatbot)

