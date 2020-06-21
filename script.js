const addTodoInput = document.querySelector('input');
const addTodoButton = document.querySelector('button');
const todoContainer = document.querySelector('.todo-container');
const deleteBtns = document.querySelectorAll('.trash-div');
const todoVal = document.querySelectorAll('.todo-val')

function addTodoItem (todo) {
  let html = `
  <div class="todo transition delay-1000 bg-gray-200 p-4 shadow-xl rounded-lg my-4 flex justify-between items-center flex-col">
          <div class="non-edit w-full flex justify-between items-center">
            <div class="todo-val w-full">
              ${todo}
            </div>
            <div class="options w-24 text-red-600 flex justify-around items-center">
            <div class="complete-tick cursor-pointer">
              <i class="fas fa-check text-green-700"></i>
            </div>
              <div class="edit-btn cursor-pointer">
                <i class="fas fa-edit text-black"></i>
              </div>
              <div class="trash-div cursor-pointer">
                <i class="fas fa-trash"></i>
              </div>
            </div>
          </div>
          <form class="edit w-full mt-4 flex justify-between items-center hidden">
            <input
              class="edit-input w-3/4 p-2 border-2 border-solid border-black rounded"
              type="text"/>
            <button
              class="bg-yellow-600 hover:bg-blue-700 text-xl ml-2 text-white font-bold py-2 px-6 rounded-full focus:outline-none"
              type="submit">Save</button>
          </form>
        </div>
  `;
  
  todoContainer.insertAdjacentHTML('beforeend', html)
  setLocalStorage();
  handleCompleteTodo();
  handleEditTodo();
  handleDelete();
}

function setLocalStorage () {
  const todoHtml = document.querySelector('.todo-container').innerHTML;
  window.localStorage.setItem('todo-container', JSON.stringify(todoHtml));
}

function loadLocalStorage () {
  let todos = JSON.parse(window.localStorage.getItem('todo-container'));
  if (todos !== null) {
    todoContainer.innerHTML = todos;
  }
}

loadLocalStorage();

function handleEditValue (event) {
  event.preventDefault();
  let editedVal = event.currentTarget.previousElementSibling;
  let todo = event.currentTarget.parentNode.previousElementSibling.childNodes[1];
  console.log(todo);
  todo.textContent = editedVal.value;
  console.log(editedVal);
  editedVal.parentNode.classList.add('hidden')
  setLocalStorage();
}

function editTodo (event) {
  event.preventDefault();
  const editForm = event.currentTarget.parentNode.parentNode.nextElementSibling;
  const prevTodo = event.currentTarget.parentNode.parentNode.childNodes[1].textContent.trim();  
  editForm.classList.toggle('hidden')
  const editInput = editForm.querySelector('.edit-input');
  editInput.focus()
  editInput.value = prevTodo;
  const editSave = editInput.nextElementSibling;  
  editSave.addEventListener('click', handleEditValue)
  setLocalStorage();
}

function handleEditTodo () {
  const editBtns = document.querySelectorAll('.edit-btn');
  editBtns.forEach(editBtn => editBtn.addEventListener('click', editTodo));
}
handleEditTodo();

function toggleComplete (event) {
  event.preventDefault();
  let todo = event.currentTarget.parentNode.previousElementSibling;
  todo.classList.toggle('line-through')
  todo.classList.toggle('opacity-75')
  if (todo.classList.contains('line-through')) {
    event.currentTarget.classList.add('opacity-50')
  } else {
    event.currentTarget.classList.remove('opacity-50')
  }
  setLocalStorage();
 }

function handleCompleteTodo () {
  let todoVal = document.querySelectorAll('.todo-val');
  let completeBtn = document.querySelectorAll('.complete-tick');
  // todoVal.forEach(todo => todo.addEventListener('click', toggleComplete));
  completeBtn.forEach(todo => todo.addEventListener('click', toggleComplete));
}

handleCompleteTodo();

function deleteTodo (event) {
  event.preventDefault();  
  let todo = event.target.closest('.todo');
  todo.remove();
  setLocalStorage();
}

function handleDelete () {
  let todos = document.querySelectorAll('.trash-div');
  todos.forEach(dltBtn => dltBtn.addEventListener('click', deleteTodo))
}

handleDelete();

function handleAddTodo (event) {
  event.preventDefault();
  inputVal = addTodoInput.value;
  if (inputVal.length > 0) {
    addTodoItem(inputVal);
    addTodoInput.value = '';
  }
}

addTodoButton.addEventListener('click', handleAddTodo);