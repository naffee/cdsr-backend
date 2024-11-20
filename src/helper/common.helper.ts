import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class Helper {
  static algorithm = 'aes-256-ctr';
  static secretKey = 'vOVH6sdmpNWjRRYqCc7rdxs01lwHzlr3';
  static randomBytes = randomBytes(16);

  // Encryption function
  static async encrypt(data: string) {
    const cipher = createCipheriv(
      this.algorithm,
      this.secretKey,
      this.randomBytes,
    );
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  // Decryption function
  static async decrypt(encryptedData: string) {
    const decipher = createDecipheriv(
      this.algorithm,
      this.secretKey,
      this.randomBytes,
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
