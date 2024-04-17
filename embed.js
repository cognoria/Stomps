async function embedChatbaseChatbot() {
  if (window.embeddedChatbotConfig?.embedded) return;

  const currentUrl = new URL(document.currentScript.src);
  const origin = currentUrl.origin;
  const stompsSrc = document.currentScript.getAttribute('domain') || window.embeddedChatbotConfig?.domain;
  const chatbotId = document.currentScript.getAttribute('chatbotId') || window.embeddedChatbotConfig?.chatbotId || document.id;
  const widgetStyle = await getWidgetStyle(stompsSrc, chatbotId);

  const chatButton = createChatButton(widgetStyle);
  const chatWindow = createChatWindow(widgetStyle, origin, stompsSrc, chatbotId);
  const bubbleContainer = createBubbleContainer(widgetStyle);

  chatButton.addEventListener('click', () => toggleChatWindow(chatWindow, chatButton, bubbleContainer, widgetStyle));
  chatButton.addEventListener('mouseenter', () => scaleElement(chatButton, bubbleContainer, true));
  chatButton.addEventListener('mouseleave', () => scaleElement(chatButton, bubbleContainer, false));

  appendInitialMessages(bubbleContainer, widgetStyle, () => toggleChatWindow(chatWindow, chatButton, bubbleContainer, widgetStyle));

  document.body.appendChild(chatButton);
  document.body.appendChild(bubbleContainer);
  document.body.appendChild(chatWindow);

  window.addEventListener('message', function (event) {
    if (event.origin !== stompsSrc) return;

    if (event.data.closeWidget) {
      toggleChatWindow(chatWindow, chatButton, bubbleContainer, widgetStyle)
    }
  });

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
      chatButton.style.width = '60px';
      chatButton.style.height = '60px';
    }
  });

  if (window.embeddedChatbotConfig) {
    window.embeddedChatbotConfig.embedded = true;
  }
}

function createChatButton(widgetStyle) {
  const chatButton = document.createElement('div');
  chatButton.setAttribute('id', 'stomps-bubble-button');
  chatButton.style.position = 'fixed';
  chatButton.style.bottom = '16px';
  if (widgetStyle?.placement.toLowerCase() === 'left') {
    chatButton.style.left = '16px';
  } else {
    chatButton.style.right = '16px';
  }
  chatButton.style.width = window.innerWidth < 440 ? '50px' : "60px";
  chatButton.style.height = window.innerWidth < 440 ? '50px' : "60px";
  chatButton.style.display = 'flex';
  chatButton.style.alignItems = 'center';
  chatButton.style.justifyContent = 'center';
  chatButton.style.borderRadius = '50%';
  chatButton.style.zIndex = '9999999999';

  if (widgetStyle.launcherIcon.startsWith("#")) {
    chatButton.style.backgroundColor = widgetStyle.launcherIcon;
    chatButton.style.color = 'white';
  } else {
    const launcherIcon = document.createElement("img");
    launcherIcon.src = widgetStyle.launcherIcon;
    launcherIcon.style.width = window.innerWidth < 440 ? '40px' : '50px';
    launcherIcon.style.height = window.innerWidth < 440 ? '40px' : '50px';

    launcherIcon.style.display = 'flex';
    launcherIcon.style.alignItems = 'center';
    launcherIcon.style.justifyContent = 'center';
    chatButton.appendChild(launcherIcon);
  }

  chatButton.style.fontSize = '16px';
  chatButton.style.fontWeight = 'bold';
  chatButton.style.cursor = 'pointer';
  return chatButton;
}

function createChatWindow(widgetStyle, origin, stompsSrc, chatbotId) {
  const chatWindow = document.createElement('iframe');
  chatWindow.setAttribute('id', 'stomps-bubble-window');
  chatWindow.src = `${stompsSrc}/widget/${chatbotId}?host=${origin}`;

  // Add styles to the chat window
  chatWindow.style.position = 'fixed';
  chatWindow.style.bottom = window.innerWidth < 440 ? '60px' : '80px';
  chatWindow.style.right = window.innerWidth < 440 ? '5%' : '50px';
  chatWindow.style.width = '90%';
  chatWindow.style.maxWidth = '400px';
  chatWindow.style.height = '85vh';
  chatWindow.style.border = 'none';
  chatWindow.style.zIndex = '9999999999';
  chatWindow.style.backgroundColor = widgetStyle.widgetTheme.toLowerCase() === 'dark' ? '#333' : '#fff';
  chatWindow.style.display = 'none';
  chatWindow.style.borderRadius = '30px';
  return chatWindow;
}

function createBubbleContainer(widgetStyle) {
  const bubbleContainer = document.createElement('div');
  bubbleContainer.setAttribute('id', 'stomps-bubble-container');
  bubbleContainer.style.minWidth = 'fit-content';

  bubbleContainer.style.display = 'block';
  bubbleContainer.style.position = 'fixed';
  bubbleContainer.style.zIndex = '2147483646';
  bubbleContainer.style.bottom = window.innerWidth < 440 ? '60px' : '80px'
  if (widgetStyle?.placement.toLowerCase() === 'left') {
    bubbleContainer.style.left = '16px';
  } else {
    bubbleContainer.style.right = '16px';
  }

  // Add cancel icon
  if (!hasMessageBubblesBeenShown()) {
    const cancelIcon = document.createElement('div');
    cancelIcon.style.position = 'absolute';
    cancelIcon.style.top = '-12px';
    cancelIcon.style.opacity = '0';
    cancelIcon.style.right = '-12px';
    cancelIcon.style.width = '20px';
    cancelIcon.style.height = '20px';
    cancelIcon.style.zIndex = '2147483650';
    cancelIcon.style.backgroundColor = '#333';
    cancelIcon.style.borderRadius = '50%';
    cancelIcon.style.display = 'flex';
    cancelIcon.style.alignItems = 'center';
    cancelIcon.style.justifyContent = 'center';
    cancelIcon.style.cursor = 'pointer';
    cancelIcon.innerHTML = '&times;';
    cancelIcon.style.color = '#fff';

    bubbleContainer.addEventListener('mouseenter', () => {
      cancelIcon.style.opacity = '1';
    });

    bubbleContainer.addEventListener('mouseleave', () => {
      cancelIcon.style.opacity = '0';
    });

    cancelIcon.addEventListener('click', () => {
      bubbleContainer.style.display = 'none';
    });

    bubbleContainer.appendChild(cancelIcon);
  }

  return bubbleContainer;
}

