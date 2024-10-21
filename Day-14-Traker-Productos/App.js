
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    // Agregar producto
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
          <div class="card text-center mb-4">
            <div class="card-body">
              <strong>Producto</strong>: ${product.name}
              <strong>Precio</strong>: ${product.price}
              <strong>Año</strong>: ${product.year}
              <a href="#" class="btn btn-danger" name="delete">Eliminar</a>
            </div>
          </div>
        `;
        productList.appendChild(element);
        this.clearForm();
    }

    // Limpiar formulario
    clearForm() {
        document.getElementById('product-form').reset();
    }

    // Eliminar producto
    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
        }
    }

    // Mostrar mensaje
    showMessage(message, cssClass) {
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const app = document.querySelector("#App");
        container.insertBefore(div, app);
        setTimeout(function() {
            document.querySelector(".alert").remove();
        }, 2000);
    }

    // Guardar en localStorage
    saveProductToLocalStorage(product) {
        let products = this.getProductsFromLocalStorage();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Cargar productos del localStorage al iniciar
    loadProducts() {
        let products = this.getProductsFromLocalStorage();
        products.forEach(product => this.addProduct(product));
    }

    // Obtener productos desde localStorage
    getProductsFromLocalStorage() {
        let products = localStorage.getItem('products');
        return products ? JSON.parse(products) : [];
    }

    // Eliminar producto de localStorage
    deleteProductFromLocalStorage(name) {
        let products = this.getProductsFromLocalStorage();
        products = products.filter(product => product.name !== name);
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Manejo del DOM

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const ui = new UI();
    ui.loadProducts();
});

// Manejo de agregar producto
document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const ui = new UI();

    if (name === '' || price === '' || year === '') {
        ui.showMessage('Por favor completa todos los campos', 'danger');
    } else {
        const product = new Product(name, price, year);
        ui.addProduct(product);
        ui.saveProductToLocalStorage(product);  // Guardar en localStorage
        ui.showMessage('Producto agregado!!!', 'success');
    }
});

// Manejo de eliminación de producto
document.getElementById('product-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteProduct(e.target);

    if (e.target.name === 'delete') {
        const productName = e.target.parentElement.querySelector('strong').innerText;
        ui.deleteProductFromLocalStorage(productName);
        // ui.showMessage('Producto eliminado', 'success');
    }
});
