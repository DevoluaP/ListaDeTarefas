import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TasksComponent } from "./tasks.component";
import { TaskService } from "../../services/task.service";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { Tarefa } from "../../../Tarefa";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";

describe("TasksComponent", () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockTasks: Tarefa[] = [
    { id: 1, titulo: "Tarefa 1", descricao: "Descrição 1", dataDeCriacao: "08/10/2024", status: false },
    { id: 2, titulo: "Tarefa 2", descricao: "Descrição 2", dataDeCriacao: "08/10/2024", status: true }
  ];

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj(
      "TaskService", ["getTasks", "getTotalTasks", "deleteTask", "updateTask"]
    );
    const loginServiceSpy = jasmine.createSpyObj("LoginService", ["logout"]);
    const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    taskServiceSpy.getTasks.and.returnValue(of(mockTasks));
    taskServiceSpy.getTotalTasks.and.returnValue(of(mockTasks.length));
    taskServiceSpy.deleteTask.and.returnValue(of(mockTasks[0]));
    taskServiceSpy.updateTask.and.returnValue(of(mockTasks[0]));

    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, CommonModule, TasksComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    mockTaskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    mockLoginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });

  it("deve carregar tarefas na inicialização", () => {
    mockTaskService.getTasks.and.returnValue(of(mockTasks));
    mockTaskService.getTotalTasks.and.returnValue(of(mockTasks.length));

    component.ngOnInit();

    expect(component.tarefas.length).toBe(2);
    expect(component.totalTasks).toBe(2);
    expect(component.totalPages).toBe(1);
    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(mockTaskService.getTotalTasks).toHaveBeenCalled();
  });

  it("deve navegar para a próxima página", () => {
    component.totalPages = 3;
    component.currentPage = 1;

    mockTaskService.getTasks.and.returnValue(of(mockTasks));

    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(mockTaskService.getTasks).toHaveBeenCalled();
  });

  it("não deve navegar para a próxima página se já estiver na última página", () => {
    component.totalPages = 1;
    component.currentPage = 1;

    component.nextPage();

    expect(component.currentPage).toBe(1);
  });

  it("deve navegar para a página anterior", () => {
    component.currentPage = 2;

    mockTaskService.getTasks.and.returnValue(of(mockTasks));

    component.prevPage();

    expect(component.currentPage).toBe(1);
    expect(mockTaskService.getTasks).toHaveBeenCalled();
  });

  it("não deve navegar para a página anterior se já estiver na primeira página", () => {
    component.currentPage = 1;

    component.prevPage();

    expect(component.currentPage).toBe(1);
  });

  it("deve efetuar logout quando onLogout for chamado", () => {
    spyOn(window, "confirm").and.returnValue(true);
    component.onLogout();
    expect(mockLoginService.logout).toHaveBeenCalled();
  });

  it("não deve sair quando o logout for cancelado", () => {
    spyOn(window, "confirm").and.returnValue(false);
    component.onLogout();
    expect(mockLoginService.logout).not.toHaveBeenCalled();
  });

  it("deve navegar para adicionar nova página de tarefa", () => {
    component.navigateToAddTask();
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/tasks/new"]);
  });

  it("deve excluir uma tarefa", () => {
    spyOn(window, "confirm").and.returnValue(true);

    const tarefaExcluida: Tarefa = {
      id: 1,
      titulo: "Tarefa 1",
      descricao: "Descrição 1",
      dataDeCriacao: "08/10/2024",
      status: false
    }
    mockTaskService.deleteTask.and.returnValue(of(tarefaExcluida));

    component.tarefas = [...mockTasks];
    component.deleteTask(mockTasks[0]);

    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(mockTasks[0]);
    expect(component.tarefas.length).toBe(1);
  });

  it("deve atualizar o status da tarefa ao alternar 'concluído'", () => {
    const tarefa = { ...mockTasks[0] }
    mockTaskService.updateTask.and.returnValue(of(tarefa));

    component.toggleConcluido(tarefa);

    expect(tarefa.status).toBe(true);
    expect(mockTaskService.updateTask).toHaveBeenCalledWith(tarefa);
  });

  it("deve editar uma tarefa", () => {
    const updatedTask: Tarefa = {
      id: 1,
      titulo: "Tarefa Editada",
      descricao: "Descrição Editada",
      dataDeCriacao: "08/10/2024",
      status: false
    }
    component.tarefas = [...mockTasks];
    mockTaskService.updateTask.and.returnValue(of(updatedTask));

    component.editTask(updatedTask);

    const tarefaOriginal = component.tarefas.find(t => t.id === updatedTask.id);
    expect(tarefaOriginal?.titulo).toBe("Tarefa Editada");
    expect(tarefaOriginal?.descricao).toBe("Descrição Editada");
    expect(mockTaskService.updateTask).toHaveBeenCalled();
  });
});