# CyberCipher
CyberCipher Web is a web-based encryption and decryption tool that provides a user-friendly interface for various cryptographic methods. This project aims to offer a platform for exploring and utilizing different encryption techniques for both text and files.
![image](https://github.com/user-attachments/assets/fd3e4ac6-df6a-4d1a-b0e0-cd416a2351b9)
![Screenshot (1535)](https://github.com/user-attachments/assets/cbb8235e-3445-42ab-a76b-be40eba76f3c)
![image](https://github.com/user-attachments/assets/4bd76a5e-9854-4c29-996e-a3f6a0186233)



**Key Features**

* **Text Encryption/Decryption:**
     * Supports multiple encryption algorithms:
     * Caesar Cipher: A simple substitution cipher.
     * Mirror Shift Cipher: A custom cipher that reverses the input and shifts characters.
     * Dynamic Shift Cipher: A custom cipher with dynamic character shifts and block reversal.
     * Vigenère Cipher: A polyalphabetic substitution cipher with optional autokey and block permutation.
     * AES-256-CBC: Advanced Encryption Standard with a 256-bit key in Cipher Block Chaining mode, with optional random IV and HMAC.
 * Key-based encryption for applicable ciphers.
 * Optional salt for the Dynamic Shift Cipher.
 * Options for Vigenère cipher: autokey and block permutation.
 * Options for AES: custom key (hexadecimal), random Initialization Vector (IV), and Hash-based Message Authentication Code (HMAC).

* **File Encryption/Decryption:**
    * Supports encryption and decryption of files.

* **User Interface:**
    * Clean and responsive design using HTML, CSS (Tailwind CSS), and JavaScript.
    * Intuitive selection of encryption types.
    * Modal-based welcome message.

## Technologies Used

* **Frontend:**
    * HTML5: For structuring the web page.
    * CSS3: For styling.
    * Tailwind CSS: A utility-first CSS framework for rapid design.
    * JavaScript: For client-side logic and interactivity.
    * Google Fonts (Inter, Poppins): For enhanced typography.

* **Backend:**
    * Node.js: JavaScript runtime environment.
    * Express.js: Web framework for handling server-side logic and routing.
