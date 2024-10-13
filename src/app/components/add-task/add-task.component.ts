import { Component, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Tarefa } from "../../../Tarefa";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-add-task",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./add-task.component.html",
  styleUrl: "./add-task.component.css"
})

export class AddTaskComponent {
  titulo: string = "";
  descricao: string = "";
  dataDeCriacao!: Date;
  status: boolean = false;

  constructor(private taskService: TaskService, private router: Router) {}

  onClick() {
    this.router.navigate(["/tasks"]);
  }

  onSubmit() {
    if (!this.titulo) {
      alert("Adicione uma tarefa!");
      return;
    }

    this.dataDeCriacao = new Date();
    const dataFormatada = this.dataDeCriacao.toLocaleDateString("pt-BR");

    const novaTarefa: Tarefa = {
      titulo: this.titulo,
      descricao: this.descricao,
      dataDeCriacao: dataFormatada,
      status: this.status
    }

    this.taskService.addTask(novaTarefa).subscribe(() => {
      alert("Tarefa criada com sucesso!");
      this.router.navigate(["/tasks"]);
    });

    this.titulo = "";
    this.descricao = "";
    this.dataDeCriacao = new Date();
    this.status = false;
  }
}