const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Route for serving the index page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route for serving the donate page
app.get('/donate', (req, res) => {
    res.sendFile(__dirname + '/public/donate.html');
});

// Route for handling form submissions from donate.html
app.post('/submit', (req, res) => {
    const { name, age, gender, bloodtype, city, mobile } = req.body;
    const data = `${name},${age},${gender},${bloodtype},${city},${mobile}\n`;
    console.log(data);
    fs.appendFile('donations.txt', data, (err) => {
        if (err) {
            console.error('Error writing to donations.csv:', err);
            return res.status(500).send('An error occurred while processing your donation. Please try again later.');
        }
        console.log('Data saved to donations.csv');
        res.send('Thank you for your donation! \n We will contact you when needed.');
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
