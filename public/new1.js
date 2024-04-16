
async function embedChatbaseChatbot() {
    // Check if the chatbot is already embedded
    if (window.embeddedChatbotConfig?.embedded) return;
  
    const currentUrl = new URL(document.currentScript.src);
    const origin = currentUrl.origin;
  
    const stompsSrc = document.currentScript.getAttribute('domain') || window.embeddedChatbotConfig?.domain;
    const chatbotId = document.currentScript.getAttribute('chatbotId') || window.embeddedChatbotConfig?.chatbotId || document.id;
  
    const widgetStyle = await getWidgetStyle(stompsSrc, chatbotId);
  
    // Create elements for the chatbot button and window
    const chatButton = createChatButton(widgetStyle);
    const chatWindow = createChatWindow(stompsSrc, chatbotId, origin, widgetStyle);
  
    // Event listener to toggle chat window visibility
    chatButton.addEventListener('click', toggleChatWindow.bind(null, chatButton, chatWindow, widgetStyle));
  
    // Add event listeners for button hover
    chatButton.addEventListener('mouseenter', () => (chatButton.style.transform = 'scale(1.08)'));
    chatButton.addEventListener('mouseleave', () => (chatButton.style.transform = 'scale(1)'));
  
    // Handle window resize events
    window.addEventListener('resize', resizeHandler.bind(null, chatWindow, chatButton));
  
    // Append the initial chat messages
    appendInitialMessages(chatButton, widgetStyle);
  
    // Append elements to the document body
    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);
  
    // Set the flag indicating the chatbot is embedded
    window.embeddedChatbotConfig.embedded = true;
  }
  
  function createChatButton(widgetStyle) {
    // Create and style the chat button
    const chatButton = document.createElement('div');
    chatButton.setAttribute('id', 'stomps-bubble-button');
  
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '16px';
    if (widgetStyle?.placement.toLowerCase() === 'left') {
      chatButton.style.left = '16px';
    } else {
      chatButton.style.right = '16px';
    }
    chatButton.style.width = window.innerWidth < 440 ? '50px' : '60px';
    chatButton.style.height = window.innerWidth < 440 ? '50px' : '60px';
    chatButton.style.display = 'flex';
    chatButton.style.alignItems = 'center';
    chatButton.style.justifyContent = 'center';
    chatButton.style.borderRadius = '50%';
  
    if (widgetStyle.launcherIcon.startsWith('#')) {
      chatButton.style.backgroundColor = widgetStyle.launcherIcon;
      chatButton.style.color = 'white';
    } else {
      const launcherIcon = document.createElement('img');
      launcherIcon.src = widgetStyle.launcherIcon;
      launcherIcon.style.width = window.innerWidth < 440 ? '40px' : '50px';
      launcherIcon.style.height = window.innerWidth < 440 ? '40px' : '50px';
      launcherIcon.style.display = 'flex';
      launcherIcon.style.alignItems = 'center';
      launcherIcon.style.justifyContent = 'center';
      chatButton.appendChild(launcherIcon);
      chatButton.style.backgroundColor = '#0077b6';
    }
  
    chatButton.style.fontSize = '16px';
    chatButton.style.fontWeight = 'bold';
    chatButton.style.cursor = 'pointer';
  
    return chatButton;
  }
  
  function createChatWindow(stompsSrc, chatbotId, origin, widgetStyle) {
    // Create and style the chat window
    const chatWindow = document.createElement('iframe');
    chatWindow.setAttribute('id', 'stomps-bubble-window');
  
    chatWindow.style.position = 'fixed';
    chatWindow.style.bottom = window.innerWidth < 440 ? '60px' : '80px';
    chatWindow.style.right = window.innerWidth < 440 ? '5%' : '50px';
    chatWindow.style.width = '90%';
    chatWindow.style.maxWidth = '400px';
    chatWindow.style.height = '85vh';
    chatWindow.style.border = 'none';
    chatWindow.style.backgroundColor = 'black';
    chatWindow.style.display = 'none';
    chatWindow.style.borderRadius = '30px';
  
    chatWindow.src = `${stompsSrc}/widget/${chatbotId}?host=${origin}`;
  
    return chatWindow;
  }
  
  function toggleChatWindow(chatButton, chatWindow, widgetStyle) {
    // Toggle the visibility of the chat window
    if (chatWindow.style.display === 'none') {
      chatWindow.style.display = 'block';
      chatButton.innerHTML = getClosedChatHTML('#ffffff');
      sendMessageIframe({ openChat: true });
    } else {
      chatButton.innerHTML = '';
      const launcherIcon = document.createElement('img');
      launcherIcon.src = widgetStyle.launcherIcon;
      launcherIcon.style.width = window.innerWidth < 440 ? '40px' : '50px';
      launcherIcon.style.height = window.innerWidth < 440 ? '40px' : '50px';
      chatButton.appendChild(launcherIcon);
      chatWindow.style.display = 'none';
      sendMessageIframe({ closeChat: true });
    }
  }
  
  function resizeHandler(chatWindow, chatButton) {
    // Handle window resize events
    if (window.innerWidth < 440) {
      chatWindow.style.right = '5%';
      chatWindow.style.bottom = '60px';
      chatButton.style.width = '50px';
      chatButton.style.height = '50px';
    } else {
      chatWindow.style.right = '50px';
      chatWindow.style.bottom = '80px';
      chatButton.style.width = '60px';
      chatButton.style.height = '60px';
    }
  }
  
  function appendInitialMessages(chatButton, widgetStyle) {
    // Append the initial chat messages
    widgetStyle?.welcomeMessages.forEach((message, index) => {
      const messageContainer = document.createElement('div');
      messageContainer.style.display = 'flex';
      messageContainer.style.bottom = '60px';
      messageContainer.style.justifyContent =
        widgetStyle?.placement.toLowerCase() === 'left' ? 'flex-start' : 'flex-end';
  
      const messageElement = document.createElement('div');
      messageElement.style.backgroundColor =
        widgetStyle?.widgetTheme.toLowerCase() === 'dark' ? '#333' : '#fff';
      messageElement.style.color =
        widgetStyle?.widgetTheme.toLowerCase() === 'dark' ? '#fff' : '#333';
      messageElement.style.padding = '8px 14px';
      messageElement.style.borderRadius = '16px';
      messageElement.style.fontFamily = 'sans-serif';
      messageElement.style.fontSize = '0.75rem';
      messageElement.style.marginBottom = '8px';
      messageElement.style.opacity = '0';
      messageElement.style.transform = 'scale(0.8)';
      messageElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  
      messageElement.textContent = message;
  
      messageContainer.appendChild(messageElement);
      chatButton.appendChild(messageContainer);
  
      // Show the initial messages after a delay
      if (widgetStyle?.popupDelay >= 0) {
        setTimeout(() => {
          if (!isChatWindowOpen || window.innerWidth < 640) return;
          if (sessionStorage.getItem('message_bubbles_have_been_shown') === 'yes') return;
          if (index === 0) {
            iconElement.style.display = 'block';
          }
          messageElement.style.opacity = '1';
          messageElement.style.transform = 'scale(1)';
          if (index === widgetStyle?.welcomeMessages.length - 1) {
            sessionStorage.setItem('message_bubbles_have_been_shown', 'yes');
          }
        }, widgetStyle?.popupDelay * 1000 + index * 100);
      }
    });
  }
  
  function getWidgetStyle(src, chatbotId) {
    // Fetch the widget style from the server
    return fetch(`${src}/api/v1/embed/${chatbotId}/widget-style`)
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching chatbot data:', error));
  }
  
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  
  ready(embedChatbaseChatbot);