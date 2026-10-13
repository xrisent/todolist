let todos = [
  { id: 1, title: "Купить хлеба", completed: true },
  { id: 2, title: "Купить хлеба", completed: true },
  { id: 3, title: "Купить хлеба", completed: false },
];

const btn = document.querySelector(".create");
const inp = document.querySelector(".create-input");
const list = document.querySelector(".list");
const delAll = document.querySelector(".del-all");

delAll.addEventListener("click", (e) => {
  e.preventDefault();

  todos = [];
  render();
});

btn.addEventListener("click", (e) => {
  e.preventDefault();

  // после того как нажали кнопку добавляем в массив новый todo
  todos.push({
    id: Date.now(),
    title: inp.value,
    completed: false,
  });

  // вызываем render, но он будет работать с уже обновленным массивом
  render();
});

// render - проходится по массиву todos и добавляет в HTML в тег div.list новые элементы (по очереди)
const render = () => {
  list.innerHTML = "";

  todos.forEach((el) => {
    // data-id - указываю в атрибутах id самого todo
    list.innerHTML += `
    <div class="list-item">
          <input type="checkbox" name="" ${el.completed ? "checked" : ""} id="" data-id="${el.id}" class="complete-todo" />
          <p ${el.completed ? "class='title-completed'" : ""} data-id="${el.id}">${el.title}</p>
          <button class='edit-todo' data-id="${el.id}">Редактировать</button>
          <button data-id="${el.id}" class="del-todo">Удалить</button>
        </div>
    `;
  });

  // вытаскиваю абсолютно все checkbox
  const completeTodos = document.querySelectorAll(".complete-todo");

  completeTodos.forEach((el) => {
    el.addEventListener("click", (e) => {
      todos = todos.map((todo) => {
        if (Number(todo.id) === Number(el.getAttribute("data-id"))) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      console.log(todos);
      render();
    });
  });

  // вытаскиваю абсолютно все кнопки "Удалить"
  const delTodos = document.querySelectorAll(".del-todo");

  // прохожусь по ним
  delTodos.forEach((el) => {
    // на каждое подвязываю обработчик события
    el.addEventListener("click", (e) => {
      // фильтрация (убирает элемент определенный)
      todos = todos.filter(
        // el.getAttribute('data-id') - позволяет вытащить значение которое мы ранее задали
        (todo) => Number(todo.id) !== Number(el.getAttribute("data-id")),
      );
      // заново рисуем
      render();
    });
  });

  const editTodos = document.querySelectorAll(".edit-todo");

  // проходимся по всем кнопкам редактирования
  editTodos.forEach((el) => {
    // добавляем на каждую обработчик события
    el.addEventListener("click", (e) => {
      // вытаскиваем текст из html
      // вытаскиваем с помощью квадратных скобок, где ищем нужное значение в атрибуте data-id
      const p = document.querySelector(
        `p[data-id="${Number(el.getAttribute("data-id"))}"]`,
      );
      const delBtn = document.querySelector(
        `.del-todo[data-id="${Number(el.getAttribute("data-id"))}"]`,
      );

      const resetBtn = document.createElement("button");
      const saveBtn = document.createElement("button");
      const input = document.createElement("input");

      input.value = p.textContent;
      resetBtn.textContent = "Сбросить";
      saveBtn.textContent = "Сохранить";

      resetBtn.onclick = () => {
        render();
      };

      saveBtn.onclick = () => {
        todos = todos.map((todo) => {
          if (Number(todo.id) === Number(el.getAttribute("data-id"))) {
            return { ...todo, title: input.value };
          }
          return todo;
        });

        render();
      };

      el.parentNode.append(input, saveBtn, resetBtn);

      p.remove();
      el.remove();
      delBtn.remove();
    });
  });
};

// первая отрисовка (если в массиве уже есть todo)
render();

// репозиторий - папка с проектом (точнее наш проект)
// git init - инициализация репозитория (начинаем отслеживать файлы)

// git status - это статус репозитория в данный момент

// git add index.html - добавляет в промежуточный этап наши файлы (то есть это файлы которые будут сохранены)
// git commit -m 'сообщение' - сохраняет все файлы, которые находились в промежуточном этапе (те, которые не отслеживались не будут сохранены)
// git commit -m 'НОМЕР ЗАДАЧИ
// - fix registration form
// - added index.html
// '
// git log - история коммитов
// git remote add "переменная для ссылки на удаленный репозиторий" "ссылка на репозиторий" - запоминает что вместо переменной указанная ссылка
// git push "переменная" "название ветки"

// untracked - файл новый и не отслеживается
// index added - файл новый, но уже отслеживается
// modified - файл отслеживается, но изменился
