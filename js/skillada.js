/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


skilleff = (cid) => {
    
    switch (cardbyid[cid].abnum){
        case 1:
            // Before Combat:<br>Your attacking Warriors and their assisting Units gain +1 DMG for the rest of this battle.
            for (let i = 1; i < 4; i++) {
                for (let j = 1; j < 3; j++) {
                    if (enemies[i].children()[j] != undefined){  
                        if ((cardbyid[enemies[i].children()[j].id].trait == "Warrior Hero") && (cardbyid[cardbyid[enemies[i].children()[j].id].assign].type == "monst")){
                            writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> increases DMG!</font>");
                            cardbyid[enemies[i].children()[j].id].dmg ++;
                            if (cardbyid[enemies[i].children()[j].id].assist != 0){
                                cardbyid[cardbyid[enemies[i].children()[j].id].assist].dmg ++;
                            }
                        }
                    }
                }
            }
            break;
        case 2:
            // Before Combat:<br>If you have a Cleric in your hand, every Present Unit regains 3 Health.
            var hascleric = false;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Cleric Hero"){
                        hascleric = true;
                }
            });
            if (hascleric){
                writelog("<br><font color=\"orchid\">Before Combat: your Cleric's <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> heals your units.</font>");
                getpresent();
            }
            for (let i = 0; i < present.length; i++) {
                heal(present[i], 3);
            }
            break;
        case 3:
            // Before Combat:<br>If you have a Mage in your hand, all Enemies lose 2 DMG.
            
            var hasmage = false;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Mage Hero"){
                    hasmage = true;
                }
            });
            if (hasmage){
                writelog("<br><font color=\"orchid\">Before Combat: Your Mage casts <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>.</font>");
                writelog("<br>Enemies' Damage decreases.");
                for (let i = 1; i < 4; i++) {

                    if (cardbyid[enemies[i].children()[0].id].type == "monst"){
                        cardbyid[enemies[i].children()[0].id].dmg -=2;
                        if (cardbyid[enemies[i].children()[0].id].dmg < 0){
                            cardbyid[enemies[i].children()[0].id].dmg = 0;
                        }
                    }

                }
            }
            break;
        case 4:
            // After Attacking:<br>Enemies attacked by Ranger Units don't fight with your Commander<br>this turn.
            if (cardbyid[attacked].trait == "Ranger Hero"){
                writelog("<br><font color=\"orchid\">After Attacking: Your Ranger proceeds to <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>.</font>");
                writelog("<br>This Enemy won't attack your Commander.");
                commfight = false;
            }
            break;
        case 5:
            // Before Combat:<br>if you have a Warrior in the Fray, gain 5 Battlescore.
            var haswar = false;
            for (let i = 1; i < 4; i++) {
                if (cardbyid[enemies[i].children()[0].id].type == "fray"){
                    if (enemies[i].children()[1] != undefined){
                        if (cardbyid[enemies[i].children()[1].id].trait == "Warrior Hero"){
                            haswar = true;
                        }
                    }
                    if (enemies[i].children()[2] != undefined){
                        if (cardbyid[enemies[i].children()[2].id].trait == "Warrior Hero"){
                            haswar = true;
                        }
                    }
                }
            }
            if (haswar){
                writelog("<br><font color=\"orchid\">Your Warrior's <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> lets you gain 5 Battlescore.</font>");
                bscore += 5;
                showbscore();
            }
            break;
        case 6:
            // If you have a Cleric present, each Damage your units take is decreased by 1.
            getpresent();
            var hascleric = false;
            for (let i = 0; i < present.length; i++) {
                if (cardbyid[present[i]].trait == "Cleric Hero"){
                        hascleric = true;
                }
            }
            if (hascleric){
                writelog("<br><font color=\"orchid\">Your Cleric's <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> decreases the damage.</font>");
                tdamount --;
            }
            break;
        case 7:
            // After Attacking: If one of your Rogues kills an Enemy, decrease the maximum Wave number by 1
            if ((cardbyid[attacked].trait == "Rogue Hero") && (cardbyid[attmonst].hp <= 0)){
                writelog("<br><font color=\"orchid\">After Attacking: Your Rogue finds the chance to <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>.</font>");
                maxwave --;
                showbscore();
                writelog("<br>Number of maximum waves decreased to "+maxwave+".");
            }
            break;
        case 8:
            // Before Combat:<br>If you have a Mage in your hand, your Commander gains +1 DMG for the rest of this Combat.
            var hasmage = false;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Mage Hero"){
                        hasmage= true;
                }
            });
            if (hasmage){
                writelog("<br><font color=\"orchid\">Before Combat: your Mage's <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> spell </font>increases your Commander's DMG.");
                cardbyid[commander].dmg ++;
            }
            break;
        case 9:
            // Before Combat:<br>Your Rangers deal 4 Damage<br>to their assigned Enemy.
            for (let i = 1; i < 4; i++) {
                for (let j = 1; j < 3; j++) {
                    if (enemies[i].children()[j] != undefined){  
                        if ((cardbyid[enemies[i].children()[j].id].trait == "Ranger Hero") && (cardbyid[cardbyid[enemies[i].children()[j].id].assign].type == "monst")){
                            writelog("<br><font color=\"orchid\">Before Combat: Your Ranger finds a chance to <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                            damage (enemies[i].children()[0].id, 4);
                            
                        }
                    }
                }
            }
            break;
        case 10:
            // If a Rogue's Assisting Unit gains Experience in Combat, so does the Rogue.
            if ((whoexp == attacked) && (cardbyid[cardbyid[attacked].assist].trait == "Rogue Hero")){
                writelog("<br><font color=\"orchid\">Your Rogue can also <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>.</font>");
                gainexp(cardbyid[attacked].assist);
            }
            break;
    }
};


adaeff = (cid) => {
    
    switch (cardbyid[cid].abnum){
        case 1:
            // When Drawn:<br>Draw the first Unit from your deck into your Hand.
            break;
        case 2:
            // When Drawn:<br>The Monsters gain 4 Battlescore.
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
        case 9:
            // 
            break;
        case 10:
            // 
            break;
        
    }
    
};