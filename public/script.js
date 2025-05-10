// --- Pop-up Modal Logic ---
const creditModal = document.getElementById('creditModal');
const creditModalContent = document.getElementById('creditModalContent');
const closeCreditModalBtn = document.getElementById('closeCreditModal');

function showCreditModal() {
  creditModal.classList.remove('hidden'); // Make the modal visible
  // Trigger animation by removing initial state classes after a short delay
  // (to allow the browser to render 'hidden' removal before applying transform)
  setTimeout(() => {
    creditModalContent.classList.remove('opacity-0', 'scale-95');
    creditModalContent.classList.add('opacity-100', 'scale-100');
  }, 50); // Small delay (e.g., 50ms)
}

function hideCreditModal() {
  // Trigger exit animation first
  creditModalContent.classList.remove('opacity-100', 'scale-100');
  creditModalContent.classList.add('opacity-0', 'scale-95');

  // Hide the modal element completely after the animation
  setTimeout(() => {
    creditModal.classList.add('hidden');
  }, 300); // Match this duration to the Tailwind transition duration (duration-300)
}

// Show modal on page load
document.addEventListener('DOMContentLoaded', () => {
  showCreditModal();
  // Existing code from previous features also runs here
  toggleCipherOptionsVisibility();
  updateSecurityDisplay();
});

// Add event listener to close button
closeCreditModalBtn.addEventListener('click', hideCreditModal);

// You might also want to close the modal if the user clicks outside the content
creditModal.addEventListener('click', (event) => {
  if (event.target === creditModal) { // Check if the click was directly on the overlay
    hideCreditModal();
  }
});
// --- End Pop-up Modal Logic ---


function copyResult() {
  const output = document.getElementById('output').textContent;
  if (output) {
    navigator.clipboard.writeText(output).then(() => {
      alert('Result copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy result.');
    });
  } else {
    alert('No result to copy.');
  }
}

function toggleSaltInput() {
  const useSaltCheckbox = document.getElementById('useSalt');
  const saltInput = document.getElementById('salt');
  if (useSaltCheckbox.checked) {
    saltInput.style.display = 'block';
  } else {
    saltInput.style.display = 'none';
    saltInput.value = ''; // Clear salt when unchecked
  }
  updateSecurityDisplay(); // Update security display when salt checkbox changes
}

// Renamed function to control visibility of Key and Salt options
function toggleCipherOptionsVisibility() {
  const type = document.getElementById('type').value;
  const saltOptionsDiv = document.getElementById('saltOptions');
  const keyOptionsDiv = document.getElementById('keyOptions'); // Get the key options div
  const useSaltCheckbox = document.getElementById('useSalt');
  const saltInput = document.getElementById('salt');
  const keyInput = document.getElementById('key'); // Get the key input itself

  // Control visibility of Salt options
  if (type === 'QuantumShift') {
    saltOptionsDiv.style.display = 'block';
    toggleSaltInput(); // Ensure salt input is hidden/shown based on checkbox state
  } else {
    saltOptionsDiv.style.display = 'none';
    useSaltCheckbox.checked = false; // Uncheck the salt checkbox
    saltInput.style.display = 'none'; // Hide salt input
    saltInput.value = ''; // Clear salt value
  }

  // Control visibility of Key input
  if (type === 'Base64') {
    keyOptionsDiv.style.display = 'none';
    keyInput.value = ''; // Clear key value when hidden
  } else {
    keyOptionsDiv.style.display = 'block';
  }

  updateSecurityDisplay(); // Update security display whenever encryption type changes
}

// New function to update the security level display
function updateSecurityDisplay() {
  const type = document.getElementById('type').value;
  const useSalt = document.getElementById('useSalt').checked;
  const securityLevelText = document.getElementById('securityLevelText');
  const securityProgressBar = document.getElementById('securityProgressBar');

  let levelText = "N/A";
  let progressWidth = 0;
  let barColorClass = 'bg-gray-400'; // Default for N/A

  if (type === 'Base64' || type === 'Caesar') {
    levelText = "Low Security";
    progressWidth = 25;
    barColorClass = 'bg-red-500';
  } else if (type === 'ReverseCipher') {
    levelText = "Medium Security";
    progressWidth = 50;
    barColorClass = 'bg-yellow-500';
  } else if (type === 'QuantumShift') {
    if (useSalt) {
      levelText = "Very High Security";
      progressWidth = 100;
      barColorClass = 'bg-green-700';
    } else {
      levelText = "High Security";
      progressWidth = 75;
      barColorClass = 'bg-green-500';
    }
  }

  securityLevelText.textContent = levelText;
  securityProgressBar.style.width = `${progressWidth}%`;

  // Remove previous color classes and add the new one
  securityProgressBar.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-700', 'bg-gray-400');
  securityProgressBar.classList.add(barColorClass);
}


async function encryptText() {
  const type = document.getElementById('type').value;
  const text = document.getElementById('text').value;
  const key = document.getElementById('key').value || 0; // Default to 0 if not set/hidden
  const useSalt = document.getElementById('useSalt').checked;
  const salt = document.getElementById('salt').value;

  const payload = { type, text, key: parseInt(key) };
  if (useSalt && type === 'QuantumShift') {
    payload.salt = salt;
  }

  const res = await fetch('/encrypt-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  document.getElementById('output').innerText = data.result;

  updateSecurityDisplay(); // Update security display after encryption
}

async function decryptText() {
  const type = document.getElementById('type').value;
  const text = document.getElementById('text').value;
  const key = document.getElementById('key').value || 0; // Default to 0 if not set/hidden
  const useSalt = document.getElementById('useSalt').checked;
  const salt = document.getElementById('salt').value;

  const payload = { type, text, key: parseInt(key) };
  if (useSalt && type === 'QuantumShift') {
    payload.salt = salt;
  }

  const res = await fetch('/decrypt-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  document.getElementById('output').innerText = data.result;

  updateSecurityDisplay(); // Update security display after decryption
}

async function encryptFile() {
  const fileInput = document.getElementById('file');
  const formData = new FormData();
  if (fileInput.files.length === 0) {
    alert('Please select a file to encrypt.');
    return;
  }
  formData.append('file', fileInput.files[0]);
  const res = await fetch('/encrypt-file', { method: 'POST', body: formData });
  if (!res.ok) {
    alert('File encryption failed. Please check the server logs.');
    return;
  }
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'encrypted_file.enc';
  a.click();
  window.URL.revokeObjectURL(url);
}

async function decryptFile() {
  const fileInput = document.getElementById('file');
  const formData = new FormData();
  if (fileInput.files.length === 0) {
    alert('Please select a file to decrypt.');
    return;
  }
  formData.append('file', fileInput.files[0]);
  const res = await fetch('/decrypt-file', { method: 'POST', body: formData });
  if (!res.ok) {
    alert('File decryption failed. Please ensure it is a valid encrypted file.');
    return;
  }
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  // Attempt to derive original filename from the encrypted filename if possible,
  // otherwise use a generic name.
  const originalFileName = fileInput.files[0].name;
  const decryptedFileName = originalFileName.endsWith('.enc') ? originalFileName.slice(0, -4) : 'decrypted_file';
  a.download = decryptedFileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

// Call toggleCipherOptionsVisibility on page load to set initial state AND update security display
document.addEventListener('DOMContentLoaded', () => {
    toggleCipherOptionsVisibility();
    updateSecurityDisplay(); // Call explicitly on load for initial state
});