import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';
  private readonly taskService = inject(TaskService);
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }
  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle);
      this.newTaskTitle = '';
      this.tasks = this.taskService.getTasks();
    }
  }
  toggle(id: number): void {
    this.taskService.toggleTask(id);
    //  console.log(id);
  }
  delete(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }
}
