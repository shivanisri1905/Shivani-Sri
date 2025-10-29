
let total = 0;

document.getElementById('addBtn').addEventListener('click', addExpense);

function addExpense() {
 
  let company = document.getElementById('company').value;
  let date = document.getElementById('date').value;
  let amount = parseFloat(document.getElementById('amount').value) || 0;
  let mobile = document.getElementById('mobile').value;
  let address = document.getElementById('address').value;
  let notes = document.getElementById('notes').value;
  let month = document.getElementById('month').value;
  let year = document.getElementById('year').value;

 
  let entry = document.createElement('div');
  entry.className = 'entry';
  entry.innerHTML = `
    <button class="delete" onclick="deleteEntry(this, ${amount})"> X </button>
    <p><b>Expense:</b> ${company}</p>
    <p><b>Date:</b> ${date}</p>
    <p><b>Amount:</b> ₹${amount}</p>
    <p><b>Mobile:</b> ${mobile}</p>
    <p><b>Address:</b> ${address}</p>
    <p><b>Notes:</b> ${notes}</p>
    <p><b>Month:</b> ${month} | <b>Year:</b> ${year}</p>
  `;

  document.getElementById('entries').appendChild(entry);

  total += amount;
  updateTotal();

  ['company','date','amount','mobile','address','notes'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

function deleteEntry(button, amount) {
  button.parentElement.remove();
  total -= amount;
  updateTotal();
}

