let getCiudades = () => {
  fetch("http://localhost:8081/ciudades")
    .then((respuesta) => respuesta.json())
    .then((ciudades) => {
      const contenedor = document.getElementById("listado_ciudades");
      contenedor.innerHTML = "";

      ciudades.forEach((ciudad) => {
        const p = document.createElement("p");
        p.textContent = ciudad.nombre;
        contenedor.appendChild(p);
      });
    })
    .catch((error) => console.error(error));
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
