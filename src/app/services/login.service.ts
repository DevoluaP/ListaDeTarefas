import { HttpClient } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})

export class LoginService {
  
  private apiURL = "http://localhost:3000/login";

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credenciais: { usuario: string; senha: string; }) {
    this.http.get<any[]>(this.apiURL).subscribe(users => {
      const user = users.find(
        u => u.usuario === credenciais.usuario && u.senha === credenciais.senha
      );

      if (!user) {
        alert("Usuário e/ou Senha incorreto!");
        return;
      }

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem("isLoggedIn", "true");
      }
  
      this.router.navigate(["/tasks"]);
    });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("isLoggedIn");
    }

    this.router.navigate(["/login"]);
  }

  isAuthenticated(): boolean {
    return isPlatformBrowser(this.platformId) && localStorage.getItem("isLoggedIn") === "true";
  }
}