// Attach event listeners to all delete-todo buttons:
window.onload = function (e) {
   const deleteTodoButtons = document.querySelectorAll(
      "button.delete-todo-btn"
   );

   const addTodoButton = document.querySelector("button.add-todo");
   console.log(addTodoButton);

   const editTodoButtons = document.querySelectorAll("button.edit-todo");
   console.log(editTodoButtons);

   const toggleCompletionButtons = document.querySelectorAll(
      "button.mark-completed-todo-btn"
   );

   toggleCompletionButtons.forEach((button) =>
      button.addEventListener("click", (e) => {
         const todoId = button.dataset.id;
         toggleTodoCompletion(todoId);
      })
   );

   editTodoButtons.forEach((button) =>
      button.addEventListener("click", (e) => {
         const todoId = button.dataset.id;
         const title = document.querySelector(
            `input#edit-todo-${todoId}-title`
         ).value;
         const description = document.querySelector(
            `textarea#edit-todo-${todoId}-description`
         ).value;
         const priority = document.querySelector(
            `select#edit-todo-${todoId}-priority`
         ).value;
         editTodoItem(todoId, title, description, priority).then((res) => {
            const titleDiv = document.getElementById(`todo-title-${todoId}`);
            const prioritySpan = document.querySelector(
               `span#todo-badge-${todoId}`
            );
            const oldPriority = prioritySpan.textContent.trim();
            const descriptionDiv = document.querySelector(
               `p#todo-description-${todoId}`
            );
            titleDiv.textContent = title;
            descriptionDiv.textContent = description;
            prioritySpan.textContent = priority;
            prioritySpan.classList.replace(
               `priority-${oldPriority}`,
               `priority-${priority}`
            );

            // Close the modal:
            const modal = document.getElementById(`edit-todo-modal-${todoId}`);
            document.querySelector(".modal-backdrop").remove();
            modal.style.display = "none";
            modal.ariaHidden = "true";
            modal.ariaModal = "false";
         });
      })
   );

   addTodoButton.addEventListener("click", (e) => {
      // Add a todo item:
      const title = document.querySelector("input#todo-title").value;
      const description = document.querySelector(
         "textarea#todo-description"
      ).value;
      const priority = document.querySelector("select#todo-priority").value;
      addTodoItem(title, description, priority);
   });

   deleteTodoButtons.forEach((button) => {
      button.addEventListener("click", () => {
         // Delete the todo:
         const todoId = +button.dataset.id;
         deleteTodoItem(todoId);
      });
   });
   console.log(deleteTodoButtons);
};

function deleteTodoItem(todoId) {
   fetch(`/todos/${todoId}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((res) => res.json())
      .then(() => {
         // Delete the todo component:
         const todoItem = document.querySelector(`div.todo-item-${todoId}`);
         todoItem.remove();
      })
      .catch((e) => console.log(e));
}

function addTodoItem(title, description, priority) {
   fetch("/todos", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
         "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ title, description, priority }),
   })
      .then((res) => res.json())
      .then((res) => {
         window.location.reload();
      })
      .catch(console.log);
}

async function editTodoItem(todoId, title, description, priority) {
   return fetch(`/todos/${todoId}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
         "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ title, description, priority }),
   })
      .then((res) => res.json())
      .then((res) => res)
      .catch(console.log);
}

function toggleTodoCompletion(todoId) {
   const todoTitleDiv = document.querySelector(`div.todo-title-${todoId}`);
   const completed = todoTitleDiv.dataset.completed;

   // Do a PUT request:
   fetch(`/todos/toggle-complete/${todoId}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
         "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
   })
      .then((res) => res.json())
      .then(({ completed }) => {
         const checkClass = "bi-check";
         const arrowClass = "bi-arrow-clockwise";

         const checkColorClass = "text-success";
         const arrowColorClass = "text-danger";

         todoTitleDiv.classList.toggle("todo-completed");
         const icon = document
            .getElementById(`mark-completed-btn-${todoId}`)
            .querySelector("i");
         icon.classList.replace(
            completed ? checkClass : arrowClass,
            completed ? arrowClass : checkClass
         );
         icon.classList.replace(
            completed ? checkColorClass : arrowColorClass,
            completed ? arrowColorClass : checkColorClass
         );
      })
      .catch(console.log);
}
