let taskAddBtn = document.querySelector(".addBtn");
let input = document.querySelector(".input");
let todoBox = document.querySelector(".todos");

let api = "https://692aaa447615a15ff24d49de.mockapi.io/api/v1/todos";

taskAddBtn.addEventListener("click", postData);

async function fetchData() {
  let response = await fetch(api);
  let data = await response.json();

  if (data) {
    todoBox.innerHTML = "";
    data.forEach((item) => {
      let div = document.createElement("div");
      div.className = "todo";
      div.innerHTML = `
          <p class="task">${item.text}</p>
          <input type="text" class="edit-input" value="${item.text}" placeholder="Enter task">
                <div class="btns">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                     <button class="save-btn">Save</button>
                </div>`;

      let delBtn = div.querySelector(".delete-btn");
      let editBtn = div.querySelector(".edit-btn");
       let saveBtn = div.querySelector(".save-btn");
       let editInp = div.querySelector(".edit-input");
       let previousTask = div.querySelector(".task");

      delBtn.addEventListener("click", function () {
        console.log(item.id);
        deleteData(item.id);
      });

      editBtn.addEventListener("click", function () {
        console.log(item.id);
        editBtn.style.display = "none";
        saveBtn.style.display = "block"
        editInp.style.display = "block"
        previousTask.style.display = "none";
      });

saveBtn.addEventListener("click",function(){
    let editVal = editInp.value
    updateData(item.id,editVal)

    editInp.style.display = "none"
    editBtn.style.display = "block"
    previousTask.style.display = "block";
})

      todoBox.append(div);
    });
  }
}

async function postData() {
  let value = input.value;
  console.log(value);

  let objData = {
    text: value.trim(),
  };

  let response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objData),
  });
  if (response.status == 201) {
    fetchData();
    input.value = "";
  }

  let data = await response.json();
  console.log(response);
}

async function updateData(id,editVal) {
    console.log(id,editVal);

  let objData = {
    text: editVal.trim(),
  };

  let response = await fetch(`${api}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objData),
  });
  if (response.status === 200) {
    fetchData();

  }

  let data = await response.json();
  console.log(response);
}

async function deleteData(id) {
  let response = await fetch(`${api}/${id}`, {
    method: "DELETE",
  });
  console.log(response);
  if (response.status === 200) {
    fetchData();
  }
}

fetchData();

