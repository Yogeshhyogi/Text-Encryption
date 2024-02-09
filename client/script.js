 function encrypt() {
    const inputText = document.getElementById('inputText').value;
    const encryptionKey = document.getElementById('encryptionKey').value;

    if (!inputText || !encryptionKey) {
      alert('Please enter both input text and encryption key.');
      return;
    }
  
    return fetch('/encrypt', {
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
      const res =  response.clone();
      console.log(res);
      return  response.json();
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
  