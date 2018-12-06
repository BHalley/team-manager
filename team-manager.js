// Dependency for inquirer npm package
var inquirer = require("inquirer")

// Constructor to create Players
class Player {
    constructor(name, position, offense, defense) {
        this.name = name,
            this.position = position,
            this.offense = offense,
            this.defense = defense
        this.goodGame = () => {
            if (Math.floor(Math.random() * 2) == 0) {
                this.offense += 1
            } else {
                this.defense += 1
            }
        }
        this.badGame = () => {
            if (Math.floor(Math.random() * 2) == 0) {
                this.offense -= 1
            } else {
                this.defense -= 1
            }
        }
        this.printStats = () => {
            console.log("Name: " + this.name + "\nPosition: " + this.position +
                "\nOffense: " + this.offense + "\nDefense: " + this.defense)
            console.log("---------------")
        }
    }
}

// Tracks times inquirer questions are looped
var playerCount = 0
// Creating array to store player info
var playerArray = []

// Queries user for player stats
var playerQuestions = () => {
    if (playerCount < 3) {
        console.log("\nNEW PLAYER")
        inquirer.prompt([
            {
                name: "name",
                message: "What is your player's name?"
            }, {
                name: "position",
                message: "What is your player's position?"
            }, {
                name: "offense",
                message: "What is your player's offense level (between 0-10)?"
            }, {
                name: "defense",
                message: "What is your player's defense level (between 0-10)?"
            }
        // Passes user input to constructor
        ]).then(function (answers) {
            var newPlayer = new Player(
                answers.name,
                answers.position,
                +answers.defense,
                +answers.offense
            )
            playerArray.push(newPlayer)
            playerCount++
            playerQuestions()
        })
    } else {
        teamStats()
        playGame()
    }
}

// Calls playerQuestions function to begin program
playerQuestions()

// Counts games played, beginning with game 1
var gameCount = 1
// Tracks game score
var teamScore = 0

// Function to run game
const playGame = () => {
    if (gameCount < 5) {
        // Randomizes opposing team offense and defense
        var randomOffense = (Math.floor(Math.random() * 20) + 1)
        var randomDefense = (Math.floor(Math.random() * 20) + 1)
        // Sums user team offense and defense
        var playerOffense = playerArray[0].offense + playerArray[1].offense
        var playerDefense = playerArray[0].defense + playerArray[1].defense
        // Adjusts game scores
        if (randomOffense < playerOffense) {
            teamScore += 1
        }
        if (randomDefense > playerDefense) {
            teamScore -= 1
        }
        console.log("\nGame " + gameCount + " Score: " + teamScore)
        // Queries user to sub in benched player
        inquirer.prompt([
            {
                type: "confirm",
                name: "substitute",
                message: "Would you like to sub in a player?",
                default: true
            }
        ]).then(function (sub) {
            if (sub.substitute) {
                var swapPlayer = (Math.floor(Math.random() * 2))
                var a = playerArray[swapPlayer]
                playerArray[swapPlayer] = playerArray[2]
                playerArray[2] = a
                // Resets random number in swapPlayer and prints team (showing which player was swapped)
                swapPlayer = 0
                teamStats()
                // Iterates game # and loops
                gameCount++
                playGame()
            } else {
                gameCount++
                playGame()
            }
        })
    // Adjusts active player stats depending on game win or loss
    } else {
        if (teamScore > 0) {
            playerArray[0].goodGame()
            playerArray[1].goodGame()
            console.log("\nCongratulations, you won!")
            teamStats()
        } else if (teamScore < 0) {
            playerArray[0].badGame()
            playerArray[1].badGame()
            console.log("\nDarn, you lost.")
            teamStats()
        } else {
            console.log("\nYou tied!")
        }
        // Queries user if they would like to play again with the same team
        inquirer.prompt([
            {
                type: "confirm",
                name: "play",
                message: "Would you like to play your team again?",
                default: true
            }
        // Resets counters and calls playGame function
        ]).then(function (sub) {
            if (sub) {
                gameCount = 0;
                teamScore = 0;
                playGame()
            // Ends game
            } else {
                console.log("\nThanks for playing!")
            }
        })
    }
}

// Helper function for printing team stats
const teamStats = () => {
    console.log("\nTEAM MEMBERS")
    for (var x = 0; x < playerArray.length; x++) {
        playerArray[x].printStats()
    }
}
