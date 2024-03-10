const crypto = require('crypto');

function encrypt(text, encryptionKey) {
  try {
    if (!text || !encryptionKey) {
      throw new Error('Text or encryption key is missing');
    }

    // Check if encryption key length is valid for AES-256
    if (encryptionKey.length !== 32) {
      throw new Error('Invalid key length. The encryption key must be 32 characters long.');
    }

    const iv = crypto.randomBytes(16); // Generate random initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('Encryption failed:', error.message);
    throw new Error('Encryption failed');
  }
}

function decrypt(encryptedText, encryptionKey) {
  try {
    if (!encryptedText || !encryptionKey) {
      throw new Error('Encrypted text or encryption key is missing');
    }

    const encryptedParts = encryptedText.split(':');
    const iv = Buffer.from(encryptedParts[0], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let decrypted = decipher.update(encryptedParts[1], 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error.message);
    throw new Error('Decryption failed');
  }
}

module.exports = { encrypt, decrypt };