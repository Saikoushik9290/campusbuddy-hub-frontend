
// Student Dashboard JavaScript

// Logout functionality
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    }
}

// Chatbot functionality
function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `<p>${message}</p>`;
        messagesContainer.appendChild(userMessage);
        
        // Clear input
        input.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.innerHTML = `<p>${getBotResponse(message)}</p>`;
            messagesContainer.appendChild(botMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Simple bot responses
function getBotResponse(message) {
    const responses = {
        'hello': 'Hello! How can I help you today?',
        'hi': 'Hi there! What would you like to know?',
        'timetable': 'You can check your timetable in the Timetable section of your dashboard!',
        'exam': 'For exam schedules and information, please check the notifications section or contact your faculty.',
        'faculty': 'You can find faculty contact information in the Faculty Contacts section.',
        'library': 'The library is open from 8 AM to 8 PM on weekdays and 9 AM to 5 PM on weekends.',
        'help': 'I can help you with information about timetables, exams, faculty contacts, and general campus queries!',
        'default': 'I\'m here to help! You can ask me about timetables, exams, faculty contacts, or general campus information.'
    };
    
    const lowerMessage = message.toLowerCase();
    for (const key in responses) {
        if (lowerMessage.includes(key)) {
            return responses[key];
        }
    }
    return responses.default;
}

// Allow Enter key to send message
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Download paper functionality
function downloadPaper(filename) {
    // Simulate download
    alert(`Downloading ${filename}...`);
    // In a real application, this would trigger an actual download
    console.log(`Download initiated for: ${filename}`);
}

// Load dashboard data
function loadDashboardData() {
    // This would typically fetch data from a server
    console.log('Loading dashboard data...');
    
    // Simulate loading notifications
    updateNotifications();
    
    // Simulate loading timetable
    updateTimetable();
    
    // Simulate loading faculty contacts
    updateFacultyContacts();
}

// Update notifications
function updateNotifications() {
    // This function would typically fetch new notifications from a server
    console.log('Notifications updated');
}

// Update timetable
function updateTimetable() {
    // This function would check for new timetable uploads
    console.log('Timetable updated');
}

// Update faculty contacts
function updateFacultyContacts() {
    // This function would fetch updated faculty contact information
    console.log('Faculty contacts updated');
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    
    // Add welcome message
    setTimeout(() => {
        const welcomeNotification = document.createElement('div');
        welcomeNotification.className = 'notification-item new';
        welcomeNotification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-star"></i>
            </div>
            <div class="notification-content">
                <h4>Welcome to CampusBuddy!</h4>
                <p>You're now connected to your campus. Check out all the features available to you.</p>
                <span class="notification-time">Just now</span>
            </div>
        `;
        
        const notificationsList = document.getElementById('notificationsList');
        notificationsList.insertBefore(welcomeNotification, notificationsList.firstChild);
    }, 2000);
});

// Add CSS for additional elements via JavaScript
const additionalCSS = `
    .message {
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 12px;
        max-width: 80%;
    }
    
    .user-message {
        background: #4f46e5;
        color: white;
        margin-left: auto;
        text-align: right;
    }
    
    .bot-message {
        background: #f1f5f9;
        color: #1e293b;
    }
    
    .notification-item {
        display: flex;
        align-items: flex-start;
        padding: 1rem;
        border-bottom: 1px solid #e2e8f0;
        transition: background-color 0.3s ease;
    }
    
    .notification-item:hover {
        background: #f8fafc;
    }
    
    .notification-item.new {
        background: #eff6ff;
        border-left: 4px solid #4f46e5;
    }
    
    .notification-icon {
        width: 40px;
        height: 40px;
        background: #4f46e5;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        flex-shrink: 0;
    }
    
    .notification-content h4 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: #1e293b;
    }
    
    .notification-content p {
        color: #64748b;
        margin-bottom: 0.25rem;
    }
    
    .notification-time {
        font-size: 0.75rem;
        color: #94a3b8;
    }
    
    .paper-item, .contact-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #e2e8f0;
        transition: background-color 0.3s ease;
    }
    
    .paper-item:hover, .contact-item:hover {
        background: #f8fafc;
    }
    
    .paper-icon, .contact-avatar {
        width: 40px;
        height: 40px;
        background: #4f46e5;
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        flex-shrink: 0;
    }
    
    .paper-details, .contact-details {
        flex: 1;
    }
    
    .paper-details h4, .contact-details h4 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: #1e293b;
    }
    
    .paper-details p, .contact-details p {
        font-size: 0.875rem;
        color: #64748b;
        margin-bottom: 0.25rem;
    }
    
    .btn-sm {
        padding: 6px 12px;
        font-size: 0.875rem;
    }
    
    .timetable-placeholder {
        text-align: center;
        padding: 3rem 1rem;
        color: #64748b;
    }
    
    .timetable-placeholder i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #cbd5e1;
    }
    
    .small-text {
        font-size: 0.875rem;
        color: #94a3b8;
    }
    
    .user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 500;
        color: #64748b;
    }
`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
