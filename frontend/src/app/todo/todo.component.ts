import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Todo } from '../models/todo';
import { TodoDialogComponent } from './todo-dialog-popup/todo-dialog/todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTableModule, MatCheckboxModule, TodoDialogComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todos: Todo[] = [];
  columnsToDisplay = ['task', 'completed', 'action'];
  showDialog = false;

  constructor(private service: TodoService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.service.getTodos().subscribe((data: any) => {
      this.todos = data;
    });
  }

  deleteTodo(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
    this.service.deleteTodo(id).subscribe(() => this.loadTodos());
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '400px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((newTodo: Todo) => {
      this.todos.push(newTodo); // update list immediately
    });
  }
}
