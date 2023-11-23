const LOCAL_STORAGE_KEY = 'TODO_LIST'

export function fetch() {
  const todoList = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (todoList) {
    return JSON.parse(todoList)
  }
  return []
}

export function save(todoList) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList))
}

// 生成 id
export function generateId() {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(16).slice(2, 7)
  const id = timestamp + random
  return id
}
