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
            // If an enemy has 2 or less<br>Health at the end of a round,<br>it dies.
            for (let i = 1; i < 4; i++) {
                if (enemies[i].children()[0] != undefined){ 
                    // console.log("type: "+cardbyid[enemies[i].children()[0].id].type+", trig: "+cardbyid[enemies[i].children()[0].id].trig)
                    if ((cardbyid[enemies[i].children()[0].id].what == "monst") && (cardbyid[enemies[i].children()[0].id].hp < 3) && (cardbyid[enemies[i].children()[0].id].hp > 0) ){
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
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Ranger Hero"){
                    cardbyid[$(this).attr("id")].dmg -= 2;
                }
            });
            break;
        case 2:
            // Additional Beasts may attack you here.
            if (thirmon == false){
                var addmone = Math.floor((Math.random() * 3) + 1);
                if (addmone == 1){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                    forcemon = "Beast Enemy";
                    thirmon = true;
                }
            }
            
            break;
        case 3:
            // Start the battle with +2 Swamp Terrain Advantage in your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            adadraw = 5;
            generate(7, "#deck");
            generate(7, "#deck");
            break;
        case 4:
            // At battle start, your cards with more than 20 Speed lose 5 Speed here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].perc > 20){
                    cardbyid[$(this).attr("id")].perc -= 5;
                }
            });
            break;
        case 5:
            // You start at the<br>2nd Wave here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            curwave ++;
            $("#wave").html("Wave "+curwave+" / "+maxwave);
            break;
        case 6:
            // When you gain Battlescore, you gain 1 more here.
            if (bscamount > 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                bscamount ++;
            }
            break;
        case 7:
            // At battle start, your Warrior Units<br>gain +2 DMG here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Warrior Hero"){
                    cardbyid[$(this).attr("id")].dmg += 2;
                }
            });
            break;
        case 8:
            // Enemies have +2 Health here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies.</font>");
            cardbyid[monstapp].hp += 2;
            break;
        case 9:
            // At the start of battle, your Units lose 2 Health here.
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "unit"){
                    cardbyid[$(this).attr("id")].hp -= 2;
                }
            });
            break;
        case 10:
            // 2 Ardent Recruits are put into your deck for this battle.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            recruit = 1;
            generate (1, "#deck");
            cardbyid[hanylapvan].temp = true;
            generate (1, "#deck");
            cardbyid[hanylapvan].temp = true;
            recruit = 0;
            break;
        case 11:
            // When you gain Battlescore, you gain 1 less here.
            if (bscamount > 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                bscamount --;
            }
            break;
        case 12:
            // Additional Undead may attack you here.
            if (thirmon == false){
                var addmone = Math.floor((Math.random() * 3) + 1);
                if (addmone == 1){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                    forcemon = "Undead Enemy";
                    thirmon = true;
                }
            }
            break;
        case 13:
            // Additional Demons may attack you here.
            if (thirmon == false){
                var addmone = Math.floor((Math.random() * 3) + 1);
                if (addmone == 1){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                    forcemon = "Demon Enemy";
                    thirmon = true;
                }
            }
            break;
        case 14:
            // Start the battle with +2 Fortress Terrain Disadvantage in your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            adadraw = 10;
            disadvadd();
            disadvadd();
            break;
        case 15:
            // At battle start, your cards with less than 20 Speed gain 5 Speed here (except Disadvantages).
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if ((cardbyid[$(this).attr("id")].perc <= 20) && (cardbyid[$(this).attr("id")].type != "disadv")){
                    cardbyid[$(this).attr("id")].perc += 5;
                }
            });
            break;
        case 16:
            // Enemies have -2 Health here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies.</font>");
            cardbyid[monstapp].hp -= 2;
            break;
        case 17:
            // Start the battle with +2 Plains Terrain Advantage in your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            adadraw = 7;
            generate(7, "#deck");
            generate(7, "#deck");
            break;
        case 18:
            // Start the battle with +2 Fortress Terrain Advantage in your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            adadraw = 9;
            generate(7, "#deck");
            generate(7, "#deck");
            break;
        case 19:
            // At the end of each round, if you have no Units in your Hand, deal each Enemy 2 Damage.
            var unhan = 0;
            $("#avnow").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "unit"){
                    unhan ++;
                }
            });
            if (unhan == 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies.</font>");
                for (let i = 1; i < 4; i++) {
                    if ((cardbyid[enemies[i].children()[0].id].type == "monst") && (cardbyid[enemies[i].children()[0].id].hp > 0)){
                        damage (enemies[i].children()[0].id, 2);

                    }
                }
			}
            break;
        case 20:
            // At the start of battle, your Units gain 2 Health here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "unit"){
                    cardbyid[$(this).attr("id")].hp += 2;
                }
            });
            break;
        case 21:
            // 2nd and 3rd Enemies are less likely to appear here.
            var nosm = 0;
            console.log("bejött, "+secmon+" "+thirmon);
            if (secmon){
                nosm = Math.floor((Math.random() * 2) + 1);
                if (nosm == 1){
                    console.log(nosm);
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                    secmon = false;
                }
            }
            if ((thirmon) && (nosm != 1)){
                nosm = Math.floor((Math.random() * 2) + 1);
                if (nosm == 1){
                    console.log(nosm);
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                    thirmon = false;
                }
            }
            break;
        case 22:
            // Start the battle with +2 Woodlands Terrain Disadvantage in your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            adadraw = 4;
            disadvadd();
            disadvadd();
            break;
        case 23:
            // Start the battle with +2 Swamp Terrain Disadvantage in your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            adadraw = 6;
            disadvadd();
            disadvadd();
            break;
        case 24:
            // At the end of each round, if there are no Enemies alive, deal each present Unit 1 Damage.
            var alen = 0;
            for (let i = 1; i < 4; i++) {
                if ((cardbyid[enemies[i].children()[0].id].type == "monst") && (cardbyid[enemies[i].children()[0].id].hp > 0)){
                    alen++;
                }
            }
            if (alen == 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                getpresent();
                for (let i = 0; i < present.length; i++) {
                    damage(present[i], 1);
                }
            }
            break;
        case 25:
            // Additional Orcs may attack you here.
            if (thirmon == false){
                var addmone = Math.floor((Math.random() * 3) + 1);
				
                if (addmone == 1){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                    forcemon = "Orc Enemy";
                    thirmon = true;
                }
            }
            break;
        case 26:
            // Start the battle with +2 Woodlands Terrain Advantage in your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            adadraw = 3;
            generate(7, "#deck");
            generate(7, "#deck");
            break;
        case 27:
            // At battle start, your Mage Units<br>gain +2 DMG here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Mage Hero"){
                    cardbyid[$(this).attr("id")].dmg += 2;
                }
            });
            break;
        case 28:
            // At battle start, your Cleric Units<br>gain +2 DMG here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Cleric Hero"){
                    cardbyid[$(this).attr("id")].dmg += 2;
                }
            });
            break;
        case 29:
            // At battle start, your Rogue Units<br>gain +2 DMG here
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Rogue Hero"){
                    cardbyid[$(this).attr("id")].dmg += 2;
                }
            });
            break;
        case 30:
            // Start the battle with +2 Mountains Terrain Advantage in your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            adadraw = 1;
            generate(7, "#deck");
            generate(7, "#deck");
            break;
        case 31:
            // Start the battle with +2 Plains Terrain Disadvantage in your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            adadraw = 8;
            disadvadd();
            disadvadd();
            break;
        case 32:
            // At battle start, your Warrior Units<br>gain -2 DMG here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Warrior Hero"){
                    cardbyid[$(this).attr("id")].dmg -= 2;
                }
            });
            break;
        case 33:
            // At the start of each round, if there is only 1 Enemy present, it gains +1 DMG and +3 HP.
            if ((cardbyid[enemies[2].children()[0].id].type != "monst") && (cardbyid[enemies[3].children()[0].id].type != "monst")){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies.</font>");
                cardbyid[enemies[1].children()[0].id].dmg ++;
                cardbyid[enemies[1].children()[0].id].hp += 3;
            }
            break;
        case 34:
            // At battle start, your Mage Units<br>gain -2 DMG here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Mage Hero"){
                    cardbyid[$(this).attr("id")].dmg -= 2;
                }
            });
            break;
        case 35:
            // Start the battle with +2 Mountains Terrain Disadvantage in your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            adadraw = 2;
            disadvadd();
            disadvadd();
            break;
        case 36:
            // At battle start, your Cleric Units<br>gain -2 DMG here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Cleric Hero"){
                    cardbyid[$(this).attr("id")].dmg -= 2;
                }
            });
            break;
        case 37:
            // At battle start, your Commander gains -2 DMG here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            cardbyid[commander].dmg -= 2;
            break;
        case 38:
            // The Healer's healing power is decreased by 2 here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            healval[battlenum] -= 2;
            break;
        case 39:
            // the Healer's healing power is increased by 2 here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            healval[battlenum] += 2;
            break;
        case 40:
            // At battle start, your Rogue Units<br>gain -2 DMG here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Rogue Hero"){
                    cardbyid[$(this).attr("id")].dmg -= 2;
                }
            });
            break;
        case 41:
            // When an Enemy appears in the 2nd Slot, its ability is blanked.
            if (cardbyid[monstapp].place=="#enc2"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects your enemies.</font>");
                cardbyid[monstapp].trig = 0;
                cardbyid[monstapp].abnum = 0;
                cardbyid[monstapp].text = "";
            }
            break;
        case 42:
            // At battle start, your commander gains +2 DMG here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            cardbyid[commander].dmg += 2;
            break;
        case 43:
            // At the start of each round, if you have any Skills in your hand, draw a Unit that can use one.
            var ezskill = 0;
            var ezkar = 0;
            $("#avnow").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "skill"){
                    ezskill = $(this).attr("id");
                    $("#deck").children(".cardc").each(function() {
                        if (cardbyid[$(this).attr("id")].trait.substring(1, 3) == cardbyid[ezskill].trait.substring(1, 3)){
                            ezkar = $(this).attr("id");
                        }
                    });
                }
            });
            if (ezkar > 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                drawcard(ezkar);
                writelog("<br>You draw <card id=\"" + ezkar + "\">" + cardbyid[ezkar].title + "</card>.");
            }
            break;
        case 44:
            // When an Enemy dies, other present Enemies gain +1 DMG and +2 HP.
            if (cardbyid[whodies].type == "monst"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                for (let i = 1; i < 4; i++) {
                    if ((cardbyid[enemies[i].children()[0].id].type == "monst") && (cardbyid[enemies[i].children()[0].id].hp > 0)){
                        dmginc(enemies[i].children()[0].id, 1);
                        heal(enemies[i].children()[0].id, 2);
                    }
                }
            }
            break;
        case 45:
            // At battle start, your Ranger Units<br>gain +2 DMG here.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Ranger Hero"){
                    cardbyid[$(this).attr("id")].dmg += 2;
                }
            });
            break;
        case 46:
            // Start at Wave 0 here if your deck has less than 6 Skills.
            var numsk = 0;
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "skill"){
                    numsk ++;
                }
            });
            if (numsk < 6){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                curwave --;
                $("#wave").html("Wave "+curwave+" / "+maxwave);
            }
            break;
        case 47:
            // When a Unit dies, other present Units gain +2 DMG for the rest of the battle.
            if (cardbyid[whodies].what == "unit"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
                getpresent();
                for (let i = 0; i < present.length; i++) {
                    cardbyid[present[i]].dmg += 2;
                }
            }
            break;
        case 48:
            // When an Enemy dies, the Unit that killed it is instantly promoted.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            promoteunit(whoexp);
            break;
        case 49:
            // At battle start, give your Units with 20 or less Speed +2 DMG.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            $("#deck").children(".cardc").each(function() {
                if ((cardbyid[$(this).attr("id")].perc <= 20) && (cardbyid[$(this).attr("id")].what == "unit")){
                    cardbyid[$(this).attr("id")].dmg += 2;
                }
            });
            break;
        case 50:
            // When a Unit gains Experience,<br>it loses 8 Speed for the rest of the battle.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            percdec(whoexp, 8);
            break;
        case 51:
            // Before Combat:<br>Put a random Terrain Advantage into your Hand.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            var randad = 0;
            do {
                    randad = Math.floor((Math.random() * (ada.length-1)) + 1);
            } while (ada[randad].trait != "Terrain Advantage");
            adadraw = randad;
            generate(7, "#avnow");
            break;
        case 52:
            // Before Combat:<br>Put a random Terrain Disadvantage into your Hand.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> affects you.</font>");
            var randad = 0;
            do {
                    randad = Math.floor((Math.random() * (ada.length-1)) + 1);
            } while (ada[randad].trait != "Terrain Disadvantage");
            adadraw = randad;
            disadvadd();
            if (!canceled){
                cardbyid[hanylapvan].place = "#avnow";
                $("#avnow").append($(".cardc[id=\""+hanylapvan+"\"]"));
            }
            break;
    }
    
};


bosseff = (cid) => {
    
    
    switch (cardbyid[cid].abnum){
        case 1:
            // After Combat:<br>remove a random Skill from your deck for the duration of this battle.
            if ((attmonst == cid) && (attacked != commander)){
                retaliate = false;
                writelog("<br><font color=\"orchid\">Your soldier is unable to wound <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
            }
        break;
    }

};