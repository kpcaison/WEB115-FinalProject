// Function to validate email address
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to generate the meal plan
function generateMealPlan() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const goal = document.getElementById('goal').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Days of the week
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = {};

    // Collect meal data for each day
    days.forEach(day => {
        meals[day] = {
            breakfast: document.getElementById(`${day.toLowerCase()}Breakfast`).value,
            snack1: document.getElementById(`${day.toLowerCase()}Snack1`).value,
            lunch: document.getElementById(`${day.toLowerCase()}Lunch`).value,
            snack2: document.getElementById(`${day.toLowerCase()}Snack2`).value,
            dinner: document.getElementById(`${day.toLowerCase()}Dinner`).value,
        };
    });

    // Generate meal plan HTML
    const mealPlanHTML = `
        <html>
        <head>
            <title>Meal Plan</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                button {
                    margin: 10px;
                    padding: 10px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <h1>Meal Plan</h1>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Goal: ${goal}</p>
            <table>
                <tr><th>Day</th><th>Meal</th><th>Details</th></tr>
                ${days.map(day => `
                    <tr><td rowspan="5">${day}</td><td>Breakfast</td><td>${meals[day].breakfast}</td></tr>
                    <tr><td>Snack 1</td><td>${meals[day].snack1}</td></tr>
                    <tr><td>Lunch</td><td>${meals[day].lunch}</td></tr>
                    <tr><td>Snack 2</td><td>${meals[day].snack2}</td></tr>
                    <tr><td>Dinner</td><td>${meals[day].dinner}</td></tr>
                `).join('')}
            </table>
            <button onclick="window.print()">Print</button>
            <button onclick="downloadPlan()">Download</button>
        </body>
        </html>
    `;

    // Open a new window and write the meal plan HTML to it
    const newWindow = window.open();
    newWindow.document.open();
    newWindow.document.write(mealPlanHTML);
    newWindow.document.close();

    // Define the downloadPlan function for the new window
    newWindow.downloadPlan = function() {
        const blob = new Blob([newWindow.document.documentElement.outerHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mealPlan.html';
        a.click();
        URL.revokeObjectURL(url);
    };
}

