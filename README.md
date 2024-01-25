# Text Encryption

This repository contains a simple web application for text encryption and decryption using the AES-GCM encryption algorithm. The project is designed for educational purposes and demonstrates the basic principles of encryption and decryption in the browser.

## Features:

- **Text Encryption:** Enter a text in the provided textarea and encrypt it using the AES-GCM encryption algorithm.
- **Text Decryption:** Decrypt the encrypted text and view the original message.

## How to Use:

1. **Encryption:**
   - Enter the text in the "Enter Text" textarea.
   - Click the "Encrypt" button.
   - The encrypted text will be displayed in the "Result" section.

2. **Decryption:**
   - Copy the encrypted text.
   - Paste the encrypted text in the "Enter Text" textarea.
   - Click the "Decrypt" button.
   - The decrypted text will be displayed in the "Result" section.

## Note:
- Ensure that you securely share the encrypted text with the intended recipient, as decryption requires the original encryption key.

Feel free to explore, experiment, and contribute to this project!

---

This description provides a brief overview of the project's purpose and features. It also includes instructions on how to use the application for both encryption and decryption. Additionally, it emphasizes the importance of securely sharing the encrypted text.

As for the execution, users can simply open the HTML file in a web browser to access the application. They can interact with the provided textarea, buttons, and result sections to encrypt and decrypt text.
To host your web page on your local machine and allow your friend to access it using your IP address, you can follow these general steps:

# Hosting The Webpage

1. **Host the Page Locally:**
   - Make sure you have a simple web server installed on your machine. If you have Python installed, you can use the following command to start a basic server:
     ```bash
     python -m http.server
     ```
     This will start a server on port 8000 by default.

   - Place your HTML file and any associated assets (like images) in the directory where you run the command.

2. **Find Your Local IP Address:**
   - Open a command prompt or terminal.
   - Run the following command:
     - On Windows: `ipconfig`
     - On macOS/Linux: `ifconfig` or `ip addr`

   - Look for an entry labeled "IPv4 Address" (Windows) or "inet" (macOS/Linux). It will look something like `192.168.x.x` or `10.x.x.x`.

3. **Access the Page Locally:**
   - Open a web browser on your machine.
   - Enter the following address in the address bar:
     ```
     http://localhost:8000
     ```
     Replace `8000` with the port number if you used a different one.

4. **Access the Page from Another Device:**
   - Ensure that your machine's firewall allows incoming connections on the chosen port.
   - Provide your friend with your local IP address and the port number.
   - Your friend can access the page using the following address:
     ```
     http://your-local-ip:8000
     ```
     Replace `your-local-ip` with the actual local IP address you found earlier, and `8000` with the port number.

   Note: Keep in mind that this setup allows access only within the same local network. If you want to make it accessible over the internet, you'll need to consider port forwarding and potentially use services like **Ngrok** for tunneling.

# Ngrok

After installed Ngrok , you can use it to make your locally hosted website accessible over the internet. Here are the steps:

1. **Run Your Local Server:**
   - Start your local server (e.g., `live-server` or any other server you are using) in the directory where your HTML file is located.

2. **Open a Terminal or Command Prompt:**
   - Navigate to the directory where Ngrok is installed or make sure the Ngrok executable is in your system's PATH.

3. **Run Ngrok:**
   - Use the following command to start Ngrok and expose your local server to the internet. Replace `YOUR_PORT` with the port number your local server is running on (e.g., 8000):
     ```bash
     ngrok http YOUR_PORT
     ```
   - Ngrok will generate a public URL (something like `https://randomstring.ngrok.io`).

4. **Share the Ngrok URL:**
   - Copy the generated Ngrok URL from the terminal.
   - Share this URL with your friend, and they should be able to access your locally hosted website.

Now your friend can open the Ngrok URL in a web browser, and it will forward the requests to your local server.

**Note:**
- The Ngrok URL is temporary and may change every time you restart Ngrok. If you need a fixed subdomain, you might consider upgrading to Ngrok's paid plans.
- Keep the terminal running with Ngrok as long as you want the public access to your local server. Closing the terminal will stop the Ngrok tunnel.

Make sure to test the setup to ensure everything is working as expected. If you encounter any issues or have further questions, feel free to ask!
