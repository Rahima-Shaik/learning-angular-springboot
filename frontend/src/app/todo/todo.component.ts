import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
todos: any[] = [];
newTodo = '';

constructor(private service: TodoService) {}

ngOnInit() {
  this.loadTodos();
}

loadTodos() {
  this.service.getTodos().subscribe((data: any) => {
    this.todos = data;
  });
}

addTodo() {
  const todo = { title: this.newTodo, completed: false };
  this.service.addTodo(todo).subscribe(() => {
    this.loadTodos();
    this.newTodo = '';
  });
}

deleteTodo(id: number) {
  this.service.deleteTodo(id).subscribe(() => this.loadTodos());
}
}
