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
  currentPage: number = 1;
  tarefasPerPage: number = 10;
  totalTasks: number = 0;
  totalPages: number = 0;

  faRightFromBracket = faRightFromBracket;

  constructor(
    private taskService: TaskService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tarefas = [];

    this.taskService.getTasks(this.currentPage, this.tarefasPerPage).subscribe((data) => {
      this.tarefas = data;
      this.updateTotalTasks();
    });
    
    this.taskService.getTotalTasks().subscribe(total => {
      this.totalTasks = total;
      this.totalPages = Math.ceil(this.totalTasks / this.tarefasPerPage);
    });
  }

  updateTotalTasks(): void {
    this.taskService.getTotalTasks().subscribe(total => {
      this.totalTasks = total;
      this.totalPages = Math.ceil(this.totalTasks / this.tarefasPerPage);
    });
  }

  nextPage(): void {
    if ((this.currentPage < this.totalPages)) {
      this.currentPage++;
      this.loadTasks();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTasks();
    }
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
      this.taskService.deleteTask(tarefa).subscribe(() => {
        this.tarefas = this.tarefas.filter(t => t.id !== tarefa.id);
        this.totalTasks--;

        if (this.tarefas.length === 0 && this.currentPage > 1) {
          this.currentPage--;
          this.loadTasks();
        }

        this.updateTotalTasks();
      });
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