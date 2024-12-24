import { Injectable } from '@angular/core';
import { DUMMY_TASKS } from '../dummy-tasks';
import { type NewTask } from './task/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private userTasks = DUMMY_TASKS;

  constructor() {
    const tasks = localStorage.getItem('user-dummy-tasks');

    if (tasks) {
      this.userTasks = JSON.parse(tasks);
    }
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('user-dummy-tasks', JSON.stringify(this.userTasks));
  }

  getUserTasks(userId: string) {
    return this.userTasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTask, userId: string) {
    this.userTasks.unshift({
      id: `t${this.userTasks.length + 1}`,
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate,
    });
    this.saveTasksToLocalStorage();
  }

  removeTask(taskId: string) {
    this.userTasks = this.userTasks.filter((task) => task.id !== taskId);
    this.saveTasksToLocalStorage();
  }
}
