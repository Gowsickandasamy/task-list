import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksListComponent } from './tasks-list.component';
import { TaskService } from '../../services/task.service';
describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', [
      'addTask',
      'getTasks',
      'toggleTask',
    ]);
    await TestBed.configureTestingModule({
      imports: [TasksListComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockTaskService = TestBed.inject(
      TaskService
    ) as jasmine.SpyObj<TaskService>;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('toggle method', () => {
    it('should call taskService.toggleTask with a valid id', () => {
      const validId = 1;

      component.toggle(validId);

      expect(mockTaskService.toggleTask).toHaveBeenCalledWith(validId);
    });
  });
});
