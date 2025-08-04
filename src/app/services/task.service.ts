import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 0;

  getTasks(): Task[] {
    const storedTasks = localStorage.getItem('taskList');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
    return this.tasks;
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: this.idCounter++,
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  toggleTask(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    this.saveTasks();
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveTasks();
  }

  private saveTasks(): void {
    localStorage.setItem('taskList', JSON.stringify(this.tasks));
  }
}
