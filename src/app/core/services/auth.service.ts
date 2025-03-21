import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Credenciales fijas para simulación
  private readonly FIXED_EMAIL = 'equipo7@gmail.com';
  private readonly FIXED_PASSWORD = 'equipo7';

  constructor() {
    // Inicialmente no está autenticado
    this.isAuthenticatedSubject.next(false);
  } 

  login(email: string, password: string): boolean {
    if (email === this.FIXED_EMAIL && password === this.FIXED_PASSWORD) {
      // Generar un token simulado
      const token = 'token_simulado_' + Math.random().toString(36).substring(7);
      localStorage.setItem('token', token);
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
} 