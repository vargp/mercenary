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
                if (cardbyid[cardbyid[present[i]].assign].type == "monst"){
                    heal(present[i], 3);
                }
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
            // The first Ranger assigned to an Enemy fights it again instead of your Commander.
            var kiran = 0;
            if (attacked == commander){
                console.log("--- bejöttünk!");
                console.log(cardbyid[attmonst].assign+": "+cardbyid[cardbyid[attmonst].assign].trait);
                console.log(cardbyid[attmonst].assist+": "+cardbyid[cardbyid[attmonst].assist].trait);
                if (cardbyid[attmonst].assign != 0){
                    if (cardbyid[cardbyid[attmonst].assign].trait == "Ranger Hero"){
                        kiran = cardbyid[attmonst].assign;
                    }
                }
                if ((cardbyid[attmonst].assist != 0) && (kiran == 0)){
                    if (cardbyid[cardbyid[attmonst].assist].trait == "Ranger Hero"){
                        kiran = cardbyid[attmonst].assist;
                    }
                }
            }
            if (kiran > 0){
                writelog("<br><font color=\"orchid\">Your Ranger is good at <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>.</font>");
                writelog("<br>This Enemy attacks the Ranger instead of your Commander.");
                attacked = kiran;
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
            // Before Combat:<br>Your Rangers deal 3 Damage<br>to their assigned Enemy.
            for (let i = 1; i < 4; i++) {
                for (let j = 1; j < 3; j++) {
                    if (enemies[i].children()[j] != undefined){  
                        if ((cardbyid[enemies[i].children()[j].id].trait == "Ranger Hero") && (cardbyid[cardbyid[enemies[i].children()[j].id].assign].type == "monst")){
                            writelog("<br><font color=\"orchid\">Before Combat: Your Ranger finds a chance to <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                            damage (enemies[i].children()[0].id, 3);
                            
                        }
                    }
                }
            }
            break;
        case 10:
            // If a Rogue's Assisting Unit gains Experience in Combat, so does the Rogue.
            if ((whoexp == attacked) && (cardbyid[cardbyid[attacked].assist].trait == "Rogue Hero")){
                writelog("<br><font color=\"orchid\">Your Rogue can also <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>.</font>");
                setTimeout(function(){
                    gainexp(cardbyid[attacked].assist);
                }, 50);
            }
            break;
    }
};


adaeff = (cid) => {
    
    switch (cardbyid[cid].abnum){
        case 1:
            // When Drawn:<br>Draw the first Unit from your deck into your Hand.
            if (justdrawn == cid){
                setTimeout(function(){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
                    writelog("<br>You draw <card id=\"" + $("#deck").children()[0].id + "\">" + cardbyid[$("#deck").children()[0].id].title + "</card>.");
                    drawcard($("#deck").children()[0].id);
                }, 50);
            }
            break;
        case 2:
            // When Drawn:<br>The Monsters gain 4 Battlescore.
            if (justdrawn == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
                writelog("<br>The Monsters gain 4 Battlescore.");
                bscore -= 4;
                showbscore();
            }
            break;
        case 3:
            // After Combat:<br>Present Units regain 2 Health
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
            writelog("<br>Present Units regain 2 Health.");
            getpresent();
            for (let i = 0; i < present.length; i++) {
                heal(present[i], 2);
            }
            break;
        case 4:
            //  When Drawn:<br>Discard the leftmost unit from your Hand.
            if (justdrawn == cid){
                setTimeout(function(){
                    var leftu = 0;
                    $("#avnow").children().each(function() {
                        if (cardbyid[$(this).attr("id")].what == "unit"){
                                if (leftu == 0){
                                    leftu = $(this).attr("id");
                                }
                        }
                    });
                    if (leftu > 0){
                        writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
                        writelog("<br>You discard <card id=\"" + leftu + "\">" + cardbyid[leftu].title + "</card>.");
                        discfromhand(leftu);
                    }
                }, 50);
            }
            break;
        case 5:
            // Before Combat:<br>Present Enemies lose 1 DMG.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
            writelog("<br>Present Enemies lose 1 DMG.");
            for (let i = 1; i < 4; i++) {

                if (cardbyid[enemies[i].children()[0].id].type == "monst"){
                    cardbyid[enemies[i].children()[0].id].dmg --;
                    if (cardbyid[enemies[i].children()[0].id].dmg < 0){
                        cardbyid[enemies[i].children()[0].id].dmg = 0;
                    }
                }

            }
            break;
        case 6:
            // When Drawn:<br>Units in your Deck lose 4 Speed.
            if (justdrawn == cid){
                setTimeout(function(){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
                    writelog("<br>Units in your Deck lose 4 Speed.");
                    $("#deck").children().each(function() {
                        if (cardbyid[$(this).attr("id")].what == "unit"){
                            percdec ($(this).attr("id"), 4);
                        }
                    });
                    szoltmar = false;
                }, 50);
            }
            break;
        case 7:
            // When Drawn:<br>Units in your Deck gain +4 Speed.
            if (justdrawn == cid){
                setTimeout(function(){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
                    writelog("<br>Units in your Deck gain 4 Speed.");
                    $("#deck").children().each(function() {
                        if (cardbyid[$(this).attr("id")].what == "unit"){
                                cardbyid[$(this).attr("id")].perc +=4;
                        }
                    });
                }, 50);
            }
            break;
        case 8:
            // When Drawn:<br>Units in your Hand lose 2 Health.
            if (justdrawn == cid){
                setTimeout(function(){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
                    writelog("<br>Units in your Hand lose 2 Health.");
                    $("#avnow").children().each(function() {
                        if (cardbyid[$(this).attr("id")].what == "unit"){
                                damage($(this).attr("id"), 2);
                        }
                    });
                }, 50);
            }
            break;
        case 9:
            // When Drawn:<br>You gain 4 Battlescore.
            if (justdrawn == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
                writelog("<br>You gain 4 Battlescore.");
                bscore += 4;
                showbscore();
            }
            break;
        case 10:
            // Before Combat:<br>Present Enemies gain +1 DMG.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
            writelog("<br>Present Enemies gain 1 DMG.");
            for (let i = 1; i < 4; i++) {

                if (cardbyid[enemies[i].children()[0].id].type == "monst"){
                    cardbyid[enemies[i].children()[0].id].dmg ++;
                }

            }
            break;
        
    }
    
};