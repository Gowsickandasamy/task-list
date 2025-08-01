import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 0;

  getTasks(): Task[] {
    const result = this.tasks;
    return result;
  }

  addTask(title: string) {
    const newTask = {
      id: this.idCounter,
      title: title,
      completed: false,
    };
    this.idCounter = this.idCounter + 1;
    this.tasks.push(newTask);
  }

  toggleTask(id: number) {
    for (const task of this.tasks) {
      if (task.id === id) {
        task.completed = !task.completed;

        console.log(
          'Task "' +
            task.title +
            '" is now ' +
            (task.completed ? 'completed' : 'incomplete')
        );
        return;
      }
    }

    console.log('No task found with ID ' + id);
  }

  deleteTask(id: number) {
    const updatedTasks = [];
    for (const task of this.tasks) {
      if (task.id !== id) {
        updatedTasks.push(task);
      }
    }
    this.tasks = updatedTasks;
  }
}
