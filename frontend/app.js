let getCiudades = () => {
  fetch("http://localhost:8081/ciudades")
    .then((respuesta) => respuesta.json())
    .then((ciudades) => {
      const contenedor = document.getElementById("listado_ciudades");
      contenedor.innerHTML = "";

      ciudades.forEach((ciudad) => {
        const p = document.createElement("p");
        p.textContent = ciudad.nombre;

        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Eliminar";
        botonBorrar.onclick = () => borrarCiudad(ciudad.id);

        contenedor.appendChild(p);
        p.appendChild(botonBorrar);
      });
    })
    .catch((error) => console.error(error));
};

let borrarCiudad = (id) => {
  if (confirm("¿Seguro que quieres borrar esta ciudad?")) {
    fetch(`http://localhost:8081/ciudades/${id}`, {
      method: "DELETE",
    })
      .then((respuesta) => {
        if (respuesta.ok) {
          alert("Ciudad eliminada correctamente");
          getCiudades();
        } else {
          alert("Hubo un problema al intentar borrar la ciudad.");
        }
      })
      .catch((error) => console.error("Error en la peticón: ", error));
  }
};

let crearCiudad = () => {
  const inputCiudad = document.getElementById("input_nueva_ciudad");
  const inputZona = document.getElementById("input_nueva_zonaCiudad");

  const nombreCiudad = inputCiudad.value;
  const nombreZona = inputZona.value;

  if (nombreCiudad.trim() === "" || nombreZona.trim() === "") {
    alert("Porfavor, rellene todos los campos antes de guardar");
    return;
  }

  const nuevaCiudad = {
    nombre: nombreCiudad,
    zona: nombreZona,
  };

  fetch("http://localhost:8081/ciudades", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaCiudad),
  })
    .then((respuest) => {
      if (respuest.ok) {
        alert("Ciudad creada con éxito");
        inputCiudad.value = "";
        inputZona.value = "";

        getCiudades();
      } else {
        alert("Hubo un error al guardar la ciudad");
      }
    })
    .catch((error) => console.error("Error en la peticion: ", error));
};

let getSalas = () => {
  fetch("http://localhost:8081/salas")
    .then((respuesta) => respuesta.json())
    .then((salas) => {
      const contenedor = document.getElementById("listado_salas");
      contenedor.innerHTML = "";

      salas.forEach((sala) => {
        const p = document.createElement("p");
        p.textContent = sala.nombre;
        contenedor.appendChild(p);
      });
    })
    .catch((error) => console.error(error));
};

getCiudades();
getSalas();
