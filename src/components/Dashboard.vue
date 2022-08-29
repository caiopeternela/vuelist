<template>
    <div class="tasks">
        <h1>Vuelist</h1>
        <div class="new">
            <input v-if="!editableMode" v-model="task" type="text" name="new" id="new" placeholder="Add a new task">
            <input v-else v-model="task" type="text" name="new" id="new" placeholder="Edit the task">
            <button v-if="!editableMode" @click="addTask()" class="new-button">Add</button>
            <button v-else @click="editTask(), editStatus()" class="new-button">Edit</button>
        </div>
        <ul class="tasks-list">
            <li v-for="task in tasks" :key="task.id">{{ task.task }}<span @click="editStatus(task.id)" class="edit"><font-awesome-icon icon="fas fa-edit" /></span>
            <span @click="deleteTask(task.id)" class="delete"><font-awesome-icon icon="fa-trash-can" /></span></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                tasks: null,
                task: null,
                id: null,
                editableMode: false
            }
        },
        methods: {
            async addTask() {
                const dataJson = JSON.stringify({task: this.task})
                const req = await fetch("http://localhost:3000/tasks", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: dataJson
                })
                const res = await req.json()
                this.getTasks()
                this.task = null
            },
            async getTasks() {
                const req = await fetch("http://localhost:3000/tasks")
                const data = await req.json()
                this.tasks = data
            },
            async deleteTask(id) {
                const dataJson = JSON.stringify({task: this.task})
                const req = await fetch(`http://localhost:3000/tasks/${id}`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: dataJson
                })
                const res = await req.json()
                this.task = null
                this.getTasks()
            },
            editStatus(id) {
                this.editableMode = !this.editableMode
                this.id = id
            },
            async editTask() {
                const newTask = this.task
                const dataJson = JSON.stringify({task: newTask})
                const req = await fetch(`http://localhost:3000/tasks/${this.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: dataJson
                })
                const res = await req.json()
                this.task = null
                this.getTasks()
            }
        },
        mounted() {
            this.getTasks()
        }
    }
</script>

<style scoped>
    .tasks {
        margin: 120px auto;
        max-width: 450px;
        width: 100%;
        background: #41B883;
        color: white;
        border-radius: 5px;
        padding: 25px;
    }

    h1 {
        font-size: 36px;
        text-align: center;
    }

    .new {
        display: flex;
        height: 45px;
        width: 100%;
        margin: 20px 0;
    }

    .new input {
        outline: none;
        width: 85%;
        height: 100%;
        border: 3px solid #35495E;
        font-size: 16px;
        border-radius: 3px;
        padding-left: 15px;
    }

    .new button {
        width: 60px;
        height: 100%;
        border: none;
        outline: none;
        background: #35495E;
        color: white;
        font-size: 22px;
        cursor: pointer;
        border-radius: 3px;
        margin-left: 5px;
    }


    .tasks-list li {
        list-style: none;
        height: 45px;
        line-height: 45px;
        position: relative;
        background: #35495E;
        margin-bottom: 8px;
        padding: 0 15px;
        border-radius: 3px;
    }

    .edit {
        position: absolute;
        right: 45px;
        background: #278cf7;
        text-align: center;
        width: 45px;
        cursor: pointer;
    }

    .delete {
        position: absolute;
        right: 0px;
        background: #f73c27;
        text-align: center;
        border-radius: 0 3px 3px 0;
        width: 45px;
        cursor: pointer;
    }

</style>