// --- Pop-up Modal Logic (Credit Modal) ---
const creditModal = document.getElementById('creditModal');
const creditModalContent = document.getElementById('creditModalContent');
const closeCreditModalBtn = document.getElementById('closeCreditModal');

function showCreditModal() {
    creditModal.classList.remove('hidden'); // Make the modal visible
    // Trigger animation by removing initial state classes after a short delay
    setTimeout(() => {
        creditModalContent.classList.remove('opacity-0', 'scale-95');
        creditModalContent.classList.add('opacity-100', 'scale-100');
    }, 50);
}

function hideCreditModal() {
    // Trigger exit animation first
    creditModalContent.classList.remove('opacity-100', 'scale-100');
    creditModalContent.classList.add('opacity-0', 'scale-95');

    // Hide the modal element completely after the animation
    setTimeout(() => {
        creditModal.classList.add('hidden');
    }, 300);
}

// --- Pop-up Modal Logic (Encryption Info Modal) ---
const encryptionInfoModal = document.getElementById('encryptionInfoModal');
const encryptionInfoModalContent = document.getElementById('encryptionInfoModalContent');
const closeEncryptionInfoModalBtn = document.getElementById('closeEncryptionInfoModal');
const showEncryptionInfoButton = document.getElementById('showEncryptionInfoButton'); // The new info button

function showEncryptionInfoModal() {
    // First, update the content based on the current selection
    updateEncryptionInfoContent();
    encryptionInfoModal.classList.remove('hidden');
    setTimeout(() => {
        encryptionInfoModalContent.classList.remove('opacity-0', 'scale-95');
        encryptionInfoModalContent.classList.add('opacity-100', 'scale-100');
    }, 50);
}

function hideEncryptionInfoModal() {
    encryptionInfoModalContent.classList.remove('opacity-100', 'scale-100');
    encryptionInfoModalContent.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        encryptionInfoModal.classList.add('hidden');
    }, 300);
}

// Show credit modal on page load
document.addEventListener('DOMContentLoaded', () => {
    showCreditModal();
    toggleCipherOptionsVisibility(); // Keep this for initial state
    updateSecurityDisplay();
    // No need to call updateEncryptionInfo() here as it's called when modal is shown
});

// Event Listeners for Modals
closeCreditModalBtn.addEventListener('click', hideCreditModal);
creditModal.addEventListener('click', (event) => {
    if (event.target === creditModal) {
        hideCreditModal();
    }
});

// NEW: Event Listeners for Encryption Info Modal
showEncryptionInfoButton.addEventListener('click', showEncryptionInfoModal);
closeEncryptionInfoModalBtn.addEventListener('click', hideEncryptionInfoModal);
encryptionInfoModal.addEventListener('click', (event) => {
    if (event.target === encryptionInfoModal) {
        hideEncryptionInfoModal();
    }
});
// --- End Pop-up Modal Logic ---


