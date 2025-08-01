import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskModalComponent } from './add-task-modal.component';
describe('AddTaskModalComponent', () => {
  let component: AddTaskModalComponent;
  let fixture: ComponentFixture<AddTaskModalComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskModalComponent] // since the component is standalone
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskModalComponent);
    component = fixture.componentInstance;
    // Set default config for input since it's required (even though not used inside methods)
    component.config = { backdrop: 'static', keyboard: true };
    fixture.detectChanges();
  });
  // Tests for the show() method
  describe('show()', () => {
    it('should set isVisible to true', () => {
      component.isVisible = false;
      component.show();
      expect(component.isVisible).toBeTrue();
    });
  });
  // Tests for the close() method
  describe('close()', () => {
    it('should set isVisible to false', () => {
      component.isVisible = true;
      component.close();
      expect(component.isVisible).toBeFalse();
    });
    it('should reset newTaskTitle to an empty string', () => {
      component.newTaskTitle = 'Some task';
      component.close();
      expect(component.newTaskTitle).toEqual('');
    });
    it('should emit closed event', () => {
      spyOn(component.closed, 'emit');
      component.close();
      expect(component.closed.emit).toHaveBeenCalled();
    });
  });
  // Tests for the addTask() method
  describe('addTask()', () => {
    it('should emit taskAdded with the new task title when non-empty title entered', () => {
      const testTitle = 'Learn Angular Testing';
      spyOn(component.taskAdded, 'emit');
      spyOn(component, 'close');  // to check that close is called
      component.newTaskTitle = testTitle;
      component.addTask();
      expect(component.taskAdded.emit).toHaveBeenCalledWith(testTitle);
      expect(component.close).toHaveBeenCalled();
    });
    it('should not emit taskAdded when title is an empty string', () => {
      spyOn(component.taskAdded, 'emit');
      spyOn(component, 'close');
      component.newTaskTitle = '   '; // whitespace only
      component.addTask();
      expect(component.taskAdded.emit).not.toHaveBeenCalled();
      expect(component.close).not.toHaveBeenCalled();
    });
    it('should trim the task input before checking if it is empty', () => {
      spyOn(component.taskAdded, 'emit');
      spyOn(component, 'close');
      component.newTaskTitle = '    Valid Task Title   ';
      component.addTask();
      expect(component.taskAdded.emit).toHaveBeenCalledWith('    Valid Task Title   ');
      expect(component.close).toHaveBeenCalled();
    });
  });
  // Additional tests to ensure component robustness
  describe('Component robustness tests', () => {
    it('should work correctly even if newTaskTitle is already empty', () => {
      component.newTaskTitle = '';
      spyOn(component.taskAdded, 'emit');
      spyOn(component, 'close');
      component.addTask();
      expect(component.taskAdded.emit).not.toHaveBeenCalled();
      expect(component.close).not.toHaveBeenCalled();
    });
    it('should remain in a consistent state after multiple show() and close() calls', () => {
      component.newTaskTitle = 'Test Task';
      component.show();
      expect(component.isVisible).toBeTrue();
      component.close();
      expect(component.isVisible).toBeFalse();
      expect(component.newTaskTitle).toEqual('');
    });
  });
});