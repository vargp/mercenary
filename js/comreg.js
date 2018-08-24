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
            //
            break;
        case 3:
            //
            break;
        case 4:
            //
            break;
        case 5:
            //
            break;
        case 6:
            //
            break;
        case 7:
            //
            break;
        case 8:
            //
            break;
        
    }
    
};