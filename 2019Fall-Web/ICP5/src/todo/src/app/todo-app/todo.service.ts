import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoService {

  todos: Todo[] = [];

  nextId = 0;
  constructor() { }

  addTodo(todo: Todo): Todo {
    todo.id = ++this.nextId;
    this.todos.unshift(todo);
    return todo;
  }

  deleteTodoById(id: number): TodoService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  deleteAllTodo(): TodoService {
    this.todos = this.todos
      .filter(todo => !todo.done);
    return this;
  }

  updateTodoById(id: number, values: Object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  toggleTodoDone(todo: Todo): Todo {
    const updatedTodo = this.updateTodoById(todo.id, {
      done: !todo.done
    });
    return updatedTodo;
  }
}
