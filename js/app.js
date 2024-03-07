document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

//variables
const carritoBtn = document.querySelector("#carrito-btn");
const carritoListado = document.querySelector("#listado-articulos tbody");
const articulos = document.querySelectorAll(".articulos");
const vaciarCarrito = document.querySelector(".vaciar-carrito");
const contenedorCarrito = document.querySelector("#carrito");
let carrito = [];
eventos();
function iniciarApp() {
  eventos();
}

function eventos() {
  carritoBtn.addEventListener("click", mostrarCarrito);
  articulos.forEach((seccion) =>
    seccion.addEventListener("click", agregarArticulo)
  );
  contenedorCarrito.addEventListener("click", eliminarArticulo);
  vaciarCarrito.addEventListener("click", (e) => {
    carrito = [];
      if (carrito.length === 0) {
          contenedorCarrito.children[1].classList.remove("block");
          contenedorCarrito.children[1].classList.add("hidden");
      }
    resetHTML();
  });
}

function mostrarCarrito(e) {
  if (
    e.target.parentElement.nextElementSibling.classList.contains(
      "right-[-100rem]"
    )
  ) {
    e.target.parentElement.nextElementSibling.classList.remove(
      "right-[-100rem]"
    );
    e.target.parentElement.nextElementSibling.classList.add("right-0");

    e.target.src = "resources/cerrar.svg";
  } else {
    e.target.parentElement.nextElementSibling.classList.remove("right-0");
    e.target.parentElement.nextElementSibling.classList.add("right-[-100rem]");
    e.target.src = "resources/carrito.svg";
  }
}

function eliminarArticulo(e) {
  if (e.target.classList.contains("borrar-articulo")) {
    const articuloId = e.target.getAttribute("data-id");
    carrito = carrito.filter((articulo) => articulo.id !== articuloId);
    carritoHTML();
  }
}

function agregarArticulo(e) {
  if (e.target.classList.contains("agregar-carrito")) {
    obtenerInformacion(e.target.parentElement.parentElement);
  }
}

function obtenerInformacion(articulo) {
  const infoArticulo = {
    id: articulo.children[1].children[2].getAttribute("data-id"),
    nombre: articulo.children[1].children[0].textContent,
    precio: articulo.children[1].children[1].textContent,
    cantidad: 1,
  };
  const existe = carrito.some((articulo) => articulo.id === infoArticulo.id);
  if (existe) {
    const articulos = carrito.map((articulo) => {
      if (articulo.id === infoArticulo.id) {
        articulo.cantidad++;
        return articulo;
      } else {
        return articulo;
      }
    });
    carrito = [...articulos];
  } else {
    carrito = [...carrito, infoArticulo];
  }
  carritoHTML();
  if (carrito.length >= 1) {
    contenedorCarrito.children[1].classList.remove("hidden");
    contenedorCarrito.children[1].classList.add("block");
  } else {
    contenedorCarrito.children[1].classList.remove("block");
    contenedorCarrito.children[1].classList.add("hidden");
  }
}

function carritoHTML() {
  resetHTML();

  carrito.forEach((articulo) => {
    const { id, nombre, precio, cantidad, imagen } = articulo;
    const row = document.createElement("tr");
    row.classList.add(
      "odd:bg-white",
      "odd:dark:bg-gray-900",
      "even:bg-gray-50",
      "even:dark:bg-gray-800",
      "border-b",
      "dark:border-gray-700"
    );
    row.innerHTML = `
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${nombre}</th>
        <td class="px-6 py-4">${precio}</td>
        <td class="px-6 py-4">${cantidad}</td>
        <td><a href="#" class="borrar-articulo text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" data-id="${id}">Remove</a></td>
      `;
    carritoListado.appendChild(row);
  });
}

function resetHTML() {
  while (carritoListado.firstChild) {
    carritoListado.removeChild(carritoListado.firstChild);
  }
}
