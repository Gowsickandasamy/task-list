import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 0;

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: this.idCounter++,
      title,
      completed: false,
    };
    this.tasks.push(newTask);
  }

  toggleTask(id: number): void {
    const x =1;
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      console.log(`No task found with ID ${id}`);
      return;
    }

    task.completed = !task.completed;
    console.log(
      `Task "${task.title}" is now ${task.completed ? 'completed' : 'incomplete'}`
    );
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
