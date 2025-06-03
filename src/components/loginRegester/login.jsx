<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom styles for Inter font and general body styling */
        body {
            font-family: 'Inter', sans-serif;
            /* Creative gradient background */
            background: linear-gradient(to right, #a7f3d0, #bfdbfe); /* Light green to light blue gradient */
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh; /* Full viewport height */
            margin: 0;
            padding: 1rem; /* Add some padding for smaller screens */
        }
        /* Style for the message box */
        .message-box {
            position: fixed;
            top: 1rem;
            right: 1rem;
            background-color: #ef4444; /* Red for error */
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        .message-box.show {
            opacity: 1;
        }
        .message-box.success {
            background-color: #22c55e; /* Green for success */
        }
        /* Hidden by default for 2FA section */
        .hidden {
            display: none;
        }
        /* Style for Google button icon */
        .google-icon {
            width: 20px;
            height: 20px;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <div class="message-box" id="messageBox"></div>

    <!-- Added bg-opacity-80 to make the form background muted -->
    <div class="bg-white bg-opacity-80 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

        <form id="loginForm" class="space-y-6">
            <div>
                <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username / Email</label>
                <input type="text" id="username" name="username" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out">
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" id="password" name="password" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out">
            </div>

            <div class="flex items-center space-x-6">
                <div class="flex items-center">
                    <input type="radio" id="roleUser" name="role" value="user" checked
                           class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded-full">
                    <label for="roleUser" class="ml-2 block text-sm font-medium text-gray-700">User</label>
                </div>
                <div class="flex items-center">
                    <input type="radio" id="roleDoctor" name="role" value="doctor"
                           class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded-full">
                    <label for="roleDoctor" class="ml-2 block text-sm font-medium text-gray-700">Doctor</label>
                </div>
            </div>

            <button type="submit" id="loginButton"
                    class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-lg">
                Login
            </button>

            <!-- Google Login Button -->
            <button type="button" id="googleLoginButton"
                    class="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-lg mt-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/20px-Google_%22G%22_logo.svg.png" alt="Google logo" class="google-icon">
                Login with Google
            </button>

            <!-- 2FA Section - Initially hidden -->
            <div id="twoFactorSection" class="hidden space-y-6 mt-6 pt-6 border-t border-gray-200">
                <h3 class="text-xl font-bold text-center text-gray-800">Two-Factor Authentication</h3>
                <div>
                    <label for="twoFactorCode" class="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                    <input type="text" id="twoFactorCode" name="twoFactorCode"
                           class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                           placeholder="Enter 6-digit code">
                </div>
                <button type="button" id="verifyCodeButton"
                        class="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-lg">
                    Verify Code
                </button>
            </div>
        </form>
    </div>

    <script>
        // Get references to elements
        const loginForm = document.getElementById('loginForm');
        const messageBox = document.getElementById('messageBox');
        const twoFactorSection = document.getElementById('twoFactorSection');
        const loginButton = document.getElementById('loginButton');
        const googleLoginButton = document.getElementById('googleLoginButton'); // New Google button reference
        const verifyCodeButton = document.getElementById('verifyCodeButton');
        const twoFactorCodeInput = document.getElementById('twoFactorCode');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const roleUserRadio = document.getElementById('roleUser');
        const roleDoctorRadio = document.getElementById('roleDoctor');


        let currentRole = ''; // Stores the role selected after initial login
        let expected2FACode = ''; // Stores the expected 2FA code for the current role

        /**
         * Displays a message in a floating box.
         * @param {string} message - The message to display.
         * @param {boolean} isSuccess - True for success message (green), false for error (red).
         */
        function showMessage(message, isSuccess) {
            messageBox.textContent = message;
            messageBox.classList.remove('success'); // Reset classes
            messageBox.classList.remove('show');

            if (isSuccess) {
                messageBox.classList.add('success');
            } else {
                messageBox.classList.remove('success'); // Ensure it's red by default
            }

            messageBox.classList.add('show');

            // Hide the message after 3 seconds
            setTimeout(() => {
                messageBox.classList.remove('show');
            }, 3000);
        }

        /**
         * Hides initial login elements and shows 2FA section.
         */
        function proceedTo2FA(role, code) {
            currentRole = role;
            expected2FACode = code;
            showMessage('Login successful! Please enter your 2FA code.', true);

            // Hide initial login elements
            loginButton.classList.add('hidden');
            googleLoginButton.classList.add('hidden'); // Hide Google button too
            usernameInput.disabled = true;
            passwordInput.disabled = true;
            roleUserRadio.disabled = true;
            roleDoctorRadio.disabled = true;

            // Show 2FA section
            twoFactorSection.classList.remove('hidden');
            twoFactorCodeInput.focus(); // Focus on the 2FA input field
        }

        // Event listener for initial login form submission (Username/Password)
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const username = usernameInput.value;
            const password = passwordInput.value;
            const selectedRole = document.querySelector('input[name="role"]:checked').value;

            let isAuthenticated = false;
            let twoFACode = '';

            // Simulate initial login logic
            if (selectedRole === 'user') {
                if (username === 'user' && password === 'pass') {
                    isAuthenticated = true;
                    twoFACode = '123456'; // Simulated 2FA code for user
                }
            } else if (selectedRole === 'doctor') {
                if (username === 'doctor' && password === 'secure') {
                    isAuthenticated = true;
                    twoFACode = '654321'; // Simulated 2FA code for doctor
                }
            }

            if (isAuthenticated) {
                proceedTo2FA(selectedRole, twoFACode);
            } else {
                showMessage('Invalid username or password. Please try again.', false);
            }
        });

        // Event listener for Google Login button click
        googleLoginButton.addEventListener('click', function() {
            showMessage('Simulating Google login...', true);

            // Simulate a successful Google login after a short delay
            setTimeout(() => {
                // For demonstration, assume Google login always authenticates as a 'user'
                // and requires 2FA. In a real app, Google's auth might provide role info
                // or bypass 2FA if it's a trusted device/session.
                const simulatedGoogleRole = 'user'; // Or 'doctor' based on your needs
                const simulatedGoogle2FACode = '123456'; // Use user's 2FA code for consistency

                // Disable username/password inputs and role selection
                usernameInput.disabled = true;
                passwordInput.disabled = true;
                roleUserRadio.disabled = true;
                roleDoctorRadio.disabled = true;

                proceedTo2FA(simulatedGoogleRole, simulatedGoogle2FACode);
            }, 1500); // Simulate network delay for Google login
        });


        // Event listener for 2FA code verification
        verifyCodeButton.addEventListener('click', function() {
            const enteredCode = twoFactorCodeInput.value;
            let redirectPath = '';

            if (enteredCode === expected2FACode) {
                if (currentRole === 'user') {
                    redirectPath = 'user_dashboard.html';
                } else if (currentRole === 'doctor') {
                    redirectPath = 'doctor_dashboard.html';
                }
                showMessage('2FA successful! Redirecting...', true);
                console.log(`Simulating redirection to: ${redirectPath}`);
                // window.location.href = redirectPath; // Uncomment to actually redirect
            } else {
                showMessage('Invalid 2FA code. Please try again.', false);
            }
        });
    </script>
</body>
</html>
