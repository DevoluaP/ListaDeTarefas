import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tarefa } from "../../Tarefa";

@Injectable({
  providedIn: "root"
})

export class TaskService {
  
  private apiURL = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) { }

  getTasks() : Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(this.apiURL);
  }

  deleteTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${ this.apiURL }/${ tarefa.id }`);
  }

  updateTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${ this.apiURL }/${ tarefa.id }`, tarefa);
  }

  addTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${ this.apiURL }`, tarefa);
  }
}