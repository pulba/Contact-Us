document.addEventListener('DOMContentLoaded', (event) => {
  var button = document.getElementById('btn');
  var clearButton = document.getElementById('clearBtn');
  var displayDiv = document.getElementById('display');
  var dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];

  // Tampilkan data yang sudah ada di localStorage saat halaman dimuat
  dataArray.forEach((data) => {
    var dataParts = data.split('|');
    var newDiv = document.createElement('div');
    newDiv.className =
      'flex flex-col leading-1.5 w-full p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl font-poppins';
    newDiv.innerHTML = `
      <div class="flex items-center justify-between">
        <p class="text-md font-semibold text-gray-800 capitalize">${dataParts[0]}</p>
        <p class="text-sm font-normal px-3 py-1 rounded-full text-white bg-gray-800">${dataParts[2]}</p>
      </div>
      <p class="text-base italic text-left py-5 text-gray-800/50 font-medium">${dataParts[3]}</p>
    `;
    displayDiv.appendChild(newDiv);
  });

  // Cek jika tidak ada data yang ditampilkan dan sembunyikan displayDiv jika kosong
  if (displayDiv.children.length === 0) {
    displayDiv.style.display = 'none';
  }

  button.addEventListener('click', function (e) {
    e.preventDefault();

    var nameInput = document.getElementById('name');
    var dateInput = document.getElementById('date'); // Pastikan elemen ini ada jika digunakan
    var messageInput = document.getElementById('message');

    if (!nameInput || !messageInput) {
      console.error('One or more input elements are missing.');
      return;
    }

    var nameForm = nameInput.value;
    var dateForm = dateInput ? dateInput.value : ''; // Tangani jika dateInput tidak ada
    var radioInput = document.querySelector('input[name="radio"]:checked');
    var radioValue = radioInput ? radioInput.value : '';
    var messageForm = messageInput.value;

    if (nameForm === '' && messageForm === '') {
      // Jika nama dan pesan kosong, tidak menambah data
      console.error('Name or message is empty.');
      return;
    }

    var formattedData = `${nameForm}|${dateForm}|${radioValue}|${messageForm}`;
    dataArray.unshift(formattedData);
    localStorage.setItem('dataArray', JSON.stringify(dataArray));

    var newDiv = document.createElement('div');
    newDiv.className =
      'flex flex-col leading-1.5 w-full p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl font-poppins';
    newDiv.innerHTML = `
      <div class="flex items-center justify-between">
        <p class="text-md font-semibold text-gray-800 capitalize">${nameForm}</p>
        <p class="text-sm font-normal px-3 py-1 rounded-full text-white bg-gray-800">${radioValue}</p>
      </div>
      <p class="text-base italic text-left py-5 text-gray-800/50 font-medium">${messageForm}</p>
    `;
    displayDiv.prepend(newDiv);
    displayDiv.style.display = 'block'; // Pastikan displayDiv terlihat

    // Kosongkan input form setelah submit
    nameInput.value = '';
    if (dateInput) dateInput.value = ''; // Kosongkan jika ada
    var radios = document.querySelectorAll('input[name="radio"]');
    radios.forEach((radio) => {
      radio.checked = false;
    });
    messageInput.value = '';
  });

  clearButton.addEventListener('click', function () {
    // Menghapus data dari localStorage
    localStorage.removeItem('dataArray');
    // Menghapus semua elemen dari div display
    displayDiv.innerHTML = '';
    // Sembunyikan displayDiv jika tidak ada data
    displayDiv.style.display = 'none';
  });
});
