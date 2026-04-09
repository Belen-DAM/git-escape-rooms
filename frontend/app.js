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

getCiudades();
