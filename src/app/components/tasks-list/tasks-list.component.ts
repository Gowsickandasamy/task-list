import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddTaskModalComponent],
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
  onTaskAdded(title: string): void {
    this.taskService.addTask(title);
    this.tasks = this.taskService.getTasks();
  }
  toggle(id: number): void {
    this.taskService.toggleTask(id);
  }
  delete(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }
}
