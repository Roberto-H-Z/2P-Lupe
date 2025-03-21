import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // No verificamos autenticación al inicio
  }

  async onSubmit() {
    this.submitted = true;
    this.loginError = false;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      if (this.authService.login(email, password)) {
        // Mostrar mensaje de éxito
        await Swal.fire({
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión exitosamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'swal2-popup-custom',
            title: 'swal2-title-custom'
          }
        });
        
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = true;
      }
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}