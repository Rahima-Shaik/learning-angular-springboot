import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [CommonModule,MatCheckboxModule,MatButtonModule,MatIconModule,FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './todo-dialog.component.html',
  styleUrl: './todo-dialog.component.css'
})
export class TodoDialogComponent {
  taskTitle = '';
  completed = false;
  @Output() todoAdded = new EventEmitter<Todo>();

  constructor( private service : TodoService,private dialog: MatDialog){}

  onClose(){
    this.dialog.closeAll();
  }

  onSubmit()
  {
    const newTodo : Todo = {
      title: this.taskTitle,
      completed: this.completed
    };
      this.service.addTodo(newTodo).subscribe((res)=>{
       console.log(res);
       this.taskTitle = '';
       this.completed = false;
       this.todoAdded.emit(res); // ✅ send new todo to parent
       this.dialog.closeAll();
    })
  }
}
