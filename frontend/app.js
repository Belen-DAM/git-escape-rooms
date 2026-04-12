let getCiudades = () => {
  fetch("http://localhost:8081/ciudades")
    .then((respuesta) => respuesta.json())
    .then((ciudades) => {
      const contenedor = document.getElementById("listado_ciudades");
      if (!contenedor) {
        return;
      }
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
      if (!contenedor) {
        return;
      }
      contenedor.innerHTML = "";

      salas.forEach((sala) => {
        const p = document.createElement("p");
        p.textContent = `${sala.nombre} - Dificultad: ${sala.dificultad} - Categoría: ${sala.categoria} - Jugadores: ${sala.numero_max_jugadores} - Tendencia: ${sala.es_tendencia} `;

        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Eliminar";
        botonBorrar.onclick = () => borrarSala(sala.id);

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.onclick = () =>
          editarSala(
            sala.id,
            sala.nombre,
            sala.dificultad,
            sala.categoria,
            sala.numero_max_jugadores,
            sala.es_tendencia,
          );

        contenedor.appendChild(p);
        p.appendChild(botonEditar);
        p.appendChild(botonBorrar);
      });
    })
    .catch((error) => console.error(error));
};

let borrarSala = (id) => {
  if (confirm("¿Seguro que quieres borrar esta sala?")) {
    fetch(`http://localhost:8081/salas/${id}`, {
      method: "DELETE",
    })
      .then((respuesta) => {
        if (respuesta.ok) {
          alert("Sala eliminada correctamente");
          getSalas();
        } else {
          alert("Hubo un problema al intentar borrar la sala.");
        }
      })
      .catch((error) => console.error("Error en la peticón: ", error));
  }
};

let crearSala = () => {
  const inputSala = document.getElementById("input_nueva_sala");
  const inputDificultad = document.getElementById("input_nueva_dificultad");
  const inputCategoria = document.getElementById("input_nueva_categoria");
  const inputJugadores = document.getElementById("input_nuevo_jugadores");
  const inputTendencia = document.getElementById("input_nueva_tendencia");

  const nombreSala = inputSala.value;
  const dificultad = inputDificultad.value;
  const categoria = inputCategoria.value;
  const jugadores = inputJugadores.value;
  const tendencia = inputTendencia.value;

  if (
    nombreSala.trim() === "" ||
    dificultad.trim() === "" ||
    categoria.trim() === "" ||
    jugadores.trim() === "" ||
    tendencia.trim() === ""
  ) {
    alert("Porfavor, rellene todos los campos antes de guardar");
    return;
  }

  const nuevaSala = {
    nombre: nombreSala,
    dificultad: parseInt(dificultad),
    categoria: categoria,
    numero_max_jugadores: parseInt(jugadores),
    es_tendencia:
      tendencia.toLowerCase() === "true" ||
      tendencia.toLowerCase() === "si" ||
      tendencia.toLowerCase() === "sí",
  };

  fetch("http://localhost:8081/salas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaSala),
  })
    .then((respuesta) => {
      if (respuesta.ok) {
        alert("Sala creada con éxito");
        inputSala.value = "";
        inputDificultad.value = "";
        inputCategoria.value = "";
        inputJugadores.value = "";
        inputTendencia.value = "";

        getSalas();
      } else {
        alert("Hubo un error al guardar la sala");
      }
    })
    .catch((error) => console.error("Error en la peticion: ", error));
};

let editarSala = (
  id,
  nombreActual,
  dificultadActual,
  categoriaActual,
  jugadoresActual,
  tendenciaActual,
) => {
  let nuevoNombre = prompt(
    "Escribe el nuevo nombre de la sala: ",
    nombreActual,
  );
  if (nuevoNombre === null) return;

  let dificultadNueva = prompt(
    "Escribe la dificutlad de la sala: ",
    dificultadActual,
  );
  if (dificultadNueva === null) return;

  let categoriaNueva = prompt(
    "Escribe la categoria de la sala: ",
    categoriaActual,
  );
  if (categoriaNueva === null) return;

  let jugadoresNuevo = prompt(
    "Escribe los jugadores de la sala: ",
    jugadoresActual,
  );
  if (jugadoresNuevo === null) return;

  let tendenciaNueva = prompt(
    "Escribe si la sala es tendencia: ",
    tendenciaActual,
  );
  if (tendenciaNueva === null) return;

  if (
    nuevoNombre.trim() === "" ||
    dificultadNueva.trim() === "" ||
    categoriaNueva.trim() === "" ||
    jugadoresNuevo.trim() === "" ||
    tendenciaNueva.trim() === ""
  ) {
    alert("Los campos no pueden estar vacios");
    return;
  }
  if (confirm("¿Seguro que quieres guardar los cambios")) {
    const salaActualizda = {
      nombre: nuevoNombre,
      dificultad: parseInt(dificultadNueva),
      categoria: categoriaNueva,
      numero_max_jugadores: parseInt(jugadoresNuevo),
      es_tendencia:
        tendenciaNueva.toLowerCase() === "true" ||
        tendenciaNueva.toLowerCase() === "si" ||
        tendenciaNueva.toLowerCase() === "sí",
    };

    fetch(`http://localhost:8081/salas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salaActualizda),
    })
      .then((respuesta) => {
        if (respuesta.ok) {
          alert("Sala modificada con éxito");
          getSalas();
        } else {
          alert("Hubo un problema con la actulizacion de los datos");
        }
      })
      .catch((error) => console.error("Error en la peticion: ", error));
  }
};

getCiudades();
getSalas();
