
const crypto = require('crypto');

const IV_LENGTH = 16; // AES-256 CBC cipher IV length

function encrypt(text, encryptionKey) {
  try {
    if (!text || !encryptionKey) {
      throw new Error('Text or encryption key is missing');
    }

    // Check if encryption key length is valid for AES-256
    if (encryptionKey.length !== 32) {
      throw new Error('Invalid key length. The encryption key must be 32 characters long.');
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('Encryption failed:', error.message);
    throw new Error('Encryption failed');
  }
}

module.exports = { encrypt };