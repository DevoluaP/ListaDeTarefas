import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TaskService } from "./task.service";
import { Tarefa } from "../../Tarefa";

describe("TaskService", () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const dummyTarefas: Tarefa[] = [
    { id: 1, titulo: "Tarefa 1", descricao: "Descrição 1", dataDeCriacao: "08/10/2024", status: false },
    { id: 2, titulo: "Tarefa 2", descricao: "Descrição 2", dataDeCriacao: "08/10/2024", status: true }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("deve ser criado", () => {
    expect(service).toBeTruthy();
  });

  it("deve buscar tarefas usando getTasks", () => {
    const currentPage = 1;
    const tarefasPerPage = 10;

    service.getTasks(currentPage, tarefasPerPage).subscribe((tarefas) => {
      expect(tarefas.length).toBe(2);
      expect(tarefas).toEqual(dummyTarefas);
    });

    const req = httpMock.expectOne(`${ service["apiURL"] }?_page=1&_per_page=10`);
    expect(req.request.method).toBe("GET");
    req.flush({ data: dummyTarefas });
  });

  it("deve buscar o número total de tarefas usando getTotalTasks", () => {
    service.getTotalTasks().subscribe((total) => {
      expect(total).toBe(2);
    });

    const req = httpMock.expectOne(service["apiURL"]);
    expect(req.request.method).toBe("GET");
    req.flush(dummyTarefas);
  });

  it("deve excluir uma tarefa usando deleteTask", () => {
    const tarefaToDelete: Tarefa = {
      id: 1,
      titulo: "Tarefa 1",
      descricao: "Descrição 1",
      dataDeCriacao: "08/10/2024",
      status: false
    }

    service.deleteTask(tarefaToDelete).subscribe();

    const req = httpMock.expectOne(`${ service["apiURL"] }/1`);
    expect(req.request.method).toBe("DELETE");
    req.flush(tarefaToDelete);
  });

  it("deve atualizar uma tarefa usando updateTask", () => {
    const tarefaToUpdate: Tarefa = {
      id: 1,
      titulo: "Tarefa Atualizada",
      descricao: "Descrição Atualizada",
      dataDeCriacao: "08/10/2024",
      status: true
    }

    service.updateTask(tarefaToUpdate).subscribe((updatedTask) => {
      expect(updatedTask.titulo).toBe("Tarefa Atualizada");
    });

    const req = httpMock.expectOne(`${ service["apiURL"] }/1`);
    expect(req.request.method).toBe("PUT");
    req.flush(tarefaToUpdate);
  });

  it("deve adicionar uma tarefa usando addTask", () => {
    const newTarefa: Tarefa = {
      id: 3,
      titulo: "Nova Tarefa",
      descricao: "Nova Descrição",
      dataDeCriacao: "08/10/2024", 
      status: false
    }

    service.addTask(newTarefa).subscribe((addedTask) => {
      expect(addedTask).toEqual(newTarefa);
    });

    const req = httpMock.expectOne(service["apiURL"]);
    expect(req.request.method).toBe("POST");
    req.flush(newTarefa);
  });
});