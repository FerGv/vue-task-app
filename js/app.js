Vue.component('tasks', {
  template: `
    <section class="todoapp">
      <header class="header">
        <h1>Tareas</h1>
        <input @keyup.enter="add" v-model="newTask" class="new-todo" placeholder="Aprender Algo Cool" />
      </header>

      <section>
        <ul class="todo-list">
          <task class="todo" v-for="task in tasks" :key="task.id" :task="task"></task>
        </ul>
      </section>

      <footer class="footer" v-show="tasks.length">
        <span class="todo-count">Completas: {{ completed }} | Incompletas: {{ uncompleted }}</span>
      </footer>
    </section>
  `,
  data() {
    return {
      newTask: "",
      counter: 2,
      tasks: [
        { id: 1, title: 'Aprender Javascript', completed: true },
        { id: 2, title: 'Aprender Vue', completed: false },
      ]
    }
  },
  methods: {
    add() {
      if (this.newTask.length < 1) return alert('Ingresa algo en la tarea')

      this.tasks.push({
        id: ++this.counter,
        title: this.newTask,
        completed: false
      })

      this.newTask = ""
    }
  },
  computed: {
    completed() {
      return this.tasks.filter(task => task.completed === true).length
    },
    uncompleted() {
      return this.tasks.filter(task => task.completed === false).length
    }
  }
})

Vue.component('task', {
  props: ['task'],
  data() {
    return {
      editing: false,
      cacheTitle: ''
    }
  },
  template: `
    <li :class="classes">
      <div class="view">
        <input class="toggle" type="checkbox" v-model="task.completed" :id="task.id" />
        <label v-text="task.title" :for="task.id" @dblclick="edit"></label>
        <button class="destroy" @click="remove"></button>
      </div>

      <input
        ref="inputEdit"
        class="edit"  
        v-model="task.title" 
        @keyup.enter="doneEdit" 
        @keyup.esc="cancel"
        @blur="doneEdit" />
    </li>
  `,
  methods: {
    remove() {
      const tasks = this.$parent.tasks
      tasks.splice(tasks.indexOf(this.task), 1)
    },
    edit() {
      this.cacheTitle = this.task.title
      this.editing = true
      const el = this.$refs.inputEdit
      Vue.nextTick(() => el.focus())
    },
    doneEdit() {
      if (!this.task.title.length) this.remove()
      this.editing = false
    },
    cancel() {
      this.task.title = this.cacheTitle
      this.editing = false
    }
  },
  computed: {
    classes() {
      return { completed: this.task.completed, editing: this.editing }
    }
  }
})

const app = new Vue({
  el: '#app',
})