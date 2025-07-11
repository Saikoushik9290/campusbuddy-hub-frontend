
// Admin Dashboard JavaScript

// Logout functionality
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    }
}

// Tab functionality
function showAdminTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.admin-tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Hide all tab buttons
    const tabButtons = document.querySelectorAll('.admin-tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Activate corresponding button
    event.target.classList.add('active');
}

// File input trigger
function triggerFileInput(inputId) {
    document.getElementById(inputId).click();
}

// Form submission handlers
function uploadNews(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.querySelector('input[type="text"]').value;
    const content = form.querySelector('textarea').value;
    const priority = form.querySelector('select').value;
    
    // Simulate upload
    alert(`News "${title}" published successfully!`);
    
    // Add to news list
    addNewsItem(title, content, priority);
    
    // Reset form
    form.reset();
}

function uploadFaculty(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const name = form.querySelector('input[placeholder="Enter faculty name"]').value;
    const department = form.querySelector('input[placeholder="Enter department"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const email = form.querySelector('input[type="email"]').value;
    
    // Simulate upload
    alert(`Faculty contact for ${name} added successfully!`);
    
    // Add to faculty list
    addFacultyItem(name, department, phone, email);
    
    // Reset form
    form.reset();
}

function uploadTimetable(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.querySelector('input[placeholder*="Timetable"]').value;
    const year = form.querySelector('input[placeholder*="2024-2025"]').value;
    const file = form.querySelector('input[type="file"]').files[0];
    
    if (!file) {
        alert('Please select a file to upload');
        return;
    }
    
    // Simulate upload
    alert(`Timetable "${title}" uploaded successfully!`);
    
    // Add to timetable list
    addTimetableItem(title, year);
    
    // Reset form
    form.reset();
}

function uploadPaper(event) {
    event.preventDefault();
    const form = event.target;
    const subject = form.querySelector('input[placeholder*="Mathematics"]').value;
    const examType = form.querySelector('select').value;
    const year = form.querySelector('input[type="number"]').value;
    const file = form.querySelector('input[type="file"]').files[0];
    
    if (!file) {
        alert('Please select a file to upload');
        return;
    }
    
    // Simulate upload
    alert(`Question paper for ${subject} uploaded successfully!`);
    
    // Add to papers list
    addPaperItem(subject, examType, year);
    
    // Reset form
    form.reset();
}

// Add items to lists
function addNewsItem(title, content, priority) {
    const newsList = document.getElementById('newsList');
    const newsItem = document.createElement('div');
    newsItem.className = 'uploaded-item';
    newsItem.innerHTML = `
        <div class="item-info">
            <h5>${title}</h5>
            <p>${content.substring(0, 100)}...</p>
            <span class="item-meta">Published just now | Priority: ${priority}</span>
        </div>
        <div class="item-actions">
            <button class="btn btn-outline btn-sm" onclick="editItem('news', ${Date.now()})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-outline btn-sm" onclick="deleteItem('news', ${Date.now()})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    newsList.insertBefore(newsItem, newsList.firstChild);
}

function addFacultyItem(name, department, phone, email) {
    const facultyList = document.getElementById('facultyList');
    const facultyItem = document.createElement('div');
    facultyItem.className = 'uploaded-item';
    facultyItem.innerHTML = `
        <div class="item-info">
            <h5>${name}</h5>
            <p>${department} | ${phone}</p>
            <span class="item-meta">${email}</span>
        </div>
        <div class="item-actions">
            <button class="btn btn-outline btn-sm" onclick="editItem('faculty', ${Date.now()})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-outline btn-sm" onclick="deleteItem('faculty', ${Date.now()})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    facultyList.insertBefore(facultyItem, facultyList.firstChild);
}

function addTimetableItem(title, year) {
    const timetableList = document.getElementById('timetableList');
    const timetableItem = document.createElement('div');
    timetableItem.className = 'uploaded-item';
    timetableItem.innerHTML = `
        <div class="item-info">
            <h5>${title}</h5>
            <p>Academic Year ${year}</p>
            <span class="item-meta">Uploaded just now</span>
        </div>
        <div class="item-actions">
            <button class="btn btn-outline btn-sm" onclick="viewItem('timetable', ${Date.now()})">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-outline btn-sm" onclick="deleteItem('timetable', ${Date.now()})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    timetableList.insertBefore(timetableItem, timetableList.firstChild);
}

function addPaperItem(subject, examType, year) {
    const papersList = document.getElementById('papersList');
    const paperItem = document.createElement('div');
    paperItem.className = 'uploaded-item';
    paperItem.innerHTML = `
        <div class="item-info">
            <h5>${subject} ${examType}</h5>
            <p>Year: ${year} | Type: ${examType}</p>
            <span class="item-meta">Uploaded just now</span>
        </div>
        <div class="item-actions">
            <button class="btn btn-outline btn-sm" onclick="viewItem('paper', ${Date.now()})">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-outline btn-sm" onclick="deleteItem('paper', ${Date.now()})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    papersList.insertBefore(paperItem, papersList.firstChild);
}

// Item actions
function editItem(type, id) {
    alert(`Edit ${type} item ${id} - This would open an edit form in a real application`);
}

function deleteItem(type, id) {
    if (confirm(`Are you sure you want to delete this ${type} item?`)) {
        // Find and remove the item
        event.target.closest('.uploaded-item').remove();
        alert(`${type} item deleted successfully!`);
    }
}

function viewItem(type, id) {
    alert(`View ${type} item ${id} - This would open a preview in a real application`);
}

// File input change handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle file input changes
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const uploadArea = e.target.parentElement;
                const fileName = file.name;
                const fileSize = (file.size / 1024 / 1024).toFixed(2);
                
                uploadArea.innerHTML = `
                    <i class="fas fa-file-check"></i>
                    <p><strong>${fileName}</strong></p>
                    <p class="small-text">Size: ${fileSize} MB</p>
                    <p class="small-text">Click to change file</p>
                `;
                
                // Re-add the file input
                const newInput = document.createElement('input');
                newInput.type = 'file';
                newInput.id = input.id;
                newInput.accept = input.accept;
                newInput.style.display = 'none';
                uploadArea.appendChild(newInput);
                
                // Re-add event listener
                newInput.addEventListener('change', arguments.callee);
            }
        });
    });
});

