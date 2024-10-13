import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})

export class LoginComponent {
  
  usuario: string = "";
  senha: string = "";

  constructor(private loginService: LoginService) {}

  onSubmit() {
    if (!this.usuario || !this.senha) {
      alert("Usuário e/ou Senha inválido!");
      return;
    }

    const credenciais = {
      usuario: this.usuario,
      senha: this.senha
    }

    this.loginService.login(credenciais);
  }
}