let products = JSON.parse(localStorage.getItem('inventory')) || [];
let editIndex = null;

const form = document.getElementById('productForm');
const tableBody = document.querySelector('#inventoryTable tbody');
const searchInput = document.getElementById('search');

function displayProducts() {
  tableBody.innerHTML = '';
  products.forEach((product, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>
          <button class="edit" onclick="editProduct(${index})">Edit</button>
          <button class="delete" onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>`;
    tableBody.innerHTML += row;
  });
  localStorage.setItem('inventory', JSON.stringify(products));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const brand = document.getElementById('brand').value.trim();
  const quantity = document.getElementById('quantity').value.trim();
  const price = document.getElementById('price').value.trim();

  if (editIndex === null) {
    products.push({ name, brand, quantity, price });
  } else {
    products[editIndex] = { name, brand, quantity, price };
    editIndex = null;
    document.getElementById('addBtn').innerText = 'Add';
  }
  form.reset();
  displayProducts();
});

function editProduct(index) {
  const product = products[index];
  document.getElementById('name').value = product.name;
  document.getElementById('brand').value = product.brand;
  document.getElementById('quantity').value = product.quantity;
  document.getElementById('price').value = product.price;
  document.getElementById('addBtn').innerText = 'Update';
  editIndex = index;
}

function deleteProduct(index) {
  if (confirm('Are you sure you want to delete this product?')) {
    products.splice(index, 1);
    displayProducts();
  }
}

document.getElementById('clearInventory').addEventListener('click', () => {
  if (confirm('Clear entire inventory?')) {
    products = [];
    localStorage.removeItem('inventory');
    displayProducts();
  }
});

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(filter));
  tableBody.innerHTML = '';
  filtered.forEach((product, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>
          <button class="edit" onclick="editProduct(${index})">Edit</button>
          <button class="delete" onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>`;
    tableBody.innerHTML += row;
  });
});

displayProducts();