// Add CSS for admin-specific elements
const adminCSS = `
    .admin-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 1rem;
    }
    
    .admin-tab-btn {
        padding: 12px 20px;
        border: none;
        background: transparent;
        color: #64748b;
        cursor: pointer;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .admin-tab-btn:hover {
        background: #f1f5f9;
        color: #1e293b;
    }
    
    .admin-tab-btn.active {
        background: #4f46e5;
        color: white;
    }
    
    .admin-tab-content {
        display: none;
    }
    
    .admin-tab-content.active {
        display: block;
    }
    
    .upload-form {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .form-group {
        margin-bottom: 1rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #1e293b;
    }
    
    .form-group input,
    .form-group textarea,
    .form-group select {
        width: 100%;
        padding: 12px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-family: inherit;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        outline: none;
        border-color: #4f46e5;
    }
    
    .uploaded-items {
        margin-top: 2rem;
    }
    
    .uploaded-items h4 {
        margin-bottom: 1rem;
        color: #1e293b;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .uploaded-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        margin-bottom: 1rem;
        background: #f8fafc;
        transition: all 0.3s ease;
    }
    
    .uploaded-item:hover {
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .item-info {
        flex: 1;
    }
    
    .item-info h5 {
        margin-bottom: 0.5rem;
        color: #1e293b;
        font-weight: 600;
    }
    
    .item-info p {
        color: #64748b;
        margin-bottom: 0.25rem;
    }
    
    .item-meta {
        font-size: 0.875rem;
        color: #94a3b8;
    }
    
    .item-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-sm {
        padding: 6px 12px;
        font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
        .admin-tabs {
            flex-wrap: wrap;
        }
        
        .admin-tab-btn {
            font-size: 0.875rem;
            padding: 10px 15px;
        }
        
        .uploaded-item {
            flex-direction: column;
            gap: 1rem;
        }
        
        .item-actions {
            align-self: flex-end;
        }
    }
`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = adminCSS;
document.head.appendChild(style);
