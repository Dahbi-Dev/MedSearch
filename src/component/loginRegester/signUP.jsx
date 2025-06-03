import React, { useState } from 'react';

const SignUp = () => {
    // State variables for form inputs
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('user'); // New state for selected role, default to 'user'

    // State variables for the message box
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [showMessageBox, setShowMessageBox] = useState(false);

    /**
     * Displays a message in a floating box.
     * @param {string} msg - The message to display.
     * @param {boolean} isSuccess - True for success message (green), false for error (red).
     */
    const showMessage = (msg, isSuccess) => {
        setMessage(msg);
        setIsSuccessMessage(isSuccess);
        setShowMessageBox(true);
        // Hide the message after 3 seconds
        setTimeout(() => {
            setShowMessageBox(false);
            setMessage(''); // Clear message after hiding
        }, 3000);
    };

    /**
     * Handles the submission of the sign-up form.
     * @param {Object} event - The form submission event.
     */
    const handleSignUpSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Basic validation
        if (!fullName || !email || !password || !confirmPassword) {
            showMessage('Please fill in all fields.', false);
            return;
        }

        // Validate if passwords match
        if (password !== confirmPassword) {
            showMessage('Passwords do not match. Please try again.', false);
            return;
        }

        // Simulate registration logic
        // In a real application, you would send this data to a backend API
        console.log('Attempting to register new user:');
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Password:', password); // In a real app, never log raw password!
        console.log('Role:', selectedRole); // Log the selected role

        showMessage('Registration successful! You can now log in.', true);

        // Optionally clear the form after successful registration
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSelectedRole('user'); // Reset role to default

        // In a real application, you might redirect to the login page
        // or automatically log the user in.
        // For example: navigate('/login');
    };

    return (
        // The main container for the sign-up page, applying the gradient background
        <div className="min-h-screen flex items-center justify-center p-4"
             style={{ background: 'linear-gradient(to right, #a7f3d0, #bfdbfe)' }}>

            {/* Message Box for displaying success or error messages */}
            <div className={`message-box ${showMessageBox ? 'show' : ''} ${isSuccessMessage ? 'success' : ''}`}>
                {message}
            </div>

            {/* Sign-up form container with muted background */}
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>

                <form onSubmit={handleSignUpSubmit} className="space-y-6">
                    {/* Full Name Input */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>

                    {/* Role Selection (User/Doctor) - NEW */}
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="roleUser"
                                name="role"
                                value="user"
                                checked={selectedRole === 'user'}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded-full"
                            />
                            <label htmlFor="roleUser" className="ml-2 block text-sm font-medium text-gray-700">User</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="roleDoctor"
                                name="role"
                                value="doctor"
                                checked={selectedRole === 'doctor'}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded-full"
                            />
                            <label htmlFor="roleDoctor" className="ml-2 block text-sm font-medium text-gray-700">Doctor</label>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-lg"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
