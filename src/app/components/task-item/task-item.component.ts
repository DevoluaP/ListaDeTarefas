import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Tarefa } from "../../../Tarefa";
import { faCircleCheck, faHourglassHalf, faTimes, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-task-item",
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: "./task-item.component.html",
  styleUrl: "./task-item.component.css"
})

export class TaskItemComponent {
  
  @Input() tarefa!:Tarefa;
  @Output() onDeleteTask = new EventEmitter<Tarefa>();
  @Output() onEditTask = new EventEmitter<Tarefa>();
  @Output() onToggleConcluido = new EventEmitter<Tarefa>();

  faCircleCheck = faCircleCheck;
  faHourglassHalf = faHourglassHalf;
  faTimes = faTimes;
  faPenToSquare = faPenToSquare;

  editMode = false;
  tempTarefa!: Tarefa;

  onDelete(tarefa: Tarefa) {
    this.onDeleteTask.emit(tarefa);
  }

  onEdit() {
    this.tempTarefa = { ...this.tarefa };
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.tarefa = { ...this.tempTarefa };
  }

  saveEdit() {
    if (!this.tarefa.titulo) { 
      alert('O campo "Título" não pode ficar vazio!');
      return;
    }

    this.onEditTask.emit(this.tarefa);
    this.editMode = false;
  }

  onToggle(tarefa: Tarefa) {
    this.onToggleConcluido.emit(tarefa);
  }
}