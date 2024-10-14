import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { LoginService } from "../../services/login.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    const loginServiceMock = jasmine.createSpyObj("LoginService", ["login"]);

    await TestBed.configureTestingModule({
      imports: [FormsModule, LoginComponent, HttpClientTestingModule],
      providers: [{ provide: LoginService, useValue: loginServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    fixture.detectChanges();
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });

  it("deve mostrar um alerta se os campos de usuário e senha estiverem vazios", () => {
    spyOn(window, "alert");

    component.usuario = "";
    component.senha = "";
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith("Usuário e/ou Senha inválido!");
    expect(loginServiceSpy.login).not.toHaveBeenCalled();
  });

  it("deve chamar o serviço de login com as credenciais corretas", () => {
    loginServiceSpy.login.and.callThrough();

    component.usuario = "testUser";
    component.senha = "testPassword";
    component.onSubmit();

    expect(loginServiceSpy.login).toHaveBeenCalledWith({
      usuario: "testUser",
      senha: "testPassword"
    });
  });

  it("não deve chamar o serviço de login se o usuário ou senha estiverem ausentes", () => {
    spyOn(window, "alert");

    component.usuario = "testUser";
    component.senha = "";
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith("Usuário e/ou Senha inválido!");
    expect(loginServiceSpy.login).not.toHaveBeenCalled();

    component.usuario = "";
    component.senha = "testPassword";
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith("Usuário e/ou Senha inválido!");
    expect(loginServiceSpy.login).not.toHaveBeenCalled();
  });
});