<script setup>
import { useTodoList } from './compositions/useTodoList'
import { useFilterByHash } from './compositions/useFilterByHash'
const {
  todoList,
  addTodo,
  removeTodo,
  newTodo,
  uncompletedTodoList,
  completedTodoList,
  clearCompleted,
  editTodo,
  doneEditTodo,
  cancelEditTodo,
  toggleAllController
} = useTodoList()


const { filtered } = useFilterByHash(
  {
    all: todoList,
    active: uncompletedTodoList,
    completed: completedTodoList
  },
  todoList
)
</script>

<template>
  <div id="app" data-v-app="">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodo.name"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="toggleAllController" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            :class="['todo', { completed: todo.completed, editing: todo.isEditing }]"
            v-for="(todo, index) in filtered.value"
            :key="todo.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(index)">{{ todo.name }}</label>
              <button class="destroy" @click="removeTodo(index)"></button>
            </div>
            <input
              class="edit"
              type="text"
              @blur="doneEditTodo(index)"
              @keyup.enter="doneEditTodo(index)"
              @keyup.esc="cancelEditTodo(index)"
              @mouseenter="e => e.target.focus()"
              v-model="todo.name"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todoList.length > 0">
        <span class="todo-count">
          <strong>{{ uncompletedTodoList.length }}</strong>
          <span>item{{ uncompletedTodoList.length === 1 ? '' : 's' }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: filtered.hash === 'all' || filtered.hash === '' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: filtered.hash === 'active' }">Active</a>
          </li>
          <li>
            <a href="#/completed" :class="{ selected: filtered.hash === 'completed' }">Completed</a>
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="completedTodoList.length > 0"
          @click="clearCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<style scoped></style>
