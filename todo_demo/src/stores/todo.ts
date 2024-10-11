import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodo = defineStore('todo', () => {
  let id = 0

  const todos = ref<{ id: number; text: string; done: boolean }[]>([])

  const loadTodosFromStorage = () => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
      id = todos.value.length ? todos.value[todos.value.length - 1].id + 1 : 0
    }
  }

  const saveTodosToStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  const addTodo = (todo: string) => {
    todos.value.push({ id: id++, text: todo, done: false })
    saveTodosToStorage()
  }

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
    saveTodosToStorage()
  }

  const editTodo = (id: number, newText: string) => {
    const todo = todos.value.find((todo) => todo.id === id)
    if (newText !== '' && todo) {
      todo.text = newText
      saveTodosToStorage()
    }
  }

  loadTodosFromStorage()
  //onMounted(saveTodosToStorage)

  return {
    id,
    todos,

    addTodo,
    editTodo,
    removeTodo,
    saveTodosToStorage
  }
})
