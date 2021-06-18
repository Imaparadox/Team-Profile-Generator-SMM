const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// const inquirer = require('inquirer');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Empty Array
const teamMembersArr = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function createManager() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "managerName",
                message: `What is your name?`
            },
            {
                type: "input",
                name: "managerId",
                message: `What is your id number?`
            },
            {
                type: "input",
                name: "managerEmail",
                message: `What is your email?`
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: `What is your office number?`
            }
        ])
        .then((answers) => {
            const managerObj = new Manager(answers.managerName, answers.managerId, answers.managerEmail,
                answers.managerOfficeNumber)
            teamMembersArr.push(managerObj);

            createTeam();

        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
};

function createTeam() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "teamMemberChoice",
                message: `What team member would you like to add?`,
                choices: ['Engineer', 'Intern', `I don't have any team members to add.`]
            }
        ])
        .then((answer) => {
            switch (answer.teamMemberChoice) {
                case 'Engineer':
                    createEngineer();
                    break;
                case 'Intern':
                    createIntern();
                    break;
                default: buildTeamHtml();
            }
        })

}

function createEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "engineerName",
                message: `What is your name?`
            },
            {
                type: "input",
                name: "engineerId",
                message: `What is your id number?`
            },
            {
                type: "input",
                name: "engineerEmail",
                message: `What is your email?`
            },
            {
                type: "input",
                name: "engineerGithub",
                message: `What is your Github username?`
            }
        ])
        .then((answers) => {
            const engineerObj = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembersArr.push(engineerObj);
            createTeam();

        })
}

function createIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "internName",
                message: `What is your name?`
            },
            {
                type: "input",
                name: "internId",
                message: `What is your id number?`
            },
            {
                type: "input",
                name: "internEmail",
                message: `What is your email?`
            },
            {
                type: "input",
                name: "internGithub",
                message: `What is your Github username?`
            }
        ])
        .then((answers) => {
            const internObj = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internGithub)
            teamMembersArr.push(internObj);
            createTeam();
        })
}

function buildTeamHtml() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembersArr), 'utf8')
}

createManager();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
