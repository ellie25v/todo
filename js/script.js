'use strict';

const addList = document.querySelector('.addList-btn');
const addTask = document.querySelector('.addTask');
const newListInput = document.querySelector('#newList');
const listItem = document.querySelector(".sidebar__form");
const newTaskForm = document.querySelector(".overlay");
const todoTaskList = document.querySelector(".todo__list");
const newTaskName = document.querySelector("#name");
const newTaskNotes = document.querySelector("#notes");
const newTaskDue = document.querySelector("#due");
const newTaskList = document.querySelector("#list");
const findListInput = document.querySelector("#findList");
const findListBtn = document.querySelector('.findList-btn')

addList.addEventListener('click', addNewList);

function addNewList(e) {
    e.preventDefault()
    newListInput.classList.toggle('is-closed');
    if (!newListInput.classList.contains('is-closed')) {
        document.addEventListener('keydown', onKeydown);
    }
}

findListBtn.addEventListener('click', openSearch);

function openSearch(e) {
    e.preventDefault()
    findListInput.classList.toggle('is-closed');
}

function onKeydown(e) {
    if (e.code === "Enter") {
        listItem.insertAdjacentHTML('beforeend', `<button class="sidebar__list">${newListInput.value}</button>`);
        document.querySelector('.todo').insertAdjacentHTML('beforeend', `<ul class="${newListInput.value} list is-closed">${newListInput.value}</ul>`);
        newTaskList.insertAdjacentHTML('beforeend', `<option value="${newListInput.value}">${newListInput.value}</option>`)
        newListInput.value = '';
    }
}

addTask.addEventListener('click', addNewTask);

function addNewTask(e) {
    newTaskForm.classList.remove('is-closed');
    newTaskForm.addEventListener('click', onClose);
    document.querySelector('.submitTask').addEventListener('click', onSubmit);
}

function onClose(e) {
    if (!e.target.classList.contains('newTask')) {
        newTaskForm.classList.add("is-closed");
        newTaskForm.removeEventListener('click', onClose);
    }
}

function onSubmit(e) {
    e.preventDefault;
    document.querySelector(`.${newTaskList.value}`).insertAdjacentHTML('beforeend',
        `<li class="${newTaskName.value} todo__list-item">
    </h3 class="todo__list-name">${newTaskName.value}<h3>
    <div>
    <h4>Due to</h4>
    <p>${newTaskDue.value}</p>
    <h4>Notes</h4>
    <p>${newTaskNotes.value}</p>
    <input class="check ${newTaskName.value}" type="checkbox">
</div></li>`);
}

findListInput.addEventListener('input', findList)

function findList(e) {
    const allLists =  Array.from(document.querySelectorAll('.sidebar__list'));
    const allListsName = allLists.map(list =>list.textContent);
    console.log(allListsName);
    allLists.forEach(list => list.classList.add('is-closed'));
    // allListsName.filter(list => list.textContent.contains(findListInput.value)).classList.remove('is-closed');
    if (findListInput.value === ""){
        allLists.forEach(list => list.classList.remove('is-closed'));
    }
}