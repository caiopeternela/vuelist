export { getTasks, addTask, deleteTask, editTask }

import axios from "axios"
axios.defaults.baseURL = "http://localhost:3000"

async function getTasks(id) {
    if (id) {
        const req = await axios.get(`/tasks/${id}`)
        return req.data
    } else {
        const req = await axios.get("/tasks")
        return req.data
    }
}

async function addTask(task) {
    if (task != null) {
        const dataJson = {task: task, completed: false}
        const req = await axios.post("/tasks", dataJson)
    } else {
        return false
    }
}

async function deleteTask(id, task) {
    const dataJson = {task: task}
    const req = await axios.delete(`/tasks/${id}`, dataJson)
}

async function editTask(id, task) {
    if (typeof task === "object") {
        const req = await axios.patch(`/tasks/${id}`, task)
    } else {
        const req = await axios.patch(`/tasks/${id}`, {task: task})   
    }
}