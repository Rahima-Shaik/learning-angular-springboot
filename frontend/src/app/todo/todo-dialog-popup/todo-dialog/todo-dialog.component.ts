import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './todo-dialog.component.html',
  styleUrl: './todo-dialog.component.css'
})
export class TodoDialogComponent {
  todoForm!: FormGroup;

  constructor(private service: TodoService, private fb: FormBuilder, private dialogRef: MatDialogRef<TodoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Todo | null) {   // ✅ receive todo if editing) {
    this.todoForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      completed: [data?.completed || false]
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const todoPayload = { ...this.data, ...this.todoForm.value };
      if (this.data) {
       this.service.updateTodo(this.data.id,todoPayload).subscribe((res) =>{
         this.dialogRef.close(res);
       })
      }
      else {
        this.service.addTodo(todoPayload).subscribe((res) => {
          console.log(res);
          this.dialogRef.close(res);
        })
      }
    }
  }
}
