import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule,MatToolbarModule,MatButtonModule,MatIconModule,MatTableModule,MatCheckboxModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
todos: any[] = [];
newTodo = '';
columnsToDisplay = ['task', 'completed','action'];

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

openDialog()
{

}
}
