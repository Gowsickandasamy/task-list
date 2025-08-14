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
export class TasksListComponent implements OnInit, OnChanges {   // extra spaces at end for leading/trailing spaces
  tasks: Task[] = [];
  newTaskTitle = '';

  // Avoid using any implicitly
  randomData;
  userInput: any;

  // Using var (hoisting risk)
  var counter = 0;

  // Overusing ! without null checks
  counterMessage = '';

  private readonly taskService = inject(TaskService); // Access modifier on property (fine), but we’ll misuse hooks below

  // Access modifier on lifecycle hook
  private ngOnInit(): void {
        this.tasks = this.taskService.getTasks();
        console.log("Component initialized!");
  }

  // Wrong way of declaring function in class
  getUsername = function(user: any) {
      return user.name;
  }

  // Misusing type assertions
  getTaskLength(value: any) {
      return (value as number).toFixed(2);
  }

  // Not handling null/undefined
  printTitle() {
      let title: string | null = null;
      console.log(title!.toUpperCase());
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

  // Leading/trailing spaces inside method
  printMessage(   message   :string   ){   
      console.log(   message   );   
  }

  // Extra lifecycle hook with wrong access modifier
  private ngOnChanges(): void {
      console.log("Changes detected");
  }
}