import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})

export class LoginService {
  
  private apiURL = "http://localhost:3000/login";

  constructor(private http: HttpClient, private router: Router) {}

  login(credenciais: { usuario: string; senha: string; }) {
    this.http.get<any[]>(this.apiURL).subscribe(users => {
      const user = users.find(
        u => u.usuario === credenciais.usuario && u.senha === credenciais.senha
      );

      if (!user) {
        alert("Usuário e/ou Senha incorreto!");
        return;
      }
  
      localStorage.setItem("isLoggedIn", "true");
      this.router.navigate(["/tasks"]);
    });
  }

  logout() {
    localStorage.removeItem("isLoggedIn");
    this.router.navigate(["/login"]);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("isLoggedIn") === "true";
  }
}