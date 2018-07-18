/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var char = new Array();
var en = new Array();
var reg = new Array();
var co = new Array();
var ada = new Array();
var hint = new Array();
var buyable = new Array();

var startcards = [1, 2, 2, 3, 3, 4, 4];
var secmonchance = [0, 25, 35, 15, 5];
var thirmonchance = [0, 15, 25, 5, 0];
var healval = [0, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8];
var frayval = [0, 8, 8, 8, 10, 10, 12, 12, 14, 14, 16];
var monplusdmg = [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
var monplushp = [0, 0, 0, 2, 2, 2, 4, 4, 4, 6, 8];

/* Triggers
 * 
 * 1: Before Combat
 * 2: Before Attack (monst)
 * 3: After Attack (monst)
 * 4: Before Attack (unit)
 * 5: After Attack (unit)
 * 6: After Combat
 * 7: Fray
 * 8: Healer
 * 9: When Drawn
 * 10: When Discarded from hand
 * 11: When put in hand from Keep
 * 12: When Removing from deck
 * 13: When Adding to deck
 * 14: Losing HP
 * 15: Regaining HP
 * 16: When Appears
 *  
 */

char[1] = {what: "unit", type: "neut", title: "Ardent Recruit", trait: "Basic Unit", dmg: 6, hp: 6, trig: 0, text: "No ability.", perc: 50, cost: 20};
char[2] = {what: "unit", type: "neut", title: "Elven Assassin", trait: "Warrior Hero", dmg: 10, hp: 24, trig: 10, text: "When discarded from your hand:<br>Deal all enemies 3 Damage.", perc: 15, cost: 20};
char[3] = {what: "unit", type: "neut", title: "Solemn Soulguide", trait: "Cleric Hero", dmg: 8, hp: 20, trig: 5, text: "After Attacking:<br>If he killed his enemy,<br>he regains 5 Health.", perc: 40, cost: 20};
char[4] = {what: "unit", type: "neut", title: "Ice Witch", trait: "Mage Hero", dmg: 6, hp: 12, trig: 6, text: "After Combat:<br>If her enemy is still alive,<br>she deals 3 damage to it.", perc: 25, cost: 20};
char[5] = {what: "unit", type: "neut", title: "Defender of Wisdom", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 12, text: "During Combat:<br>If he's fighting an Enemy, cards can't be removed from your deck.", perc: 25, cost: 20};
char[6] = {what: "unit", type: "neut", title: "Raven Thief", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 5, text: "After Attacking:<br>Gain 2 Gold.", perc: 25, cost: 20};
char[7] = {what: "unit", type: "neut", title: "Stalwart Bannerman", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 7, text: "While in the Fray:<br>He gives you +2 Battlescore.", perc: 25, cost: 20};
char[8] = {what: "unit", type: "neut", title: "Heavenly Knight", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 6, text: "After Combat:<br>If she's fighting an Enemy, she and her assisting Unit regains 2 Health.", perc: 25, cost: 20};
char[9] = {what: "unit", type: "neut", title: "Stoic Partisan", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 14, text: "Can only lose Health<br>when attacked in Combat.", perc: 25, cost: 20};
char[10] = {what: "unit", type: "neut", title: "Divine Harbinger", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 8, text: "At the Healer:<br>Increase the Healer's Health restoring power by 2 this turn.", perc: 25, cost: 20};
char[11] = {what: "unit", type: "neut", title: "Ruthless Sorcerer", trait: "Mage Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>The Enemy he's assigned to<br>loses 2 Health.", perc: 25, cost: 20};
char[12] = {what: "unit", type: "neut", title: "Valiant Pilgrim", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>She gains +2 DMG for the<br>duration of this battle if assigned to<br>an Enemy on her own.", perc: 25, cost: 20};
char[13] = {what: "unit", type: "neut", title: "Midnight Warlock", trait: "Mage Hero", dmg: 6, hp: 12, trig: 9, text: "When drawn:<br>If there are any Disadvantage cards in your hand, remove them from your deck.", perc: 25, cost: 20};
char[14] = {what: "unit", type: "neut", title: "Forest Sentinel", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 7, text: "In the Fray:<br>If you are in a Forest Region, add a Terrain Advantage to your deck for the duration of this Battle.", perc: 25, cost: 20};
char[15] = {what: "unit", type: "neut",  title: "Fearless Messenger", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 10, text: "When discarded from your hand:<br>Add an Ardent Recruit to your deck for the duration of this Battle.", perc: 25, cost: 20};
char[16] = {what: "unit", type: "neut", title: "Skyward Templar", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>Lower this enemy's DMG by 1.", perc: 25, cost: 20};
char[17] = {what: "unit", type: "neut", title: "Guardian of Light", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 7, text: "In the Fray:<br>If the Monsters didn't gain any Battlescore this turn, gain +2 DMG for the duration of this Battle.", perc: 25, cost: 20};
char[18] = {what: "unit", type: "neut", title: "War Elephant", trait: "Support Unit", dmg: 6, hp: 20, trig: 14, text: "It takes any damage instead<br>of its assisting unit too.", perc: 15, cost: 20};

en[1] = {what: "monst", type: "monst", title: "Goblin Shaman", trait: "Orc Enemy", dmg: 2, hp: 10, trig: 6, text: "After Combat:<br>remove a random Skill from your deck for the duration of this battle." };
en[2] = {what: "monst", type: "monst", title: "Orc Chieftain", trait: "Orc Enemy", dmg: 3, hp: 14, trig: 3, text: "After Attacking:<br>Remove all Promotions from the attacked unit." };
en[3] = {what: "monst", type: "monst", title: "Troll Champion", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>If attacked unit's Health is below 5,<br>it can't retaliate." };
en[4] = {what: "monst", type: "monst", title: "Wolfpack Howler", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Every Unit in your Hand<br>loses 2 HP." };
en[5] = {what: "monst", type: "monst", title: "Raider Horde", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 6, text: "After Combat, if still alive:<br>Increase the number of Waves in this Battle by 1." };
en[6] = {what: "monst", type: "monst", title: "Duskling Rogue", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Each Unit assigned to him<br>loses 3 HP." };
en[7] = {what: "monst", type: "monst", title: "Tribal Spearman", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>Deals 2 additional DMG to the second Unit assigned to him." };
en[8] = {what: "monst", type: "monst", title: "Deadly Wardancer", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Gains +2 DMG for each Unit assigned to her." };
en[9] = {what: "monst", type: "monst", title: "Blob Dragon", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Place a new Enemy into the<br>third slot." };

co[1] = {what: "comm", type: "neut", title: "Logan Hawkthorne", trait: "Commander", dmg: 6, hp: 30, text: "Before Battle:<br>Add 2 Terrain Advantage cards to your deck for the duration of this Battle."};
co[2] = {what: "comm", type: "neut", title: "Aruna Wildbloom", trait: "Commander", dmg: 6, hp: 30, text: "You can keep<br>up to 2 cards per round."};
co[3] = {what: "comm", type: "neut", title: "Brendan Shadowcloak", trait: "Commander", dmg: 6, hp: 30, text: "At the start of a combat round:<br>If you have less than 4 cards in your hand, draw until you have 4 cards."};
co[4] = {what: "comm", type: "neut", title: "Kiera Silkeye", trait: "Commander", dmg: 6, hp: 30, text: "Add +5 to each of your<br>Skill card's Speed."};
co[5] = {what: "comm", type: "neut", title: "Jaylin Duskleaf", trait: "Commander", dmg: 6, hp: 30, text: "You get 30 extra gold<br>after each battle."};
co[6] = {what: "comm", type: "neut", title: "Wardell Redbraid", trait: "Commander", dmg: 6, hp: 30, text: "If an enemy has 3 or less<br>Health at the end of a round,<br>it dies."};
co[7] = {what: "comm", type: "neut", title: "Selina Oldsong", trait: "Commander", dmg: 6, hp: 30, text: "Start each battle with<br>+10 Battlescore."};
co[8] = {what: "comm", type: "neut", title: "Jakobe Stonegrave", trait: "Commander", dmg: 6, hp: 30, text: "Your units have<br>+2 Health."};

reg[1] = {what: "region", type: "region", title: "Coldstone Mountains", trait: "Mountain Region", text: "Your units have<br>-1 Attack here."};

ada[1] = {what: "ada", type: "adv", title: "Mountainous Terrain", trait: "Terrain Advantage", text: "When Drawn:<br>Draw the first Unit from your deck into your Hand.", perc: 10};
ada[2] = {what: "ada", type: "disadv", title: "Mountainous Terrain", trait: "Terrain Disadvantage", text: "When Drawn:<br>The Monsters gain 4 Battlescore.", perc: 10};

buyable[1] = {what: "ng", type: "buy", trait: "Obtainable", title: "Rest", text: "Each of your wounded units<br>(and your Commander)<br>regains 4 Health.", cost: 30};
buyable[2] = {what: "ng", type: "buy", trait: "Obtainable", title: "Train", text: "Your Commander gains<br>+1 DMG and +3 Health.", cost: 20};
buyable[3] = {what: "ng", type: "buy", trait: "Obtainable", title: "Promote", text: "Your experienced units<br>get every promotion<br>they've earned.", cost: 40};
buyable[4] = {what: "info", type: "neut", trait: "", title: "War Room", text: "All kinds of info.", cost: 20};
buyable[5] = {what: "ng", type: "fray", trait: "", title: "Join The Fray", text: "The Monsters will gain<br>20 Battlescore.", cost: 20};
buyable[6] = {what: "ng", type: "heal", trait: "", title: "Receive Healing", text: "Units assigned here will<br>regain 4 Health each.", cost: 20};


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


