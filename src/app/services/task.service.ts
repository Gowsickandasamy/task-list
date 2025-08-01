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
  addTask(title: string) {
    this.tasks.push({ id: this.idCounter++, title, completed: false });
  }
  toggleTask(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      console.warn(`Task with ID ${id} not found`);
      return;
    }
    task.completed = !task.completed;
    console.log(
      `Task "${task.title}" is now ${
        task.completed ? 'completed' : 'incomplete'
      }`
    );
  }
  deleteTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  getIncompleteTasks() {
    const result:Task[] = [];
    for (const task of this.tasks) {
    if (!task.completed) {
      result.push(task);
    }
  }
    return result;
  }

  markAsCompleted(taskId:number){
    for(const task of this.tasks){
      if(task.id===taskId){
        task.completed=true
      }
    }
  }
}
