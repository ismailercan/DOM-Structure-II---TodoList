
const form = document.querySelector("#todoAddForm");
const inputTodoName = document.querySelector("#todoName");
const addButton = document.querySelector("#add");
const listElement = document.querySelector(".list");
const clearAllButton = document.querySelector("#clearAll");

const todos = [];



const runEvents = async () => {
    form.addEventListener("submit", addTodo);
    clearAllButton.addEventListener("click", clearAllTodos);
}

/*document.getElementsByClassName("list").addEventListener("click", (e) => {
    if(e.target.classList.contains("fa fa-remove")){
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        //removeTodoUI(todo);
});
*/
const addTodo = (e) => {
    e.preventDefault();
    const inputText = inputTodoName.value.trim();
    if (inputText !== "") {
        addTodoToUI(inputText);//* Arayüze eklemek icin
        addTodoToStorage(inputText);//* Localstorage'a eklemek icin
        
    }
}

//* Arayüze eklemek icin
const addTodoToUI = (newTodo) => {
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
                            <a href="#" class="delete-item">
                                <i class="fa fa-remove"></i>
                            </a>
                        </li>
    */

    const li = document.createElement("li");
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.className = "delete-item";

    const i = document.createElement("i");
    i.classList = "fa fa-remove";

    const button = document.createElement("button");
    button.textContent = "Remove";

    i.appendChild(button);
    a.appendChild(i);
    li.appendChild(a);
    listElement.appendChild(li);
    inputTodoName.value = "";
}

//* Localstorage'a eklemek icin
const addTodoToStorage = (newTodo) => {
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//* Arayüzden silmek icin
const removeTodoUI = (e) => {
    //* Ekrandan silmek icin
    if(e.target.classList.contains("fa fa-remove")){
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        //* Storage'dan silmek icin
    removeTodoStorage(todo.textContent);
    }

}

const removeTodoStorage = (removeTodo) => {
    todos.forEach((todo, index)=>{
        if(removeTodo === todo){
            todos.splice(index,1);//* index ile nerden baslayacagimizi, virgülden sonraki rakamla kac tane silecegimizi belirtiyoruz
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos))
}

const clearAllTodos = () => {
    //* Arayüzdeki todolari silmek icin
    while (listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
    }
    

    //* Localstorage'daki todolari silmek icin
    localStorage.removeItem("todos");
}

runEvents();
