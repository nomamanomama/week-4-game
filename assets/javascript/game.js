//////////////////////////////////////////////////////////////////////////////////////////////
//
//      STAR WARS RPG
//
//////////////////////////////////////////////////////////////////////////////////////////////


//      VARIABLES
//////////////////////////////////////////////////////////////////////////////////////////////
var playerFighter;
var opponentFighters = [];
var defenderFighter;
var isPlaying = false;


//      OBJECTS
//////////////////////////////////////////////////////////////////////////////////////////////
var Fighter = {
    health: 0,
    baseAttackPower: 0,
    attackPower: 0,
    ctrAttackPower: 0,
    image: "",
    name: "",

};

$(document).ready(function () {

// FUNCTIONS
      // ====================================================================
      // Here we create various on "click" functions which capture the clicks
      // Inside each click event is the code to process fighter selection, attacks, health point adjustments.

//DOM prompt user to press any key to begin
//on key up - initialize game
//create 4 fighters
//initialize health points, attack power, base attack power and counter attack power
$(document).keyup(function () {
});    


//function to display 4 fighters in initial state in the character selection row

//prompt user to select a fighter

//on click handlers for each fighter
$(#).on("click", function () {
}); 
$(#).on("click", function () {
}); 
$(#).on("click", function () {
}); 
$(#).on("click", function () {
}); 

//set Player to fighter selected
//DOM move remaining fighters to enemy area; change background color 
//prompt user to select an opponent to fight
//onclick - set Defender = selected fighter

//DOM move Defender to the defender area

//DOM display "attack" button
//on click of attack button
//DOM play sound
//Defender:health -= Player:attackPower;
//Player:health -= Defender:ctrAttackPower;
//Player:attackPower += baseAttackPower;
//if Defender:health <= 0 Player wins
    //DOM hide Defender
    //prompt user to selectOpponent
//else if Player:health <= 0 Player loses - Game Over

});
