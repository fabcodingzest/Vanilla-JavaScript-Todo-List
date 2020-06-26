const formAddTodo = document.add_todo;
const deleteBtns = document.querySelectorAll('.trash-div');
const list = document.querySelector('.todo-container');


let todos = JSON.parse(localStorage.getItem('todos')) || [
  {task: "Go to Hogwarts", completed: false, isEditing: false},
  {task: "Pick up potions from Professor Snape", completed: false, isEditing: false},
  {task: "Meeting with Hermione and Ron", completed: false, isEditing: false},
];

function createTodo (items = [], itemList) {
  itemList.innerHTML = items.map((todo,i) => {
    return (`
    <div class="todo bg-gray-200 p-4 shadow-xl rounded-lg my-4 flex justify-between items-center flex-col" id="${i}" data-index="${i}">
            <div class="non-edit w-full flex justify-between items-center">
              <div class="todo-val w-full break-all ${todo.completed ? "line-through" : ""} ${todo.completed ? "opacity-50" : ""}">${todo.task}</div>
              <div class="options w-24 text-red-600 flex justify-around items-center">
              <div class="complete-tick cursor-pointer">
                <i class="fas fa-check text-green-700 ${todo.completed ? "opacity-50" : ""}"></i>
              </div>
                <div class="edit-btn cursor-pointer">
                  <i class="fas fa-edit text-black"></i>
                </div>
                <div class="trash-div cursor-pointer">
                  <i class="fas fa-trash"></i>
                </div>
              </div>
            </div>
            <form class="edit-form w-full mt-4 flex justify-between items-center ${todo.isEditing ? "" : 'hidden'}" name="edit-form">
              <input
                class="edit-input w-3/4 p-2 border-2 border-solid border-black rounded" name="edit_input"
                type="text" value="${todo.task}"/>
              <button
                class="bg-yellow-600 hover:bg-blue-700 text-xl ml-2 text-white font-bold py-2 px-6 rounded-full focus:outline-none" name="edit_btn"
                type="submit">Save</button>
            </form>
          </div>
    `)
  }).join("");
}

function addTodoItem (task) {
  let todo = {
    task,
    completed: false,
    isEditing: false
  };
  
  todos.unshift(todo);
  createTodo(todos, list);
  localStorage.setItem('todos', JSON.stringify(todos));  
}

function handleAddTodo (event) {
  event.preventDefault();
  inputVal = formAddTodo.add_input.value;
  if (inputVal.length > 0) {
    addTodoItem(inputVal);
    this.reset();
  }
}

function toggleComplete (e) {
  e.preventDefault();  
  if (!e.target.parentNode.matches('.complete-tick')) return;  
  const todo = e.target.closest('.todo');
  const index = todo.dataset.index;
  todos[ index ].completed = !todos[ index ].completed;
  createTodo(todos, list);
  localStorage.setItem('todos', JSON.stringify(todos))
}

function deleteTodo (e) {
  e.preventDefault();  
  if (!e.target.parentNode.parentNode.matches('.trash-div')) return;
  const todo = e.target.closest('.todo');
  const index = todo.dataset.index;
  todos = todos.filter((item) => !(item === todos[index]));
  createTodo(todos, list);
  localStorage.setItem('todos', JSON.stringify(todos))
}

function saveEditedTodo () {
  const editForms = document.querySelectorAll('.edit-form');
  editForms.forEach(form => {
    form.edit_btn.addEventListener('click', (e) => {
      let index = e.target.closest('.todo').dataset.index;
      todos[index].task = e.target.previousElementSibling.value;
      todos[index].isEditing = false;
      createTodo(todos, list);
      localStorage.setItem('todos', JSON.stringify(todos))
    })
  })
}

function editTodo (e) {
  e.preventDefault();
  if (!e.target.parentNode.parentNode.matches('.edit-btn')) return;
  const todo = e.target.closest('.todo')
  const index = todo.dataset.index;
  todos[ index ].isEditing = !todos[ index ].isEditing;
  createTodo(todos, list);
  localStorage.setItem('todos', JSON.stringify(todos))
  saveEditedTodo();
}

createTodo(todos, list);
formAddTodo.addEventListener('submit', handleAddTodo);
list.addEventListener('click', toggleComplete);
list.addEventListener('click', deleteTodo);
list.addEventListener('click', editTodo);