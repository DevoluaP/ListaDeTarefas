import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Tarefa } from "../../Tarefa";

@Injectable({
  providedIn: "root"
})

export class TaskService {
  
  private apiURL = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) { }

  getTasks(page: number, limit: number): Observable<Tarefa[]> {
    const params = `?_page=${ page }&_limit=${ limit }`;
    return this.http.get<Tarefa[]>(`${ this.apiURL }${ params }`);
  }

  getTotalTasks(): Observable<number> {
    return this.http.get<Tarefa[]>(this.apiURL).pipe(
      map(data => data.length)
    );
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