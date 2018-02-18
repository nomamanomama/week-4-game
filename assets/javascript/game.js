//////////////////////////////////////////////////////////////////////////////////////////////
//
//      STAR WARS RPG
//
//////////////////////////////////////////////////////////////////////////////////////////////
//all game code goes inside the doc.ready function
$(document).ready(function () {
    console.log("document is ready");
    $("#gameboard").hide();

//      VARIABLES
//////////////////////////////////////////////////////////////////////////////////////////////
//fighter arrays
var playerFighter=[];
var opponentFighters = [];
var defenderFighter=[];
//game state flags
var gameStarted = false;
var isPlaying = false;
var battleReady = false;
var gameOver = false;
var wonGame = false;


//      OBJECTS
//////////////////////////////////////////////////////////////////////////////////////////////
function Fighter(name, id, image) {
    this.health = getRandom(100, 200);
    this.baseAttackPower= getRandom(5, 25);
    this.attackPower= getRandom(5, 25);
    this.ctrAttackPower= getRandom(15, 30);
    this.image = image;
    this.name = name;
    this.id=id;
};

//create 4 fighters
//initialize health points, attack power, base attack power and counter attack power
var lukeFighter = new Fighter("Luke Skywalker","lukeCard","./assets/images/luke.jpg");

var obiFighter = new Fighter("Obi-Wan Kenobi", "obiCard", "./assets/images/obi1.jpg");

var darthFighter = new Fighter("Darth Vader", "darthCard", "./assets/images/darth.jpg");

var hanFighter = new Fighter("Han Solo", "hanCard", "./assets/images/han.jpg");

//create array to hold all fighters
var allFighters = [lukeFighter, obiFighter, darthFighter, hanFighter];

// FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////
      // ====================================================================
      // Here we create various on "click" functions which capture the clicks

//utility function to generate a random number between a specified range      
function getRandom(low, high) {
    return (Math.floor(Math.random() * high) + low);
}

//function to initialize game to starting state
function gameInit()
{
    playerFighter = [];
    opponentFighters = [];
    defenderFighter = [];
    gameOver = false;
    wonGame = false;
    isPlaying = false;
    battleReady = false;
    emptyAllFighterBoxes();
    //reset health and attack power
    resetFighters();
    //display all 4 characters in the top section of the gameboard
    displayFighterCards("#fighterBox",allFighters);
}

function resetFighters()
{
    for (var i = 0; i < allFighters.length; i++){
        allFighters[i].health = getRandom(50, 120);
        allFighters[i].attackPower= getRandom(5, 15);
        allFighters[i].baseAttackPower = allFighters[i].attackPower;
        allFighters[i].ctrAttackPower= getRandom(5, 30);
    }
}

//function to display 4 fighters in specified html container in the character selection row
function displayFighterCards (boxName,fighterArray)
{
    console.log("Adding " + fighterArray + " to " + boxName);
    var bgcolor;
    switch (boxName) {
        case "#enemiesBox": 
            bgcolor = "#ff0000";
            break;
        case "#defenderBox":
            bgcolor = "#00ff00";
            break;
        default://default is fighterBox with white background
            bgcolor="#ffffff";
            break;
    }
    console.log("loop through array " + fighterArray.length + " times");
    for (var i= 0; i<fighterArray.length; i++)
    {   
        //get fighter object from the array
        var fighter = fighterArray[i];
        console.log("adding fighter " + fighter.name + " to " + boxName);

        //build a card div with class .fighterCard 
        var fighterDiv = $("<div>").addClass("card fighterCard align-content-center");
        fighterDiv.attr('id', fighter.id);
        fighterDiv.css('background-color', bgcolor);
        console.log ("card built for fighter with id:" + fighterDiv.attr('id'));
        //append fighterCard to box for display
        $(boxName).append(fighterDiv);
        
        //build card contents
        //build card title div
        var fighterNameDiv = $("<div>").addClass("card-title fighterName").text(fighter.name);
        //build card pic div
        var fighterPicDiv = $("<div>").addClass("fighterPic").html('<img src="' + fighter.image + '" alt="' + fighter.name +'">' );
        console.log('adding pic: <img src="' + fighter.image + '" alt="' + fighter.name + '">');
        //build health div
        var fighterHealthDiv = $("<div>").addClass("card-subtitle fighterHealth").text(fighter.health);

        //append card contents to fighter card
        fighterDiv.append(fighterNameDiv);
        fighterDiv.append(fighterPicDiv);
        fighterDiv.append(fighterHealthDiv); 
        
    }console.log("finished adding fighters to " + boxName);
}

function emptyAllFighterBoxes()
{
    console.log("clear all fighter boxes");
    emptyFighterBox("#fighterBox");
    emptyFighterBox("#enemiesBox");
    emptyFighterBox("#defenderBox");
}

function emptyFighterBox(boxName) {
    console.log("clear " + boxName);
    $(boxName).empty();
}

// GAME HANDLERS
//////////////////////////////////////////////////////////////////////////////////////////////

    //DOM prompt user to press any key to begin
    $("#messageBar").text("Press any key to begin.");
    $("#messageBar").show();

    //on key up - initialize game
    $("#start").on("click",function () {
        if (!gameStarted){
            console.log("keyup event - start game");
            gameStarted = true;

            $(".star").hide();
            $(".wars").hide();
            $("#start").hide();
            $("#gameboard").show();
            
            //display fighters
            gameInit();

            //prompt user to select a fighter
            $("#messageBar").text("Select your character.");
        } 
    });   
    

    // delegate fighterCard class click event b/c they were created dynamically
    // on click handler will process fighter selection
    //get the 'id' attribute to determine which fighter was clicked
    $(".card-deck").on("click",".fighterCard", function () {
        var fighterID = $(this).attr('id');
        console.log("figher card clicked for id: " + fighterID);
        //if game is not in progress, player has selected their character
        if (!isPlaying){
            //flip the isPlaying flag - game in progress
            isPlaying = true;
            //player has selected their character
            switch(fighterID) {
                case 'lukeCard':
                    playerFighter = [lukeFighter];
                    opponentFighters = [obiFighter,darthFighter,hanFighter];
                    break;
                case 'obiCard':
                    playerFighter = [obiFighter];
                    opponentFighters = [lukeFighter, darthFighter, hanFighter];
                    break;
                case 'darthCard':
                    playerFighter = [darthFighter];
                    opponentFighters = [lukeFighter, obiFighter, hanFighter];
                    break;
                case 'hanCard':
                    playerFighter = [hanFighter];
                    opponentFighters = [lukeFighter, obiFighter, darthFighter];
                    break;
            }
            
            //display your character and move all others to opponents box
            emptyAllFighterBoxes();
            displayFighterCards("#fighterBox",playerFighter);
            displayFighterCards("#enemiesBox", opponentFighters);
            
            //prompt user to select an opponent to fight
            $("#messageBar").text("Select an opponent to fight.");
        }
        //onclick - set Defender = selected fighter
        else if(defenderFighter.length===0 && (fighterID != playerFighter.id)){
            switch (fighterID) {
                case 'lukeCard':
                    defenderFighter = [lukeFighter];
                    break;
                case 'obiCard':
                    defenderFighter = [obiFighter];
                    break;
                case 'darthCard':
                    defenderFighter = [darthFighter];
                    break;
                case 'hanCard':
                    defenderFighter = [hanFighter];
                    break;
            }
            //remove defender from opponent array
            var array = [];
            for(var i=0; i<opponentFighters.length; i++){
                if (defenderFighter[0] !== opponentFighters[i])
                {
                    array.push(opponentFighters[i]);
                }
            }
            opponentFighters = array;

            //DOM move Defender to the defender area
            emptyFighterBox("#enemiesBox");
            emptyFighterBox("#defenderBox");
            displayFighterCards("#enemiesBox",opponentFighters);
            displayFighterCards("#defenderBox",defenderFighter);
            
            //display a message to player to attack
            $("#messageBar").text("Click the attack button to fight the defender. May the force be with you!");
            battleReady = true;
        }   
    });

    //attacks button handler calculates health point adjustments and evaluate game over.
    //on click of attack button
    $("#attack").on("click", function () {
        if(battleReady && defenderFighter.length > 0){ // don't process until two fighters are selected 
            console.log("attack button clicked");
            defender = defenderFighter[0];
            player = playerFighter[0];
            //DOM play sound
            //Defender:health -= Player:attackPower;
            defender.health -= player.attackPower;
            //Player:health -= Defender:ctrAttackPower;
            player.health -= defender.ctrAttackPower;
            
            $("#messageBar").animate({ top: "-=600px" }, "normal");
            $("#messageBar").animate({ right: "+=150px"}, "normal");
            $("#messageBar").html("You attacked " + defender.name + " with " + player.attackPower + " attack power. <br>" + defender.name + " attacked you with " + defender.ctrAttackPower + " attack power." );
            
            //update fighterCards health
            $("#" + player.id).find(".fighterHealth").text(player.health);
            $("#" + defender.id).find(".fighterHealth").text(defender.health);

            //Player:attackPower += baseAttackPower;
            player.attackPower += player.baseAttackPower;
            
            //if Defender:health <= 0 Player wins
            if (defender.health <= 0)
            {
                //reset defender array
                defenderFighter=[];
                //DOM hide Defender
                emptyFighterBox("#defenderBox");
                //if opponentFighters is not empty, prompt user to select another opponent
                if(opponentFighters.length!==0)
                {
                    //prompt user to select an opponent to fight
                    $("#messageBar").text("You defeated " + defender.name + " Select another opponent to fight.");
                }
                else { //game over you win
                    wonGame = true;
                    isPlaying = false;
                    gameOver = true;
                    battleReady = false;
                    gameStarted = false;
                    //display winner message.
                    $("#messageBar").html("You defeated all of your opponents. The force was with you!");
                }

            } else if(playerFighter[0].health <= 0) { //else if Player:health <= 0 Player loses - Game Over
                emptyFighterBox("#fighterBox");
                wonGame = false;
                isPlaying = false;
                gameOver = true;
                battleReady = false;
                gameStarted = false;
                //display loser message.
                $("#messageBar").text("You have been defeated.");
            }
           if(gameOver)
               $("#start").show();
            
        }
    });

});


