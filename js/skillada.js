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
                writelog("<br><font color=\"orchid\">Your Warrior's <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> lets you perform better in battle.</font>");
                bscorechange(5);
                
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
		case 11:
            // After Combat:<br>for each Warrior in your Hand, give 3 random Units in your deck<br>+1 DMG and +2 HP for the rest of this battle.
            break;
        case 12:
            // After Combat:<br>If you have a Cleric present, your Commander regains 3 Health.
            break;
        case 13:
            // Before Combat:<br>If the Boss is visible, lower its HP by 2 (to a minimum of 10) if you have a Mage in your Hand.
            break;
        case 14:
            // When an Enemy appears:<br>If you have a Ranger in your hand, deal that Enemy 2 Damage.
            break;
        case 15:
            // When a Rogue would die:<br>That Rogue remains alive with 1 HP left.
            break;
        case 16:
            // After Attacking:<br>If a Warrior kills an Enemy, he deals Damage to the next Enemy too.
            break;
        case 17:
            // After Combat:<br>If you have a Cleric present, each present Unit with less than 5 HP regains 3 Health.
            break;
        case 18:
            // Before Combat:<br>If you have a Mage in your hand, give all your cards (except Disadvantages) +4 Speed.
            break;
        case 19:
            // Before Combat:<br>place a current Terrain Advantage into your deck for each Ranger present.
            break;
        case 20:
            // When you kill an Enemy:<br>Gain +2 Battlescore for each Rogue in your Hand.
            break;
        case 21:
            // Before Combat:<br>If you have a Warrior assigned<br>to the first Enemy and it's not the Enemy with the least HP, swap this with that Enemy.
            break;
        case 22:
            // Before Combat:<br>If you have a Cleric in your Hand, make the Healer appear in the 3rd slot even if there's something else there currently.
            break;
        case 23:
            // Before Combat:<br>Create a copy of a random Mage in your hand (for this battle only).
            break;
        case 24:
            // Before Combat:<br>If you have a Ranger present,<br>give each present Unit with less<br>than 10 HP +1 DMG for the rest<br>of this battle.
            break;
        case 25:
            // Before Combat: If you have a Rogue present and didn't assign any cards, Combat is skipped this round and new Enemies appear instead of the current ones.
            break;
        case 26:
            // At Round Start: If you have a Rogue present and the Fray is not visible, make the Fray appear in the 1st slot even if there's something else there currently.
            break;
        case 27:
            // After Attacking:<br>If a Warrior is assigned alone to<br>an Enemy, he gains 2 HP and attacks that Enemy again
            break;
        case 28:
            // At the start of a Round:<br>If you have a Cleric in your Hand, draw your slowest Unit.
            break;
        case 29:
            // After Combat:<br>If you have a Mage in your Hand, deal each enemy 2 Damage.
            break;
        case 30:
            // At the End of the Round:<br>Keep your Rangers that are assigned to Enemies.
            break;
        
        
    }
};


adaeff = (cid) => {
    
    switch (cardbyid[cid].abnum){
        case 1:
            // When Drawn:<br>Draw the first card from your deck into your Hand.
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
                bscorechange(-4);
                
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
                bscorechange(4);
                
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