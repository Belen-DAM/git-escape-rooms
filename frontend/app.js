let getCiudades = () => {
  fetch("http://localhost:8081/ciudades")
    .then((respuesta) => respuesta.json())
    .then((ciudades) => {
      const contenedor = document.getElementById("listado_ciudades");
      contenedor.innerHTML = "";

      ciudades.forEach((ciudad) => {
        const p = document.createElement("p");
        p.textContent = ciudad.nombre + ("( Zona: " + ciudad.zona + " ) ");

        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Eliminar";
        botonBorrar.onclick = () => borrarCiudad(ciudad.id);

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.onclick = () =>
          editarCiudad(ciudad.id, ciudad.nombre, ciudad.zona);

        contenedor.appendChild(p);
        p.appendChild(botonEditar);
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

let editarCiudad = (id, nombreActual, ZonaActual) => {
  let nuevoNombre = prompt(
    "Escribe el nuevo nombre de la ciudad: ",
    nombreActual,
  );
  if (nuevoNombre === null) return;

  let zonaNueva = prompt("Escribe la zona nueva: ", ZonaActual);
  if (zonaNueva === null) return;

  if (nuevoNombre.trim() === "" || zonaNueva.trim() === "") {
    alert("Los campos no pueden estar vacios");
    return;
  }

  if (confirm("¿Seguro que quieres guardar los cambios")) {
    const ciudadActualizda = {
      nombre: nuevoNombre,
      zona: zonaNueva,
    };

    fetch(`http://localhost:8081/ciudades/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ciudadActualizda),
    })
      .then((respuesta) => {
        if (respuesta.ok) {
          alert("Ciudad modificada con éxito");
          getCiudades();
        } else {
          alert("Hubo un problema con la actulizacion de los datos");
        }
      })
      .catch((error) => console.error("Error en la peticion: ", error));
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
