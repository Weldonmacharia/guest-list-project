const form = document.getElementById('guestForm');
const guestList = document.getElementById('guestList');
const nameInput = document.getElementById('nameField');

let guests = JSON.parse(localStorage.getItem('savedGuests')) || [];

function refreshList() {
  guestList.innerHTML = '';

  guests.forEach((person, i) => {
    const entry = document.createElement('li');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = person.name + (person.coming ? ' (In)' : ' (Out)');

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle RSVP';
    toggleBtn.addEventListener('click', () => {
      guests[i].coming = !guests[i].coming;
      saveList();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      guests.splice(i, 1);
      saveList();
    });

    entry.appendChild(nameSpan);
    entry.appendChild(toggleBtn);
    entry.appendChild(removeBtn);
    guestList.appendChild(entry);
  });
}

function saveList() {
  localStorage.setItem('savedGuests', JSON.stringify(guests));
  refreshList();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (guests.length >= 10) {
    alert('Limit reached — only 10 guests allowed.');
    return;
  }

  const name = nameInput.value.trim();
  if (name) {
    guests.push({ name, coming: true });
    saveList();
    nameInput.value = '';
  }
});

refreshList();

