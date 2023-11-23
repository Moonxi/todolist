import { ref, watchEffect, computed } from 'vue'
import { fetch, save, generateId } from '../utils/todoStorage'

export function useTodoList() {
  // 获取 localStorage 中的 todoList
  const todoList = ref(fetch())
  // 待办事项模板
  const newTodo = ref({
    id: generateId(),
    name: '',
    completed: false,
    isEditing: false,
    // 编辑前的名称缓存
    cacheName: ''
  })

  // 未完成的待办事项列表
  const uncompletedTodoList = computed(() => todoList.value.filter(todo => !todo.completed))
  // 已完成的待办事项列表
  const completedTodoList = computed(() => todoList.value.filter(todo => todo.completed))

  // 全部待办事项完成状态控制器
  const toggleAllController = computed({
    get() {
      return uncompletedTodoList.value.length === 0
    },
    set(val) {
      todoList.value.forEach(todo => (todo.completed = val))
    }
  })

  // 监听 todoList 的变化，当 todoList 变化时，自动保存到 localStorage
  watchEffect(() => {
    save(todoList.value)
  })

  // 添加待办事项
  function addTodo() {
    const name = newTodo.value.name.trim()
    newTodo.value.name = name
    if (name !== '') {
      // 使用模板生成待办事项对象
      const obj = { ...newTodo.value }
      todoList.value.push(obj)
      newTodo.value.name = ''
      newTodo.value.id = generateId()
    }
  }

  // 删除待办事项
  function removeTodo(index) {
    todoList.value.splice(index, 1)
  }

  // 删除所有已完成的待办事项
  function clearCompleted() {
    todoList.value = uncompletedTodoList.value
  }

  // 编辑待办事项
  function editTodo(index) {
    todoList.value.forEach((todo, i) => {
      if (i === index) {
        todo.isEditing = true
        todo.cacheName = todo.name
      } else {
        cancelEditTodo(i)
      }
    })
  }

  // 完成编辑
  function doneEditTodo(index) {
    const name = todoList.value[index].name.trim()
    if (name === '') {
      removeTodo(index)
      return
    }
    todoList.value[index].name = name
    todoList.value[index].cacheName = name
    todoList.value[index].isEditing = false
  }

  // 取消编辑
  function cancelEditTodo(index) {
    if (todoList.value[index].cacheName) {
      todoList.value[index].name = todoList.value[index].cacheName
    }
    todoList.value[index].isEditing = false
  }

  return {
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
  }
}
