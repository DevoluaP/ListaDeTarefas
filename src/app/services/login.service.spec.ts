import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { PLATFORM_ID } from "@angular/core";

describe("LoginService", () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy("navigate") }

  beforeEach(() => {
    routerSpy = { navigate: jasmine.createSpy("navigate") }

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService,
        { provide: Router, useValue: routerSpy },
        { provide: PLATFORM_ID, useValue: "browser" }
      ]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("deve ser criado", () => {
    expect(service).toBeTruthy();
  });

  it("deve efetuar login com sucesso se as credenciais estiverem corretas", () => {
    const mockUsers = [{ usuario: "test", senha: "12345" }];
    const credenciais = { usuario: "test", senha: "12345" }

    service.login(credenciais);

    const req = httpMock.expectOne("http://localhost:3000/login");
    expect(req.request.method).toBe("GET");
    req.flush(mockUsers);

    expect(localStorage.getItem("isLoggedIn")).toBe("true");
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/tasks"]);
  });

  it("deve mostrar erro se as credenciais estiverem incorretas", () => {
    spyOn(window, "alert");

    const mockUsers = [{ usuario: "test", senha: "wrongpassword" }];
    const credenciais = { usuario: "test", senha: "12345" }

    service.login(credenciais);

    const req = httpMock.expectOne("http://localhost:3000/login");
    expect(req.request.method).toBe("GET");
    req.flush(mockUsers);

    expect(localStorage.getItem("isLoggedIn")).toBeNull();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Usuário e/ou Senha incorreto!");
  });

  it("deve sair e remover isLoggedIn do localStorage", () => {
    localStorage.setItem("isLoggedIn", "true");
    service.logout();

    expect(localStorage.getItem("isLoggedIn")).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/login"]);
  });

  it("deve retornar verdadeiro se o usuário estiver autenticado", () => {
    localStorage.setItem("isLoggedIn", "true");
    expect(service.isAuthenticated()).toBeTrue();
  });

  it("deve retornar falso se o usuário não estiver autenticado", () => {
    localStorage.removeItem("isLoggedIn");
    expect(service.isAuthenticated()).toBeFalse();
  });
});