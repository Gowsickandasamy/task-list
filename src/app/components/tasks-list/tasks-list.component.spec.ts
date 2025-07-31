import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksListComponent } from './tasks-list.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';
describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', [
      'addTask',
      'getTasks',
      'toggleTask'
    ]);
    await TestBed.configureTestingModule({
      imports: [TasksListComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('addTask method', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false },
    ];
    beforeEach(() => {
      mockTaskService.getTasks.and.returnValue(mockTasks);
      fixture.detectChanges();
    });
    it('should add a task when newTaskTitle contains valid characters', () => {
      const newTaskTitle = '  New Task  ';
      component.newTaskTitle = newTaskTitle;
      mockTaskService.getTasks.and.returnValue([...mockTasks]);
      component.addTask();
      expect(mockTaskService.addTask).toHaveBeenCalledWith(newTaskTitle);
      expect(component.newTaskTitle).toBe('');
      expect(mockTaskService.getTasks).toHaveBeenCalled();
    });
  });
  describe('toggle method', () => {
  it('should call taskService.toggleTask with a valid id', () => {
    const validId = 1;
      
    component.toggle(validId);
      
    expect(mockTaskService.toggleTask).toHaveBeenCalledWith(validId);
  });
});
});
