/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


commeff = (cid) => {
    
    switch (cardbyid[cid].abnum){
        case 1:
            // Gain +2 Terrain Advantage cards for Battles.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> lets you gain advantage of the terrain.</font>");
            terrada(true);
            terrada(true);
            break;
        case 2:
            // You can keep<br>up to 2 cards per round.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> lets you Keep one more card.</font>");
            keepnum = 2;
            break;
        case 3:
            // At the start of a combat round:<br>If you have less than 4 cards in your hand, draw until you have 4 cards.
            if ($("#avnow").children().length < 4){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> lets you draw up to 4 cards.</font>");
                do {
                    writelog("<br>You draw <card id=\"" + $("#deck").children()[0].id + "\">" + cardbyid[$("#deck").children()[0].id].title + "</card>.");
                    drawcard($("#deck").children()[0].id);
                } while ($("#avnow").children().length < 4)
            }
            break;
        case 4:
            // Your Skills have +7 Speed during Battles.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> raises the Speed of your skills.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "skill"){
                    cardbyid[$(this).attr("id")].perc += 7;
                }
            });
            break;
        case 5:
            // You get 30 extra gold<br>after each battle.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> increases your Gold reward.</font>");
            cardbyid[bfdetails].gold += 30;
            cardbyid[bfdetails].goldlose += 30;
            break;
        case 6:
            // If an enemy has 3 or less<br>Health at the end of a round,<br>it dies.
            for (let i = 1; i < 4; i++) {
                if (enemies[i].children()[0] != undefined){ 
                    // console.log("type: "+cardbyid[enemies[i].children()[0].id].type+", trig: "+cardbyid[enemies[i].children()[0].id].trig)
                    if ((cardbyid[enemies[i].children()[0].id].what == "monst") && (cardbyid[enemies[i].children()[0].id].hp < 4)){
                        writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> kills <card id=\"" + enemies[i].children()[0].id + "\">" + cardbyid[enemies[i].children()[0].id].title + "</card>.</font>");
                        cardbyid[enemies[i].children()[0].id].hp = 0;
                        checkdead(enemies[i].children()[0].id, 0);
                    }
                }
            }
            break;
        case 7:
            // Start each battle with<br>+10 Battlescore.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> raises your Battlescore.</font>");
            bscore += 10;
            showbscore();
            break;
        case 8:
            // Your units have<br>+2 Health during Battles.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> raises the Health of your units.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "unit"){
                    cardbyid[$(this).attr("id")].hp += 2;
                }
            });
            break;
        
    }
    
};

regeff = (cid) => {
    
    switch (cardbyid[cid].abnum){
        case 1:
            // At battle start, your Ranger<br>units gain -2 DMG here
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> lowers the Damage of your Rangers.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Ranger Hero"){
                    cardbyid[$(this).attr("id")].dmg -= 2;
                }
            });
            break;
        case 2:
            // Additional Beasts may attack you here.
            break;
        case 3:
            // Start the battle with +2 Swamp Terrain Advantage in your deck.
            break;
        case 4:
            // At battle start, your cards with more than 20 Speed lose 4 Speed here.
            break;
        case 5:
            // You start at the<br>2nd Wave here.
            break;
        case 6:
            // When you gain Battlescore, you gain 1 more here.
            break;
        case 7:
            // At battle start, your Warrior Units<br>gain +2 DMG here.
            break;
        case 8:
            // Enemies have +2 Health here.
            break;
        case 9:
            // At the start of battle, your Units lose 2 Health here.
            break;
        case 10:
            // 2 Ardent Recruits are put into your deck for this battle.
            break;
        case 11:
            // When you gain Battlescore, you gain 1 less here.
            break;
        case 12:
            // Additional Undead may attack you here.
            break;
        case 13:
            // Additional Demons may attack you here.
            break;
        case 14:
            // Start the battle with +2 Fortress Terrain Disadvantage in your deck.
            break;
        case 15:
            // At battle start, your cards with less than 20 Speed gain 4 Speed here (except Disadvantages).
            break;
        case 16:
            // Enemies have -2 Health here.
            break;
        case 17:
            // Start the battle with +2 Plains Terrain Advantage in your deck.
            break;
        case 18:
            // Start the battle with +2 Fortress Terrain Advantage in your deck.
            break;
        case 19:
            // At the end of each round, if you have no Units in your Hand, deal each Enemy 2 Damage.
            break;
        case 20:
            // At the start of battle, your Units gain 2 Health here.
            break;
		case 21:
            // 2nd and 3rd Enemies are less likely to appear here.
            break;
        case 22:
            // Start the battle with +2 Woodlands Terrain Disadvantage in your deck.
            break;
        case 23:
            // Start the battle with +2 Swamp Terrain Disadvantage in your deck.
            break;
        case 24:
            // At the end of each round, if there are no Enemies alive, deal each present Unit 1 Damage.
            break;
        case 25:
            // Additional Orcs may attack you here.
            break;
        case 26:
            // Start the battle with +2 Woodlands Terrain Advantage in your deck.
            break;
        case 27:
            // At battle start, your Mage Units<br>gain +2 DMG here.
            break;
        case 28:
            // At battle start, your Cleric Units<br>gain +2 DMG here.
            break;
        case 29:
            // At battle start, your Rogue Units<br>gain +2 DMG here
            break;
        case 30:
            // Start the battle with +2 Mountains Terrain Advantage in your deck.
            break;
		case 31:
            // Start the battle with +2 Plains Terrain Disadvantage in your deck.
            break;
        case 32:
            // At battle start, your Warrior Units<br>gain -2 DMG here.
            break;
        case 33:
            // At the start of each round, if there is only 1 Enemy present, it gains +1 DMG and +3 HP.
            break;
        case 34:
            // At battle start, your Mage Units<br>gain -2 DMG here.
            break;
        case 35:
            // Start the battle with +2 Mountains Terrain Disadvantage in your deck.
            break;
        case 36:
            // At battle start, your Cleric Units<br>gain -2 DMG here.
            break;
        case 37:
            // At battle start, your Commander gains -2 DMG here.
            break;
        case 38:
            // The Healer's healing power is decreased by 2 here.
            break;
        case 39:
            // the Healer's healing power is increased by 2 here.
            break;
        case 40:
            // At battle start, your Rogue Units<br>gain -2 DMG here.
            break;
		case 41:
            // When an Enemy appears in the 2nd Slot, its ability is blanked.
            break;
        case 42:
            // At battle start, your commander gains +2 DMG here.
            break;
        case 43:
            // At the start of each round, if you have any Skills in your hand, draw a Unit that can use one.
            break;
        case 44:
            // When an Enemy dies, other present Enemies gain +1 DMG and +2 HP.
            break;
        case 45:
            // At battle start, your Ranger Units<br>gain +2 DMG here.
            break;
        case 46:
            // At the start of each round, if you have no Skills in your hand, discard your leftmost Unit from hand.
			// too strong??
            break;
        case 47:
            // When a Unit dies, other present Units gain +2 DMG for the rest of the battle.
            break;
        case 48:
            // When an Enemy dies, the Unit that killed it is instantly promoted.
            break;
        case 49:
            // At battle start, give your Units with 20 or less Speed +2 DMG.
            break;
        case 50:
            // When a Unit dies, other present Units lose all Experience.
            break;
		case 51:
            // Before Combat:<br>Put a random Terrain Advantage into your Hand.
            break;
        case 52:
            // Before Combat:<br>Put a random Terrain Disadvantage into your Hand.
            break;
    }
    
};