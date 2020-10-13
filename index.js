const generateReadme = require('./utils/generateMarkdown');
const fs = require('fs');
const inquirer = require('inquirer');

// array of questions for user
const questions = [{
        type: 'input',
        name: 'title',
        message: 'Enter the project title: (REQUIRED)',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter a project title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter the project description: (REQUIRED)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter a project description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter the installation instructions: (REQUIRED)',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please enter installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter usage information: (REQUIRED)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please enter usage information!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Enter contribution guidelines: (REQUIRED)',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Please enter contribution information!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'test',
        message: 'Enter test instructions: (REQUIRED)',
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                console.log('Please enter test instructions!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select a license:',
        choices: ['Apache License 2.0', 'GNU GPLv3', 'ISC License', 'MIT License']
    },
    {
        type: 'input',
        name: 'userName',
        message: 'Enter your GitHub username: (REQUIRED)',
        validate: userNameInput => {
            if (userNameInput) {
                return true;
            } else {
                console.log('Please enter a GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address: (REQUIRED)',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter an email address!');
                return false;
            }
        }
    },
];

const promptUser = () => {
    return inquirer.prompt(questions);
}

// function to write README file
function writeToFile(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', data, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Readme file created!'
            })
        })
    })
}

// function to initialize program
function init() {
    promptUser()
        .then(questions => {
            return generateReadme(questions);
        })
        .then(formattedPage => {
            return writeToFile(formattedPage);
        })
        .then(writeFileResponse => {
            console.log(writeFileResponse);
        })
        .catch(err => {
            console.log(err);
        })
}

// function call to initialize program
init();