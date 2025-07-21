const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

class User {
  constructor({ username, email, password }) {
    this.ID = uuidv4();
    this.Username = username;
    this.Email = email.toLowerCase();
    // Hash the password before storing
    const salt = crypto.randomBytes(16).toString('hex');
    this.Salt = salt;
    this.Password = this.hashPassword(password, salt);
    this.CreatedAt = new Date().toISOString();
    this.UpdatedAt = new Date().toISOString();
  }

  // Hash password with salt
  hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }

  // Verify password
  verifyPassword(password) {
    const hash = this.hashPassword(password, this.Salt);
    return this.Password === hash;
  }

  // Update user properties
  update({ username, email }) {
    if (username !== undefined) this.Username = username;
    if (email !== undefined) this.Email = email.toLowerCase();
    this.UpdatedAt = new Date().toISOString();
  }

  // Change password
  changePassword(newPassword) {
    const salt = crypto.randomBytes(16).toString('hex');
    this.Salt = salt;
    this.Password = this.hashPassword(newPassword, salt);
    this.UpdatedAt = new Date().toISOString();
  }

  // Validate user data
  static validate({ username, email, password }) {
    const errors = [];

    // Validate username
    if (!username || username.trim().length < 3) {
      errors.push('Username must be at least 3 characters long');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('Valid email address is required');
    }

    // Validate password
    if (!password || password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    return errors;
  }

  // Return user without sensitive information
  toSafeObject() {
    const { Password, Salt, ...safeUser } = this;
    return safeUser;
  }
}

module.exports = User;
