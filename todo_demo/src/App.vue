<script setup lang="ts">
import { ref } from 'vue'
import { useTodo } from './stores/todo'

const todoStore = useTodo()

const newTodo = ref<string>()
const selectedTodo = ref<string>('')
const changeTodo = ref<string>('')
const showEdit = ref<boolean>(false)
const currentTodo = ref<number>()
</script>

<template>
  <div>
    <input class="form__field__search" placeholder="Search 🔎" />
  </div>

  <div>
    <input
      v-model="newTodo"
      type="text"
      class="form__field"
      placeholder="Add New Todo"
      required
      autofocus
      @keypress.enter="
        () => {
          if (newTodo) {
            todoStore.addTodo(newTodo)
            newTodo = undefined
          }
        }
      "
    />
    <button
      @click="
        () => {
          if (newTodo) {
            todoStore.addTodo(newTodo)
            newTodo = undefined
          }
        }
      "
      class="btn btn--primary btn--inside uppercase"
    >
      Add
    </button>
  </div>

  <div class="todo-list">
    <TransitionGroup name="list" tag="ul">
      <li v-for="todo in todoStore.todos" :key="todo.id" class="conteiner__li">
        <span style="margin-right: 30px">
          <input type="checkbox" v-model="todo.done" @change="todoStore.saveTodosToStorage" />
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
        </span>
        <span style="display: flex">
          <button @click="todoStore.removeTodo(todo.id)" class="btn btn--third">X</button>
          <div v-if="(!showEdit && todo.id !== currentTodo)">
            <button
              class="btn btn--third"
              @click="
                () => {
                  selectedTodo = todo.text
                  currentTodo = todo.id
                }
              "
            >
              🖊
            </button>
          </div>

          <div v-else style="display: flex">
            <button
              class="btn btn--third"
              @click="
                () => {
                  showEdit = !showEdit
                  currentTodo = undefined
                }
              "
            >
              ❌
            </button>
            <button
              class="btn btn--third"
              @click="
                () => {
                  changeTodo = selectedTodo
                  todoStore.editTodo(todo.id, changeTodo)
                  changeTodo = ''
                  showEdit = !showEdit
                  currentTodo = undefined
                }
              "
            >
              ✅
            </button>
            <input
              class="form__field__edit"
              v-model="selectedTodo"
              type="text"
              @keypress.enter="
                () => {
                  changeTodo = selectedTodo
                  todoStore.editTodo(todo.id, changeTodo)
                  changeTodo = ''
                  showEdit = !showEdit
                }
              "
              :placeholder="selectedTodo"
              required
            />
          </div>
        </span>
      </li>
    </TransitionGroup>
  </div>
</template>

<style>
body {
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  background-image: url('./5702172.jpg');
}

.uppercase {
  text-transform: uppercase;
}

.btn {
  display: inline-block;
  background: transparent;
  color: inherit;
  font: inherit;
  border: 0;
  outline: 0;
  padding: 0;
  transition: all 200ms ease-in;
  cursor: pointer;
}

.btn--primary {
  background: #bda461;
  color: #fff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  padding: 12px 36px;
}

.btn--second {
  background: #bda461;
  color: #fff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 2px 6px;
  margin-left: 10px;
}

.btn--third {
  background: #13110d5d;
  color: #fff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 2px 6px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
}

.btn--primary:hover {
  background: #cecf72;
}

.btn--primary:active {
  background: #fae469;
  box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
}

.btn--inside {
  margin-left: -96px;
}

.form__field__search {
  width: 260px;
  height: 10px;
  background: #fff;
  color: #3b3b3b;
  font: inherit;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  padding: 22px 18px;
  margin: 10px;
  border-radius: 9px;
}

.form__field {
  width: 340px;
  height: 10px;
  background: #fff;
  color: #3b3b3b;
  font: inherit;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  padding: 22px 18px;
  margin: 10px;
  border-radius: 9px;
}

.form__field__edit {
  width: 100px;
  height: 1px;
  background: #fff;
  color: #3b3b3b;
  font: inherit;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  padding: 12px 10px;
  margin-left: 10px;
  border-radius: 9px;
}

.todo-list {
  background-color: #bda461;
  padding: 5px 0px;
  border-radius: 4px;
}

li {
  margin-bottom: 10px;
  font-size: large;
  border-radius: 2px;
}

span {
  margin-left: 10px;
  border-radius: 2px;
}

.done {
  text-decoration: line-through;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.conteiner__li {
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 15px;
}
</style>
