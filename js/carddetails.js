/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var char = new Array();
var en = new Array();
var co = new Array();
var hint = new Array();
var buyable = new Array();

char[1] = {type: "neut", title: "Ardent Recruit", trait: "Basic Unit", dmg: 6, hp: 6, text: "Before Combat:<br>Lower this enemy's Attack by 1.", perc: 50, cost: 20};
char[2] = {type: "neut", title: "Elven Assassin", trait: "Warrior Hero", dmg: 10, hp: 24, text: "When Discarded:<br>Deal all enemies 3 Damage.", perc: 15, cost: 20};
char[3] = {type: "neut", title: "Solemn Soulguide", trait: "Cleric Hero", dmg: 8, hp: 20, text: "During Battle:<br>If he kills his enemy,<br>he regains 5 Health.", perc: 40, cost: 20};
char[4] = {type: "neut", title: "Ice Witch", trait: "Mage Hero", dmg: 6, hp: 12, text: "After Battle:<br>If her enemy is still alive,<br>she deals 5 damage to it.", perc: 25, cost: 20};
char[5] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[6] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[7] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[8] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[9] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[10] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[11] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[12] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[13] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[14] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[15] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[16] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};
char[17] = {type: "neut", title: "Is This Title Good", trait: "Hero", dmg: 6, hp: 12, text: "", perc: 25, cost: 20};

en[1] = {type: "monst", title: "Goblin Shaman", trait: "Orc Enemy", dmg: 4, hp: 14, text: "After Attacking:<br>Discard attacked Unit<br>if its Health is below 5,<br>before it could retaliate." };
en[2] = {type: "monst", title: "Orc Chieftain", trait: "Orc Enemy", dmg: 4, hp: 14, text: "After Attacking:<br>Discard attacked Unit<br>if its Health is below 5,<br>before it could retaliate." };
en[3] = {type: "monst", title: "Troll Champion", trait: "Orc Enemy", dmg: 4, hp: 14, text: "After Attacking:<br>Discard attacked Unit<br>if its Health is below 5,<br>before it could retaliate." };

co[1] = {type: "neut", title: "Logan Hawkthorne", trait: "Commander", dmg: 6, hp: 30, text: "Before Battle:<br>Add 2 Terrain Advantage cards to your deck for the duration of this Battle."};
co[2] = {type: "neut", title: "Aruna Wildbloom", trait: "Commander", dmg: 6, hp: 30, text: "You can keep<br>up to 2 cards per round."};
co[3] = {type: "neut", title: "Brendan Shadowcloak", trait: "Commander", dmg: 6, hp: 30, text: "At the start of a combat round:<br>If you have less than 4 cards in your hand, draw until you have 4 cards."};
co[4] = {type: "neut", title: "Kiera Silkeye", trait: "Commander", dmg: 6, hp: 30, text: "Add +5 to each of your<br>Skill card's Speed."};
co[5] = {type: "neut", title: "Jaylin Duskleaf", trait: "Commander", dmg: 6, hp: 30, text: "You get 30 extra gold<br>after each battle."};
co[6] = {type: "neut", title: "Wardell Redbraid", trait: "Commander", dmg: 6, hp: 30, text: "If an enemy has 3 or less<br>Health at the end of a round,<br>it dies."};
co[7] = {type: "neut", title: "Selina Oldsong", trait: "Commander", dmg: 6, hp: 30, text: "Start each battle with<br>+10 Battlescore."};
co[8] = {type: "neut", title: "Jakobe Stonegrave", trait: "Commander", dmg: 6, hp: 30, text: "Your units have<br>+2 Health."};

buyable[1] = {type: "buy", trait: "Obtainable", title: "Rest", text: "Each of your wounded units<br>(and your Commander)<br>regains 4 Health.", cost: 20};
buyable[2] = {type: "buy", trait: "Obtainable", title: "Train", text: "Your Commander gains +1 DMG and +3 Health.", cost: 20};
buyable[3] = {type: "buy", trait: "Obtainable", title: "Promote", text: "Your experienced units get every promotion they've earned.", cost: 20};

// Oldsong / Stonegrave

hint[1] = "Battlescore<br>";


var showhint = (event, num) => {
    
    var left = event.clientX + 20 + "px";
    var top  = event.clientY - 40 + "px";
    
    $(".hintdiv").css('left',left);
    $(".hintdiv").css('top',top);
    $(".hintdiv").css('display',"block");
    
    var hintgen = hint[num];
    
    switch (parseInt(num)){
        case 1:
            hintgen += "You: "+bscore+"<br>";
            hintgen += "Monsters: "+(100-bscore)+"<br>";
            break;
    }
    
    $(".hintdiv").html(hintgen);
};

$( "#battlescore" ).on( "mouseenter", function( event ) {
    showhint(event, 1);    
});

$( "#battlescore" ).on( "mouseleave",  function( event ) {
    $(".hintdiv").css('display',"none");
});

$( "#winbattle" ).on( "mouseenter", function( event ) {
    showhint(event, 1);    
});

$( "#winbattle" ).on( "mouseleave",  function( event ) {
    $(".hintdiv").css('display',"none");
});