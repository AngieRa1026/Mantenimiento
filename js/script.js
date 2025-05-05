// script.js - Funcionalidad para la gestión de librería

// Variables para gestionar los libros
let nextId = 4; // Siguiente ID para nuevos libros

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Función para manejar el envío del formulario
    document.getElementById('bookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const category = document.getElementById('category').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;
        
        // Validar que todos los campos estén completos
        if (!title || !author || !category || !price || !stock) {
            showMessage('Por favor complete todos los campos requeridos.', 'error');
            return;
        }
        
        // Añadir libro a la tabla
        addBookToTable(nextId, title, author, category, price, stock);
        
        // Incrementar ID para el próximo libro
        nextId++;
        
        // Resetear formulario
        this.reset();
        
        // Mostrar mensaje de éxito
        showMessage('Libro añadido correctamente.', 'success');
    });
});

// Función para añadir un libro a la tabla
function addBookToTable(id, title, author, category, price, stock) {
    const tableBody = document.querySelector('#booksTable tbody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>${author}</td>
        <td>${category}</td>
        <td>${parseFloat(price).toFixed(2)}</td>
        <td>${stock}</td>
        <td><button class="delete-btn" onclick="deleteBook(${id})">Eliminar</button></td>
    `;
    
    tableBody.appendChild(newRow);
}

// Función para eliminar un libro
function deleteBook(id) {
    if (confirm(`¿Está seguro de que desea eliminar el libro #${id}?`)) {
        // Buscar y eliminar la fila correspondiente
        const rows = document.querySelectorAll('#booksTable tbody tr');
        for (let i = 0; i < rows.length; i++) {
            const rowId = rows[i].cells[0].textContent;
            if (rowId == id) {
                rows[i].remove();
                showMessage(`Libro #${id} eliminado correctamente.`, 'success');
                break;
            }
        }
    }
}

// Función para mostrar mensajes al usuario
function showMessage(message, type) {
    const messageArea = document.getElementById('messageArea');
    const alertDiv = document.createElement('div');
    
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Limpiar mensajes anteriores
    messageArea.innerHTML = '';
    messageArea.appendChild(alertDiv);
    
    // Desaparecer el mensaje después de 3 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}