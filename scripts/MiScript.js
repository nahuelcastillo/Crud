const baseUrl = "https://65451b905a0b4b04436da3c3.mockapi.io/users/"
const alert = document.getElementById("alert-error");

document.addEventListener("DOMContentLoaded", async () => {

    //Mostrar Usarios
    const usrList = await fetchUsers();
    showResults(usrList);

    //metodo Get
    document.getElementById("btnGet1").addEventListener("click", async () => {
    const inputGet1Id = document.getElementById("inputGet1Id").value

    const user = await fetchUserById(inputGet1Id)

    showResults(user)
    })
    
  
  //metodo Post
  const namePost = document.getElementById("inputPostNombre");
  const lastNamePost = document.getElementById("inputPostApellido");

  document.getElementById("btnPost").addEventListener("click", async () => {
    const user = {
      name: namePost.value,
      lastname: lastNamePost.value,
    }

    const newUser = await postUser(user);
    showResults(newUser);
  })


  //metodo Put
  document.getElementById("inputPutId").addEventListener("change", async () => {
    const inputPutId = document.getElementById("inputPutId").value
    const btnPut =document.getElementById("btnPut")
    const BuscarUsario = await fetchUserById(inputPutId)
    
    
    if(typeof(BuscarUsario) == "object"){
        btnPut.removeAttribute("disabled")
        namePut.value = `${BuscarUsario.name}`
        lastNamePut.value = `${BuscarUsario.lastname}`
    }
  })

  document.getElementById("btnSendChanges").addEventListener("click", async () => {
    const inputPutId = document.getElementById("inputPutId").value
    
    const namePut = document.getElementById("inputPutNombre")
    const lastNamePut = document.getElementById("inputPutApellido")

    var modifiedUser = {
        name: namePut.value,
        lastname: lastNamePut.value
    }

    const putUser = await modifyUserById(inputPutId, modifiedUser)
    showResults(putUser)
    });


  // Método delete
  document.getElementById("btnDelete").addEventListener("click", async () => {
    const id = document.getElementById("inputDelete").value
    const deletedUser = await deleteUserById(id);
    showResults(deletedUser);
  })

});

async function showResults(users) {
  const resultsEl = document.getElementById("results");
  resultsEl.innerHtml = "";
  if (Array.isArray(users)) {
    users.forEach(user => {
      resultsEl.innerHTML += `
      <li class="list-group-item list-group-item-dark">
        <p class="text-dark">ID: ${user.id}</p>
        <p class="text-dark">Name: ${user.name}</p>
        <p class="text-dark">Last Name: ${user.lastname}</p>
      </li>
      `
    });
  } else {
    resultsEl.innerHTML = `
    <li class="list-group-item list-group-item-dark">
      <p class="text-dark">ID: ${users.id}</p>
      <p class="text-dark">Name: ${users.name}</p>
      <p class="text-dark">Last Name: ${users.lastname}</p>
    </li>
    `;
  };
};

// Funciones de llamada a la API
async function fetchUsers() {
  try {
    const res = await fetch(baseUrl);
    if (!res.ok) {
      throw new Error("Fallo en la llamada a la API")
    }
    const jsonRes = await res.json();
    return jsonRes;
  } catch (err) {
    console.log({message: err.message})
  }
}

async function fetchUserById(id) {
  try {
    const res = await fetch(`${baseUrl}${id}`);
    if (!res.ok) {
      alert.classList.add("show");
    }
    const jsonRes = await res.json();
    return jsonRes;
  } catch (err) {
    console.log({message: err.message});
  }
}

async function postUser(user) {
  try {
    const res = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      alert.classList.add("show"); 
    }
    const jsonRes = res.json();
    return jsonRes;
  } catch (err) {
    console.log({message: err.message});
  }
}

async function modifyUserById(id, modifiedUser) {
  try {
    const res = await fetch(`${baseUrl}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifiedUser)
    });
    if (!res.ok) {
      alert.classList.add("show");
    }
    const jsonRes = await res.json();
    return jsonRes;
  } catch (err) {
    console.log({message: err.message});
  }
}

async function deleteUserById(id) {
  try {
    const res = await fetch(`${baseUrl}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      alert.classList.add("show");
    }
    const jsonRes = await res.json();
    return jsonRes;
  } catch (err) {
    console.log({message: err.message});
  }
  
}