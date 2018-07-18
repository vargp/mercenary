/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


uniteff = (cid) => {
    
    var glow = false;
    
    switch (cardbyid[cid].abnum){
        case 1:
            break;
        case 2:
            break;
        case 3:
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
            break;
        case 7:
            break;
        case 8:
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