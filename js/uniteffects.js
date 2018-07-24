/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


uniteff = (cid) => {
    
    var glow = false;
    
    switch (cardbyid[cid].abnum){
        case 1:
            // No ability.
            break;
        case 2:
            writelog("<br><font color=\"orchid\">When Discarded: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
            for (let i = 1; i < 4; i++) {
                if ((cardbyid[enemies[i].children()[0].id].type == "monst") && (cardbyid[enemies[i].children()[0].id].hp > 0)){
                    glow = true;
                    writelog("<br><card id=\"" + enemies[i].children()[0].id + "\">" + cardbyid[enemies[i].children()[0].id].title + "</card> loses 3 Health.");
                    cardbyid[enemies[i].children()[0].id].hp -= 3;
                    checkdead(enemies[i].children()[0].id, 0);
                }
            }
            if (!glow){
                writelog("<br>There are no enemies left alive.");
            }
            break;
        case 3:
            if (cardbyid[cardbyid[cid].assign].hp <= 0){
                glow = true;
                writelog("<br><font color=\"orchid\">After Attacking: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                heal(cid, 5);
                writelog("<br>He regains "+actheal+" Health.");
                
            }
            break;
        case 4:
            if ((cardbyid[cardbyid[cid].assign].type == "monst") && (cardbyid[cardbyid[cid].assign].hp > 0)){
                glow = true;
                writelog("<br><font color=\"orchid\">After Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                writelog("<br><card id=\"" + cardbyid[cid].assign + "\">" + cardbyid[cardbyid[cid].assign].title + "</card> loses 3 Health.");
                cardbyid[cardbyid[cid].assign].hp -= 3;
                checkdead(cardbyid[cid].assign, 0);
            }
            break;
        case 5:
            break;
        case 6:
            glow = true;
            writelog("<br><font color=\"orchid\">After Attacking: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
            gold += 2;
            writelog("<br>You gain 2 Gold.");
            break;
        case 7:
            glow = true;
            writelog("<br><font color=\"orchid\">In the Fray: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
            bscore += 2;
            writelog("<br>You gain 2 Battlescore.");
            break;
        case 8:
            if (cardbyid[cardbyid[cid].assign].type == "monst"){
                glow = true;
                writelog("<br><font color=\"orchid\">After Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                heal(cid, 2);
                writelog("<br>She regains "+actheal+" Health.");
                heal(cardbyid[cid].assist, 2);
                writelog("<br><card id=\"" + cardbyid[cid].assist + "\">" + cardbyid[cardbyid[cid].assist].title + "</card> regains "+actheal+" Health.");
                
            }
            break;
        case 9:
            break;
        case 10:
            break;
        case 11:
            if (cardbyid[cardbyid[cid].assign].type == "monst"){
                glow = true;
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                writelog("<br><card id=\"" + cardbyid[cid].assign + "\">" + cardbyid[cardbyid[cid].assign].title + "</card> loses 2 Health.");
                cardbyid[cardbyid[cid].assign].hp -= 2;
                checkdead(cardbyid[cid].assign, 0);
            }
            break;
        case 12:
            if ((cardbyid[cardbyid[cid].assign].type == "monst") && (cardbyid[cid].assist == 0)){
                glow = true;
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                cardbyid[cid].dmg += 2;
                writelog("<br>Her DMG is now "+cardbyid[cid].dmg+".");
                
            }
            break;
        case 13:
            break;
        case 14:
            break;
        case 15:
            glow = true;
            writelog("<br><font color=\"orchid\">When Discarded: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
            recruit = 1;
            generate (1, "#deck");
            recruit = 0;
            cardbyid[hanylapvan].temp = true;
            writelog("<br>An <card id=\"" + hanylapvan + "\">" + cardbyid[hanylapvan].title + "</card> is added to your deck.");
            break;
        case 16:
            if (cardbyid[cardbyid[cid].assign].type == "monst"){
                glow = true;
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                writelog("<br><card id=\"" + cardbyid[cid].assign + "\">" + cardbyid[cardbyid[cid].assign].title + "</card> loses 1 DMG.");
                cardbyid[cardbyid[cid].assign].dmg -= 1;
                if (cardbyid[cardbyid[cid].assign].dmg < 0){
                    cardbyid[cardbyid[cid].assign].dmg = 0;
                }
            }
            break;
        case 17:
            break;
        case 18:
            break;
        
    }
    
};