function copyResult() {
  const output = document.getElementById('output').textContent;
  const messageEl = document.getElementById('copyMessage');

  if (output) {
      navigator.clipboard.writeText(output).then(() => {
          messageEl.textContent = '✅ Copied to clipboard!';
          messageEl.classList.remove('hidden');
          setTimeout(() => messageEl.classList.add('hidden'), 2000);
      }).catch(err => {
          console.error('Failed to copy: ', err);
          messageEl.textContent = '❌ Failed to copy.';
          messageEl.classList.remove('hidden');
          setTimeout(() => messageEl.classList.add('hidden'), 2000);
      });
  } else {
      messageEl.textContent = '⚠️ No result to copy.';
      messageEl.classList.remove('hidden');
      setTimeout(() => messageEl.classList.add('hidden'), 2000);
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

function toggleAESKeyInput() {
    const useAESKeyCheckbox = document.getElementById('useAESKey');
    const aesKeyInput = document.getElementById('aesKey');
    if (useAESKeyCheckbox.checked) {
        aesKeyInput.style.display = 'block';
    } else {
        aesKeyInput.style.display = 'none';
        aesKeyInput.value = '';
    }
    updateSecurityDisplay();
}

// NEW: Toggle visibility for Vigenère enhancements
function toggleVigenereOptionsVisibility() {
    const vigenereOptionsDiv = document.getElementById('vigenereOptions');
    const type = document.getElementById('type').value;
    if (type === 'Vigenere') {
        vigenereOptionsDiv.style.display = 'block';
    } else {
        vigenereOptionsDiv.style.display = 'none';
        // Reset checkboxes when hiding
        document.getElementById('enableVigenereAutoKey').checked = false;
        document.getElementById('enableVigenerePermutation').checked = false;
    }
    updateSecurityDisplay();
}

// NEW: Toggle visibility for AES enhancements
function toggleAESOptionsVisibility() {
    const aesOptionsDiv = document.getElementById('aesOptions');
    const type = document.getElementById('type').value;
    if (type === 'AES') {
        aesOptionsDiv.style.display = 'block';
    } else {
        aesOptionsDiv.style.display = 'none';
        // Reset checkboxes when hiding
        document.getElementById('enableAESRandomIV').checked = true; // Default to checked
        document.getElementById('enableAESHMAC').checked = false;
    }
    updateSecurityDisplay();
}


function toggleCipherOptionsVisibility() {
    const type = document.getElementById('type').value;
    const saltOptionsDiv = document.getElementById('saltOptions');
    const keyOptionsDiv = document.getElementById('keyOptions'); // Numeric key for Caesar, Mirror, Dynamic
    const useSaltCheckbox = document.getElementById('useSalt');
    const saltInput = document.getElementById('salt');
    const keyInput = document.getElementById('key');

    const aesKeyOptionsDiv = document.getElementById('aesKeyOptions'); // For AES
    const useAESKeyCheckbox = document.getElementById('useAESKey');
    const aesKeyInput = document.getElementById('aesKey');

    const vigenereKeyOptionsDiv = document.getElementById('vigenereKeyOptions'); // For Vigenere
    const vigenereKeyInput = document.getElementById('vigenereKey');

    // Reset all to hidden by default and clear values
    saltOptionsDiv.style.display = 'none';
    useSaltCheckbox.checked = false;
    saltInput.style.display = 'none';
    saltInput.value = '';

    keyOptionsDiv.style.display = 'none';
    keyInput.value = '';

    aesKeyOptionsDiv.style.display = 'none';
    useAESKeyCheckbox.checked = false;
    aesKeyInput.style.display = 'none';
    aesKeyInput.value = '';

    vigenereKeyOptionsDiv.style.display = 'none';
    vigenereKeyInput.value = '';

    // Call the new toggle functions for specific cipher enhancements
    toggleVigenereOptionsVisibility();
    toggleAESOptionsVisibility();

    // Show relevant options based on selected type
    if (type === 'Caesar' || type === 'ReverseCipher' || type === 'DynamicShift') {
        keyOptionsDiv.style.display = 'block';
        keyInput.setAttribute('type', 'number');
        keyInput.setAttribute('placeholder', 'Enter key (number)');
    }

    if (type === 'DynamicShift') {
        saltOptionsDiv.style.display = 'block';
        toggleSaltInput(); // Ensure salt input is shown/hidden correctly on initial toggle
    }

    if (type === 'AES') {
        aesKeyOptionsDiv.style.display = 'block';
        toggleAESKeyInput();
    }

    if (type === 'Vigenere') {
        vigenereKeyOptionsDiv.style.display = 'block';
        vigenereKeyInput.setAttribute('type', 'text');
        vigenereKeyInput.setAttribute('placeholder', 'Enter Vigenère text key');
    }

    updateSecurityDisplay();
}

// In script.js

function updateSecurityDisplay() {
    const type = document.getElementById('type').value;
    const useSalt = document.getElementById('useSalt').checked;
    const useAESKey = document.getElementById('useAESKey').checked;
    const enableAESRandomIV = document.getElementById('enableAESRandomIV').checked;
    const enableAESHMAC = document.getElementById('enableAESHMAC').checked;
    const enableVigenereAutoKey = document.getElementById('enableVigenereAutoKey').checked;
    const enableVigenerePermutation = document.getElementById('enableVigenerePermutation').checked;

    const securityLevelText = document.getElementById('securityLevelText');
    const securityProgressBar = document.getElementById('securityProgressBar');

    let levelText = "N/A";
    let progressWidth = 0;
    let barColorClass = 'bg-gray-400'; // Default grey for N/A or unselected

    // Remove all possible previous color classes to ensure clean application
    securityProgressBar.classList.remove(
        'bg-red-500', 'bg-yellow-500', 'bg-orange-500', 'bg-green-500', 'bg-green-700',
        'bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-indigo-800', 'bg-gray-400'
    );

    if (type === 'Caesar') {
        levelText = "Low Security";
        progressWidth = 25;
        barColorClass = 'bg-red-500';
    } else if (type === 'ReverseCipher') {
        levelText = "Medium Security";
        progressWidth = 50;
        barColorClass = 'bg-yellow-500';
    } else if (type === 'Vigenere') {
        if (enableVigenereAutoKey && enableVigenerePermutation) {
             levelText = "High Security";
             progressWidth = 75;
             barColorClass = 'bg-green-700';
        } else if (enableVigenereAutoKey || enableVigenerePermutation) {
            levelText = "Medium-High Security";
            progressWidth = 65;
            barColorClass = 'bg-green-500'; // A distinct color for this level
        } else {
            // Default Vigenere
            levelText = "Medium Security";
            progressWidth = 50;
            barColorClass = 'bg-yellow-500';
        }
    } else if (type === 'DynamicShift') {
        if (useSalt) {
            levelText = "Very High Security";
            progressWidth = 90;
            barColorClass = 'bg-green-700';
        } else {
            levelText = "High Security";
            progressWidth = 75;
            barColorClass = 'bg-green-500';
        }
    } else if (type === 'AES') {
        levelText = "Very High Security";
        progressWidth = 85;
        barColorClass = 'bg-purple-500';
        if (useAESKey) {
            levelText = "Very High Security (Custom Key)";
            progressWidth = 90;
            barColorClass = 'bg-purple-600';
        }
        if (enableAESRandomIV) {
            levelText = "Very High Security (Random IV)";
            progressWidth = 95;
            barColorClass = 'bg-purple-700';
        }
        if (enableAESHMAC) {
            levelText = "Extremely High Security (HMAC for Integrity)";
            progressWidth = 100;
            barColorClass = 'bg-indigo-800';
        }
    }


    securityLevelText.textContent = levelText;
    securityProgressBar.style.width = `${progressWidth}%`;

    // Add the appropriate color class based on the current selection
    securityProgressBar.classList.add(barColorClass);
}

// Renamed and adjusted function to update the content *within* the modal
function updateEncryptionInfoContent() {
    const type = document.getElementById('type').value;
    const infoTitle = document.getElementById('encryptionInfoTitle');
    const infoContent = document.getElementById('encryptionInfoContent');

    let title = "";
    let content = "";

    switch (type) {
        case 'Caesar':
            title = "Caesar Cipher";
            content = `
                <p class="mb-2">The Caesar cipher is one of the simplest and most widely known encryption techniques. It's a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.</p>
                <p class="mb-2">For example, with a left shift of 3, D would be replaced by A, E would become B, and so on. The cipher is named after Julius Caesar, who used it to protect his private communications.</p>
                <p class="font-semibold">How it works:</p>
                <ul class="list-disc list-inside ml-4">
                    <li>Each letter in the plaintext is shifted a certain number of places down or up the alphabet.</li>
                    <li>The "key" is the number of positions to shift the letters.</li>
                    <li>It is a symmetric cipher, meaning the same key is used for both encryption and decryption.</li>
                </ul>
                <p class="mt-2">Due to its simplicity, the Caesar cipher is very easy to break and offers low security, mainly used for historical or educational purposes.</p>
            `;
            break;
        case 'ReverseCipher':
            title = "Mirror Shift Cipher (Custom)";
            content = `
                <p class="mb-2">The Mirror Shift Cipher is a custom encryption method that combines text reversal with a shifting mechanism based on a numerical key and character index.</p>
                <p class="font-semibold">How it works (Encryption):</p>
                <ul class="list-disc list-inside ml-4">
                    <li>First, the entire input text is reversed.</li>
                    <li>Then, each character in the reversed text is shifted by a value derived from the provided numerical "Key" and its current position (index) in the reversed string. Specifically, the shift for each character is <code>Key + (index % 5)</code>.</li>
                    <li>The ASCII value of each character is adjusted by this calculated shift.</li>
                </ul>
                <p class="font-semibold">How it works (Decryption):</p>
                <ul class="list-disc list-inside ml-4">
                    <li>The decryption process reverses the encryption steps.</li>
                    <li>Each character in the encrypted text is first shifted back by subtracting <code>Key + (index % 5)</code>.</li>
                    <li>Finally, the entire string is reversed back to its original order.</li>
                </ul>
                <p class="mt-2">This cipher adds a layer of complexity by combining reversal and a dynamic shift, making it slightly more robust than a simple Caesar cipher but still relatively easy to break with cryptanalysis.</p>
            `;
            break;
        case 'DynamicShift':
            title = "Dynamic Shift Cipher (Custom)";
            content = `
                <p class="mb-2">The Dynamic Shift Cipher is a more complex custom encryption method designed to offer higher security by using a dynamically changing shift for each character and incorporating a 'salt' for added randomness.</p>
                <p class="font-semibold">How it works (Encryption):</p>
                <ul class="list-disc list-inside ml-4">
                    <li>A "combined key" is calculated by adding the numerical "Key" to the sum of the ASCII values of all characters in the optional "Salt". If no salt is provided, only the numerical key is used.</li>
                    <li>For each character in the plaintext, a "dynamic shift" is calculated using the formula: <code>(combinedKey + character_index) % 256</code>. This ensures that each character is shifted by a different amount.</li>
                    <li>The ASCII value of the character is increased by this dynamic shift.</li>
                    <li>Additionally, the entire encrypted text is then broken into "blocks" (size determined by <code>combinedKey % 10</code>) and these blocks are internally reversed, and then the order of the blocks themselves is reversed, adding further obfuscation.</li>
                </ul>
                <p class="font-semibold">How it works (Decryption):</p>
                <ul class="list-disc list-inside ml-4">
                    <li>The decryption process reverses the block and internal block reversal first.</li>
                    <li>Then, for each character, the same "dynamic shift" (calculated with <code>combinedKey + character_index</code>) is subtracted from its ASCII value to restore the original character.</li>
                    <li>Proper handling is in place for ASCII values that might go below zero during decryption.</li>
                </ul>
                <p class="mt-2">The use of a dynamic shift, a salt, and block manipulation significantly enhances the security compared to simpler ciphers, making it much harder to decrypt without the correct key and salt.</p>
            `;
            break;
        case 'Vigenere':
            title = "Vigenère Cipher";
            content = `
                <p class="mb-2">The Vigenère cipher is a method of encrypting alphabetic text by using a series of different Caesar ciphers based on the letters of a keyword. It's a polyalphabetic substitution cipher, meaning one plaintext letter can be represented by multiple ciphertext letters depending on its position.</p>
                <p class="font-semibold">How it works (Basic Vigenère):</p>
                <ul class="list-disc list-inside ml-4">
                    <li>A keyword is repeated to match the length of the plaintext.</li>
                    <li>Each plaintext letter is shifted by the numeric value of the corresponding keyword letter (A=0, B=1, etc.) modulo 26.</li>
                </ul>
                <p class="mt-2 font-semibold">Enhancements:</p>
                <ul class="list-disc list-inside ml-4">
                    <li>**Enable Auto-Key:** Instead of just repeating the keyword, the plaintext itself is appended to the keyword after its initial use. This makes the key stream less repetitive and harder to analyze.</li>
                    <li>**Enable Block Permutation:** After standard Vigenère encryption, the ciphertext is divided into small blocks, and the characters within these blocks are reordered (permuted) based on a specific rule. This adds an extra layer of diffusion.</li>
                </ul>
                <p class="mt-2">While more secure than the Caesar cipher, basic Vigenère can be broken with techniques like Kasiski examination. The enhancements increase its complexity, making it more resilient against attacks.</p>
            `;
            break;
        case 'AES':
            title = "Advanced Encryption Standard (AES)";
            content = `
                <p class="mb-2">The Advanced Encryption Standard (AES) is a symmetric block cipher chosen by the U.S. government to protect classified information and is now widely used worldwide. It is known for its robust security and efficiency.</p>
                <p class="mb-2">AES operates on fixed-size blocks of data (128 bits, or 16 bytes) and supports key lengths of 128, 192, and 256 bits. Our implementation primarily uses AES-256, offering a very high level of security.</p>
                <p class="font-semibold">How it works (Simplified):</p>
                <ul class="list-disc list-inside ml-4">
                    <li>**Key Expansion:** The main key is expanded into multiple "round keys".</li>
                    <li>**Iterative Rounds:** The plaintext block undergoes a series of complex transformations (SubBytes, ShiftRows, MixColumns, AddRoundKey) over multiple rounds (10-14 rounds depending on key size).</li>
                    <li>**Initialization Vector (IV):** For modes like CBC, a random IV is XORed with the first plaintext block. For subsequent blocks, the previous ciphertext block is XORed with the current plaintext block. This ensures that identical plaintexts encrypt to different ciphertexts.</li>
                </ul>
                <p class="mt-2 font-semibold">Enhancements:</p>
                <ul class="list-disc list-inside ml-4">
                    <li>**Enable Random IV:** Generates a unique, random Initialization Vector for each encryption. **This is critical for the security of CBC mode and should almost always be enabled.** If unchecked, a fixed IV will be used for demonstration purposes, but it compromises security.</li>
                    <li>**Enable HMAC (Hash-based Message Authentication Code):** Adds a cryptographic hash (HMAC) to the encrypted data. This provides **data integrity** (detects if the ciphertext has been altered) and **authentication** (verifies the sender's authenticity), in addition to confidentiality. This is crucial for robust real-world security.</li>
                </ul>
                <p class="mt-2">AES is considered one of the most secure and efficient encryption algorithms available today, especially when used with appropriate modes and integrity mechanisms like HMAC.</p>
            `;
            break;
        default:
            title = "Unknown Encryption Type";
            content = "<p>Select an encryption type to learn more about it.</p>";
            break;
    }

    infoTitle.textContent = title;
    infoContent.innerHTML = content;
}

// --- Encryption/Decryption Logic ---
async function encryptText() {
    const type = document.getElementById('type').value;
    const text = document.getElementById('text').value;
    const outputElement = document.getElementById('output');
    const key = document.getElementById('key').value;
    const vigenereKey = document.getElementById('vigenereKey').value;
    const useSalt = document.getElementById('useSalt').checked;
    const salt = document.getElementById('salt').value;
    const useAESKey = document.getElementById('useAESKey').checked;
    const aesKey = document.getElementById('aesKey').value;

    const enableAESRandomIV = document.getElementById('enableAESRandomIV').checked;
    const enableAESHMAC = document.getElementById('enableAESHMAC').checked;

    const enableVigenereAutoKey = document.getElementById('enableVigenereAutoKey').checked;
    const enableVigenerePermutation = document.getElementById('enableVigenerePermutation').checked;


    let apiUrl = `/encrypt`;
    let requestBody = {
        type: type,
        text: text
    };

    // Add keys and options based on type
    if (type === 'Caesar' || type === 'ReverseCipher' || type === 'DynamicShift') {
        requestBody.key = parseInt(key);
    }
    if (type === 'DynamicShift' && useSalt) {
        requestBody.salt = salt;
    }
    if (type === 'Vigenere') {
        requestBody.vigenereKey = vigenereKey;
        requestBody.enableVigenereAutoKey = enableVigenereAutoKey; // Pass toggle state
        requestBody.enableVigenerePermutation = enableVigenerePermutation; // Pass toggle state
    }
    if (type === 'AES') {
        requestBody.useAESKey = useAESKey;
        requestBody.aesKey = aesKey;
        requestBody.enableAESRandomIV = enableAESRandomIV; // Pass toggle state
        requestBody.enableAESHMAC = enableAESHMAC;         // Pass toggle state
    }


    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        if (response.ok) {
            outputElement.textContent = data.encryptedText;
        } else {
            outputElement.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        console.error('Error during encryption:', error);
        outputElement.textContent = `Error: Could not connect to server or process request.`;
    }
}

async function decryptText() {
    const type = document.getElementById('type').value;
    const text = document.getElementById('text').value; 
    const outputElement = document.getElementById('output');
    const key = document.getElementById('key').value;
    const vigenereKey = document.getElementById('vigenereKey').value;
    const useSalt = document.getElementById('useSalt').checked;
    const salt = document.getElementById('salt').value;
    const useAESKey = document.getElementById('useAESKey').checked;
    const aesKey = document.getElementById('aesKey').value;

    const enableAESRandomIV = document.getElementById('enableAESRandomIV').checked;
    const enableAESHMAC = document.getElementById('enableAESHMAC').checked;

    const enableVigenereAutoKey = document.getElementById('enableVigenereAutoKey').checked;
    const enableVigenerePermutation = document.getElementById('enableVigenerePermutation').checked;

    let apiUrl = `/decrypt`;
    let requestBody = {
        type: type,
        text: text
    };

    // Add keys and options based on type
    if (type === 'Caesar' || type === 'ReverseCipher' || type === 'DynamicShift') {
        requestBody.key = parseInt(key);
    }
    if (type === 'DynamicShift' && useSalt) {
        requestBody.salt = salt;
    }
    if (type === 'Vigenere') {
        requestBody.vigenereKey = vigenereKey;
        requestBody.enableVigenereAutoKey = enableVigenereAutoKey; // Pass toggle state
        requestBody.enableVigenerePermutation = enableVigenerePermutation; // Pass toggle state
    }
    if (type === 'AES') {
        requestBody.useAESKey = useAESKey;
        requestBody.aesKey = aesKey;
        requestBody.enableAESRandomIV = enableAESRandomIV; // Pass toggle state
        requestBody.enableAESHMAC = enableAESHMAC;         // Pass toggle state
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        if (response.ok) {
            outputElement.textContent = data.decryptedText;
        } else {
            outputElement.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        console.error('Error during decryption:', error);
        outputElement.textContent = `Error: Could not connect to server or process request.`;
    }
}

async function encryptFile() {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    const type = document.getElementById('type').value;
    const key = document.getElementById('key').value;
    const vigenereKey = document.getElementById('vigenereKey').value;
    const useSalt = document.getElementById('useSalt').checked;
    const salt = document.getElementById('salt').value;
    const useAESKey = document.getElementById('useAESKey').checked;
    const aesKey = document.getElementById('aesKey').value;
    const enableAESRandomIV = document.getElementById('enableAESRandomIV').checked;
    const enableAESHMAC = document.getElementById('enableAESHMAC').checked;
    const enableVigenereAutoKey = document.getElementById('enableVigenereAutoKey').checked;
    const enableVigenerePermutation = document.getElementById('enableVigenerePermutation').checked;
    const enableCaesarShuffle = document.getElementById('enableCaesarShuffle').checked;
    const enableCaesarSymbolSub = document.getElementById('enableCaesarSymbolSub').checked;

    if (!file) {
        showFileMessage('⚠️ Please select a .txt file.', true);
        return;
    }

    // Validate file type and size (max 1MB)
    if (!file.name.endsWith('.txt')) {
        showFileMessage('❌ Only .txt files are supported.', true);
        return;
    }
    if (file.size > 1024 * 1024) {
        showFileMessage('❌ File size must be less than 1MB.', true);
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(e) {
        const text = e.target.result;

        let requestBody = {
            type: type,
            text: text,
            enableCaesarShuffle: enableCaesarShuffle,
            enableCaesarSymbolSub: enableCaesarSymbolSub
        };

        if (type === 'Caesar' || type === 'ReverseCipher' || type === 'DynamicShift') {
            requestBody.key = parseInt(key);
        }
        if (type === 'DynamicShift' && useSalt) {
            requestBody.salt = salt;
        }
        if (type === 'Vigenere') {
            requestBody.vigenereKey = vigenereKey;
            requestBody.enableVigenereAutoKey = enableVigenereAutoKey;
            requestBody.enableVigenerePermutation = enableVigenerePermutation;
        }
        if (type === 'AES') {
            requestBody.useAESKey = useAESKey;
            requestBody.aesKey = aesKey;
            requestBody.enableAESRandomIV = enableAESRandomIV;
            requestBody.enableAESHMAC = enableAESHMAC;
        }

        try {
            const response = await fetch('/encrypt-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            if (response.ok) {
                // Create a downloadable file
                const blob = new Blob([data.encryptedText], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = file.name.replace('.txt', '_encrypted.txt');
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                showFileMessage('✅ File encrypted successfully!');
            } else {
                showFileMessage(`❌ Error: ${data.error}`, true);
            }
        } catch (error) {
            console.error('Error during file encryption:', error);
            showFileMessage('❌ Error: Could not connect to server or process request.', true);
        }
    };
    reader.onerror = function() {
        showFileMessage('❌ Error reading file.', true);
    };
    reader.readAsText(file);
}

async function decryptFile() {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    const type = document.getElementById('type').value;
    const key = document.getElementById('key').value;
    const vigenereKey = document.getElementById('vigenereKey').value;
    const useSalt = document.getElementById('useSalt').checked;
    const salt = document.getElementById('salt').value;
    const useAESKey = document.getElementById('useAESKey').checked;
    const aesKey = document.getElementById('aesKey').value;
    const enableAESRandomIV = document.getElementById('enableAESRandomIV').checked;
    const enableAESHMAC = document.getElementById('enableAESHMAC').checked;
    const enableVigenereAutoKey = document.getElementById('enableVigenereAutoKey').checked;
    const enableVigenerePermutation = document.getElementById('enableVigenerePermutation').checked;
    const enableCaesarShuffle = document.getElementById('enableCaesarShuffle').checked;
    const enableCaesarSymbolSub = document.getElementById('enableCaesarSymbolSub').checked;

    if (!file) {
        showFileMessage('⚠️ Please select a .txt file.', true);
        return;
    }

    // Validate file type and size (max 1MB)
    if (!file.name.endsWith('.txt')) {
        showFileMessage('❌ Only .txt files are supported.', true);
        return;
    }
    if (file.size > 1024 * 1024) {
        showFileMessage('❌ File size must be less than 1MB.', true);
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(e) {
        const text = e.target.result;

        let requestBody = {
            type: type,
            text: text,
            enableCaesarShuffle: enableCaesarShuffle,
            enableCaesarSymbolSub: enableCaesarSymbolSub
        };

        if (type === 'Caesar' || type === 'ReverseCipher' || type === 'DynamicShift') {
            requestBody.key = parseInt(key);
        }
        if (type === 'DynamicSHIP' && useSalt) {
            requestBody.salt = salt;
        }
        if (type === 'Vigenere') {
            requestBody.vigenereKey = vigenereKey;
            requestBody.enableVigenereAutoKey = enableVigenereAutoKey;
            requestBody.enableVigenerePermutation = enableVigenerePermutation;
        }
        if (type === 'AES') {
            requestBody.useAESKey = useAESKey;
            requestBody.aesKey = aesKey;
            requestBody.enableAESRandomIV = enableAESRandomIV;
            requestBody.enableAESHMAC = enableAESHMAC;
        }

        try {
            const response = await fetch('/decrypt-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            if (response.ok) {
                // Create a downloadable file
                const blob = new Blob([data.decryptedText], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = file.name.replace('_encrypted.txt', '_decrypted.txt').replace('.txt', '_decrypted.txt');
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                showFileMessage('✅ File decrypted successfully!');
            } else {
                showFileMessage(`❌ Error: ${data.error}`, true);
            }
        } catch (error) {
            console.error('Error during file decryption:', error);
            showFileMessage('❌ Error: Could not connect to server or process request.', true);
        }
    };
    reader.onerror = function() {
        showFileMessage('❌ Error reading file.', true);
    };
    reader.readAsText(file);
}