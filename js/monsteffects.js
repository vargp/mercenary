/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


monsteff = (cid) => {
    
    var glow = false;
    //$(".cardc").css("box-shadow", "0 0 10px 2px #000");
    
    switch (cardbyid[cid].abnum){
        case 1:
            break;
        case 2:
            break;
        case 3:
            if (cardbyid[attacked].hp < 5){
                glow = true;
                writelog("<br><font color=\"orchid\">After Attacking: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                retaliate = false;
            }
            break;
        case 4:
            break;
        case 5:
            if (cardbyid[cid].hp > 0){
                glow = true;
                writelog("<br><font color=\"orchid\">After Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                maxwave ++;
                $("#wave").html("Wave "+curwave+" / "+maxwave);
                writelog("<br>The number of Waves in this battle went up to "+maxwave+".");
            }
            
            break;
        case 6:
            if (cardbyid[cid].assign != 0){
                glow = true;
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                
                writelog("<br><card id=\"" + cardbyid[cid].assign + "\">" + cardbyid[cardbyid[cid].assign].title + "</card> has lost 3 health.");
                cardbyid[cardbyid[cid].assign].hp -= 3;
                checkdead(cardbyid[cid].assign, 0);
                
                if (cardbyid[cid].assist != 0){
                    
                    writelog("<br><card id=\"" + cardbyid[cid].assist + "\">" + cardbyid[cardbyid[cid].assist].title + "</card> has lost 3 health.");
                    cardbyid[cardbyid[cid].assist].hp -= 3;
                    checkdead(cardbyid[cid].assist, 0);
                        
                    
                }
            }
            break;
        case 7:
            break;
        case 8:
            if (cardbyid[cid].assign != 0){
                glow = true;
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                cardbyid[cid].dmg += 2;
                if (cardbyid[cid].assist != 0){
                    cardbyid[cid].dmg += 2;
                }
                writelog("<br>DMG is now raised up to "+cardbyid[cid].dmg+".");
            }
            break;
        
    }
    
    if (glow){
        //setTimeout(function(){
        //    $(".cardc[id=\""+cid+"\"]").css("box-shadow", "0 0 6px 3px gold");
        //    showcard(cid);
        //}, delay);
        //delay += 100;
    }
    
};