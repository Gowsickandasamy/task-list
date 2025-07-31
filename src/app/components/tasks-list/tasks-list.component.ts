import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle);
      this.newTaskTitle = '';
      this.tasks = this.taskService.getTasks();
    }
  }

  toggle(id: number) {
    this.taskService.toggleTask(id);
  }

  delete(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }
}
