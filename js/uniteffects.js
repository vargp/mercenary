/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


uniteff = (cid) => {
    
    
    switch (cardbyid[cid].abnum){
        case 1:
            // No ability.
            break;
        case 2:
            // When discarded from your hand:<br>Deal all enemies 3 Damage.
            if (discthis == cid){
                var damcount = 0;
                writelog("<br><font color=\"orchid\">When Discarded: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                for (let i = 1; i < 4; i++) {
                    if ((cardbyid[enemies[i].children()[0].id].type == "monst") && (cardbyid[enemies[i].children()[0].id].hp > 0)){
                        damcount ++;
                        damage (enemies[i].children()[0].id, 3);

                    }
                }
                if (damcount == 0){
                    writelog("<br>There are no enemies left alive.");
                }
            }
            break;
        case 3:
            // After Attacking:<br>If he killed his enemy,<br>he regains 5 Health.
            if ((attacked == cid) && (cardbyid[cardbyid[cid].assign].hp <= 0)){
                
                writelog("<br><font color=\"orchid\">After Attacking: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                heal(cid, 5);
                writelog("<br>He regains "+actheal+" Health.");
                
            }
            break;
        case 4:
            // After Combat:<br>If her enemy is still alive,<br>she deals 3 damage to it
            if ((cardbyid[cardbyid[cid].assign].type == "monst") && (cardbyid[cardbyid[cid].assign].hp > 0)){
                
                writelog("<br><font color=\"orchid\">After Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                
                damage (cardbyid[cid].assign, 3);
                
            }
            break;
        case 5:
            // During Combat:<br>If he's fighting an Enemy, opponents can't remove cards from your deck.
            if ((cardbyid[cardbyid[cid].assign].type == "monst") && (oppeff)){
                canceled = true;
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> prevents this ability!</font>");
            }   
            
            break;
        case 6:
            // After Attacking:<br>Gain 2 Gold.
            if (attacked == cid){
                
                writelog("<br><font color=\"orchid\">After Attacking: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                gold += 2;
                writelog("<br>You gain 2 Gold.");
            }
            break;
        case 7:
            // In the Fray:<br>He gives you +2 Battlescore
            if (cardbyid[cardbyid[cid].assign].type == "fray"){
                
                writelog("<br><font color=\"orchid\">In the Fray: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                bscore += 2;
                showbscore();
                writelog("<br>You gain 2 Battlescore.");
            }
            break;
        case 8:
            // After Combat:<br>If she was fighting an Enemy,<br>she and her assisting Unit<br>regains 2 Health
            if (cardbyid[cardbyid[cid].assign].type == "monst"){
                
                writelog("<br><font color=\"orchid\">After Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                heal(cid, 2);
                writelog("<br>She regains "+actheal+" Health.");
                heal(cardbyid[cid].assist, 2);
                writelog("<br><card id=\"" + cardbyid[cid].assist + "\">" + cardbyid[cardbyid[cid].assist].title + "</card> regains "+actheal+" Health.");
                
            }
            break;
        case 9:
            // Can only lose Health<br>when attacked in Combat
            if ((cid != attacked) && (takedamage == cid)){
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> can only lose Health in battle.");
                tdamount = 0;
            }
            break;
        case 10:
            // At the Healer:<br>Increase the Healer's Health restoring power by 1 for the rest of this battle
            if (healed == cid){
                writelog("<br><font color=\"orchid\">At the Healer: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                healval[battlenum] ++;
                writelog("<br>The Healer's healing power has gone up to "+healval[battlenum]+".");
            }
            break;
        case 11:
            // Before Combat:<br>The Enemy he's assigned to<br>loses 2 Health.
            if (cardbyid[cardbyid[cid].assign].type == "monst"){
                
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                
                damage (cardbyid[cid].assign, 2);
                
            }
            break;
        case 12:
            // Before Combat:<br>She gains +2 DMG for the<br>duration of this battle if assigned to<br>an Enemy on her own.
            if ((cardbyid[cardbyid[cid].assign].type == "monst") && (cardbyid[cid].assist == 0)){
                
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                cardbyid[cid].dmg += 2;
                writelog("<br>Her DMG is now "+cardbyid[cid].dmg+".");
                
            }
            break;
        case 13:
            // Before Combat:<br>If there are any Disadvantage cards in your hand, remove them from your deck.
            
            break;
        case 14:
            // At the Healer:<br>If you are in a Forest Region, add a Terrain Advantage to your hand.
            if ((cardbyid[cardbyid[cid].assign].type == "heal") && (cardbyid[bfield].what == "woodland")){
                writelog("<br><font color=\"orchid\">At the Healer: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses herspecial ability!</font>");
                terrada(true);
                $("#avnow").append($(".cardc[id=\""+hanylapvan+"\"]"));
            }
            break;
        case 15:
            // When discarded from your hand:<br>Add an Ardent Recruit to your deck for the duration of this Battle.
            if (discthis == cid){
                
                writelog("<br><font color=\"orchid\">When Discarded: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                recruit = 1;
                generate (1, "#deck");
                recruit = 0;
                cardbyid[hanylapvan].temp = true;
                writelog("<br>An <card id=\"" + hanylapvan + "\">" + cardbyid[hanylapvan].title + "</card> is added to your deck.");
            }
            break;
        case 16:
            // Before Combat:<br>Lower this enemy's DMG by 1
            if (cardbyid[cardbyid[cid].assign].type == "monst"){
               
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                writelog("<br><card id=\"" + cardbyid[cid].assign + "\">" + cardbyid[cardbyid[cid].assign].title + "</card> loses 1 DMG.");
                cardbyid[cardbyid[cid].assign].dmg -= 1;
                if (cardbyid[cardbyid[cid].assign].dmg < 0){
                    cardbyid[cardbyid[cid].assign].dmg = 0;
                }
            }
            break;
        case 17:
            // In the Fray: If you've gained Battlescore in the Fray this turn, he gains +2 DMG for the rest of this Battle
            if ((cardbyid[cardbyid[cid].assign].type == "fray") && (curfray < 0)){
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card><font color=\"orchid\"> gains +2 DMG.</font>");
                cardbyid[cid].dmg += 2;
            }
            break;
        case 18:
            // It takes any damage instead<br>of its assisting unit too.
            if (takedamage == cardbyid[cid].assist){
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> <font color=\"orchid\"> takes the hit!</font>");
                takedamage = cid;
            }
            break;
        
    }
    
};