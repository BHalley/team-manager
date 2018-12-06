**Console game using constructors and user input to create and manage a team of players.**

* Allows the user to create 3 unique players; 2 starters and a sub.Take user input for name, position, offense, and defense of each player.

  * Once all of the players have been created, prints their stats.

  * Function called "playGame" runs after all players have been created does the following:

   * Run 5 times. Each time the function runs:
     * Two random numbers between 1 and 20 are rolled and compared against the starters' offensive and defensive stats
      * If the first number is lower than the sum of the team's offensive stat, add one point to the team's score.
      * If the second number is higher than the sum of the team's defensive stat, remove one point from the team's score.
   * After the score has been changed, user is prompted to allow them to substitute 1 player from within the starters array with the   player from within the subs array.
  * After the game has finished (been run 5 times):
    * If the score is positive, runs `goodGame` for all of the players currently within the starters array.
    * If the score is negative, runs `badGame` for all of the players currently within the starters array.
    * If the score is equal to zero, do nothing with the starters.
    * Gives the user a message about if they won, and the status of their starters.
    * After printing the results, asks the user if they would like to play again.
      * Runs `playGame` from the start once more if they do.
      * Ends the program if they don't.
