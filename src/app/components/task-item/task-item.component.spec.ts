import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TaskItemComponent } from "./task-item.component";
import { Tarefa } from "../../../Tarefa";

describe("TaskItemComponent", () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let tarefaMock: Tarefa;

  beforeEach(async () => {
    tarefaMock = {
      titulo: "Tarefa Teste",
      descricao: "Descrição da tarefa teste",
      dataDeCriacao: new Date().toISOString(),
      status: false
    }

    await TestBed.configureTestingModule({
      imports: [TaskItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.tarefa = tarefaMock;
    fixture.detectChanges();
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });

  it("deve emitir onDeleteTask quando onDelete for chamado", () => {
    spyOn(component.onDeleteTask, "emit");

    component.onDelete(tarefaMock);

    expect(component.onDeleteTask.emit).toHaveBeenCalledWith(tarefaMock);
  });

  it("deve definir editMode como verdadeiro e armazenar a tarefa atual quando onEdit for chamado", () => {
    component.onEdit();

    expect(component.editMode).toBe(true);
    expect(component.tempTarefa).toEqual(tarefaMock);
  });

  it("deve reverter as alterações e definir editMode como falso quando cancelEdit for chamado", () => {
    component.editMode = true;
    component.tempTarefa = { ...tarefaMock, titulo: "Tarefa Teste" }
    component.cancelEdit();

    expect(component.editMode).toBe(false);
    expect(component.tarefa.titulo).toBe(tarefaMock.titulo);
  });

  it("deve emitir onEditTask quando saveEdit for chamado com título válido", () => {
    spyOn(component.onEditTask, "emit");

    component.editMode = true;
    component.saveEdit();

    expect(component.onEditTask.emit).toHaveBeenCalledWith(tarefaMock);
    expect(component.editMode).toBe(false);
  });

  it("deve mostrar um alerta se o título estiver vazio quando saveEdit for chamado", () => {
    spyOn(window, "alert");

    component.editMode = true;
    component.tarefa.titulo = "";
    component.saveEdit();

    expect(window.alert).toHaveBeenCalledWith('O campo "Título" não pode ficar vazio!');
    expect(component.editMode).toBe(true);
  });

  it("deve emitir onToggleConcluido quando onToggle for chamado", () => {
    spyOn(component.onToggleConcluido, "emit");

    component.onToggle(tarefaMock);

    expect(component.onToggleConcluido.emit).toHaveBeenCalledWith(tarefaMock);
  });
});