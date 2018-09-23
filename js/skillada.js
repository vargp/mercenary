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
            if ((hascleric) && (cardbyid[takedamage].type != "monst")){
                writelog("<br><font color=\"orchid\">Your Cleric's <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> decreases the damage.</font>");
                tdamount --;
            }
            break;
        case 7:
            // After Attacking: If one of your Rogues kills an Enemy, decrease the maximum Wave number by 1
            if ((cardbyid[attacked].trait == "Rogue Hero") && (cardbyid[attmonst].hp <= 0)){
                writelog("<br><font color=\"orchid\">After Attacking: Your Rogue finds the chance to <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>.</font>");
                maxwave --;
                $("#wave").html("Wave "+curwave+" / "+maxwave);
                
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
            // After Combat:<br>for each Rogue in your Hand, give 3 random Units in your deck<br>+1 DMG and +2 HP for the rest of this battle.
            var haswar = 0;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Rogue Hero"){
                    haswar ++;
                }
            });
            if (haswar > 0){
                var decku = [];
                var randu = 0;
                writelog("<br><font color=\"orchid\">Your Rogues give an <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>.</font>");
                $("#deck").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit"){
                        decku.push($(this).attr("id"));
                    }
                });
                for (let i = 1; i <= haswar; i++) {
                    
                    for (let j = 1; j <= 3; j++) {
                        randu = Math.floor(Math.random() * decku.length);
                        cardbyid[decku[randu]].dmg++;
                        cardbyid[decku[randu]].hp++;
                        writelog("<br><font color=\"orchid\"><card id=\"" + decku[randu] + "\">" + cardbyid[decku[randu]].title + "</card> is inspired.</font>");
                    }
                }
            }
            break;
        case 12:
            // After Combat:<br>For each Cleric in your Hand, your Commander regains 2 Health.
            var hascle = 0;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Cleric Hero"){
                    hascle ++;
                }
            });
            if (hascle > 0){
                writelog("<br><font color=\"orchid\">Your Clerics cast <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> on your Commander.</font>");
                for (let i = 1; i <= hascle; i++) {
                    heal(commander, 2);
                }
            }
            break;
        case 13:
            // Before Combat:<br>If the Boss is visible, lower its HP by 2 (to a minimum of 10) if you have a Mage in your Hand.
            if (battlenum >= bossapp){
                var hasmage = false;
                $("#avnow").children().each(function() {
                    if (cardbyid[$(this).attr("id")].trait == "Mage Hero"){
                            hasmage= true;
                    }
                });
                if (hasmage){
                    writelog("<br><font color=\"orchid\">Your Mage spends time to <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>.</font>");
                    boss[bossnum].hp -= 2;
                    if (boss[bossnum].hp < 10){
                        boss[bossnum].hp = 10;
                    }
                    cardbyid[thisboss].hp = boss[bossnum].hp;
                }
            }
                
            break;
        case 14:
            // When an Enemy appears:<br>If you have a Ranger in your hand, deal that Enemy 2 Damage.
            var hasrang = false;
                $("#avnow").children().each(function() {
                    if (cardbyid[$(this).attr("id")].trait == "Ranger Hero"){
                            hasrang = true;
                    }
                });
                if (hasrang){
                    writelog("<br><font color=\"orchid\">Your Ranger is <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>.</font>");
                    damage (monstapp, 2);
                }
            break;
        case 15:
            // When a Rogue would die:<br>That Rogue remains alive with 1 HP left.
            if (cardbyid[whodies].trait == "Rogue Hero"){
                writelog("<br><font color=\"orchid\">Your Rogues can <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                cardbyid[whodies].hp = 1;
            }
            break;
        case 16:
            // After Attacking:<br>If a Warrior kills an Enemy, he deals Damage to the next Enemy too.
                        
            if ((cardbyid[slayer].trait == "Warrior Hero") && (cardbyid[whodies].place != "#enc3")){
                var nextis = 0;
                
                if (cardbyid[whodies].place == "#enc1"){
                    nextis = enemies[2].children()[0].id;
                } else {
                    nextis = enemies[3].children()[0].id;
                }
                if (cardbyid[nextis].type == "monst"){
                    writelog("<br><font color=\"orchid\">Your Warrior uses <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                    damage(nextis, cardbyid[slayer].dmg);
                }
            }
            break;
        case 17:
            // After Combat:<br>If you have a Cleric present, each present Unit with less than 5 HP regains 4 Health.
            getpresent();
            var hascleric = false;
            for (let i = 0; i < present.length; i++) {
                if (cardbyid[present[i]].trait == "Cleric Hero"){
                    hascleric = true;
                }
            }
            if (hascleric){
                writelog("<br><font color=\"orchid\">Your Cleric radiates a <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                for (let i = 0; i < present.length; i++) {
                    if (cardbyid[present[i]].hp < 5){
                        heal (present[i], 4);

                    }
                }
            }
            break;
        case 18:
            // Before Combat:<br>If you have a Mage in your hand, give all your units +4 Speed.
            var hasmage = false;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Mage Hero"){
                    hasmage= true;
                }
            });
            if (hasmage){
                writelog("<br><font color=\"orchid\">Your Mage casts a <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                $("#deck").children().each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit"){
                        cardbyid[$(this).attr("id")].perc += 4;
                    }
                });
                getpresent();
                for (let i = 0; i < present.length; i++) {
                    if (cardbyid[present[i]].type != "comm"){
                        cardbyid[present[i]].perc += 4;
                    }
		}
            }
			
            break;
        case 19:
            // Before Combat:<br>If you have a Ranger present,<br>turn a Disadvantage in your deck<br>into a current Terrain Advantage.
            getpresent();
            var disadis = 0;
            var hasranger = false;
            for (let i = 0; i < present.length; i++) {
                if (cardbyid[present[i]].trait == "Ranger Hero"){
                        hasranger = true;
                }
            }
            if (hasranger){
                $("#deck").children().each(function() {
                    if (cardbyid[$(this).attr("id")].type == "disadv"){
                        disadis = $(this).attr("id");
                    }
                });
            }
            if (disadis > 0){
                writelog("<br><font color=\"orchid\">Your Ranger can <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                terrada(true);
                removecard(disadis);

            }
            break;
        case 20:
            // When you kill an Enemy:<br>Gain +1 Battlescore for each Rogue present.
            if (cardbyid[slayer].trait == "Rogue Hero"){
                getpresent();
                writelog("<br><font color=\"orchid\">Your Rogues have <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                for (let i = 0; i < present.length; i++) {
                    if (cardbyid[present[i]].trait == "Rogue Hero"){
                        bscorechange(2);
                    }
                }
            }
            break;
        case 21:
            // Before Combat:<br>If you have a Warrior assigned<br>to the first Enemy and it's not the Enemy with the least HP, swap this with that Enemy.
            var fen = enemies[1].children()[0].id;
            var sen = enemies[2].children()[0].id;
            var ten = enemies[3].children()[0].id;
            var csere = 0;
            if ((cardbyid[cardbyid[fen].assign].trait == "Warrior Hero") || (cardbyid[cardbyid[fen].assist].trait == "Warrior Hero")){
                if (cardbyid[sen].type == "monst"){
                    if (cardbyid[sen].hp < cardbyid[fen].hp){
                        csere = 2;
                    }
                }
                if (cardbyid[ten].type == "monst"){
                    if ((cardbyid[ten].hp < cardbyid[fen].hp) && (cardbyid[ten].hp < cardbyid[sen].hp)){
                        csere = 3;
                    }
                }
            }
            if (csere > 0){
                writelog("<br><font color=\"orchid\">Your Warrior switches enemies with a <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                $("#enc1").prepend($(".cardc[id=\""+enemies[csere].children()[0].id+"\"]"));
                $('#enc1 img:first').attr("class", "doublecard");
                $('#enc1 .cardc:first').css("height", "184px");
                
                enemies[csere].prepend($(".cardc[id=\""+fen+"\"]"));
                $('#enc2 img:first').attr("class", "doublecard");
                $('#enc2 .cardc:first').css("height", "184px");
                $('#enc3 img:first').attr("class", "doublecard");
                $('#enc3 .cardc:first').css("height", "184px");
                checkass();
                
            }
            break;
        case 22:
            // Before Combat:<br>If you have a Cleric in your Hand, make the Healer appear in the 3rd slot even if there's something else there currently.
            var hascle = false;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Cleric Hero"){
                    hascle= true;
                }
            });
            if (hascle){
                writelog("<br><font color=\"orchid\">Your Cleric lights a <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                $("#enc3").find('.cardc:first').remove();
                recruit = 6;
                generate (5, "#enc3");
                $("#enc3").prepend($(".cardc[id=\""+hanylapvan+"\"]"));
                $('#enc3 img:first').attr("class", "doublecard");
                $('#enc3 .cardc:first').css("height", "184px");
                checkass();
            }
            break;
        case 23:
            // Before Combat:<br>Create a copy of a random Mage in your hand (for this battle only).
            var mages = [];
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Mage Hero"){
                    mages.push($(this).attr("id"));
                }
            });
            if (mages.length > 0){
                writelog("<br><font color=\"orchid\">Your Mage casts <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                var randm = Math.floor(Math.random() * mages.length);
                recruit = cardbyid[mages[randm]].abnum;
                generate(1, "#avnow");
                recruit = 0;
                cardbyid[hanylapvan].temp = true;
                cardbyid[hanylapvan].dmg = cardbyid[mages[randm]].dmg;
                cardbyid[hanylapvan].hp = cardbyid[mages[randm]].hp;
                cardbyid[hanylapvan].perc = cardbyid[mages[randm]].perc;
            }
            break;
        case 24:
            // Before Combat:<br>For each Ranger present,<br>give each present Unit with<br>8 or less HP +1 DMG for the<br>rest of this battle.
            var ranco = 0;
            var hplow = 0;
            getpresent();
            for (let i = 0; i < present.length; i++) {
                if (cardbyid[present[i]].trait == "Ranger Hero"){
                    ranco ++;
                }
                if (cardbyid[present[i]].hp < 9){
                    hplow ++;
                }
            }
            if ((ranco > 0) && (hplow > 0)){
                writelog("<br><font color=\"orchid\">Your Rangers attempt a <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                for (let i = 0; i < present.length; i++) {
                    if (cardbyid[present[i]].hp < 9){
                        cardbyid[present[i]].dmg += ranco;
                    }
                }
            }
                
            break;
        case 25:
            // Before Combat: If you have a Rogue present and didn't assign any cards, Combat is skipped this round and new Enemies appear instead of the current ones.
            getpresent();
            var hasrog = false;
            var vanass = false;
            for (let i = 0; i < present.length; i++) {
                if (cardbyid[present[i]].trait == "Rogue Hero"){
                    hasrog = true;
                }
                if (cardbyid[present[i]].assign != 0){
                    vanass = true;
                }
            }
            if (hasrog && !vanass){
                writelog("<br><font color=\"orchid\">Your Rogue helps you <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                skipcomb = true;
                $("#enc1").find('.cardc:first').addClass("dead");
                $("#enc2").find('.cardc:first').addClass("dead");
                $("#enc3").find('.cardc:first').addClass("dead");
                cardbyid[enemies[1].children()[0].id].abnum = 0;
                cardbyid[enemies[2].children()[0].id].abnum = 0;
                cardbyid[enemies[3].children()[0].id].abnum = 0;
            }
            break;
        case 26:
            // Before Combat:<br>If you have a Rogue in your Hand and The Fray is not visible, make The Fray appear in the 2nd slot even if there's something else there currently."
            var hasrog = false;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Warrior Hero"){
                    hasrog = true;
                }
            });
            if ((cardbyid[enemies[2].children()[0].id].type == "fray") || (cardbyid[enemies[3].children()[0].id].type == "fray")){
                hasrog = false;
            }
            if (hasrog){
                writelog("<br><font color=\"orchid\">Your Warrior is <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                $("#enc2").find('.cardc:first').remove();
                recruit = 5;
                generate (5, "#enc3");
                $("#enc2").prepend($(".cardc[id=\""+hanylapvan+"\"]"));
                $('#enc2 img:first').attr("class", "doublecard");
                $('#enc2 .cardc:first').css("height", "184px");
                checkass();
            }
            break;
        case 27:
            // After Attacking:<br>If a Warrior is assigned alone to<br>an Enemy, he gains 2 HP and attacks that Enemy again
            if ((cardbyid[attacked].trait == "Warrior Hero") && cardbyid[attacked].assist == 0){
                if ($(".cardc[id=\""+attacked+"\"]").hasClass("relentless")){
                    console.log("elég volt kettő");
                } else {
                    writelog("<br><font color=\"orchid\">Your Warrior demonstrates a <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                    $(".cardc[id=\""+attacked+"\"]").addClass("relentless");
                    heal (attacked, 2);
                    attack --;
                }
            }
            break;
        case 28:
            // At the start of a Round:<br>If you have a Cleric in your Hand, draw your slowest Unit.
            var hascle = false;
            var slowu = 0;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Cleric Hero"){
                    hascle = true;
                }
            });
            if (hascle){
                $("#deck").children().each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit"){
                        slowu = $(this).attr("id");
                    }
                });
            }
            if (slowu != 0){
                writelog("<br><font color=\"orchid\">Your Cleric makes a <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                drawcard(slowu);
            }
            break;
        case 29:
            // After Combat:<br>For each Mage in your Hand, deal each enemy 2 Damage.
            var hasmag = 0;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Mage Hero"){
                    hasmag ++;
                }
            });
            if (hasmag > 0){
                writelog("<br><font color=\"orchid\">Your Mages cast <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                for (let i = 1; i < 4; i++) {

                    if (cardbyid[enemies[i].children()[0].id].type == "monst"){
                            damage(enemies[i].children()[0].id, hasmag*2);
                        }

                }
            }
            break;
        case 30:
            // At the End of the Round:<br>Keep your Rangers that are assigned to Enemies.
            getpresent();
            var ranpr = 0;
            for (let i = 0; i < present.length; i++) {
                if ((cardbyid[present[i]].trait == "Ranger Hero") && (cardbyid[cardbyid[present[i]].assign].type == "monst")){
                    ranpr ++;
                    $("#keep").append($(".cardc[id=\""+present[i]+"\"]"));
                    $(".cardc[id=\""+present[i]+"\"]").removeClass("attacking");
                }
            }
            if (ranpr > 0){
                writelog("<br><font color=\"orchid\">Your Rangers make <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
            }
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
                    
                    drawcard($("#deck").children()[0].id);
                }, 50);
            }
            break;
        case 2:
            // When Drawn:<br>The Monsters gain 4 Battlescore.
            if (justdrawn == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies!</font>");
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
                        
                        discfromhand(leftu);
                    }
                }, 50);
            }
            break;
        case 5:
            // Before Combat:<br>Present Enemies lose 1 DMG.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies!</font>");
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
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies!</font>");
            writelog("<br>Present Enemies gain 1 DMG.");
            for (let i = 1; i < 4; i++) {

                if (cardbyid[enemies[i].children()[0].id].type == "monst"){
                    cardbyid[enemies[i].children()[0].id].dmg ++;
                }

            }
            break;
        case 11:
            // When Drawn:<br>Deal all Enemies 1 Damage
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies!</font>");
            damage (monstapp, 1);
            
            break;
        case 12:
            // After Combat:<br>Every present Unit loses 1 Health and 1 DMG
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
            getpresent();
            for (let i = 0; i < present.length; i++) {
                    damage(present[i], 1);
                    dmgdec(present[i], 1);
                }
            break;
        case 13:
            // After Combat:<br>All present Units lose 1 DMG<br>and 4 Speed
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
            getpresent();
            for (let i = 0; i < present.length; i++) {
                if (cardbyid[present[i]].perc != undefined){
                    percdec(present[i], 4);
                }
                dmgdec(present[i], 1);
            }
            break;
        case 14:
            // This round, the 1st Units<br>assigned to Enemies can't retaliate.
            if (attacked == cardbyid[attmonst].assign){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
                retaliate = false;
            }
            break;
        case 15:
            // After Combat:<br>Present Enemies gain +2 DMG.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies!</font>");
            for (let i = 1; i < 4; i++) {

                if ((cardbyid[enemies[i].children()[0].id].type == "monst") && (cardbyid[enemies[i].children()[0].id].hp > 0)){
                    dmginc (enemies[i].children()[0].id, 2);
                }

            }
            break;
        case 16:
            // When Drawn:<br>A new Enemy appears in the 2nd and 3rd slots, replacing what's already there.
            if (justdrawn == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies!</font>");
                newmon ("#enc2");
                if ( cardbyid[$('#enc2 .cardc:first').attr("id")].assign != 0){
                    cardbyid[hanylapvan].assign = cardbyid[$('#enc2 .cardc:first').attr("id")].assign;
                    cardbyid[cardbyid[hanylapvan].assign].assign = hanylapvan;
                }

                if ( cardbyid[$('#enc2 .cardc:first').attr("id")].assist != 0){
                    cardbyid[hanylapvan].assist = cardbyid[$('#enc2 .cardc:first').attr("id")].assist;
                    cardbyid[cardbyid[hanylapvan].assist].assign = hanylapvan;
                }
                
                if (enemies[2].children().length > 1){
                    $("#enc2").find('.cardc:first').remove();
                    $("#enc2").prepend($(".cardc[id=\""+hanylapvan+"\"]"));
                }
                $('#enc2 img:first').attr("class", "doublecard");
                $('#enc2 .cardc:first').css("height", "184px");
                
                newmon ("#enc3");
                if ( cardbyid[$('#enc3 .cardc:first').attr("id")].assign != 0){
                    cardbyid[hanylapvan].assign = cardbyid[$('#enc3 .cardc:first').attr("id")].assign;
                    cardbyid[cardbyid[hanylapvan].assign].assign = hanylapvan;
                }

                if ( cardbyid[$('#enc3 .cardc:first').attr("id")].assist != 0){
                    cardbyid[hanylapvan].assist = cardbyid[$('#enc3 .cardc:first').attr("id")].assist;
                    cardbyid[cardbyid[hanylapvan].assist].assign = hanylapvan;
                }

                if (enemies[3].children().length > 1){
                    $("#enc3").find('.cardc:first').remove();
                    $("#enc3").prepend($(".cardc[id=\""+hanylapvan+"\"]"));
                }
                $('#enc3 img:first').attr("class", "doublecard");
                $('#enc3 .cardc:first').css("height", "184px");
            }
            break; 
        case 17:
            // Before Combat:<br>Discard your slowest present Unit.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
            getpresent();
            var slowest = 0;
            var slowspd = 200;
            for (let i = 0; i < present.length; i++) {
                
                if ((cardbyid[present[i]].perc < slowspd) && (cardbyid[present[i]].perc != undefined)){
                    slowest = present[i];
                    slowspd = cardbyid[present[i]].perc;
                }
                
            }
            if (slowest > 0){
                discfromhand(slowest);
                checkass();
            }
            break;
        case 18:
            // When Drawn:<br>Units in your hand and deck each lose 1 Health.
            if (justdrawn == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
                $("#avnow").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit"){
                        damage($(this).attr("id"), 1);
                    }
                });
                $("#deck").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit"){
                        damage($(this).attr("id"), 1);
                    }
                });
            }
            break;
        case 19:
            // Your Commander can't retaliate against enemies.
            if (attacked == commander){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
                retaliate = false;
            }
            break;
        case 20:
            // After Combat:<br>Present Enemies regain 3 Health.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies!</font>");
            for (let i = 1; i < 4; i++) {

                if ((cardbyid[enemies[i].children()[0].id].type == "monst") && (cardbyid[enemies[i].children()[0].id].hp > 0)){
                    heal (enemies[i].children()[0].id, 3);
                }

            }
            break;
        case 21:
            // Before Combat:<br>Present Units lose 1 HP and present Enemies regain 1 HP.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you!</font>");
            getpresent();
            for (let i = 0; i < present.length; i++) {
                damage (present[i], 1);
            }
            for (let i = 1; i < 4; i++) {

                if ((cardbyid[enemies[i].children()[0].id].type == "monst") && (cardbyid[enemies[i].children()[0].id].hp > 0)){
                    heal (enemies[i].children()[0].id, 1);
                }

            }
            
            break;
        
    }
    
};