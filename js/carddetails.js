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
 * 18: Before Battle (Regions, Commanders)
 * 19: Start of turn (after drawing)
 * 20: End of turn (after discarding)
 * 21: Battlescore change
 * 22: death
 * 23: Disadv into deck
 * 24: Enemy dmg increase
 * 25: Hero card perc decrease
 * 26: Hero unit dmg decrease
 * 27: Battlescore change
 *  
 */

char[1] = {what: "unit", type: "neut", title: "Ardent Recruit", trait: "Basic Unit", dmg: 4, hp: 6, trig: 0, text: "No ability.", perc: 40, cost: 10};
char[2] = {what: "unit", type: "neut", title: "Elven Assassin", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 10, text: "When discarded from your hand:<br>Deal all enemies 3 Damage.", perc: 20, cost: 20};
char[3] = {what: "unit", type: "neut", title: "Solemn Soulguide", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 5, text: "After Attacking:<br>If he killed his enemy,<br>he regains 5 Health.", perc: 30, cost: 20};
char[4] = {what: "unit", type: "neut", title: "Ice Witch", trait: "Mage Hero", dmg: 6, hp: 12, trig: 6, text: "After Combat:<br>If her enemy is still alive,<br>she deals 3 damage to it.", perc: 25, cost: 20};
char[5] = {what: "unit", type: "neut", title: "Defender of Wisdom", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 12, text: "While Present:<br>Opponents can't remove your cards from the game.", perc: 20, cost: 20};
char[6] = {what: "unit", type: "neut", title: "Raven Thief", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 5, text: "After Attacking:<br>Gain 2 Gold.", perc: 25, cost: 20};
char[7] = {what: "unit", type: "neut", title: "Stalwart Bannerman", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 7, text: "In the Fray:<br>He gives you +2 Battlescore.", perc: 25, cost: 20};
char[8] = {what: "unit", type: "neut", title: "Holy Knight", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 6, text: "After Combat:<br>If she was fighting an Enemy,<br>she and her assisting Unit<br>regains 2 Health.", perc: 20, cost: 20};
char[9] = {what: "unit", type: "neut", title: "Stoic Partisan", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 14, text: "Can only lose Health<br>when attacked in Combat.", perc: 20, cost: 20};
char[10] = {what: "unit", type: "neut", title: "Divine Harbinger", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 8, text: "At the Healer:<br>Increase the Healer's Health restoring power by 1 for the rest of this battle.", perc: 25, cost: 20};
char[11] = {what: "unit", type: "neut", title: "Ruthless Sorcerer", trait: "Mage Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>The Enemy he's assigned to<br>loses 2 Health.", perc: 25, cost: 20};
char[12] = {what: "unit", type: "neut", title: "Valiant Pilgrim", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>He gains +2 DMG for the<br>rest of this battle if assigned to<br>an Enemy on his own.", perc: 25, cost: 20};
char[13] = {what: "unit", type: "neut", title: "Briar Warlock", trait: "Mage Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>If there are any Disadvantage cards in your hand, remove them from your deck.", perc: 15, cost: 20};
char[14] = {what: "unit", type: "neut", title: "Forest Sentinel", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 8, text: "At the Healer:<br>Place a current Terrain Advantage<br>into your hand.", perc: 25, cost: 20};
char[15] = {what: "unit", type: "neut", title: "Fearless Messenger", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 10, text: "When discarded from your hand:<br>Add an Ardent Recruit to your deck for the duration of this Battle.", perc: 25, cost: 20};
char[16] = {what: "unit", type: "neut", title: "Skyward Templar", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>Lower this enemy's DMG by 1.", perc: 20, cost: 20};
char[17] = {what: "unit", type: "neut", title: "Guardian of Light", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 7, text: "In the Fray:<br>If you've gained Battlescore in the Fray this turn, he gains +2 DMG for the rest of this Battle.", perc: 20, cost: 20};
char[18] = {what: "unit", type: "neut", title: "War Elephant", trait: "Support Unit", dmg: 6, hp: 20, trig: 14, text: "It takes any damage instead<br>of its assisting unit too.", perc: 30, cost: 20};
char[19] = {what: "unit", type: "neut", title: "Sly Rascal", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 17, text: "When he gains Experience:<br>He gains +1 permanent Health ", perc: 30, cost: 20};
char[20] = {what: "unit", type: "neut", title: "Whirlwind Warrior", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 14, text: "She deals +3 Damage against<br>Orc Enemies.", perc: 30, cost: 20};
char[21] = {what: "unit", type: "neut", title: "Brave Pathfinder", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 14, text: "She deals +3 Damage against<br>Beast Enemies.", perc: 30, cost: 20};
char[22] = {what: "unit", type: "neut", title: "Celestial Pioneer", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 14, text: "He deals +3 Damage against<br>Undead Enemies.", perc: 30, cost: 20};
char[23] = {what: "unit", type: "neut", title: "Thunder Wielder", trait: "Mage Hero", dmg: 6, hp: 12, trig: 14, text: "He deals +3 Damage against<br>Demon Enemies.", perc: 30, cost: 20};
char[24] = {what: "unit", type: "neut", title: "Eager Burglar", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 14, text: "She deals +3 Damage against Enemies if she has Experience.", perc: 30, cost: 20};
char[25] = {what: "unit", type: "neut", title: "Altruist Spellbender", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 8, text: "At the Healer:<br>Instead of healing her, heal your Commander for 4 HP.", perc: 15, cost: 20};
char[26] = {what: "unit", type: "neut", title: "Radiant Lightbearer", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 5, text: "If he has an assisting Unit, the Enemy he's assigned to doesn't fight your Commander this round.", perc: 25, cost: 20};
char[27] = {what: "unit", type: "neut", title: "Midnight Bandit", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 10, text: "While Present:<br>Negative effects can't discard your cards.", perc: 20, cost: 20};
char[28] = {what: "unit", type: "neut", title: "Humble Darter", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 5, text: "After her assisting Unit attacks,<br>deal 4 Damage to this Enemy.", perc: 15, cost: 20};
char[29] = {what: "unit", type: "neut", title: "Graceful Noble", trait: "Mage Hero", dmg: 6, hp: 12, trig: 9, text: "When you draw her:<br>Draw the first card from your deck.", perc: 15, cost: 20};
char[30] = {what: "unit", type: "neut", title: "Heavenly Guide", trait: "Cleric Hero", dmg: 6, hp: 2, trig: 22, text: "When she dies:<br>Turn your current Region into \"Blessed Fields\".", perc: 25, cost: 20};
char[31] = {what: "unit", type: "neut", title: "Pirate Captain", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>Blank the ability of the non-Boss enemy she's assigned to.", perc: 15, cost: 20};
char[32] = {what: "unit", type: "neut", title: "Fierce Escort", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 10, text: "When discarded:<br>Put him into your Hand<br>if his HP is above 8.", perc: 25, cost: 20};
char[33] = {what: "unit", type: "neut", title: "Wizened Scholar", trait: "Mage Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>If he's at the Healer, draw a random Skill card from your deck into your hand.", perc: 20, cost: 20};
char[34] = {what: "unit", type: "neut", title: "Swift Sharpshooter", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>If she is in your hand, deal the Enemy in the middle slot<br>4 Damage.", perc: 20, cost: 20};
char[35] = {what: "unit", type: "neut", title: "Scoundrel Agitator", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>Give assisting Unit +5 Speed<br>for the rest of this battle.", perc: 25, cost: 20};
char[36] = {what: "unit", type: "neut", title: "Wildfire Conjurer", trait: "Mage Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>Deal all Enemies 1 Damage.", perc: 20, cost: 20};
char[37] = {what: "unit", type: "neut", title: "Cheerful Wanderer", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 9, text: "When you draw her:<br>Give Advantage cards in your deck +5 Speed for the rest of this Battle.", perc: 20, cost: 20};
char[38] = {what: "unit", type: "neut", title: "Ironclad Paladin", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 14, text: "When he takes damage:<br>He takes one less damage.", perc: 20, cost: 20};
char[39] = {what: "unit", type: "neut", title: "Brave Shieldmaiden", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 15, text: "When she regains HP during Combat, she regains 2 extra HP.", perc: 20, cost: 20};
char[40] = {what: "unit", type: "neut", title: "Stealthy Slayer", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 10, text: "When discarded from your hand:<br>She gains +4 DMG for the rest of this Battle.", perc: 20, cost: 20};
char[41] = {what: "unit", type: "neut", title: "Inspiring Aide", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>Heal her assisting Unit for 4 HP.", perc: 15, cost: 20};
char[42] = {what: "unit", type: "neut", title: "Cinder Witch", trait: "Mage Hero", dmg: 6, hp: 12, trig: 6, text: "After Combat:<br>Place a \"Hail of Sparks\" Advantage card into your Deck.", perc: 25, cost: 20};
char[43] = {what: "unit", type: "neut", title: "Gallant Enchanter", trait: "Mage Hero", dmg: 6, hp: 12, trig: 6, text: "After Combat:<br>Give any Units you Keep +1 DMG for the rest of this battle.", perc: 25, cost: 20};
char[44] = {what: "unit", type: "neut", title: "Ambitious Wildling", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>Deal the Enemy she's assigned to 1 Damage for each Unit in your Hand.", perc: 15, cost: 20};
char[45] = {what: "unit", type: "neut", title: "Masked Cutthroat", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>If he's in your Hand, deal all<br>Enemies 1 Damage for each Skill<br>in your Hand.", perc: 15, cost: 20};
char[46] = {what: "unit", type: "neut", title: "Disdainful Barbarian", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 1, text: "Before Combat:<br>Deal 4 Damage to assigned Enemy if your Battlescore is at least 60.", perc: 15, cost: 20};
char[47] = {what: "unit", type: "neut", title: "Faithful Duellist", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 6, text: "After Combat:<br>Units in your Hand regain 2 HP.", perc: 15, cost: 20};
char[48] = {what: "unit", type: "neut", title: "Keeper of Flames", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 18, text: "Before Battle:<br>He gains +6 HP for this Battle if the Battlefield is a Plains Region.", perc: 25, cost: 20};
char[49] = {what: "unit", type: "neut", title: "Gryphon Rider", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 18, text: "Before Battle:<br>He gains +8 Speed for this Battle<br>if the Battlefield is a Mountain Region.", perc: 25, cost: 20};
char[50] = {what: "unit", type: "neut", title: "Sage of Nature", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 23, text: "While in your Hand:<br>Disadvantage cards can't be added<br>to your deck if the Battlefield is a Woodlands Region.", perc: 25, cost: 20};
char[51] = {what: "unit", type: "neut", title: "Cunning Spy", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 19, text: "At round start:<br>Place a random Skill into your Hand for this battle if the Battlefield is a Fortress Region.", perc: 25, cost: 20};
char[52] = {what: "unit", type: "neut", title: "Poison Wizard", trait: "Mage Hero", dmg: 6, hp: 12, trig: 18, text: "Before Battle:<br>She gains +2 Damage for this Battle<br>if the Battlefield is a Swamp Region.", perc: 25, cost: 20};
char[53] = {what: "unit", type: "neut", title: "Purifier of Spirit", trait: "Cleric Hero", dmg: 6, hp: 12, trig: 15, text: "While Present:<br>Enemies can't regain Health.", perc: 25, cost: 20};
char[54] = {what: "unit", type: "neut", title: "Shimmering Champion", trait: "Warrior Hero", dmg: 6, hp: 12, trig: 24, text: "While Present:<br>Enemies can't increase their DMG.", perc: 25, cost: 20};
char[55] = {what: "unit", type: "neut", title: "Steadfast Archmage", trait: "Mage Hero", dmg: 6, hp: 12, trig: 25, text: "While Present:<br>The Speed of your cards can't be decreased.", perc: 20, cost: 20};
char[56] = {what: "unit", type: "neut", title: "Soldier of Fortune", trait: "Rogue Hero", dmg: 6, hp: 12, trig: 14, text: "While Present:<br>Your Commander can only lose Health when attacked in Combat.", perc: 20, cost: 20};
char[57] = {what: "unit", type: "neut", title: "Fjord Rover", trait: "Ranger Hero", dmg: 6, hp: 12, trig: 26, text: "While Present:<br>The DMG of your Units can't be decreased.", perc: 25, cost: 20};

// mon / hero regio: type marad de bef com: put a random ada into hand

en[1] = {what: "monst", type: "monst", title: "Goblin Shaman", trait: "Orc Enemy", dmg: 2, hp: 10, trig: 6, text: "After Combat:<br>Remove a random Skill from your deck for the rest of this battle." };
en[2] = {what: "monst", type: "monst", title: "Orc Chieftain", trait: "Orc Enemy", dmg: 3, hp: 14, trig: 3, text: "After Attacking:<br>Remove all Experience from<br>the attacked unit." };
en[3] = {what: "monst", type: "monst", title: "Troll Champion", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>If attacked unit's Health is below 5,<br>it can't retaliate." };
en[4] = {what: "monst", type: "monst", title: "Wolfpack Howler", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Every Unit in your Hand<br>loses 2 HP." };
en[5] = {what: "monst", type: "monst", title: "Raider Horde", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 6, text: "After Combat:<br>Increase the number of Waves in this Battle by 1." };
en[6] = {what: "monst", type: "monst", title: "Duskling Rogue", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Each Unit assigned to him<br>loses 3 HP." };
en[7] = {what: "monst", type: "monst", title: "Tribal Spearman", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>Deals 2 additional DMG to the second Unit assigned to him." };
en[8] = {what: "monst", type: "monst", title: "Deadly Wardancer", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Gains +2 DMG for each Unit assigned to her." };
en[9] = {what: "monst", type: "monst", title: "Blob Dragon", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Place a new Enemy into the<br>third slot." };
en[10] = {what: "monst", type: "monst", title: "Ghastly Werewolf", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Discard the first card from your hand." };
en[11] = {what: "monst", type: "monst", title: "Werebeast Brawler", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 5, text: "After first unit retaliates:<br>If it has 8 or more Health left,<br>discard the second unit<br>assigned to it." };
en[12] = {what: "monst", type: "monst", title: "Haunting Banshee", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 22, text: "When she dies:<br>She immediately reappears in the next slot, replacing what's there already. (Doesn't work in the rightmost slot.)" };
en[13] = {what: "monst", type: "monst", title: "Wily Succubus", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Remove a random unit from your deck for the duration of this battle." };
en[14] = {what: "monst", type: "monst", title: "Smirking Hellspawn", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Exchange a random unit from<br>your hand with the second unit<br>assigned to him." };
en[15] = {what: "monst", type: "monst", title: "Hellish Brute", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>The Monsters gain 8 Battlescore." };
en[16] = {what: "monst", type: "monst", title: "Lava Elemental", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 5, text: "After a Unit retaliates against it:<br>That Unit loses 2 HP and 1 DMG." };
en[17] = {what: "monst", type: "monst", title: "Vile Gargoyle", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>The Monsters gain 3 Battlescore." };
en[18] = {what: "monst", type: "monst", title: "Magma Dragon", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Decrease the Speed of all Units by 4 for the rest of this battle." };
en[19] = {what: "monst", type: "monst", title: "Cinder Demon", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>Decrease the Speed of all present Units by 2 for the rest of this battle." };
en[20] = {what: "monst", type: "monst", title: "Souleater Vixen", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 6, text: "After Combat:<br>Remove the leftmost Unit assigned to her from the game for the rest of this battle." };
en[21] = {what: "monst", type: "monst", title: "Fiery Hobgoblin", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Remove the Skills in your Hand for the rest of this battle." };
en[22] = {what: "monst", type: "monst", title: "Raging Archfiend", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>If the Monsters have more Battlescore, deal 2 Damage to all present Units." };
en[23] = {what: "monst", type: "monst", title: "Ashen Harpy", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Lower your Commander's DMG by 1 for the rest of this Battle." };
en[24] = {what: "monst", type: "monst", title: "Servant of the Abyss", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Place a \"Dread of Doom\"<br>Disadvantage card<br>into your Hand." };
en[25] = {what: "monst", type: "monst", title: "Mystic Boar", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 6, text: "After Combat:<br>Discard the cards that you<br>wanted to Keep." };
en[26] = {what: "monst", type: "monst", title: "Caiman Priest", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 14, text: "When any of your Units takes Damage, that Unit takes 2 extra Damage." };
en[27] = {what: "monst", type: "monst", title: "Earth Shatterer", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>Place a \"Losing Ground\"<br>Disadvantage card<br>into your Deck." };
en[28] = {what: "monst", type: "monst", title: "Unholy Bloodpriest", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Place a \"Curse of Weakness\"<br>Disadvantage card<br>into your Hand." };
en[29] = {what: "monst", type: "monst", title: "Darkfire Summoner", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>A new Enemy appears<br>in the 2nd slot, replacing what's already there." };
en[30] = {what: "monst", type: "monst", title: "Infernal Shapeshifter", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>If her Health is lower than 16,<br>she turns into a random Enemy." };
en[31] = {what: "monst", type: "monst", title: "Nightmare Tormentor", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 15, text: "Your Units<br>can't regain Health." };
en[32] = {what: "monst", type: "monst", title: "Twilight Siren", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Decrease the Healer's Health restoring power by 2 for the rest of this battle." };
en[33] = {what: "monst", type: "monst", title: "Whitefang Huntress", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>She deals your Commander<br>4 Damage." };
en[34] = {what: "monst", type: "monst", title: "Savage Tracker", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Place an \"Ambush from the Shadows\" Disadvantage card<br>into your Hand." };
en[35] = {what: "monst", type: "monst", title: "Venomtusk Tamer", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 6, text: "After Combat:<br>All present Units are dealt<br>2 Damage." };
en[36] = {what: "monst", type: "monst", title: "Ruthless Torturer", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 2, text: "Before Attacking:<br>He gains +1 DMG." };
en[37] = {what: "monst", type: "monst", title: "Vicious Soothsayer", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 27, text: "When you lose Battlescore:<br>Your Commander loses 3 HP." };
en[38] = {what: "monst", type: "monst", title: "Cavedweller Gladiator", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 3, text: "After Attacking:<br>He deals 2 Damage<br>to your Commander." };
en[39] = {what: "monst", type: "monst", title: "Swamp Hag", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Place a \"Chaos Curse\"<br>Disadvantage card<br>into your deck."};
en[40] = {what: "monst", type: "monst", title: "Troglodyte Berserk", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Units in the Fray<br>lose 2 Health each." };
en[41] = {what: "monst", type: "monst", title: "Sharptooth Warleader", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Place a \"War Cry\" disadvantage<br>card into your Hand." };
en[42] = {what: "monst", type: "monst", title: "Goblin Pickpocket", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 6, text: "After Combat:<br>Lose 5 Gold." };
en[43] = {what: "monst", type: "monst", title: "Jungle Raider", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Discard the rightmost Unit<br>in the Fray." };
en[44] = {what: "monst", type: "monst", title: "Vermin Archer", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Discard the Skill cards from<br>your Hand." };
en[45] = {what: "monst", type: "monst", title: "Lycanthrope Terror", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>If you have any Units with<br>less than 8 Health left in your Hand, discard them." };
en[46] = {what: "monst", type: "monst", title: "Bloodfeast Spider", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Put a \"Lost in the Woods\"<br>Disadvantage card<br>into your Deck." };
en[47] = {what: "monst", type: "monst", title: "Stalking Wolf", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Put an \"Overwhelming Numbers\"<br>Disadvantage card<br>into your Deck." };
en[48] = {what: "monst", type: "monst", title: "White Stag of Legends", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 22, text: "When Killed:<br>Lose 2 Fame." };
en[49] = {what: "monst", type: "monst", title: "Nimble Rougarou", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Place a \"Hunted Down\"<br>Disadvantage card<br>into your Deck." };
en[50] = {what: "monst", type: "monst", title: "Winged Chimera", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 10, text: "When you discard a card<br>from your Hand:<br>This gains +1 DMG." };
en[51] = {what: "monst", type: "monst", title: "Stoneskin Behemoth", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 2, text: "Before Attacking:<br>Discard a random card from your Hand. If it's a Unit, it loses 1 DMG for the rest of this battle." };
en[52] = {what: "monst", type: "monst", title: "Vengeful Howler", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 14, text: "When another Enemy loses HP,<br>this gains +1 DMG." };
en[53] = {what: "monst", type: "monst", title: "Insectoid Queen", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Units assigned to it lose 5 Speed." };
en[54] = {what: "monst", type: "monst", title: "Maelstrom Hydra", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Discard the 1st Unit assigned to it." };
en[55] = {what: "monst", type: "monst", title: "Rabid Wolfman", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 2, text: "Before Attacking:<br>Instead of the 2nd Unit assigned<br>to it, it attacks the 1st one again<br>(if it's still alive)." };
en[56] = {what: "monst", type: "monst", title: "Moss Carcass", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Give Disadvantages in<br>your deck +8 Speed." };
en[57] = {what: "monst", type: "monst", title: "Shambling Cadaver", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Draw the last Disadvantage card from your deck." };
en[58] = {what: "monst", type: "monst", title: "Graveyard Remains", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 22, text: "When Killed:<br>Put a \"Poison Cloud\"<br>Disadvantage card<br>into your Deck." };
en[59] = {what: "monst", type: "monst", title: "Bone Collector", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>She gains +1 DMG and +2 HP<br>for each Disadvantage card<br>in your Hand and Deck." };
en[60] = {what: "monst", type: "monst", title: "Shade of the Netherworld", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 22, text: "When Killed:<br>Turn this Region into a<br>\"Desolate Waste\"." };
en[61] = {what: "monst", type: "monst", title: "Herald of Misery", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Double the Disadvantages<br>in your Deck." };
en[62] = {what: "monst", type: "monst", title: "Lord of Death", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 22, text: "When a different,<br>non-Boss Enemy dies:<br>Resurrect that Enemy." };
en[63] = {what: "monst", type: "monst", title: "Blasphemous Lich", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 16, text: "When Appears:<br>Put a \"Curse of Weakness\"<br>Disadvantage card<br>into your Deck." };
en[64] = {what: "monst", type: "monst", title: "Cataclysm Rider", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Put a \"Dark Forces\"<br>Disadvantage card<br>into your Hand." };
en[65] = {what: "monst", type: "monst", title: "Liege of Darkness", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Remove all Advantage cards from your Deck." };
en[66] = {what: "monst", type: "monst", title: "Baneful Necromancer", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 15, text: "When a Unit regains Health:<br>That Unit takes that much Damage instead." };
en[67] = {what: "monst", type: "monst", title: "Bone Dragon", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 14, text: "When it takes Damage:<br>It takes 2 less Damage." };
en[68] = {what: "monst", type: "monst", title: "Unburied Revenant", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Its Health is restored to its maximum." };
en[69] = {what: "monst", type: "monst", title: "Skeleton Ranger", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Put a current<br>Terrain Disadvantage card<br>into your deck." };
en[70] = {what: "monst", type: "monst", title: "Firebeard Pirate", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 22, text: "When it dies:<br>non-Rogue Units assigned to it take 4 Damage." };
en[71] = {what: "monst", type: "monst", title: "Abhorrent Wraith", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>All Enemies (including himself)<br>are healed 3 HP." };
en[72] = {what: "monst", type: "monst", title: "Vampire Monarch", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Put a \"Vampiric Vines\"<br>Disadvantage card<br>into your Hand." };
en[73] = {what: "monst", type: "monst", title: "Repugnant Ghoul", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 5, text: "After a Unit attacks it:<br>It regains 3 Health unless<br>that Unit is a Cleric." };
en[74] = {what: "monst", type: "monst", title: "Ominous Corruptor", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Non-Mage Units assigned to it<br>lose 2 DMG for the rest of<br>this battle." };
en[75] = {what: "monst", type: "monst", title: "Angry Ogre", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>It gains +4 DMG unless you have a Warrior assigned to it." };
en[76] = {what: "monst", type: "monst", title: "Steelclaw Bear", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 19, text: "At the start of the Round:<br>Draw the last Ranger<br>from your deck." };
en[77] = {what: "monst", type: "monst", title: "Unyielding Wight", trait: "Undead Enemy", dmg: 4, hp: 16, trig: 14, text: "After it takes Damage:<br>If it has 4 or less HP, it regains 4 HP." };
en[78] = {what: "monst", type: "monst", title: "Beguiling Temptress", trait: "Demon Enemy", dmg: 4, hp: 16, trig: 27, text: "When you gain Battlescore:<br>Units in your Deck lose<br>that much Speed." };
en[79] = {what: "monst", type: "monst", title: "Resentful Provocateur", trait: "Orc Enemy", dmg: 4, hp: 16, trig: 1, text: "Before Combat:<br>Units in your Hand lose 1 DMG." };
en[80] = {what: "monst", type: "monst", title: "Feral Dragon", trait: "Beast Enemy", dmg: 4, hp: 16, trig: 16, text: "When another Enemy appears:<br>This gains +2 DMG." };




// boss: mon gain bs for erach unit in hand


co[1] = {what: "comm", type: "comm", title: "Logan Hawkthorne", trait: "Commander", dmg: 6, hp: 24, trig: 18, text: "Gain +2 Terrain Advantage<br>cards for Battles."};
co[2] = {what: "comm", type: "comm", title: "Aruna Wildbloom", trait: "Commander", dmg: 6, hp: 24, trig: 18, text: "You can keep<br>up to 2 cards per round."};
co[3] = {what: "comm", type: "comm", title: "Brendan Shadowcloak", trait: "Commander", dmg: 6, hp: 24, trig: 19, text: "At the start of a combat round:<br>If you have less than 4 cards in your hand, draw until you have 4 cards."};
co[4] = {what: "comm", type: "comm", title: "Kiera Silkeye", trait: "Commander", dmg: 6, hp: 24, trig: 18, text: "Your Skills have +7 Speed during Battles."};
co[5] = {what: "comm", type: "comm", title: "Jaylin Duskleaf", trait: "Commander", dmg: 6, hp: 24, trig: 18, text: "You get 30 extra gold<br>after each battle."};
co[6] = {what: "comm", type: "comm", title: "Wardell Redbraid", trait: "Commander", dmg: 6, hp: 24, trig: 20, text: "If an enemy has 3 or less<br>Health at the end of a round,<br>it dies."};
co[7] = {what: "comm", type: "comm", title: "Selina Oldsong", trait: "Commander", dmg: 6, hp: 24, trig: 18, text: "Start each battle with<br>+10 Battlescore."};
co[8] = {what: "comm", type: "comm", title: "Jakobe Stonegrave", trait: "Commander", dmg: 6, hp: 24, trig: 18, text: "Your units have<br>+2 Health during Battles."};

reg[1] = {type: "region", what: "mountain", title: "Coldstone Mountains", trait: "Mountain Region", fmod: 1, trig: 18,  text: "At battle start, your Ranger<br>units gain -2 DMG here."};
reg[2] = {type: "region", what: "woodland", title: "Northern Woods", trait: "Woodlands Region", fmod: 1, trig: 18, text: "Additional Beasts may attack you here."};
reg[3] = {type: "region", what: "woodland", title: "Quona River Shallows", trait: "Woodlands Region", fmod: -1, trig: 18, text: "Start the battle with +2 Swamp Terrain Advantage in your deck."};
reg[4] = {type: "region", what: "swamp", title: "The Frozen Marshes", trait: "Swamp Region", fmod: 1, trig: 18, text: "At battle start, your cards with more than 20 Speed lose 4 Speed here."};
reg[5] = {type: "region", what: "plains", title: "The Golden Savannah", trait: "Plains Region", fmod: -1, trig: 18, text: "You start at the<br>2nd Wave here."};
reg[6] = {type: "region", what: "mountain", title: "The Green Giants", trait: "Mountain Region", fmod: -1, trig: 18, text: "When you gain Battlescore, you gain 1 more here."};
reg[7] = {type: "region", what: "fortress", title: "Cobaltcreek Castle", trait: "Fortress Region", fmod: -1, trig: 18, text: "At battle start, your Warrior Units<br>gain +2 DMG here."};
reg[8] = {type: "region", what: "plains", title: "Hillfoot Meadows", trait: "Plains Region", fmod: 1, trig: 18, text: "Enemies have +2 Health here."};
reg[9] = {type: "region", what: "swamp", title: "The Sweltering Bog", trait: "Swamp Region", fmod: 1, trig: 18, text: "At the start of battle, your Units lose 2 Health here."};
reg[10] = {type: "region", what: "fortress", title: "Island Stronghold", trait: "Fortress Region", fmod: -1, trig: 18, text: "2 Ardent Recruits are put into your deck for this battle."};
reg[11] = {type: "region", what: "fortress", title: "Sky Citadel", trait: "Fortress Region", fmod: 1, trig: 18, text: "When you gain Battlescore, you gain 1 less here."};
reg[12] = {type: "region", what: "swamp", title: "The Deadmire", trait: "Swamp Region", fmod: 1, trig: 18, text: "Additional Undead may attack you here."};
reg[13] = {type: "region", what: "mountain", title: "The Barren Peaks", trait: "Mountain Region", fmod: 1, trig: 18,  text: "Additional Demons may attack you here."};
reg[14] = {type: "region", what: "woodland", title: "Abandoned Settlement", trait: "Woodlands Region", fmod: 1, trig: 18, text: "Start the battle with +2 Fortress Terrain Disadvantage in your deck."};
reg[15] = {type: "region", what: "plains", title: "Fertile Fiefdoms", trait: "Plains Region", fmod: -1, trig: 18, text: "At battle start, your cards with less than 20 Speed gain 4 Speed here (except Disadvantages)."};
reg[16] = {type: "region", what: "fortress", title: "Elevated Garrison", trait: "Fortress Region", fmod: -1, trig: 18, text: "Enemies have -2 Health here."};
reg[17] = {type: "region", what: "swamp", title: "Eastern Floodplains", trait: "Swamp Region", fmod: -1, trig: 18, text: "Start the battle with +2 Plains Terrain Advantage in your deck."};
reg[18] = {type: "region", what: "mountain", title: "Eagle Cliff", trait: "Mountain Region", fmod: -1, trig: 18,  text: "Start the battle with +2 Fortress Terrain Advantage in your deck."};
reg[19] = {type: "region", what: "woodland", title: "Runehewn Wildwoods", trait: "Woodlands Region", fmod: -1, trig: 18, text: "At the end of each round, if you have no Units in your Hand, deal each Enemy 2 Damage."};
reg[20] = {type: "region", what: "plains", title: "The Enchanted Plateau", trait: "Plains Region", fmod: -1, trig: 18, text: "At the start of battle, your Units gain 2 Health here."};
reg[21] = {type: "region", what: "fortress", title: "Alabaster Ramparts", trait: "Fortress Region", fmod: -1, trig: 18, text: "2nd and 3rd Enemies are less likely to appear here."};
reg[22] = {type: "region", what: "swamp", title: "The Greenmoor", trait: "Swamp Region", fmod: 1, trig: 18, text: "Start the battle with +2 Woodlands Terrain Disadvantage in your deck."};
reg[23] = {type: "region", what: "mountain", title: "The Crimson Ridge", trait: "Mountain Region", fmod: 1, trig: 18,  text: "Start the battle with +2 Swamp Terrain Disadvantage in your deck."};
reg[24] = {type: "region", what: "woodland", title: "The Corpse Jungle", trait: "Woodlands Region", fmod: 1, trig: 18, text: "At the end of each round, if there are no Enemies alive, deal each present Unit 1 Damage."};
reg[25] = {type: "region", what: "plains", title: "Tribal Territories", trait: "Plains Region", fmod: 1, trig: 18, text: "Additional Orcs may attack you here."};
reg[26] = {type: "region", what: "fortress", title: "Elven Hamlet", trait: "Fortress Region", fmod: -1, trig: 18, text: "Start the battle with +2 Woodlands Terrain Advantage in your deck."};
reg[27] = {type: "region", what: "swamp", title: "The Dragon Morass", trait: "Swamp Region", fmod: -1, trig: 18, text: "At battle start, your Mage Units<br>gain +2 DMG here."};
reg[28] = {type: "region", what: "mountain", title: "The Gates of Oblivion", trait: "Mountain Region", fmod: -1, trig: 18,  text: "At battle start, your Cleric Units<br>gain +2 DMG here."};
reg[29] = {type: "region", what: "woodland", title: "Outlaw Hideout", trait: "Woodlands Region", fmod: -1, trig: 18, text: "At battle start, your Rogue Units<br>gain +2 DMG here."};
reg[30] = {type: "region", what: "plains", title: "The Broken Land", trait: "Plains Region", fmod: -1, trig: 18, text: "Start the battle with +2 Mountains Terrain Advantage in your deck."};
reg[31] = {type: "region", what: "fortress", title: "Neglected Cathedral", trait: "Fortress Region", fmod: 1, trig: 18, text: "Start the battle with +2 Plains Terrain Disadvantage in your deck."};
reg[32] = {type: "region", what: "swamp", title: "Treacherous Muskeg", trait: "Swamp Region", fmod: 1, trig: 18, text: "At battle start, your Warrior Units<br>gain -2 DMG here."};
reg[33] = {type: "region", what: "mountain", title: "Hermit Hill", trait: "Mountain Region", fmod: 1, trig: 18,  text: "At the start of each round, if there is only 1 Enemy present, it gains +1 DMG and +3 HP."};
reg[34] = {type: "region", what: "woodland", title: "Rust Grove", trait: "Woodlands Region", fmod: 1, trig: 18, text: "At battle start, your Mage Units<br>gain -2 DMG here."};
reg[35] = {type: "region", what: "plains", title: "The Crystal Rapids", trait: "Plains Region", fmod: 1, trig: 18, text: "Start the battle with +2 Mountains Terrain Disadvantage in your deck."};
reg[36] = {type: "region", what: "fortress", title: "Heathen Village", trait: "Fortress Region", fmod: 1, trig: 18, text: "At battle start, your Cleric Units<br>gain -2 DMG here."};
reg[37] = {type: "region", what: "swamp", title: "Foul Slough", trait: "Swamp Region", fmod: 1, trig: 18, text: "At battle start, your Commander gains -2 DMG here."};
reg[38] = {type: "region", what: "mountain", title: "The Crippled Pike", trait: "Mountain Region", fmod: 1, trig: 18,  text: "The Healer's healing power is decreased by 2 here."};
reg[39] = {type: "region", what: "woodland", title: "Clandestine Shelter", trait: "Woodlands Region", fmod: -1, trig: 18, text: "The Healer's healing power is increased by 2 here."};
reg[40] = {type: "region", what: "plains", title: "The Turquoise Glacier", trait: "Plains Region", fmod: 1, trig: 18, text: "At battle start, your Rogue Units<br>gain -2 DMG here."};
reg[41] = {type: "region", what: "fortress", title: "The Lonely Tower", trait: "Fortress Region", fmod: -1, trig: 18, text: "When an Enemy appears in the 2nd Slot, its ability is blanked."};
reg[42] = {type: "region", what: "swamp", title: "The Sanguine Everglade", trait: "Swamp Region", fmod: -1, trig: 18, text: "At battle start, your commander gains +2 DMG here."};
reg[43] = {type: "region", what: "mountain", title: "The Olden Quarry", trait: "Mountain Region", fmod: -1, trig: 18,  text: "At the start of each round, if you have any Skills in your hand, draw a random Unit that can use one."};
reg[44] = {type: "region", what: "woodland", title: "Primeval Forest", trait: "Woodlands Region", fmod: 1, trig: 18, text: "When an Enemy dies, other present Enemies gain +1 DMG and +2 HP."};
reg[45] = {type: "region", what: "plains", title: "Ancient Tombs", trait: "Plains Region", fmod: -1, trig: 18, text: "At battle start, your Ranger Units<br>gain +2 DMG here."};
reg[46] = {type: "region", what: "fortress", title: "The Violet Bastion", trait: "Fortress Region", fmod: 1, trig: 18, text: "At the start of each round, if you have no Skills in your hand, discard your leftmost Unit from hand."};
reg[47] = {type: "region", what: "swamp", title: "The Livid Fens", trait: "Swamp Region", fmod: -1, trig: 18, text: "When a Unit dies, other present Units gain +2 DMG for the rest of the battle."};
reg[48] = {type: "region", what: "mountain", title: "Quartzshade Mountain", trait: "Mountain Region", fmod: -1, trig: 18,  text: "When an Enemy dies, the Unit that killed it is instantly promoted."};
reg[49] = {type: "region", what: "woodland", title: "Sunlit Thicket", trait: "Woodlands Region", fmod: -1, trig: 18, text: "At battle start, give your Units with 20 or less Speed +2 DMG."};
reg[50] = {type: "region", what: "plains", title: "Serpentine Grassland", trait: "Plains Region", fmod: 1, trig: 18, text: "When a Unit dies, other present Units lose all Experience."};
reg[51] = {type: "region", what: "plains", title: "Blessed Fields", trait: "Plains Region", fmod: -1, trig: 18, text: "Before Combat:<br>Put a random Terrain Advantage into your Hand."};
reg[52] = {type: "region", what: "plains", title: "Desolate Waste", trait: "Plains Region", fmod: -1, trig: 18, text: "Before Combat:<br>Put a random Terrain Disadvantage into your Hand."};

ada[1] = {what: "ada", type: "adv", title: "Close Quarters", trait: "Terrain Advantage", trig: 9, text: "When Drawn:<br>Draw the first card from your deck into your Hand.", perc: 15};
ada[2] = {what: "ada", type: "disadv", title: "Losing Ground", trait: "Terrain Disadvantage", trig: 9, text: "When Drawn:<br>The Monsters gain 4 Battlescore.", perc: 15};
ada[3] = {what: "ada", type: "adv", title: "Nature's Blessing", trait: "Terrain Advantage", trig: 6, text: "After Combat:<br>Present Units regain 2 Health.", perc: 15};
ada[4] = {what: "ada", type: "disadv", title: "Lost in the Woods", trait: "Terrain Disadvantage", trig: 9, text: "When Drawn:<br>Discard the leftmost Unit<br>from your Hand.", perc: 15};
ada[5] = {what: "ada", type: "adv", title: "Take the Initiative", trait: "Terrain Advantage", trig: 1, text: "Before Combat:<br>Present Enemies lose 1 DMG.", perc: 15};
ada[6] = {what: "ada", type: "disadv", title: "Stuck in the Mud", trait: "Terrain Disadvantage", trig: 9, text: "When Drawn:<br>Units in your Deck lose 4 Speed.", perc: 15};
ada[7] = {what: "ada", type: "adv", title: "Level Fields", trait: "Terrain Advantage", trig: 9, text: "When Drawn:<br>Units in your Deck gain +4 Speed.", perc: 15};
ada[8] = {what: "ada", type: "disadv", title: "Caught in the Crossfire", trait: "Terrain Disadvantage", trig: 9, text: "When Drawn:<br>Units in your Hand lose 2 Health.", perc: 15};
ada[9] = {what: "ada", type: "adv", title: "Defend the Walls", trait: "Terrain Advantage", trig: 9, text: "When Drawn:<br>You gain 4 Battlescore.", perc: 15};
ada[10] = {what: "ada", type: "disadv", title: "Ambush from the Shadows", trait: "Terrain Disadvantage", trig: 1, text: "Before Combat:<br>Present Enemies gain +1 DMG.", perc: 15};
ada[11] = {what: "ada", type: "adv", title: "Hail of Sparks", trait: "Hero Advantage", trig: 9, text: "When Drawn:<br>Deal all Enemies 1 Damage.", perc: 40};
ada[12] = {what: "ada", type: "disadv", title: "Dread of Doom", trait: "Curse Disadvantage", trig: 1, text: "After Combat:<br>Every present Unit loses 1 Health and 1 DMG", perc: 20};
ada[13] = {what: "ada", type: "disadv", title: "Curse of Weakness", trait: "Curse Disadvantage", trig: 1, text: "After Combat:<br>All present Units lose 1 DMG<br>and 4 Speed", perc: 20};
ada[14] = {what: "ada", type: "disadv", title: "Chaos Curse", trait: "Curse Disadvantage", trig: 1, text: "This round, the 1st Units<br>assigned to Enemies can't retaliate.", perc: 15};
ada[15] = {what: "ada", type: "disadv", title: "Orcish War Cry", trait: "Battle Disadvantage", trig: 1, text: "After Combat:<br>Present Enemies gain +2 DMG.", perc: 15};
ada[16] = {what: "ada", type: "disadv", title: "Overwhelming Numbers", trait: "Battle Disadvantage", trig: 9, text: "When Drawn:<br>A new Enemy appears in the 2nd and 3rd slots, replacing what's already there.", perc: 15};
ada[17] = {what: "ada", type: "disadv", title: "Hunted Down", trait: "Battle Disadvantage", trig: 9, text: "Before Combat:<br>Discard your slowest present Unit.<br>(If tied, one of the slowest at random).", perc: 15};
ada[18] = {what: "ada", type: "disadv", title: "Poison Cloud", trait: "Battle Disadvantage", trig: 9, text: "When Drawn:<br>Units in your hand and deck each lose 1 Health.", perc: 25};
ada[19] = {what: "ada", type: "disadv", title: "Curse of Weakness", trait: "Curse Disadvantage", trig: 9, text: "Your Commander can't retaliate against the 1st Enemy.", perc: 20};
ada[20] = {what: "ada", type: "disadv", title: "Dark Forces", trait: "Curse Disadvantage", trig: 9, text: "After Combat:<br>Present Enemies regain 3 Health.", perc: 15};
ada[21] = {what: "ada", type: "disadv", title: "Vampiric Vines", trait: "Battle Disadvantage", trig: 9, text: "Before Combat:<br>Present Units lose 1 HP and present Enemies regain 1 HP.", perc: 20};
// undead vampiric vines: before combat: present units lose 1 HP and present enemies gain 1 HP. 

skill[1] = {what: "skill", type: "skred", title: "Inspiring Charge", trait: "Warrior Skill", trig: 1, text: "Before Combat:<br>Your attacking Warriors and their assisting Units gain +1 DMG for the rest of this battle.", perc: 10, cost: 10};
skill[2] = {what: "skill", type: "skblue", title: "Quiet Prayer", trait: "Cleric Skill", trig: 1, text: "Before Combat:<br>If you have a Cleric in your hand, your Units assigned to Enemies regain 3 Health.", perc: 10, cost: 10};
skill[3] = {what: "skill", type: "skpurp", title: "Melt Weapons", trait: "Mage Skill", trig: 1, text: "Before Combat:<br>If you have a Mage in your hand, all Enemies lose 2 DMG.", perc: 10, cost: 10};
skill[4] = {what: "skill", type: "skgreen", title: "Taunting Foes", trait: "Ranger Skill", trig: 2, text: "The first Ranger assigned to an Enemy fights it again instead of your Commander.", perc: 10, cost: 10};
skill[5] = {what: "skill", type: "skred", title: "Siege Tactics", trait: "Warrior Skill", trig: 1, text: "Before Combat:<br>if you have a Warrior in the Fray, gain 5 Battlescore.", perc: 10, cost: 10};
skill[6] = {what: "skill", type: "skblue", title: "Holy Shield", trait: "Cleric Skill", trig: 14, text: "If you have a Cleric present, each Damage your units take is decreased by 1.", perc: 10, cost: 10};
skill[7] = {what: "skill", type: "skindi", title: "Sabotage the Enemy", trait: "Rogue Skill", trig: 5, text: "After Attacking: If one of your Rogues kills an Enemy in Combat, decrease the maximum number<br>of Waves by 1.", perc: 10, cost: 10};
skill[8] = {what: "skill", type: "skpurp", title: "Channel Power", trait: "Mage Skill", trig: 1, text: "Before Combat:<br>If you have a Mage in your hand, your Commander gains +1 DMG for the rest of this Combat.", perc: 10, cost: 10};
skill[9] = {what: "skill", type: "skgreen", title: "Expose Weakness", trait: "Ranger Skill", trig: 1, text: "Before Combat:<br>Your Rangers deal 3 Damage<br>to their assigned Enemy.", perc: 10, cost: 10};
skill[10] = {what: "skill", type: "skindi", title: "Learn by Example", trait: "Rogue Skill", trig: 17, text: "If a Rogue's Assisting Unit gains Experience in Combat, so does the Rogue.", perc: 10, cost: 10};
skill[11] = {what: "skill", type: "skred", title: "Renowned Leadership", trait: "Warrior Skill", trig: 1, text: "After Combat:<br>for each Warrior in your Hand, give 3 random Units in your deck<br>+1 DMG and +2 HP for the rest of this battle.", perc: 10, cost: 10};
skill[12] = {what: "skill", type: "skblue", title: "Shield of Faith", trait: "Cleric Skill", trig: 1, text: "After Combat:<br>If you have a Cleric present, your Commander regains 3 Health.", perc: 10, cost: 10};
skill[13] = {what: "skill", type: "skpurp", title: "Study Adversary", trait: "Mage Skill", trig: 1, text: "Before Combat:<br>If the Boss is visible, lower its HP by 2 (to a minimum of 10) if you have a Mage in your Hand.", perc: 10, cost: 10};
skill[14] = {what: "skill", type: "skgreen", title: "Setting up an Ambush", trait: "Ranger Skill", trig: 2, text: "When an Enemy appears:<br>If you have a Ranger in your hand, deal that Enemy 2 Damage.", perc: 10, cost: 10};
skill[15] = {what: "skill", type: "skindi", title: "Escape Death", trait: "Rogue Skill", trig: 17, text: "When a Rogue would die:<br>That Rogue remains alive with 1 HP left.", perc: 10, cost: 10};
skill[16] = {what: "skill", type: "skred", title: "Double Strike", trait: "Warrior Skill", trig: 1, text: "After Attacking:<br>If a Warrior kills an Enemy, he deals Damage to the next Enemy too.", perc: 10, cost: 10};
skill[17] = {what: "skill", type: "skblue", title: "Lifesaver Aura", trait: "Cleric Skill", trig: 1, text: "After Combat:<br>If you have a Cleric present, each present Unit with less than 5 HP regains 3 Health.", perc: 10, cost: 10};
skill[18] = {what: "skill", type: "skpurp", title: "Hasten Spell", trait: "Mage Skill", trig: 1, text: "Before Combat:<br>If you have a Mage in your hand, give all your cards (except Disadvantages) +4 Speed.", perc: 10, cost: 10};
skill[19] = {what: "skill", type: "skgreen", title: "Environment Expertise", trait: "Ranger Skill", trig: 2, text: "Before Combat:<br>place a current Terrain Advantage into your deck for each Ranger present.", perc: 10, cost: 10};
skill[20] = {what: "skill", type: "skindi", title: "Hidden Daggers", trait: "Rogue Skill", trig: 17, text: "When you kill an Enemy:<br>Gain +2 Battlescore for each Rogue in your Hand.", perc: 10, cost: 10};
skill[21] = {what: "skill", type: "skred", title: "Hurricane Barrage", trait: "Warrior Skill", trig: 1, text: "Before Combat:<br>If you have a Warrior assigned<br>to the first Enemy and it's not the Enemy with the least HP, swap this with that Enemy.", perc: 10, cost: 10};
skill[22] = {what: "skill", type: "skblue", title: "Light in the Darkness", trait: "Cleric Skill", trig: 1, text: "Before Combat:<br>If you have a Cleric in your Hand, make the Healer appear in the 3rd slot even if there's something else there currently.", perc: 10, cost: 10};
skill[23] = {what: "skill", type: "skpurp", title: "Mirror Image", trait: "Mage Skill", trig: 1, text: "Before Combat:<br>Create a copy of a random Mage in your hand (for this battle only).", perc: 10, cost: 10};
skill[24] = {what: "skill", type: "skgreen", title: "Laying Traps", trait: "Ranger Skill", trig: 2, text: "Before Combat:<br>If you have a Ranger present,<br>give each present Unit with less<br>than 10 HP +1 DMG for the rest<br>of this battle.", perc: 10, cost: 10};
skill[25] = {what: "skill", type: "skindi", title: "Dodge Enemies", trait: "Rogue Skill", trig: 17, text: "Before Combat: If you have a Rogue present and didn't assign any cards, Combat is skipped this round and new Enemies appear instead of the current ones.", perc: 10, cost: 10};
skill[26] = {what: "skill", type: "skindi", title: "Clearing a Path", trait: "Rogue Skill", trig: 17, text: "At Round Start: If you have a Rogue present and the Fray is not visible, make the Fray appear in the 1st slot even if there's something else there currently.", perc: 10, cost: 10};
skill[27] = {what: "skill", type: "skred", title: "Relentless Attack", trait: "Warrior Skill", trig: 1, text: "After Attacking:<br>If a Warrior is assigned alone to<br>an Enemy, he gains 2 HP and attacks that Enemy again.", perc: 10, cost: 10};
skill[28] = {what: "skill", type: "skblue", title: "Call for Assistance", trait: "Cleric Skill", trig: 1, text: "At the start of a Round:<br>If you have a Cleric in your Hand, draw your slowest Unit.", perc: 10, cost: 10};
skill[29] = {what: "skill", type: "skpurp", title: "Phantom Blades", trait: "Mage Skill", trig: 1, text: "After Combat:<br>If you have a Mage in your Hand, deal each enemy 2 Damage.", perc: 10, cost: 10};
skill[30] = {what: "skill", type: "skgreen", title: "Agile Maneuvers", trait: "Ranger Skill", trig: 2, text: "At the End of the Round:<br>Keep your Rangers that are assigned to Enemies.", perc: 10, cost: 10};

// warrior duplázó skill: 1st slotba a skill lap kerüljön


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
hint[3] = "Card Trait.<br>";


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
            hintgen += "Max Health: "+shown.basehp;
            break;
        case 3:
            if (shown.temp){
                hintgen += "<br>* = this card will be removed from your deck after battle.";
            }
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

$( ".cardtrait" ).on( "mouseenter", function( event ) {
    showhint(event, 3);    
});

$( ".cardtrait" ).on( "mouseleave",  function( event ) {
    $(".hintdiv").css('display',"none");
});


ccount = () => {
    
    var c1 = 0;
    var c2 = 0;
    var c3 = 0;
    var c4 = 0;
    var c5 = 0;
    var d1 = 0;
    var d2 = 0;
    var d3 = 0;
    var d4 = 0;
    var d5 = 0;
    
    for (let i = 1; i < en.length; i++) {
        
        switch (en[i].trait){
            case "Orc Enemy":
                c1++;
                break;
            case "Beast Enemy":
                c2++;
                break;
            case "Undead Enemy":
                c3++;
                break;
            case "Demon Enemy":
                c4++;
                break;
        }
    }
    
    console.log("Orc Enemy. "+c1);
    console.log("Beast Enemy. "+c2);
    console.log("Undead Enemy. "+c3);
    console.log("Demon Enemy. "+c4);
    
    c1 = 0;
    c2 = 0;
    c3 = 0;
    c4 = 0;
        
    for (let i = 1; i < char.length; i++) {
        
        switch (char[i].trait){
            case "Rogue Hero":
                c1++;
                break;
            case "Cleric Hero":
                c2++;
                break;
            case "Mage Hero":
                c3++;
                break;
            case "Warrior Hero":
                c4++;
                break;
            case "Ranger Hero":
                c5++;
                break;
        }
        
        switch (char[i].perc){
            case 30:
                d1++;
                break;
            case 25:
                d2++;
                break;
            case 20:
                d3++;
                break;
            case 15:
                d4++;
                break;
            
        }
    }
    
    console.log("************");
    
    console.log("Rogue Hero. "+c1);
    console.log("Cleric Hero. "+c2);
    console.log("Mage Hero. "+c3);
    console.log("Warrior Hero. "+c4);
    console.log("Ranger Hero. "+c5);
    
    console.log("speed 30. "+d1);
    console.log("speed 25. "+d2);
    console.log("speed 20. "+d3);
    console.log("speed 15. "+d4);
    
    c1 = 0;
    c2 = 0;
    c3 = 0;
    c4 = 0;
    c5 = 0;
    d1 = 0;
    d2 = 0;
    d3 = 0;
    d4 = 0;
    d5 = 0;
    
    for (let i = 1; i < reg.length; i++) {
        
        switch (reg[i].trait){
            case "Mountain Region":
                c1++;
                d1 += reg[i].fmod;
                break;
            case "Plains Region":
                c2++;
                d2 += reg[i].fmod;
                break;
            case "Fortress Region":
                c3++;
                d3 += reg[i].fmod;
                break;
            case "Swamp Region":
                c4++;
                d4 += reg[i].fmod;
                break;
            case "Woodlands Region":
                c5++;
                d5 += reg[i].fmod;
                break;
        }
    }
    
    console.log("************");
    
    console.log("Mountain Region. "+c1+", fmod: "+d1);
    console.log("Plains Region. "+c2+", fmod: "+d2);
    console.log("Fortress Region. "+c3+", fmod: "+d3);
    console.log("Swamp Region. "+c4+", fmod: "+d4);
    console.log("Woodlands Region. "+c5+", fmod: "+d5);
    
};