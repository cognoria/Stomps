// Function to embed the Chatbase chatbot
async function embedChatbaseChatbot() {
  // Check if the chatbot has already been successfully embedded
  if (window.chatbaseConfig?.embedSuccess) return;

  // Get the current page URL and extract relevant information
  const currentUrl = new URL(document.currentScript.src);
  let origin = 'https://www.chatbase.co';
  if (
    currentUrl.hostname === 'localhost' ||
    currentUrl.hostname === '127.0.0.1' ||
    currentUrl.href.includes('chatbase.fyi') ||
    currentUrl.href.includes('qa.chatbase.co')
  ) {
    origin = currentUrl.origin;
  }

  let chatbotId = null;
  try {
    chatbotId = currentUrl.searchParams.get('chatbotId');
  } catch (error) {
    console.error(error);
  }

  // Get the chatbot ID and domain from the script tags or the embedded configuration
  const botId =
    document.currentScript.getAttribute('chatbotId') ||
    window.embeddedChatbotConfig?.chatbotId ||
    document.id ||
    window.chatbaseConfig?.chatbotId ||
    chatbotId;
  const domain =
    document.currentScript.getAttribute('domain') ||
    window.embeddedChatbotConfig?.domain ||
    currentUrl.origin;

  // Create a style element to add custom styles
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    #chatbase-bubble-button,
    #chatbase-bubble-button * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  `;
  document.body.appendChild(styleElement);

  // Create the main button element
  const buttonElement = document.createElement('button');
  buttonElement.setAttribute('id', 'chatbase-bubble-button');
  buttonElement.style.position = 'fixed';
  buttonElement.style.bottom = '0';
  buttonElement.style.fontSize = '1rem';
  buttonElement.style.backgroundColor = '#0077b6';
  buttonElement.style.width = '3.5rem';
  buttonElement.style.height = '3.5rem';
  buttonElement.style.borderRadius = '50%';
  buttonElement.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
  buttonElement.style.border = 'none';
  buttonElement.style.zIndex = '2147483647';
  buttonElement.style.cursor = 'pointer';

  // Create the chatbot icon element
  const iconElement = document.createElement('div');
  iconElement.setAttribute('id', 'chatbase-bubble-icon');
  iconElement.style.position = 'absolute';
  iconElement.style.width = '50px';
  iconElement.style.height = '50px';
  iconElement.style.borderRadius = '25px';
  iconElement.style.display = 'flex';
  iconElement.style.justifyContent = 'center';
  iconElement.style.alignItems = 'center';
  iconElement.style.cursor = 'pointer';
  iconElement.style.gap = '50px';
  iconElement.style.backgroundSize = 'cover';
  iconElement.style.backgroundRepeat = 'no-repeat';

  // Create the close button element
  const closeElement = document.createElement('div');
  closeElement.setAttribute('id', 'chatbase-bubble-close');
  closeElement.style.position = 'absolute';
  closeElement.style.top = '-7px';
  closeElement.style.right = '-7px';
  closeElement.style.fontWeight = 'bold';
  closeElement.style.display = 'none';
  closeElement.style.color = 'white';
  closeElement.style.backgroundColor = 'rgba(150, 150, 150, 0.15)';
  closeElement.style.width = '22px';
  closeElement.style.height = '22px';
  closeElement.style.borderRadius = '50%';
  closeElement.style.textAlign = 'center';
  closeElement.style.cursor = 'pointer';

  // Append the icon and close button to the main button
  iconElement.appendChild(closeElement);
  buttonElement.appendChild(iconElement);
  document.body.appendChild(buttonElement);

  // Add event listeners for hover and click
  buttonElement.addEventListener('mouseenter', () => {
    buttonElement.style.transform = 'scale(1.08)';
  });
  buttonElement.addEventListener('mouseleave', () => {
    buttonElement.style.transform = 'scale(1)';
  });

  // Add a container for the chatbot window
  const chatWindowContainer = document.createElement('div');
  chatWindowContainer.setAttribute('id', 'chatbase-bubble-window');
  chatWindowContainer.style.display = 'none';
  chatWindowContainer.style.position = 'fixed';
  chatWindowContainer.style.justifyContent = 'center';
  chatWindowContainer.style.alignItems = 'center';
  chatWindowContainer.style.width = '100%';
  chatWindowContainer.style.height = '100%';
  chatWindowContainer.style.zIndex = '2147483646';
  buttonElement.appendChild(chatWindowContainer);

  // Toggle the chatbot window on button click
  buttonElement.addEventListener('click', () => {
    if (chatWindowContainer.style.display === 'none') {
      chatWindowContainer.style.display = 'flex';
      iconElement.style.display = 'none';
      chatWindowContainer.innerHTML = getOpenChatHTML(buttonColor);
      window.parent.postMessage({ openChat: true }, '*');
    } else {
      chatWindowContainer.style.display = 'none';
      chatWindowContainer.innerHTML = getClosedChatHTML(buttonColor);
      window.parent.postMessage({ closeChat: true }, '*');
    }
  });

  // Handle window resize events
  window.addEventListener('resize', () => {
    // Adjust the button and window position based on screen size
    if (window.innerWidth < 840) {
      // Mobile layout
      buttonElement.style.left = '0';
      buttonElement.style.right = 'unset';
      iconElement.style.right = '0';
      iconElement.style.left = 'unset';
      iframe.style.left = '0';
      iframe.style.right = 'unset';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.maxHeight = 'unset';
    } else {
      // Desktop layout
      buttonElement.style.right = '1rem';
      buttonElement.style.left = 'unset';
      iconElement.style.left = '1rem';
      iconElement.style.right = 'unset';
      iframe.style.left = '1rem';
      iframe.style.right = '1rem';
      iframe.style.width = '448px';
      iframe.style.height = '85vh';
      iframe.style.maxHeight = '824px';
    }

    // Notify the iframe about the window resize
    iframe.contentWindow.postMessage({ windowInnerWidth: window.innerWidth }, '*');
    setTimeout(() => {
      iframe.contentWindow.postMessage({ windowInnerWidth: window.innerWidth }, '*');
    }, 50);
  });

  // Fetch the chatbot configuration and initial messages
  const fetchChatbotData = async () => {
    const response = await fetch(`${origin}/api/v1/embed/${botId}/widget-styles`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const { styles, initialMessages } = await response.json();

    // Apply the chatbot styles
    buttonElement.title = styles?.display_name || 'Chatbot';
    buttonElement.style.backgroundColor = styles?.button_color || '#0077b6';

    // Adjust the button and window positions based on the alignment setting
    if (styles?.align_chat_button === 'left') {
      buttonElement.style.left = '1rem';
      buttonElement.style.right = 'unset';
      iconElement.style.right = '1rem';
      iconElement.style.left = 'unset';
    } else {
      buttonElement.style.right = '1rem';
      buttonElement.style.left = 'unset';
      iconElement.style.left = '1rem';
      iconElement.style.right = 'unset';
    }

    // Append the button to the body
    document.body.appendChild(buttonElement);

    // Set the chatbot icon if provided
    let chatbotIcon = null;
    if (styles?.chat_icon) {
      chatbotIcon = `<img src="https://backend.chatbase.co/storage/v1/object/public/chat-icons/${styles.chat_icon}" alt="${styles?.display_name || 'Chatbot'}" />`;
    }

    // Set the button color based on the theme
    const buttonColor = getButtonColor(styles?.button_color || '#0077b6');
    iconElement.style.color = buttonColor;
    closeElement.style.color = buttonColor;

    // Append the initial chat messages
    initialMessages.forEach((message, index) => {
      const messageContainer = document.createElement('div');
      messageContainer.style.display = 'flex';
      messageContainer.style.justifyContent =
        styles?.align_chat_button === 'left' ? 'flex-start' : 'flex-end';

      const messageElement = document.createElement('div');
      messageElement.style.backgroundColor =
        styles?.theme === 'dark' ? '#333' : '#fff';
      messageElement.style.color =
        styles?.theme === 'dark' ? '#fff' : '#333';
      messageElement.style.padding = '8px 14px';
      messageElement.style.borderRadius = '16px';
      messageElement.style.fontFamily = 'sans-serif';
      messageElement.style.fontSize = '0.75rem';
      messageElement.style.marginBottom = '8px';
      messageElement.style.opacity = '0';
      messageElement.style.transform = 'scale(0.9)';
      messageElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

      let messageContent = message;
      messageElement.textContent = messageContent;

      messageContainer.appendChild(messageElement);
      chatWindowContainer.appendChild(messageContainer);

      // Show the initial messages after a delay
      if (styles?.auto_open_chat_window_after >= 0) {
        setTimeout(() => {
          if (!isChatWindowOpen || window.innerWidth < 840) return;
          if (sessionStorage.getItem('message_bubbles_have_been_shown') === 'yes') return;
          if (index === 0) {
            iconElement.style.display = 'block';
          }
          messageElement.style.opacity = '1';
          messageElement.style.transform = 'scale(1)';
          if (index === initialMessages.length - 1) {
            sessionStorage.setItem('message_bubbles_have_been_shown', 'yes');
          }
        }, styles.auto_open_chat_window_after * 1000 + index * 100);
      }
    });

    // Set the close button styles based on the theme
    closeElement.style.backgroundColor =
      styles?.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(150, 150, 150, 0.15)';
    closeElement.style.color =
      styles?.theme === 'dark' ? 'white' : 'black';
    closeElement.style.boxShadow =
      '0 4px 8px 0 rgba(150, 150, 150, 0.2), 0 0 0 1px rgba(150, 150, 150, 0.2)';

    // Add event listeners for the close button
    closeElement.addEventListener('mouseenter', () => {
      closeElement.style.display = 'block';
    });
    closeElement.addEventListener('mouseleave', () => {
      closeElement.style.display = 'none';
    });
    closeElement.addEventListener('click', (event) => {
      event.stopPropagation();
      chatWindowContainer.style.display = 'none';
    });
  };

  // Create the iframe to host the chatbot
  const iframe = document.createElement('iframe');
  iframe.setAttribute('id', 'chatbase-bubble-iframe');
  iframe.style.display = 'none';
  setTimeout(() => {
    iframe.style.display = 'block';
  }, 3000);
  iframe.src = `${domain}/chatbot-iframe/${botId}`;
  iframe.setAttribute('id', 'chatbase-bubble-iframe');
  iframe.style.position = 'fixed';
  iframe.style.zIndex = '2147483646';
  iframe.style.width = window.innerWidth < 840 ? '100%' : '448px';
  iframe.style.height = window.innerWidth < 840 ? '100%' : '85vh';
  iframe.style.maxHeight = window.innerWidth < 840 ? '' : '824px';
  iframe.style.right = window.innerWidth < 840 ? '0' : '1rem';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  // Add a resize event listener to adjust the iframe position and size
  window.addEventListener('resize', () => {
    if (window.innerWidth < 840) {
      iframe.style.right = '0';
      iframe.style.left = 'unset';
    } else {
      iframe.style.left = '1rem';
      iframe.style.right = 'unset';
    }
    iframe.style.width = window.innerWidth < 840 ? '100%' : '448px';
    iframe.style.height = window.innerWidth < 840 ? '100%' : '85vh';
    iframe.contentWindow.postMessage({ windowInnerWidth: window.innerWidth }, '*');
    setTimeout(() => {
      iframe.contentWindow.postMessage({ windowInnerWidth: window.innerWidth }, '*');
    }, 50);
  });

  // Fetch the chatbot configuration and initial messages
  await fetchChatbotData();

  // Expose a method to close the iframe
  iframe.closeIframe = () => {
    iframe.contentWindow.postMessage({ windowInnerWidth: window.innerWidth }, '*');
    setTimeout(() => {
      iframe.contentWindow.postMessage({ windowInnerWidth: window.innerWidth }, '*');
    }, 50);
  };

  // Set the chatbaseConfig embedSuccess flag
  if (window.chatbaseConfig) {
    window.chatbaseConfig.embedSuccess = true;
  }
}

// Helper function to get the button color based on the background color
function getButtonColor(backgroundColor) {
  backgroundColor = backgroundColor.charAt(0) === '#' ? backgroundColor.slice(1) : backgroundColor;
  const r = parseInt(backgroundColor.substring(0, 2), 16);
  const g = parseInt(backgroundColor.substring(2, 4), 16);
  const b = parseInt(backgroundColor.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 255000;
  return brightness > 0.5 ? 'black' : 'white';
}

// Function to get the HTML for the open chat state
function getOpenChatHTML(buttonColor) {
  return `
    <svg id="chatIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="${buttonColor}">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
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

// Embed the chatbot if the script is loaded on the page
if (document.readyState === 'complete') {
  embedChatbaseChatbot();
} else {
  window.addEventListener('load', embedChatbaseChatbot());
}

// Function to load a script asynchronously
function loadScript(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// Check if the chatbase embed script has already been loaded
if (window.embeddedChatbotConfig) {
  // Set the chatbaseConfig embedSuccess flag
  if (window.chatbaseConfig) {
    window.chatbaseConfig.embedSuccess = true;
  }
} else {
  // Load the chatbase embed script
  loadScript('https://www.chatbase.co/embed.min.js')
    .then(() => {
      // Embed the chatbot after the script is loaded
      embedChatbaseChatbot();
    })
    .catch((error) => {
      console.error('Error loading chatbase embed script:', error);
    });
}