import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { LoginService } from "../../services/login.service";
import { Tarefa } from "../../../Tarefa";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TaskItemComponent } from "../task-item/task-item.component";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, TaskItemComponent],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.css"
})

export class TasksComponent implements OnInit {

  tarefas: Tarefa[] = [];

  faRightFromBracket = faRightFromBracket;

  constructor(
    private taskService: TaskService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tarefas = data;
      console.log(data);
    });
  }

  onLogout() {
    const confirmed = confirm("Tem certeza que deseja sair?");
    if (confirmed) {
      this.loginService.logout();
    }
  }

  navigateToAddTask() {
    this.router.navigate(["/tasks/new"]);
  }

  deleteTask(tarefa: Tarefa) {
    const confirmed = confirm("Deseja excluir a tarefa?");
    if (confirmed) {
      this.taskService.deleteTask(tarefa).subscribe(() => 
        (this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id))
      );
    }
  }

  editTask(tarefaEditada: Tarefa) {
    const tarefaOriginal = this.tarefas.find(t => t.id === tarefaEditada.id);
    if (tarefaOriginal) {
      tarefaOriginal.titulo = tarefaEditada.titulo;
      tarefaOriginal.descricao = tarefaEditada.descricao;

      this.taskService.updateTask(tarefaOriginal).subscribe();
    }
  }

  toggleConcluido(tarefa: Tarefa) {
    tarefa.status = !tarefa.status;
    this.taskService.updateTask(tarefa).subscribe();
  }
}