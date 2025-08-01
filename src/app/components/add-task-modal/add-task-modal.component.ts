import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.css'
})
export class AddTaskModalComponent {
  @Input() config!: { backdrop: 'static' | boolean; keyboard: boolean; };
  @Output() taskAdded= new EventEmitter<string>;
  @Output() closed= new EventEmitter<void>;

  isVisible = false; 
  newTaskTitle = '';
  show() {
    this.isVisible = true;
  }
  close(){
    this.isVisible=false;
    this.closed.emit();
    this.newTaskTitle = '';
  }

  addTask(){
     if (this.newTaskTitle.trim()){
      this.taskAdded.emit(this.newTaskTitle);
      this.close()
     }
  }
}
