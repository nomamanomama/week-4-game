//////////////////////////////////////////////////////////////////////////////////////////////
//
//      STAR WARS RPG
//
//////////////////////////////////////////////////////////////////////////////////////////////


//      VARIABLES
//////////////////////////////////////////////////////////////////////////////////////////////
//fighters
var fighters = ["#lukeCard","#obiCard","#darthCard","#hanCard"];
var playerFighter=[];
var opponentFighters = [];
var defenderFighter=[];
//flags
var isPlaying = false;
var gameOver = false;
var wonGame = false;
var battleReady = false;

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

var allFighters = [lukeFighter, obiFighter, darthFighter, hanFighter];

// FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////
      // ====================================================================
      // Here we create various on "click" functions which capture the clicks
function getRandom(low, high) {
    return (Math.floor(Math.random() * low) + high);
}

//function to initialize game to starting state
function gameInit()
{
    playerFighter = [];
    opponentFighters = [];
    defenderFighter = [];
    isPlaying = false;
    gameOver = false;
    wonGame = false;
    battleReady = false;
    emptyAllFighterBoxes();
    //display all 4 characters in the top section of the gameboard
    displayFighterCards("#fighterBox",allFighters);
}

//function to display 4 fighters in initial state in the character selection row
function displayFighterCards (boxName,fighterArray)
{
    console.log("Display " + boxName);
    var bgcolor;
    switch (boxName) {
        case "#enemiesBox": 
            bgcolor = "#ff0000";
            break;
        case "#defenderBox":
            bgcolor = "#00ff00";
            break;
        //default is fighterBox at top
        default:
            bgcolor="#ffffff";
            break;
    }
    console.log("loop through array " + fighterArray.length + " times");
    for (var i= 0; i<fighterArray.length; i++)
    {   
        console.log("adding fighter " + i + " to " + boxName);
        var fighter = fighterArray[i];
        //build card title, pic and health elements
        var fighterNameDiv = $("<div>").addClass("card-title fighterName").text(fighter.name);
        //build card pic div
        var fighterPicDiv = $("<div>").addClass("fighterPic").html('<img src="' + fighter.image + '" alt="' + fighter.name +'">' );
        console.log('<img src="' + fighter.image + '" alt="' + fighter.name + '">');
        //build health div
        var fighterHealthDiv = $("<div>").addClass("card-subtitle fighterHealth").text(fighter.health);

        //build fighterCard 
        var fighterDiv = $("<div>").addClass("card fighterCard align-content-center");
        fighterDiv.attr('id', fighter.id);
        fighterDiv.css('background-color',bgcolor);
        console.log (fighterDiv.attr('id'));

        //append card elements to fighter card
        fighterDiv.append(fighterNameDiv);
        fighterDiv.append(fighterPicDiv);
        fighterDiv.append(fighterHealthDiv); 
        
        //append fighterCard to box for display
        $(boxName).append(fighterDiv);
        
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
//all game code goes inside the doc.ready function
$(document).ready(function () {

    //DOM prompt user to press any key to begin
    $("#messageBar").text("Press any key to begin.");
    $("#messageBar").show();

    //on key up - initialize game
    $(document).keyup(function () {
        if (!isPlaying){
            isPlaying = true;

            $(".star").hide();
            $(".war").hide();
            $(".byline").hide();
            $(".gameboard").show();
            
            //display fighters
            gameInit();

            //prompt user to select a fighter
            $("#messageBar").text("Select your character.");
        }
    });    

    // fighterCard click event handler to process fighter selection
    //on click handlers for each fighter
    $(".fighterCard").on("click", function () {
        console.log("figher card clicked");
        var fighterID = $(this).attr('id');
        //if game is not in progress, player has selected their character
        if (!isPlaying){
            //flip the isPlaying flag - game in progress
            isPlaying = true;
            //player has selected their character
            switch(fighterID) {
                case '#lukeCard':
                    playerFighter = [lukeFighter];
                    opponentFighters = [obiFighter,darthFighter,hanFighter];
                    break;
                case '#obiCard':
                    playerFighter = [obiFighter];
                    opponentFighters = [lukeFighter, darthFighter, hanFighter];
                    break;
                case '#darthCard':
                    playerFighter = [darthFighter];
                    opponentFighters = [lukeFighter, obiFighter, hanFighter];
                    break;
                case '#hanCard':
                    playerFighter = [hanFighter];
                    opponentFighters = [lukeFighter, obiFighter, darthFighter];
                    break;
            }
            
            //display your character and move all others to opponents box
            emptyAllFighterBoxes;
            displayFighterCards("#fighterBox",playerFighter);
            displayFighterCards("#enemiesBox", opponentFighters);
            
            //prompt user to select an opponent to fight
            $("#messageBar").text("Select an opponent to fight.");
        }
        //onclick - set Defender = selected fighter
        else if(defenderFighter.empty() && (fighterID != playerFighter.id)){
            switch (fighterID) {
                case '#lukeCard':
                    defenderFighter = [lukeFighter];
                    break;
                case '#obiCard':
                    defenderFighter = [obiFighter];
                    break;
                case '#darthCard':
                    defenderFighter = [darthFighter];
                    break;
                case '#hanCard':
                    defenderFighter = [hanFighter];
                    break;
            }
            //remove defender from opponent array
            opponentFighters.splice(opponentFighters.indexOf(defenderFighter),1);
            
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
        if(battleReady){ // don't process until two fighters are selected 
            console.log("attack button clicked");
            //DOM play sound
            //Defender:health -= Player:attackPower;
            defenderFighter[0].health -= playerFighter[0].attackPower;
            //Player:health -= Defender:ctrAttackPower;
            playerFighter[0].health -= defenderFighter[0].ctrAttackPower;
            
            
            $("#messageBar").html("You attacked " + defenderFighter[0].name + " with " + playerFighter[0].attackPower + " attack power. <br>" + defenderFighter[0].name + " attacked you with " + defenderFighter[0].ctrAttackPower + " ." );
            
            //if Defender:health <= 0 Player wins
            if (defenderFighter[0].health <= 0)
            {
                //DOM hide Defender
                emptyFighterBox("#defenderBox");
                //if opponentFighters is not empty, prompt user to select another opponent
                if(!opponentFighters.empty())
                {
                    //prompt user to select an opponent to fight
                    $("#messageBar").text("Select an opponent to fight.");
                }
                else { //game over you win
                    wonGame = true;
                    isPlaying = false;
                    gameOver = true;
                    battleReady = false;
                    //display winner message.
                    $("#messageBar").text("You defeated all of your opponents. The force was with you! <br> Press any key to play again.");
                }

                //Player:attackPower += baseAttackPower;
                playerFighter[0].attackPower += playerFighter.baseAttackPower;

            } else if(playerFighter[0].health <= 0) { //else if Player:health <= 0 Player loses - Game Over
                emptyFighterBox("#fighterBox");
                wonGame = false;
                isPlaying = false;
                gameOver = true;
                battleReady = false;
                //display loser message.
                $("#messageBar").text("You have been defeated. Gather your strength and press any key to play again.");
            }
        }
    });

});


