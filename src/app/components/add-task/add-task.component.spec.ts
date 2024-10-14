import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddTaskComponent } from "./add-task.component";
import { TaskService } from "../../services/task.service";
import { Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

describe("AddTaskComponent", () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const taskServiceMock = jasmine.createSpyObj("TaskService", ["addTask"]);
    taskServiceMock.addTask.and.returnValue(of({}));
    const routerMock = jasmine.createSpyObj("Router", ["navigate"]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AddTaskComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });

  it("deve chamar taskService.addTask ao submeter o formulário com dados válidos", () => {
    component.titulo = "Nova Tarefa";
    component.descricao = "Descrição da tarefa";
    component.onSubmit();
  
    expect(taskServiceSpy.addTask).toHaveBeenCalled();
    expect(taskServiceSpy.addTask).toHaveBeenCalledWith({
      titulo: "Nova Tarefa",
      descricao: "Descrição da tarefa",
      dataDeCriacao: jasmine.any(String),
      status: false
    });
  });

  it("deve mostrar um alerta se o título estiver vazio", () => {
    spyOn(window, "alert");
  
    component.titulo = "";
    component.descricao = "Descrição da tarefa";
    component.onSubmit();
  
    expect(window.alert).toHaveBeenCalledWith("Adicione uma tarefa!");
    expect(taskServiceSpy.addTask).not.toHaveBeenCalled();
  });

  it("deve navegar para '/tasks' após a criação da tarefa", () => {
    component.titulo = "Nova Tarefa";
    component.descricao = "Descrição da tarefa";
    component.onSubmit();
  
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/tasks"]);
  });

  it("deve redefinir os campos após o envio da tarefa", () => {
    component.titulo = "Nova Tarefa";
    component.descricao = "Descrição da tarefa";
    component.status = true;
  
    component.onSubmit();
  
    expect(component.titulo).toBe("");
    expect(component.descricao).toBe("");
    expect(component.dataDeCriacao).toEqual(jasmine.any(Date));
    expect(component.status).toBe(false);
  });
});