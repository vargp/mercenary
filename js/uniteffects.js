/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var szoltmar = false;

uniteff = (cid) => {
    
    
    switch (cardbyid[cid].abnum){
        case 1:
            // No ability.
            break;
        case 2:
            // When discarded from your hand:<br>Deal all enemies 3 Damage.
            if ((discthis == cid) && (handdisc)){
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
            //While Present:<br>opponents can't remove your cards from the game..
            if (oppeff){
                canceled = true;
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> prevents removing this card!</font>");
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
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> can only lose Health in battle.</font>");
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
            var hasada = false;
            $("#avnow").children().each(function() {
                if (cardbyid[$(this).attr("id")].type == "disadv"){
                    hasada = true;
                    cardbyid[$(this).attr("id")].place="#oop";
                    $(this).remove();
                }
            });
            if (hasada){
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
            }
            break;
        case 14:
            // At the Healer:<br>Place a current Terrain Advantage<br>into your hand.
            if ((cardbyid[cardbyid[cid].assign].type == "heal") && (enemies[fight].children()[attack].id == cid)) {
                writelog("<br><font color=\"orchid\">At the Healer: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                terrada(true);
                $("#avnow").append($(".cardc[id=\""+hanylapvan+"\"]"));
            }
            break;
        case 15:
            // When discarded from your hand:<br>Add an Ardent Recruit to your deck for the duration of this Battle.
            if ((discthis == cid) && (handdisc)){
                
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
        case 19:
            // Gains +1 permanent Health when she gains Experience.
            if (whoexp == cid){
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> <font color=\"orchid\"> gains 1 permanent HP.</font>");
                cardbyid[cid].hp ++;
                cardbyid[cid].basehp ++;
            }
            break;
        case 20:
            // She deals +3 Damage against<br>Orc Enemies.
            if ((attacked == cid) && (cardbyid[takedamage].trait == "Orc Enemy")) {
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> <font color=\"orchid\"> deals 3 extra damage.</font>");
                tdamount += 3;
            }
            break;
        case 21:
            // She deals +3 Damage against<br>Beast Enemies.
            if ((attacked == cid) && (cardbyid[takedamage].trait == "Beast Enemy")) {
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> <font color=\"orchid\"> deals 3 extra damage.</font>");
                tdamount += 3;
            } 
            break;
        case 22:
            // He deals +3 Damage against<br>Undead Enemies.
            if ((attacked == cid) && (cardbyid[takedamage].trait == "Undead Enemy")) {
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> <font color=\"orchid\"> deals 3 extra damage.</font>");
                tdamount += 3;
            } 
            break;
        case 23:
            // He deals +3 Damage against<br>Demon Enemies.
            if ((attacked == cid) && (cardbyid[takedamage].trait == "Demon Enemy")) {
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> <font color=\"orchid\"> deals 3 extra damage.</font>");
                tdamount += 3;
            } 
            break;
        case 24:
            // She deals +3 Damage against Enemies if she has Experience.
            if ((attacked == cid) && (cardbyid[takedamage].type == "monst") && ((cardbyid[cid].xp[1]) || (cardbyid[cid].xp[2]) || (cardbyid[cid].xp[3]))) {
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> <font color=\"orchid\"> deals 3 extra damage.</font>");
                tdamount += 3;
            }
            break;
        case 25:
            // At the healer: instead of healing her, heal your Commander for 4 HP.
            if ((cardbyid[cardbyid[cid].assign].type == "heal") && (enemies[fight].children()[attack].id == cid)) {
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> <font color=\"orchid\"> redirects the healing power to your Commander.</font>");
                heal(commander, 4);
                healerheal = 0;
            }
            break;
        case 26:
            // If he has an assisting Unit, the Enemy he's assigned to doesn't fight your Commander
            if ((attacked == cid) && (cardbyid[cid].assist != 0)){
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> <font color=\"orchid\"> lures the Enemy away from your Commander.</font>");
                commfight = false;
            }
            break;
        case 27:
            // While Present, opponents can't discard your cards
            if (oppeff){
                canceled = true;
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> prevents discarding this card!</font>");
            } 
            break;
        case 28:
            // After her assisting Unit attacks,<br>deal 4 Damage to this Enemy
            if (cardbyid[cid].assist == attacked){
                writelog("<br><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> finds an extra chance to attack!</font>");
                damage(attmonst, 4);
            }
            break;
        case 29:
            // When you draw her:<br>Draw the first card from your deck.
            if (justdrawn == cid){
                setTimeout(function(){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> brings an aide!</font>");
                    writelog("<br>You draw <card id=\"" + $("#deck").children()[0].id + "\">" + cardbyid[$("#deck").children()[0].id].title + "</card>.");
                    drawcard($("#deck").children()[0].id);
                }, 50);
            }
            break;
        case 30:
            // When she dies:<br>Turn your current Region into \"Blessed Fields\".
            
            if (whodies == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> shrouds your surroundings in light!</font>");
                recruit = 51;
                generate (6, "#game");
                recruit = 0;
                cardbyid[hanylapvan].what = cardbyid[bfield].what;
                cardbyid[hanylapvan].trait = cardbyid[bfield].trait;
                
                $(".cardc[id=\""+bfield+"\"]").remove();
                bfield = hanylapvan;
                
            }
            break;
        case 31:
            // Before Combat:<br>Blank the ability of the non-Boss enemy she's assigned to.
            if (cardbyid[cardbyid[cid].assign].what == "monst"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> disrupts her Enemy's plans!</font>");
                cardbyid[cardbyid[cid].assign].trig = 0;
                cardbyid[cardbyid[cid].assign].abnum = 0;
                cardbyid[cardbyid[cid].assign].text = "";
            }
            break;
        case 32:
            // When discarded:<br>Put him into your Hand<br>if his HP is above 8.
            if ((discthis == cid) && (cardbyid[cid].hp > 8)){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> returns to your side!</font>");
                canceled = true;
                $("#avnow").append($(".cardc[id=\""+cid+"\"]"));  
                makedrag($(".cardc[id=\""+cid+"\"]"));
            }
            break;
        case 33:
            // Before Combat:<br>If he is in your hand, draw a random Skill card from your deck into your hand.
            if (cardbyid[cardbyid[cid].assign].type == "heal"){
                var skillek = new Array();
                skillek = [];
                $("#deck").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].what == "skill"){
                        skillek.push($(this).attr("id"));
                    }
                });
                if (skillek.length > 0){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> helps you with his knowledge!</font>");
                    rndskill = Math.floor(Math.random() * skillek.length);

                    drawcard(skillek[rndskill]);

                }
            }
            
            break;
        case 34:
            // Before Combat:<br>If she is in your hand, deal the Enemy in the middle slot 4 Damage.
            if (cardbyid[cid].assign == 0){
                if (cardbyid[enemies[2].children()[0].id].type == "monst"){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> shoots arrows from the rear!</font>");
                    damage(enemies[2].children()[0].id, 4);
                }
            }
            break;
        case 35:
            // Before Combat:<br>Give assisting Unit +5 Speed for the rest of this battle.
            if (cardbyid[cid].assist != 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> heartens her companion!</font>");
                cardbyid[cardbyid[cid].assist].perc += 5;
            }
            break;
        case 36:
            // Before Combat:<br>Deal all Enemies 1 Damage.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> burns your Enemies!</font>");
            damage(enemies[1].children()[0].id, 1);
            if (cardbyid[enemies[2].children()[0].id].type == "monst"){
                damage(enemies[2].children()[0].id, 1);
            }
            if (cardbyid[enemies[3].children()[0].id].type == "monst"){
                damage(enemies[3].children()[0].id, 1);
            }
            break;
        case 37:
            // When you draw her:<br>Give Advantage cards in your deck +5 Speed for the rest of t
            if (justdrawn == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> brings you luck!</font>");
                $("#deck").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].type == "adv"){
                        cardbyid[$(this).attr("id")].perc += 5;
                    }
                });
            }
            break;
        case 38:
            // When he takes damage:<br>He takes one less damage.
            if (takedamage == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> is tough!</font>");
                tdamount --;
            }
            break;
        case 39:
            // When she regains HP during Combat, she regains 2 extra HP.
            if (getheal == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> heals easily!</font>");
                heamount += 2;
            }
            break;
        case 40:
            // When you discard her from your hand:<br>she gains +4 DMG for the rest of this Battle.
            if ((discthis == cid) && (handdisc)){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> hides in the shadows!</font>");
                cardbyid[cid].dmg += 4;
            }
            break;
        case 41:
            // Before Combat:<br>Heal assisting Unit for 4 HP
            if (cardbyid[cid].assist != 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> heals her partner!</font>");
                heal (cardbyid[cid].assist, 4);
            }
            break;
        case 42:
            // Before Combat:<br>Place a \"Hail of Sparks\" Advantage card into your Deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> ignites the air!</font>");
            adadraw = 11;
            generate(7, "#deck");
            break;
        case 43:
            // After Combat:<br>Give any Units you Keep +1 DMG for the rest of this battle
            var voltunit = false;
            $("#keep").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what=="unit"){
                    cardbyid[$(this).attr("id")].dmg ++;
                    voltunit = true;
                }
            });
            if (voltunit){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> boosts the lookouts!</font>");
            }
            break;
        case 44:
            // Before Combat:<br>Deal the Enemy she's assigned to 1 Damage for each Unit in your Hand
            var dodam = 0;
            $("#avnow").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what=="unit"){
                    dodam ++;
                }
            });
            if (dodam > 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> enjoys the attention!</font>");
                damage (cardbyid[cid].assign, dodam);
            }
            break;
        case 45:
            // Before Combat:<br>If he's in your Hand, deal all Enemies 1 Damage for each Skill in your Hand.
            var dodam = 0;
            $("#avnow").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what=="skill"){
                    dodam ++;
                }
            });
            if (dodam > 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> attacks from the shadows!</font>");
                damage(enemies[1].children()[0].id, dodam);
                if (cardbyid[enemies[2].children()[0].id].type == "monst"){
                    damage(enemies[2].children()[0].id, dodam);
                }
                if (cardbyid[enemies[3].children()[0].id].type == "monst"){
                    damage(enemies[3].children()[0].id, dodam);
                }
            }
            break;
        case 46:
            // Before Combat:<br>Deal 4 Damage to assigned Enemy if your Battlescore is at least 60
            if ((bscore >= 60) && cardbyid[cid].assign != 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> shows no mercy!</font>");
                damage (cardbyid[cid].assign, 4);
            }
            break;
        case 47:
            // After Combat<br>Units in your Hand regain 2 HP.
            var voltunit = false;
            $("#avnow").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what=="unit"){
                    heal ($(this).attr("id"), 2);
                    voltunit = true;
                }
            });
            if (voltunit){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> praises the gods!</font>");
            }
            break;
        case 48:
            // Before Battle:<br>He gains +6 HP for this Battle if the Battlefield is a Plains Region.
            if  (cardbyid[bfield].trait == "Plains Region"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> feels at home here.</font>");
                cardbyid[cid].hp += 6;
            }
            break;
        case 49:
            // Before Battle:<br>He gains +8 Speed for this Battle if the Battlefield is a Mountains Region.
            if  (cardbyid[bfield].trait == "Mountain Region"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> feels at home here.</font>");
                cardbyid[cid].perc += 8;
            }
            break;
        case 50:
            // While in your Hand:<br>Disadvantage cards can't be added to your deck if the Battlefield is a Woodland Region.
            if ((cardbyid[bfield].trait == "Woodlands Region") && (cardbyid[cid].assign == 0)) {
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> prevents that!</font>");
                canceled = true;
            }
            break;
        case 51:
            // At round start:<br>Place a random Skill into your Hand if the Battlefield is a Fortress Region.
            if (cardbyid[bfield].trait == "Fortress Region"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> has an idea!</font>");
                generate (4, "#avnow");
                cardbyid[hanylapvan].temp = true;
            }
            break;
        case 52:
            // Before Battle:<br>He gains +2 Damage for this Battle if the Battlefield is a Swamp Region.
            if (cardbyid[bfield].trait == "Swamp Region"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> feels at home here.</font>");
                cardbyid[cid].dmg += 2;
            }
            break;
        case 53:
            // 
            if (cardbyid[getheal].type == "monst"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> doesn't let enemies heal!</font>");
                heamount = 0;
            }
            break;
        case 54:
            // While Present:<br>Enemies can't increase their DMG.
            canceled = true;
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> prevents that!</font>");
            break;
        case 55:
            // While Present:<br>The Speed of your cards can't be decreased.
            canceled = true;
            if (!szoltmar){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> prevents that!</font>");
                szoltmar = true;
            }
            break;
        case 56:
            // While Present:<br>Your Commander can only lose Health when attacked in Combat.
            if ((commander != attacked) && (takedamage == commander)){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> prevents damage to your Commander.</font>");
                tdamount = 0;
            }
            break;
        case 57:
            // While Present:<br>The DMG of your Units can't be decreased.
            canceled = true;
            if (!szoltmar){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> prevents that!</font>");
                szoltmar = true;
            }
            break;
            
    }
    
};