function toggleChatWindow(chatWindow, chatButton, bubbleContainer, widgetStyle) {
  if (chatWindow.style.display === 'none') {
    chatWindow.style.display = 'block';
    bubbleContainer.style.display = 'none';
    chatWindow.style.opacity = '0';
    chatWindow.style.transform = 'translateY(20px)';
    chatWindow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setTimeout(() => {
      chatWindow.style.opacity = '1';
      chatWindow.style.transform = 'translateY(0)';
    }, 50);
    bubbleContainer.style.display = 'none';
    chatButton.innerHTML = getClosedChatHTML('#fff');
    sendMessageIframe({ openChat: true });
  } else {
    chatButton.innerHTML = "";
    if (widgetStyle.launcherIcon.startsWith("#")) {
      chatButton.style.backgroundColor = widgetStyle.launcherIcon;
      chatButton.style.color = 'white';
    } else {
      const launcherIcon = document.createElement("img");
      launcherIcon.src = widgetStyle.launcherIcon;
      launcherIcon.style.width = window.innerWidth < 440 ? '40px' : '50px';
      launcherIcon.style.height = window.innerWidth < 440 ? '40px' : '50px';
      chatButton.appendChild(launcherIcon);
    }
    chatWindow.style.opacity = '1';
    chatWindow.style.transform = 'translateY(0)';
    chatWindow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setTimeout(() => {
      chatWindow.style.opacity = '0';
      chatWindow.style.transform = 'translateY(20px)';
    }, 50);
    setTimeout(() => {
      chatWindow.style.display = 'none';
    }, 300);
    // chatWindow.style.display = 'none';
    sendMessageIframe({ closeChat: true });
  }
}

function scaleElement(element, container, enter) {
  if (enter) {
    element.style.transform = 'scale(1.08)';
    container.style.transform = 'scale(1)';
    container.style.minWidth = 'fit-content';
  } else {
    element.style.transform = 'scale(1)';
    container.style.transform = 'scale(1)';
    container.style.minWidth = 'fit-content';
  }
}

function appendInitialMessages(bubbleContainer, widgetStyle, action) {
  widgetStyle?.welcomeMessages.forEach((message, index) => {
    const messageContainer = document.createElement('div');
    messageContainer.style.display = 'flex';
    messageContainer.style.justifyContent = widgetStyle?.placement.toLowerCase() === 'left' ? 'flex-start' : 'flex-end';

    const messageElement = document.createElement('div');
    messageElement.style.backgroundColor = widgetStyle?.widgetTheme.toLowerCase() === 'dark' ? '#333' : '#fff';
    messageElement.style.color = widgetStyle?.widgetTheme.toLowerCase() === 'dark' ? '#fff' : '#333';
    messageElement.style.padding = '8px 14px';
    messageElement.style.borderRadius = '16px';
    messageElement.style.fontFamily = 'sans-serif';
    messageElement.style.fontSize = '0.75rem';
    messageElement.style.marginBottom = '8px';
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'scale(0.8)';
    messageElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    messageElement.style.minWidth = 'fit-content';
    messageElement.style.width = 'fit-content';
    messageElement.textContent = message;

    messageContainer.appendChild(messageElement);
    bubbleContainer.appendChild(messageContainer);

    if (widgetStyle?.popupDelay >= 0) {
      setTimeout(() => {
        if (window.innerWidth < 640) return;
        if (hasMessageBubblesBeenShown()) return;
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'scale(1)';
        messageElement.addEventListener('click', () => action());
        if (index === widgetStyle.welcomeMessages.length - 1) {
          setMessageBubblesShown();
        }
      }, widgetStyle?.popupDelay + index * 100);
    }
  });
}

async function getWidgetStyle(src, chatbotId) {
  const response = await fetch(`${src}/api/v1/embed/${chatbotId}/widget-style`).catch(error => console.error('Error fetching chatbot data:', error));
  return await response.json();
}

function getOpenChatHTML(color) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="${color}">
      <path d="M50 80L20 20h60z" fill="#000"/>
   </svg>
  `;
}

function getClosedChatHTML(buttonColor) {
  return `
    <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="${buttonColor}">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  `;
}

function hasMessageBubblesBeenShown() {
  return window.sessionStorage.getItem('message_bubbles_have_been_shown') === 'yes';
}

function setMessageBubblesShown() {
  window.sessionStorage.setItem('message_bubbles_have_been_shown', 'yes');
}
function sendMessageIframe(message) {
  const iframe = document.getElementById('stomps-bubble-window');
  const childWindow = iframe.contentWindow;
  childWindow.postMessage(message, '*');
}

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(embedChatbaseChatbot);