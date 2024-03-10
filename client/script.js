// script.js

function encrypt() {
  const inputText = document.getElementById('inputText').value;
  const encryptionKey = document.getElementById('encryptionKey').value;

  if (!inputText || !encryptionKey) {
    alert('Please enter both input text and encryption key.');
    return;
  }

  fetch('/encrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: inputText, encryptionKey })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to encrypt text. Server responded with status ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    if (data.error) {
      throw new Error('Encryption failed: ' + data.error);
    }
    document.getElementById('outputText').value = data.encryptedText;
  })
  .catch(error => {
    console.error('Encryption failed:', error.message);
    alert('Encryption failed. Please check the console for more details.');
  });
}

function decrypt() {
  const encryptedText = document.getElementById('outputText').value;
  const encryptionKey = document.getElementById('encryptionKey').value;

  if (!encryptedText || !encryptionKey) {
    alert('Please enter both encrypted text and encryption key.');
    return;
  }

  fetch('/decrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ encryptedText, encryptionKey })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to decrypt text. Server responded with status ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    if (data.error) {
      throw new Error('Decryption failed: ' + data.error);
    }
    document.getElementById('outputText').value = data.decryptedText;
  })
  .catch(error => {
    console.error('Decryption failed:', error.message);
    alert('Decryption failed. Please check the console for more details.');
  });
}