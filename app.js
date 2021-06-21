//Global scope variables
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//Output directory
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//Creates HTML
const render = require("./lib/htmlRenderer");

//Empty Array
const teamMembersArr = [];

//Prompts user for information 
function createManager() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "managerName",
                message: `What is your manager's name?`
            },
            {
                type: "input",
                name: "managerId",
                message: `What is your manager's id number?`
            },
            {
                type: "input",
                name: "managerEmail",
                message: `What is your manager's email?`,
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/)
                    if (pass) {
                        return true;
                    } return "Enter a valid email address";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: `What is your manager's office number?`
            }
        ])
        .then((answers) => {
            const managerObj = new Manager(answers.managerName, answers.managerId, answers.managerEmail,
                answers.managerOfficeNumber)
            teamMembersArr.push(managerObj);

            createTeam();

        });
};
//Prompts user for information 
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
            };
        });
};
//Prompts user for information 
function createEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "engineerName",
                message: `What is your engineer's name?`
            },
            {
                type: "input",
                name: "engineerId",
                message: `What is your engineer's id number?`
            },
            {
                type: "input",
                name: "engineerEmail",
                message: `What is your engineer's email?`,
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/)
                    if (pass) {
                        return true;
                    } return "Enter a valid email address";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: `What is your engineer's Github username?`
            }
        ])
        .then((answers) => {
            const engineerObj = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembersArr.push(engineerObj);
            createTeam();
        });
};
//Prompts user for information 
function createIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "internName",
                message: `What is your intern's name?`
            },
            {
                type: "input",
                name: "internId",
                message: `What is your intern's id number?`
            },
            {
                type: "input",
                name: "internEmail",
                message: `What is your intern's email?`,
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/)
                    if (pass) {
                        return true;
                    } return "Enter a valid email address";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: `Which school did your intern attend?`
            }
        ])
        .then((answers) => {
            const internObj = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembersArr.push(internObj);
            createTeam();
        });
};
//Propagate HTML page based on user inputs
function buildTeamHtml() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembersArr), 'utf8');
};
//Calls the function that creates the manager information
createManager();
