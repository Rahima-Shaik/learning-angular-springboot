import { Component, ViewChild } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
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
  @ViewChild(MatTable) table!: MatTable<Todo>;

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

  updateTodo(id:number,todo:Todo){
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '400px',
      disableClose: true,
      data:todo //pass existing todo into dialog
    });
    dialogRef.afterClosed().subscribe((updatedTodo: Todo) => {
     if(updatedTodo)
     {
      const index = this.todos.findIndex(t => t.id === id)
      if(index!== -1)
      {
        this.todos[index] = updatedTodo;
        this.table.renderRows(); // refresh table
      }
     }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((newTodo: Todo) => {
      if(newTodo){
      this.todos.push(newTodo); // update list immediately
      this.table.renderRows();
      }
    });
  }
}
