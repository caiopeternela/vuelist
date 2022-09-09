export { getTasks, getTask, addTask, deleteTask, editTask }

import axios from "axios"
axios.defaults.baseURL = "http://localhost:3000"

async function getTasks() {
    const req = await axios.get("/tasks")
    return req.data
}

async function getTask(id) {
    const req = await axios.get(`/tasks/${id}`)
    return req.data
}

async function addTask(task) {

    if (task == null) {
        return false
    }
    const dataJson = {task: task, completed: false}
    const req = await axios.post("/tasks", dataJson)

}

async function deleteTask(id, task) {
    const dataJson = {task: task}
    const req = await axios.delete(`/tasks/${id}`, dataJson)
}

async function editTask(id, task) {
    if (typeof task === "object") {
        const req = await axios.patch(`/tasks/${id}`, task)
        return
    }
    const req = await axios.patch(`/tasks/${id}`, {task: task})   
}