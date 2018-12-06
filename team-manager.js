var inquirer = require("inquirer")

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

// Master game function
// var teamGame = () => {
// Queries user for player stats
var playerQuestions = () => {
    //Change count to 3
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

playerQuestions()

var gameCount = 1
var teamScore = 0

const playGame = () => {
    //console.log(playerArray);
    if (gameCount < 5) {
        var randomOffense = (Math.floor(Math.random() * 20) + 1)
        var randomDefense = (Math.floor(Math.random() * 20) + 1)
        //console.log(playerArray)
        var playerOffense = playerArray[0].offense + playerArray[1].offense
        var playerDefense = playerArray[0].defense + playerArray[1].defense
        if (randomOffense < playerOffense) {
            teamScore += 1
        }
        if (randomDefense > playerDefense) {
            teamScore -= 1
        }
        //console.log ("\nRandom Offense: " + randomOffense + " Random Defense: " + randomDefense)
       // console.log ("\nPlayer Offense: " + playerOffense + " Player Defense: " + playerDefense)
        console.log("\nGame " + gameCount + " Score: " + teamScore)
        inquirer.prompt([
            {
                type: "confirm",
                name: "substitute",
                message: "Would you like to sub in a player?",
                default: true
            }
        ]).then(function (sub) {
           // console.log(sub.substitute)
            if (sub.substitute) {
                var swapPlayer = (Math.floor(Math.random() * 2))
                //console.log("\nSwap#: " + swapPlayer)
                var a = playerArray[swapPlayer]
                playerArray[swapPlayer] = playerArray[2]
                playerArray[2] = a
                gameCount++
                swapPlayer = 0
                teamStats()
                playGame()
            } else {
                gameCount++
                playGame()
            }
        })
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
        inquirer.prompt([
            {
                type: "confirm",
                name: "play",
                message: "Would you like to play again?",
                default: true
            }
        ]).then(function (sub) {
            if (sub) {
                gameCount = 0;
                teamScore = 0;
                playGame()
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
