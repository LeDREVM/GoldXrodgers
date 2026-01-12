// Validation utility functions
export function assertEmail(email: string): string {
    const v = email.trim().toLowerCase();
    if (!v.includes("@") || v.length < 6) throw new Error("Email invalide.");
    return v;
  }
  
  export function assertPassword(pw: string): string {
    if (pw.length < 8) throw new Error("Mot de passe trop court (8+).");
    return pw;
  }
  
  export function assertMaxFileSize(file: File, maxMb: number) {
    const maxBytes = maxMb * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new Error(`Fichier trop lourd. Max ${maxMb} MB.`);
    }
  }
  