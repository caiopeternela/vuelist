<template>
    <div class="tasks">
        <h1>Vuelist</h1>
        <div class="new">
            <input v-if="!editableMode" @keyup.enter="addTask()" v-model="task" type="text" name="new" class="input" :placeholder="placeholderMsg">
            <input v-else v-model="task" @keyup.enter="editTask()" type="text" name="new" class="input edit-input" :placeholder="placeholderMsg">
            <button v-if="!editableMode" @click="addTask()" id="add-button" class="new-button">Add</button>
            <button v-else @click="editTask(), editStatus()" class="new-button edit-button">Edit</button>
        </div>
        <ul class="tasks-list">
            <li v-for="task in tasks" :key="task.id">
                <span v-if="task.completed == false" @click="editCompleted(task.id)" class="status"><font-awesome-icon icon="fa-solid fa-check"/></span>
                <span v-else @click="editCompleted(task.id)" class="status"><font-awesome-icon icon="fas fa-undo"/></span>
                <span v-if="task.completed == false">{{ task.task }}</span>
                <span v-else class="task-tag">{{ task.task }}</span>
                <span @click="editStatus(task.id)" class="edit"><font-awesome-icon icon="fas fa-edit"/></span>
                <span @click="deleteTask(task.id)" class="delete"><font-awesome-icon icon="fa-trash-can"/></span>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from "axios"
    axios.defaults.baseURL = "http://localhost:3000"
    export default {
        name: "Dashboard",
        data() {
            return {
                tasks: null,
                task: null,
                id: null,
                editableMode: false,
                completed: false,
                placeholderMsg: "Add a new task"
            }
        },
        methods: {
            async addTask() {
                if (this.task != null) {
                    const dataJson = {task: this.task, completed: false}
                    const req = await axios.post("/tasks", dataJson)
                    this.getTasks()
                    this.task = null
                } else {
                    this.placeholderMsg = "Invalid task"
                }
            },
            async getTasks() {
                const req = await axios.get("/tasks")
                this.tasks = req.data
            },
            async deleteTask(id) {
                const dataJson = {task: this.task}
                const req = await axios.delete(`http://localhost:3000/tasks/${id}`, dataJson)
                this.task = null
                this.getTasks()
            },
            editStatus(id) {
                this.editableMode = !this.editableMode
                this.id = id
                if (this.editableMode) {
                    this.placeholderMsg = "Edit task"
                }
            },
            async editTask() {
                if (this.task != null) {
                    const newTask = this.task
                    const dataJson = {task: newTask}
                    const req = await axios.patch(`http://localhost:3000/tasks/${this.id}`, dataJson)
                    this.task = null
                    this.getTasks()
                    this.id = null
                    this.editableMode = false
                } else {
                    this.placeholderMsg = "Invalid task"
                }
            },
            async editCompleted(id) {
                const get = await axios.get(`http://localhost:3000/tasks/${id}`)
                let dataJson
                if (get.data.completed == true) {
                    dataJson = {completed: false}
                } else {
                    dataJson = {completed: true}
                }
                const req = await axios.patch(`http://localhost:3000/tasks/${id}`, dataJson)
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
        margin: 50px auto;
        max-width: 450px;
        width: 100%;
        height: fit-content;
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

    .input {
        outline: none;
        width: 85%;
        height: 100%;
        border: 3px solid #35495E;
        font-size: 16px;
        border-radius: 3px;
        padding-left: 15px; 
    }

    .edit-input {
        border: 3px solid #278cf7;
        color: black;
    }

    .new-button {
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

    .edit-button {
        background: #278cf7;
    }

    .tasks-list {
        max-height: 580px;
        overflow: auto;
    }


    .tasks-list li {
        list-style: none;
        height: 45px;
        line-height: 45px;
        position: relative;
        background: #35495E;
        margin-right: 15px;
        margin-bottom: 8px;
        padding: 0 55px;
        font-size: 20px;
        border-radius: 3px;
        -webkit-user-select: none; 
        -ms-user-select: none; 
        user-select: none;
    }

    .edit {
        position: absolute;
        right: 45px;
        background: #278cf7;
        text-align: center;
        width: 45px;
        cursor: pointer;
    }

    .task-tag {
        text-decoration: line-through
    }

    .status {
        position: absolute;
        left: 0px;
        background: white;
        text-align: center;
        border-radius: 3px 0 0 3px;
        width: 45px;
        cursor: pointer;
        color: black;
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


    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: transparent; 
    }

    ::-webkit-scrollbar-thumb {
        background: #35495E;
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #35495E; 
    }

</style>