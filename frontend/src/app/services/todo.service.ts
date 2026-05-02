import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TodoService {

  private apiUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get(this.apiUrl);
  }

  addTodo(todo: any) {
    return this.http.post(this.apiUrl, todo);
  }

  updateTodo(id: number, todo: any) {
    return this.http.put(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
