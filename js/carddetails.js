/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var char = new Array();
var skill = new Array();
var en = new Array();
var reg = new Array();
var co = new Array();
var ada = new Array();
var boss = new Array();
var hint = new Array();
var buyable = new Array();



var startcards = [0, 7, 6, 3, 4];
var secmonchance = [0, 20, 30, 15, 10];
var thirmonchance = [0, 15, 20, 10, 5];
var healval = [0, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8];
var frayval = [0, 8, 8, 8, 10, 10, 12, 12, 14, 14, 16];
var monplusdmg = [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
var monplushp = [0, 0, 0, 2, 2, 2, 4, 4, 4, 6, 8];
var wavesnum = [0, 6, 6, 7, 7, 8, 8, 9, 9, 10];
var bsbase = [0, 60, 60, 55, 55, 50, 50, 45, 45, 40, 30];
var goldbase = [0, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140];



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
 * 17: Gain XP
 *  
 */

char[1] = {what: "unit", type: "neut", title: "Ardent Recruit", trait: "Basic Unit", dmg: 4, hp: 6, trig: 0, text: "No ability.", perc: 40, cost: 10};
char[2] = {what: "unit", type: "neut", title: "Elven Assassin", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 10, text: "When discarded from your hand:<br>Deal all enemies 3 Damage.", perc: 15, cost: 20};
char[3] = {what: "unit", type: "neut", title: "Solemn Soulguide", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 5, text: "After Attacking:<br>If he killed his enemy,<br>he regains 5 Health.", perc: 25, cost: 20};
char[4] = {what: "unit", type: "neut", title: "Ice Witch", trait: "Mage Hero", dmg: 6, hp: 12, trig: 6, text: "After Combat:<br>If her enemy is still alive,<br>she deals 3 damage to it.", perc: 25, cost: 20};
char[5] = {what: "unit", type: "neut", title: "Defender of Wisdom", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 12, text: "During Combat:<br>If he's fighting an Enemy, opponents can't remove cards from your deck.", perc: 25, cost: 20};
char[6] = {what: "unit", type: "neut", title: "Raven Thief", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 5, text: "After Attacking:<br>Gain 2 Gold.", perc: 25, cost: 20};
char[7] = {what: "unit", type: "neut", title: "Stalwart Bannerman", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 7, text: "In the Fray:<br>He gives you +2 Battlescore.", perc: 25, cost: 20};
char[8] = {what: "unit", type: "neut", title: "Heavenly Knight", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 6, text: "After Combat:<br>If she was fighting an Enemy,<br>she and her assisting Unit<br>regains 2 Health.", perc: 25, cost: 20};
char[9] = {what: "unit", type: "neut", title: "Stoic Partisan", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 14, text: "Can only lose Health<br>when attacked in Combat.", perc: 25, cost: 20};
char[10] = {what: "unit", type: "neut", title: "Divine Harbinger", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 8, text: "At the Healer:<br>Increase the Healer's Health restoring power by 1 for the rest of this battle.", perc: 25, cost: 20};
char[11] = {what: "unit", type: "neut", title: "Ruthless Sorcerer", trait: "Mage Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>The Enemy he's assigned to<br>loses 2 Health.", perc: 25, cost: 20};
char[12] = {what: "unit", type: "neut", title: "Valiant Pilgrim", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>She gains +2 DMG for the<br>duration of this battle if assigned to<br>an Enemy on her own.", perc: 25, cost: 20};
char[13] = {what: "unit", type: "neut", title: "Midnight Warlock", trait: "Mage Hero", dmg: 6, hp: 12, trig: 9, text: "Before Combat:<br>If there are any Disadvantage cards in your hand, remove them from your deck.", perc: 25, cost: 20};
char[14] = {what: "unit", type: "neut", title: "Forest Sentinel", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 8, text: "At the Healer:<br>If you are in a Woodlands Region, put a Terrain Advantage<br>into your hand.", perc: 25, cost: 20};
char[15] = {what: "unit", type: "neut",  title: "Fearless Messenger", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 10, text: "When discarded from your hand:<br>Add an Ardent Recruit to your deck for the duration of this Battle.", perc: 25, cost: 20};
char[16] = {what: "unit", type: "neut", title: "Skyward Templar", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>Lower this enemy's DMG by 1.", perc: 25, cost: 20};
char[17] = {what: "unit", type: "neut", title: "Guardian of Light", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 7, text: "In the Fray:<br>If you've gained Battlescore in the Fray this turn, he gains +2 DMG for the rest of this Battle.", perc: 25, cost: 20};
char[18] = {what: "unit", type: "neut", title: "War Elephant", trait: "Support Unit", dmg: 6, hp: 20, trig: 14, text: "It takes any damage instead<br>of its assisting unit too.", perc: 25, cost: 20};
char[19] = {what: "unit", type: "neut", title: "Sly Rascal", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 5, text: "Gains +1 permanent Health when she gains Experience.", perc: 25, cost: 20};
// enemies cant add disadv
// creates a skill
// in your hand : any heal +2
// opponents can1t regain health

en[1] = {what: "monst", type: "monst", title: "Goblin Shaman", trait: "Orc Enemy", dmg: 2, hp: 10, trig: 6, text: "After Combat:<br>remove a random Skill from your deck for the duration of this battle." };
en[2] = {what: "monst", type: "monst", title: "Orc Chieftain", trait: "Orc Enemy", dmg: 3, hp: 14, trig: 3, text: "After Attacking:<br>Remove all Experience from<br>the attacked unit." };
en[3] = {what: "monst", type: "monst", title: "Troll Champion", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>If attacked unit's Health is below 5,<br>it can't retaliate." };
en[4] = {what: "monst", type: "monst", title: "Wolfpack Howler", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Every Unit in your Hand<br>loses 2 HP." };
en[5] = {what: "monst", type: "monst", title: "Raider Horde", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 6, text: "After Combat, if still alive:<br>Increase the number of Waves in this Battle by 1." };
en[6] = {what: "monst", type: "monst", title: "Duskling Rogue", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Each Unit assigned to him<br>loses 3 HP." };
en[7] = {what: "monst", type: "monst", title: "Tribal Spearman", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>Deals 2 additional DMG to the second Unit assigned to him." };
en[8] = {what: "monst", type: "monst", title: "Deadly Wardancer", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Gains +2 DMG for each Unit assigned to her." };
en[9] = {what: "monst", type: "monst", title: "Blob Dragon", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Place a new Enemy into the<br>third slot." };
// when app: disc unit  from hand

co[1] = {what: "comm", type: "comm", title: "Logan Hawkthorne", trait: "Commander", dmg: 6, hp: 24, text: "Before Battle:<br>Add 2 Terrain Advantage cards to your deck for the duration of this Battle."};
co[2] = {what: "comm", type: "comm", title: "Aruna Wildbloom", trait: "Commander", dmg: 6, hp: 24, text: "You can keep<br>up to 2 cards per round."};
co[3] = {what: "comm", type: "comm", title: "Brendan Shadowcloak", trait: "Commander", dmg: 6, hp: 24, text: "At the start of a combat round:<br>If you have less than 4 cards in your hand, draw until you have 4 cards."};
co[4] = {what: "comm", type: "comm", title: "Kiera Silkeye", trait: "Commander", dmg: 6, hp: 24, text: "Add +5 to each of your<br>Skill card's Speed."};
co[5] = {what: "comm", type: "comm", title: "Jaylin Duskleaf", trait: "Commander", dmg: 6, hp: 24, text: "You get 30 extra gold<br>after each battle."};
co[6] = {what: "comm", type: "comm", title: "Wardell Redbraid", trait: "Commander", dmg: 6, hp: 24, text: "If an enemy has 3 or less<br>Health at the end of a round,<br>it dies."};
co[7] = {what: "comm", type: "comm", title: "Selina Oldsong", trait: "Commander", dmg: 6, hp: 24, text: "Start each battle with<br>+10 Battlescore."};
co[8] = {what: "comm", type: "comm", title: "Jakobe Stonegrave", trait: "Commander", dmg: 6, hp: 24, text: "Your units have<br>+2 Health."};

reg[1] = {type: "region", what: "mountain", title: "Coldstone Mountains", trait: "Mountain Region", fmod: 1, text: "Your units have<br>-1 DMG here."};
reg[2] = {type: "region", what: "woodland", title: "Northern Woods", trait: "Woodlands Region", fmod: 1, text: "Additional Beasts may attack you here with +1/+2."};
reg[3] = {type: "region", what: "woodland", title: "Quona River Shallows", trait: "Woodlands Region", fmod: -1, text: "Start the battle with +1 Swamp Terrain Advantage in your deck."};
reg[4] = {type: "region", what: "swamp", title: "The Frozen Marshes", trait: "Swamp Region", fmod: 1, text: "Your cards have -4 Speed here."};
reg[5] = {type: "region", what: "plains", title: "The Golden Savannah", trait: "Plains Region", fmod: -1, text: "You start at the<br>2nd Wave here."};
reg[6] = {type: "region", what: "mountain", title: "The Green Giants", trait: "Mountain Region", fmod: -1, text: "You start with<br>+6 Battlescore here."};
reg[7] = {type: "region", what: "fortress", title: "Cobaltcreek Castle", trait: "Fortress Region", fmod: -1, text: "Your Warrior Units<br>have +1 DMG here."};
reg[8] = {type: "region", what: "plains", title: "Hillfoot Meadows", trait: "Plains Region", fmod: 1, text: "Enemies have +2 Health here."};

ada[1] = {what: "ada", type: "adv", title: "Close Quarters", trait: "Terrain Advantage", trig: 9, text: "When Drawn:<br>Draw the first Unit from your deck into your Hand.", perc: 10};
ada[2] = {what: "ada", type: "disadv", title: "Losing Ground", trait: "Terrain Disadvantage", trig: 9, text: "When Drawn:<br>The Monsters gain 4 Battlescore.", perc: 10};

skill[1] = {what: "skill", type: "skred", title: "Inspiring Charge", trait: "Warrior Skill", trig: 1, text: "Before Combat:<br>Your attacking Warriors and their assisting Units gain +1 DMG for the rest of this battle.", perc: 10, cost: 10};
skill[2] = {what: "skill", type: "skblue", title: "Quiet Prayer", trait: "Cleric Skill", trig: 1, text: "Before Combat:<br>If you have a Cleric in your hand, every Present Unit regains 3 Health.", perc: 10, cost: 10};
skill[3] = {what: "skill", type: "skpurp", title: "Melt Weapons", trait: "Mage Skill", trig: 1, text: "Before Combat:<br>If you have a Mage in your hand, all Enemies lose 2 DMG.", perc: 10, cost: 10};
skill[4] = {what: "skill", type: "skgreen", title: "Taunt Foes", trait: "Ranger Skill", trig: 5, text: "After Attacking:<br>Enemies attacked by Ranger Units don't fight with your Commander<br>this turn.", perc: 10, cost: 10};
skill[5] = {what: "skill", type: "skred", title: "Siege Tactics", trait: "Warrior Skill", trig: 1, text: "Before Combat:<br>if you have a Warrior in the Fray, gain 5 Battlescore.", perc: 10, cost: 10};
skill[6] = {what: "skill", type: "skblue", title: "Holy Shield", trait: "Cleric Skill", trig: 14, text: "If you have a Cleric present, each Damage your units take is decreased by 1.", perc: 10, cost: 10};
skill[7] = {what: "skill", type: "skindi", title: "Sabotage the Enemy", trait: "Rogue Skill", trig: 5, text: "After Attacking: If one of your Rogues kills an Enemy in Combat, decrease the maximum number<br>of Waves by 1.", perc: 10, cost: 10};
skill[8] = {what: "skill", type: "skpurp", title: "Channel Power", trait: "Mage Skill", trig: 1, text: "Before Combat:<br>If you have a Mage in your hand, your Commander gains +1 DMG for the rest of this Combat.", perc: 10, cost: 10};
skill[9] = {what: "skill", type: "skgreen", title: "Expose Weakness", trait: "Ranger Skill", trig: 1, text: "Before Combat:<br>Your Rangers deal 4 Damage<br>to their assigned Enemy.", perc: 10, cost: 10};
skill[10] = {what: "skill", type: "skindi", title: "Learn by Example", trait: "Rogue Skill", trig: 17, text: "If a Rogue's Assisting Unit gains Experience in Combat, so does the Rogue.", perc: 10, cost: 10};
// expose weakness: Before combat: rangers deal 4 damage to assigned enemy.
// rogue: give experience -cl
// give units speed
// if boss visible: lower its hp by 2 (to a minimum of 1)


buyable[1] = {what: "rest", type: "buy", trait: "Garrison Action", title: "Rest", text: "Each of your wounded units<br>(and your Commander)<br>regains 4 Health.", cost: 15};
buyable[2] = {what: "train", type: "buy", trait: "Garrison Action", title: "Train", text: "Your Commander gains<br>+1 DMG and +2 Health.", cost: 15};
buyable[3] = {what: "promote", type: "buy", trait: "Garrison Action", title: "Promote", text: "Your experienced units<br>get every promotion<br>they've earned.", cost: 25};
buyable[4] = {what: "info", type: "neut", trait: "Commander Information", title: "War Room", text: "All kinds of info.", cost: 20};
buyable[5] = {what: "ng", type: "fray", trait: "Battlescore Modifier", title: "Join The Fray", text: "The Monsters will gain<br>20 Battlescore.", cost: 20};
buyable[6] = {what: "ng", type: "heal", trait: "Health Regeneration", title: "Receive Healing", text: "Units assigned here will<br>regain 4 Health each.", cost: 20};
buyable[7] = {what: "battinf", type: "neut", trait: "Battlefield Information", title: "Battle Details", text: "Info about the battle.", cost: 20};
buyable[8] = {what: "drill", type: "buy", trait: "Garrison Action", title: "Drill", text: "Your Skills gain +5 Speed.", cost: 15};

boss[1] = {what: "boss", type: "monst", title: "Minotaur Demon", trait: "Boss Enemy", dmg: 10, hp: 30, trig: 6, text: "After Attacking:<br>Only your Commander can retaliate against him." };

// Oldsong / Stonegrave

hint[1] = "Battlescore<br>";
hint[2] = "Current Health.<br>";


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
        case 2:
            hintgen += "Max Health: "+cid.basehp;
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

$( "#hpval" ).on( "mouseenter", function( event ) {
    showhint(event, 2);    
});

$( "#hpval" ).on( "mouseleave",  function( event ) {
    $(".hintdiv").css('display',"none");
});


