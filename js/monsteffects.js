/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


monsteff = (cid) => {
    
    
    switch (cardbyid[cid].abnum){
        case 1:
            // After Combat:<br>remove a random Skill from your deck for the duration of this battle.
            var skills = new Array();
            skills = [];
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "skill"){
                    skills.push($(this).attr("id"));
                }
            });
            if (skills.length > 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> makes you forgetful!</font>");
                var disthis = Math.floor(Math.random() * skills.length);
                oppeff = true;
                removecard(skills[disthis]);
                oppeff = false;
            }
            break;
        case 2:
            // After Attacking:<br>Remove all available Experience from the attacked unit.
            if (attmonst == cid){
                if ((cardbyid[attacked].xp[1]) || (cardbyid[attacked].xp[2]) || (cardbyid[attacked].xp[3])){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> mocks your soldier!</font>");
                    writelog("<br><card id=\"" + attacked + "\">" + cardbyid[attacked].title + "</card> loses all experience.</font>");
                    cardbyid[attacked].xp[1] = false;
                    cardbyid[attacked].xp[2] = false;
                    cardbyid[attacked].xp[3] = false;
                }
            }
            break;
        case 3:
            // After Attacking:<br>If attacked unit's Health is below 5,<br>it can't retaliate.
            if ((attmonst == cid) && (cardbyid[attacked].hp < 5)){
                
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> holds off your weakened soldier!</font>");
                retaliate = false;
            }
            break;
        case 4:
            // When Appears:<br>Every Unit in your Hand<br>loses 2 HP.
            if (monstapp == cid){

                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> sends in his wolves to wreak havoc!</font>");
                $("#avnow").children().each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit"){
                        damage($(this).attr("id"), 2);
                    }
                });
            }
            break;
        case 5:
            // After Combat, if still alive:<br>Increase the number of Waves in this Battle by 1.
            if (cardbyid[cid].hp > 0){
                
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> won't let you get away that easily!</font>");
                maxwave ++;
                $("#wave").html("Wave "+curwave+" / "+maxwave);
                writelog("<br>The number of Waves in this battle went up to "+maxwave+".");
            }
            
            break;
        case 6:
            // Before Combat:<br>Each Unit assigned to him<br>loses 3 HP.
            if (cardbyid[cid].assign != 0){
                
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> ambushes your units!</font>");
                damage(cardbyid[cid].assign, 3);
                
                if (cardbyid[cid].assist != 0){
                    
                    damage(cardbyid[cid].assist, 3);    
                    
                }
            }
            break;
        case 7:
            // After Attacking:<br>Deals 2 additional DMG to the second Unit assigned to him.
            if (attmonst == cid){
                
                if (cardbyid[cid].assist != 0){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> stabs at your second unit!</font>");
                    damage (cardbyid[cid].assist, 2)
                }
            }   
            break;
        case 8:
            // Before Combat:<br>Gains +2 DMG for each Unit assigned to her.
            if (cardbyid[cid].assign != 0){
                
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> gets stronger!</font>");
                var dmgplus = 2;
                
                if (cardbyid[cid].assist != 0){
                    dmgplus += 2;
                }
                dmginc(cid, dmgplus);
                
            }
            break;
        case 9:
            // When Appears:<br>Place a new Enemy into the<br>third slot.
            if (monstapp == cid){
                $("#enc3").empty();
                writelog("<br><font color=\"orchid\">Another enemy crawls out of <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                newmon ("#enc3");
            }
            break;
        case 10:
            // When Appears:<br>Discard the first card from your hand.
            if (monstapp == cid){
                oppeff = true;
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> frightens your soldiers!</font>");
                discfromhand($("#avnow").children()[0].id);
                oppeff = false;
            }
            break;
        case 11:
            // After first unit retaliates:<br>If it has 8 or more Health left,<br>discard the second unit<br>assigned to it.
            if ((attmonst == cid) && (cardbyid[cid].hp > 7) && (cardbyid[cid].assist != 0)){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> hurls away your other unit!</font>");
                oppeff = true;
                discfromhand(cardbyid[cid].assist);
                oppeff = false;
            }
            break;
        case 12:
            // When she dies:<br>She reappears in the next slot. (Doesn't work in the rightmost slot.)
            if ((whodies == cid) && (cardbyid[cid].place != "#enc3")){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> reappears a bit further away!</font>");
                mondraw = 12;
                if (cardbyid[cid].place == "#enc1"){
                    generate (2, "#enc2");
                    $("#enc2").find('.cardc:first').remove();
                    $("#enc2").prepend($(".cardc[id=\""+hanylapvan+"\"]"));
                    $('#enc2 img:first').attr("class", "doublecard");
                    $('#enc2 .cardc:first').css("height", "184px");
                } else {
                    generate (2, "#enc3");
                    $("#enc3").find('.cardc:first').remove();
                    $("#enc3").prepend($(".cardc[id=\""+hanylapvan+"\"]"));
                    $('#enc3 img:first').attr("class", "doublecard");
                    $('#enc3 .cardc:first').css("height", "184px");
                }
            }
            break;
        case 13:
            // When Appears:<br>Remove a random unit from your deck for the duration of this battle.
            if (monstapp == cid){
                var dunits = new Array();
                dunits = [];
                $("#deck").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit"){
                        dunits.push($(this).attr("id"));
                    }
                });
                if (dunits.length > 0){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> seduces your soldier!</font>");
                    var disthis = Math.floor(Math.random() * dunits.length);
                    oppeff = true;
                    removecard(dunits[disthis]);
                    oppeff = false;
                }
            }
            break;
        case 14:
            // Before Combat:<br>Exchange a random unit from<br>your hand with the second unit<br>assigned to him.
            var dunits = new Array();
            dunits = [];
            $("#avnow").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "unit"){
                    dunits.push($(this).attr("id"));
                }
            });
            if ((dunits.length > 0) && (cardbyid[cid].assist !=0)){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> whirls around your soldiers!</font>");
                var pullthis = Math.floor(Math.random() * dunits.length);
                $("#avnow").append($(".cardc[id=\""+cardbyid[cid].assist+"\"]"));
                $(cardbyid[cid].place).append($(".cardc[id=\""+dunits[pullthis]+"\"]"));
                $(".cardc[id=\""+dunits[pullthis]+"\"]").addClass("attacking");
                $(".cardc[id=\""+cardbyid[cid].assist+"\"]").removeClass("attacking");
                cardbyid[dunits[pullthis]].place = cardbyid[cid].place;
                cardbyid[cardbyid[cid].assist].place = "#avnow";
                cardbyid[cid].assist = dunits[pullthis];
                cardbyid[dunits[pullthis]].assign = cid;
                cardbyid[dunits[pullthis]].assist = cardbyid[cid].assign;
                cardbyid[cardbyid[cid].assign].assist = dunits[pullthis];
            }
            break;
        case 15:
            // When Appears:<br>The Monsters gain 8 Battlescore
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> overwhelms the battlefield!</font>");
                bscorechange (-8);
            }
            break;
        case 16:
            // After a Unit retaliates against it:<br>That Unit loses 2 HP and 1 DMG.
            if (attmonst == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> burns its attacker!</font>");
                damage(attacked, 2);
                dmgdec(attacked, 1);
                szoltmar = false;
            }
            break;
        case 17:
            // After Attacking:<br>The Monsters gain 3 Battlescore.
            if (attmonst == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> turns soldiers into stone!</font>");
                bscorechange(-3);
            }
            break;
        case 18:
            // When Appears:<br>Decrease the Speed of all Units by 4 for the rest of this battle.
            if (monstapp == cid){
                
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> melts the ground!</font>");

                $("#avnow").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit"){
                        percdec($(this).attr("id"), 4);
                    }
                });
                $("#deck").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit"){
                        percdec($(this).attr("id"), 4);
                    }
                });
                szoltmar = false;
            }
            break;
        case 19:
            // After Attacking:<br>Decrease the Speed of all present Units by 2 for the rest of this battle.
            if (attmonst == cid){
                getpresent();
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> burns your units!</font>");
                for (let i = 0; i < present.length; i++) {
                    percdec(present[i], 2);
                }
            }
            break;
        case 20:
            // After Combat:<br>Remove the leftmost Unit assigned to her from the game for the rest of this battle.
            if (cardbyid[cid].assign != 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> steals the soul of your soldier!</font>");
                oppeff = true;
                removecard(cardbyid[cid].assign);
                if (!canceled){
                    $(".cardc[id=\""+cardbyid[cid].assign+"\"]").removeClass("attacking");
                }
                oppeff = false;
            }
            break;
        case 21:
            // When Appears:<br>Remove the Skills in your Hand for the rest of this battle.
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> ignites your surroundings!</font>");
                oppeff = true;
                $("#avnow").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].what == "skill"){
                        removecard($(this).attr("id"));
                    }
                });
                oppeff = false;
            }
            break;
        case 22:
            // After Attacking:<br>If the Monsters have more Battlescore, deal 2 Damage to all present Units.
            if ((attmonst == cid) && (bscore < 50)){
                getpresent();
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> makes the earth explode!</font>");
                for (let i = 0; i < present.length; i++) {
                    damage(present[i], 2);
                }
            }
            break;
        case 23:
            // Before Combat:<br>Lower your Commander's DMG by 1 for the rest of this Battle.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> mesmerizes your Commander!</font>");
            dmgdec(commander, 1);
            szoltmar = false;
            break;
        case 24:
            // Before Combat:<br>Place a \"Dread of Doom\"<br>Disadvantage card<br>into your Hand.
            
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> curses you!</font>");
            adadraw = 12;
            disadvadd();
            if (!canceled){
                $("#avnow").append($(".cardc[id=\""+hanylapvan+"\"]"));
                cardbyid[hanylapvan].place = "#avnow";
            }
            break;
        case 25:
            // after Combat:<br>Discard the cards that you<br>wanted to Keep.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> knocks over your soldiers!</font>");
            oppeff = true;
            $("#keep").children(".cardc").each(function() {
                $(this).addClass("attacking");
                discfromhand($(this).attr("id"));
                $(this).removeClass("attacking");
            });
            oppeff = false;
            break;
        case 26:
            // When any of your Units takes Damage, that Unit takes 2 extra Damage.
            
            if (cardbyid[takedamage].type != "monst"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> makes the wound deeper!</font>");
                tdamount += 2;
            }
            break;
        case 27:
            // After Attacking:<br>Place a \"Losing Ground\"<br>Disadvantage card<br>into your Deck.
            if (attmonst == cid) {
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> wracks up the ground!</font>");
                adadraw = 2;
                disadvadd();
            }
            break;
        case 28:
            // Before Combat:<br>Place a \"Curse of Weakness\"<br>Disadvantage card<br>into your Hand.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> curses you!</font>");
            adadraw = 13;
            disadvadd();
            if (!canceled){
                cardbyid[hanylapvan].place = "#avnow";
                $("#avnow").append($(".cardc[id=\""+hanylapvan+"\"]"));
            }
            break;
        case 29:
            // Before Combat:<br>A new Enemy appears<br>in the 2nd slot.
            
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>summons a new enemy!</font>");
            newmon ("#enc2");
            if ( cardbyid[$('#enc2 .cardc:first').attr("id")].assign != 0){
                cardbyid[hanylapvan].assign = cardbyid[$('#enc2 .cardc:first').attr("id")].assign;
                cardbyid[cardbyid[hanylapvan].assign].assign = hanylapvan;
            }
            
            if ( cardbyid[$('#enc2 .cardc:first').attr("id")].assist != 0){
                cardbyid[hanylapvan].assist = cardbyid[$('#enc2 .cardc:first').attr("id")].assist;
                cardbyid[cardbyid[hanylapvan].assist].assign = hanylapvan;
            }
            
            $("#enc2").find('.cardc:first').remove();
            $("#enc2").prepend($(".cardc[id=\""+hanylapvan+"\"]"));
            $('#enc2 img:first').attr("class", "doublecard");
            $('#enc2 .cardc:first').css("height", "184px");
            break;
        case 30:
            // Before Combat:<br>If her Health is lower than 16,<br>she turns into a random Enemy.
            if (cardbyid[cid].hp < 16){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>becomes something else!</font>");
                newmon (cardbyid[cid].place);
                if ( cardbyid[$(cardbyid[cid].place+' .cardc:first').attr("id")].assign != 0){
                    cardbyid[hanylapvan].assign = cardbyid[$(cardbyid[cid].place+' .cardc:first').attr("id")].assign;
                    cardbyid[cardbyid[hanylapvan].assign].assign = hanylapvan;
                }

                if ( cardbyid[$(cardbyid[cid].place+' .cardc:first').attr("id")].assist != 0){
                    cardbyid[hanylapvan].assist = cardbyid[$(cardbyid[cid].place+' .cardc:first').attr("id")].assist;
                    cardbyid[cardbyid[hanylapvan].assist].assign = hanylapvan;
                }
                $(cardbyid[cid].place).find('.cardc:first').remove();
                $(cardbyid[cid].place).prepend($(".cardc[id=\""+hanylapvan+"\"]"));
                $(cardbyid[cid].place+' img:first').attr("class", "doublecard");
                $(cardbyid[cid].place+' .cardc:first').css("height", "184px");
            }
            break;
        case 31:
            // Your Units<br>can't regain Health.
            if (cardbyid[getheal].type != "monst"){
                if (!monstszolt){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> blocks the healing!</font>");
                    monstszolt = true;
                }
                heamount = 0;
            }
            break;
        case 32:
            // When Appears:<br>Decrease the Healer's Health restoring power by 2 for the rest of this battle.
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> sings a song to your Healer!</font>");
                healval[battlenum] -= 2;
                if (healval[battlenum] < 0){
                    healval[battlenum] = 0;
                }
            }
            break;
        case 33:
            // When Appears:<br>She deals your Commander<br>4 Damage.
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> throws a javelin at your Commander!</font>");
                damage (commander, 4);
            }
            break;
        case 34:
            // Before Combat:<br>Place an \"Ambush from the Shadows\" Disadvantage card<br>into your Hand.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> hunts you down!</font>");
            adadraw = 10;
            disadvadd();
            if (!canceled){
                cardbyid[hanylapvan].place = "#avnow";
                $("#avnow").append($(".cardc[id=\""+hanylapvan+"\"]"));
            }
            break;
        case 35:
            // after Combat:<br>All present Units are dealt<br>2 Damage.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> releases his snakes!</font>");
            getpresent();
                
            for (let i = 0; i < present.length; i++) {
                damage(present[i], 2);
            }
            break;
        case 36:
            // Before Attacking:<br>He gains +1 DMG.
            if (attmonst == cid) {
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> sharpens his knives!</font>");
                dmginc(cid, 1);
                szoltmar = false;
            }
            break;
        case 37:
            // When you lose Battlescore:<br>Your Commander loses 3 HP.
            if (bscamount < 0){
                setTimeout(function(){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> puts a hex on your Commander!</font>");
                    damage(commander, 3);
                }, 20);
            }
            break;
        case 38:
            // After Attacking:<br>He deals 2 Damage<br>to your Commander.
            if (attmonst == cid) {
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> finds a way to your Commander!</font>");
                damage (commander, 2);
            }
            break;
        case 39:
            // When Appears:<br>Place a \"Chaos Curse\"<br>Disadvantage card<br>into your Deck.
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> curses you!</font>");
                adadraw = 14;
                disadvadd();
                
            }
            break;
        case 40:
            // Before Combat:<br>Units in the Fray<br>lose 2 Health each.
            getpresent();
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> assaults your soldiers!</font>");
            for (let i = 0; i < present.length; i++) {
                if (cardbyid[cardbyid[present[i]].assign].type == "fray"){
                    damage(present[i], 2);
                }
            }
            break;
        case 41:
            // Before Combat:<br>Place a \"War Cry\" disadvantage<br>card into your Hand.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> boosts the enemy's bloodthirst!</font>");
            adadraw = 15;
            disadvadd();
            if (!canceled){
                cardbyid[hanylapvan].place = "#avnow";
                $("#avnow").append($(".cardc[id=\""+hanylapvan+"\"]"));
            }
            break;
        case 42:
            // After Combat:<br>Lose 5 Gold.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> steals from you!</font>");
            gold -= 5;
            writelog("<br>You lose 5 Gold.");
            break;
        case 43:
            // Before Combat:<br>Discard the rightmost Unit in the Fray.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> lays a trap for your soldiers!</font>");
            getpresent();
            var discff = 0;
            for (let i = 0; i < present.length; i++) {
                if (cardbyid[cardbyid[present[i]].assign].type == "fray"){
                    discff = present[i];
                }
            }
            oppeff = true;
            discfromhand(discff);
            oppeff = false;
            if (!canceled){
                curfray += cardbyid[discff].dmg;
                cardbyid[discff].assign = 0;
                if (cardbyid[discff].assist != 0){
                    cardbyid[cardbyid[discff].assist].assist = 0;
                }
                cardbyid[discff].assist = 0;
                cardbyid[discff].place = "#deck";
                $(".cardc[id=\""+discff+"\"]").removeClass("attacking");
            }
            break;
        case 44:
            // Before Combat:<br>Discard the Skill cards from your Hand.
            
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> surprises you!</font>");
            
            $("#avnow").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "skill"){
                    oppeff = true;
                    discfromhand($(this).attr("id"));
                    oppeff = false;
                }
            });
            break;
        case 45:
            // When Appears:<br>If you have any Units with<br>less than 8 Health left in your Hand, discard them
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> frightens the weak!</font>");
                $("#avnow").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit") {
                        if (cardbyid[$(this).attr("id")].hp < 8){
                            oppeff = true;
                            discfromhand($(this).attr("id"));
                            oppeff = false;
                        }
                    }
                
                });
            }
            break;
        case 46:
            // When Appears:<br>Put a \"Lost in the Woods\"<br>Disadvantage card<br>into your Deck.
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> spins its web all over the place!</font>");
                adadraw = 4;
                disadvadd();
            }
            break;
        case 47:
            // Before Combat:<br>Put an \"Overwhelming Numbers\"<br>Disadvantage card<br>into your Deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> leads the pack!</font>");
            adadraw = 16;
            disadvadd();
            break;
        case 48:
            // When Killed:<br>Lose 2 Fame.
            if (whodies == cid){
                writelog("<br><font color=\"orchid\">Killing a <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> is not something to brag about.</font>");
                writelog("<br>You lose 2 Fame.");
                fame -= 2;
            }
            break;
        case 49:
            // When Appears:<br>Place a \"Hunted Down\"<br>Disadvantage card<br>into your Deck.
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> will hunt you down!</font>");
                adadraw = 17;
                disadvadd();
            }
            break;
        case 50:
            // When you discard a card<br>from your Hand:<br>This gains +1 DMG.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> is getting stornger!</font>");
            cardbyid[cid].dmg ++;
            break;
        case 51:
            // Before Attacking:<br>Discard a random card from your Hand. If it's a Unit, it loses 1 DMG for the rest of this battle.
            if ((attmonst == cid) && ($("#avnow").children().length > 0)){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> whisks your soldiers away!</font>");
                var rndhand = Math.floor(Math.random() * $("#avnow").children().length);
                var thisdsc = $("#avnow").children()[rndhand].id;
                if (cardbyid[thisdsc].what == "unit"){
                    dmgdec(thisdsc, 1);
                    szoltmar = false;
                }
                discfromhand(thisdsc);
            }
            
            break;
        case 52:
            // When another Enemy loses HP, this gains +1 DMG.
            if ((takedamage != cid) && (cardbyid[takedamage].type == "monst")){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> howls with rage!</font>");
                dmginc(cid, 1);
            }
            break;
        case 53:
            // Before Combat:<br>Units assigned to it lose 5 Speed.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> summons its spawn!</font>");
            if (cardbyid[cid].assign != 0){
                percdec(cardbyid[cid].assign, 5);
            }
            if (cardbyid[cid].assist != 0){
                percdec(cardbyid[cid].assist, 5);
            }
            break;
        case 54:
            // Before Combat:<br>Discard the 1st Unit assigned to it.
            if (cardbyid[cid].assign != 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> knocks off your soldier with one head!</font>");
                discfromhand(cardbyid[cid].assign);
            }
            break;
        case 55:
            // Before Attacking:<br>Instead of the 2nd Unit assigned to it, it attacks the 1st one again (if still alive).
            if (attacked == cardbyid[cid].assist){
                if (cardbyid[cardbyid[cid].assign].hp > 0){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> attacks the first unit again!</font>");
                    attacked = cardbyid[cid].assign;
                }
            }
            break;
        case 56:
            // When Appears:<br>Give Disadvantages in your deck +8 Speed.
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> makes you feel uneasy!</font>");
                $("#deck").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].type == "disadv") {
                        cardbyid[$(this).attr("id")].perc += 8;
                    }
                
                });
            }
            break;
        case 57:
            // Before Combat:<br>Draw the last Disadvantage card from your deck.
            var lastda = 0;
            
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].type == "disadv") {
                    lastda = $(this).attr("id");
                }
            });
            if (lastda > 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> brings you misfortune!</font>");
                drawcard(lastda);
            }
            break;
        case 58:
            // When Killed:<br>Put a \"Poison Cloud\"<br>Disadvantage card<br>into your Deck.
            if (whodies == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> poisons you!</font>");
                adadraw = 18;
                disadvadd();
            }
            break;
        case 59:
            // When Appears:<br>She gains +1 DMG and +2 HP for each Disadvantage in your Hand or Deck.
            if (monstapp == cid){
                var danum = 0;
                $("#avnow").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].type == "disadv") {
                        danum++;
                    }
                });
                $("#deck").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].type == "disadv") {
                        danum++;
                    }
                });
                if (danum > 0){
                    writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> gains "+danum+" Damage and "+2*danum+" HP!</font>");
                    cardbyid[cid].hp += 2*danum;
                    dmginc(cid, danum);
                }
            }
            break;
        case 60:
            // When Killed:<br>Turn this Region into a \"Desolate Waste\".
            if (whodies == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> shrouds your surroundings in darkness!</font>");
                recruit = 52;
                generate (6, "#game");
                recruit = 0;
                cardbyid[hanylapvan].what = cardbyid[bfield].what;
                cardbyid[hanylapvan].trait = cardbyid[bfield].trait;
                
                $(".cardc[id=\""+bfield+"\"]").remove();
                bfield = hanylapvan;
                
            }
            break;
        case 61:
            // When Appears:<br>Double the Disadvantages<br>in your Deck.
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> appears with a sinister laugh!</font>");
                $("#deck").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].type == "disadv") {
                        adadraw = cardbyid[$(this).attr("id")].abnum;
                        disadvadd();
                    }
                });
            }
            break;
        case 62:
            // When another Enemy dies:<br>Resurrect that Enemy.
            if ((whodies != cid) && (cardbyid[whodies].what == "monst") && (cardbyid[whodies].abnum != 62)){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> resurrects the fallen enemy!</font>");
                cardbyid[whodies].hp = 0;
                heal (whodies, en[cardbyid[whodies].abnum].hp);
            }
            break;
        case 63:
            // When Appears:<br>Put a \"Curse of Weakness\"<br>Disadvantage card<br>into your deck.
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> curses you!</font>");
                adadraw = 19;
                disadvadd();
            }
            break;
        case 64:
            // Before Combat:<br>Put a \"Dark Forces\"<br>Disadvantage card<br>into your Hand.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> curses you!</font>");
            adadraw = 20;
            disadvadd();
            if (!canceled){
                cardbyid[hanylapvan].place = "#avnow";
                $("#avnow").append($(".cardc[id=\""+hanylapvan+"\"]"));
            }
            break;
        case 65:
            // Before Combat:<br>Remove all Advantage cards from your Deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> looms above you!</font>");
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].type == "adv") {
                    removecard($(this).attr("id"));
                }
            });
            break;
        case 66:
            // When a Unit regains Health:<br>That Unit takes that much Damage instead.
            if (cardbyid[getheal].type != "monst"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> corrupts the healing!</font>");
                damage(getheal, heamount);
                heamount = 0;
            }
            break;
        case 67:
            // When it takes Damage:<br>It takes 2 less Damage.
            if (takedamage == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> is hard to wound!</font>");
                tdamount -= 2;
            }
            break;
        case 68:
            // Before Combat:<br>Its Health is restored its max.
            if (cardbyid[cid].hp < en[68].hp){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> regenerates!</font>");
                var diffen = en[68].hp - cardbyid[cid].hp;
                heal (cid, diffen);
            }
            
            break;
        case 69:
            // Before Combat:<br>Put a current<br>Terrain Disadvantage card<br>into your deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses the terrain against you!</font>");
            terrada (false);
            break;
        case 70:
            // When it dies:<br>non-Rogue Units assigned to it take 4 Damage.
            if (whodies == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> explodes in a fireball!</font>");
                if (cardbyid[cid].assign != 0){
                    if (cardbyid[cardbyid[cid].assign].trait != "Rogue Hero"){
                        damage (cardbyid[cid].assign, 4);
                    }
                }
                if (cardbyid[cid].assist != 0){
                    if (cardbyid[cardbyid[cid].assist].trait != "Rogue Hero"){
                        damage (cardbyid[cid].assist, 4);
                    }
                }
            }
            break;
        case 71:
            // Before Combat:<br>All Enemies (including himself) are healed 3 HP.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> heals his comrades!</font>");
            heal(enemies[1].children()[0].id, 3);
            if (cardbyid[enemies[2].children()[0].id].type == "monst"){
                heal(enemies[2].children()[0].id, 3);
            }
            if (cardbyid[enemies[3].children()[0].id].type == "monst"){
                heal(enemies[3].children()[0].id, 3);
            }
            break;
        case 72:
            // Before Combat:<br>Put a \"Vampiric Vines\"<br>Disadvantage card<br>into your Hand
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> curses you!</font>");
            adadraw = 21;
            disadvadd();
            if (!canceled){
                cardbyid[hanylapvan].place = "#avnow";
                $("#avnow").append($(".cardc[id=\""+hanylapvan+"\"]"));
            }
            break;
        case 73:
            // After a Unit attacks it:<br>It regains 3 Health unless that Unit is a Cleric.
            if (cardbyid[attacked].trait != "Cleric Hero"){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>'s flesh mends itself!</font>");
                heal (cid, 3);
            }
            break;
        case 74:
            // Before Combat:<br>Non-Mage Units assigned to it lose 2 DMG.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> exhales dark energy!</font>");
            if (cardbyid[cid].assign != 0){
                if (cardbyid[cardbyid[cid].assign].trait != "Mage Hero"){
                    dmgdec (cardbyid[cid].assign, 2);
                }
            }
            if (cardbyid[cid].assist != 0){
                if (cardbyid[cardbyid[cid].assist].trait != "Mage Hero"){
                    dmgdec (cardbyid[cid].assist, 2);
                }
            }
            break;
        case 75:
            // Before Combat:<br>It gains +4 DMG unless you have a Warrior assigned to it.
            if ((cardbyid[cardbyid[cid].assign].trait != "Warrior Hero") && (cardbyid[cardbyid[cid].assist].trait != "Warrior Hero")){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> is a superior fighter!</font>");
                dmginc(cid, 4);
            }
            break;
        case 76:
            // At the start of the Round:<br>(nagy de) Draw the last Ranger from your deck.
            var lastran = 0;
            $("#deck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].trait == "Ranger Hero") {
                    lastran = $(this).attr("id");
                }
            });
            if (lastran > 0){
                writelog("<br><font color=\"orchid\">Your Ranger has been hunting for <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card>!</font>");
                drawcard(lastran);
            }
            break;
        case 77:
            // After it takes Damage:<br>If it has 4 or less HP, it regains 4 HP.
            if (takedamage == cid){
                var thisis = cid;
                setTimeout(function(){
                    if ((cardbyid[thisis].hp < 5) && (cardbyid[thisis].hp > 0)){
                        writelog("<br><font color=\"orchid\"><card id=\"" + thisis + "\">" + cardbyid[cid].title + "</card> doesn't go down easy!</font>");
                        heal (thisis, 4);
                    }
                }, 10);
            }
            break;
        case 78:
            // When you gain Battlescore:<br>Units in your Deck lose<br>that much Speed.
            if (bscamount > 0){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> tempts your soldiers!</font>");
                $("#deck").children(".cardc").each(function() {
                    if (cardbyid[$(this).attr("id")].what == "unit") {
                        percdec($(this).attr("id"), bscamount);
                    }
                
                });
            }
            
            break;
        case 79:
            // Before Combat:<br>Units in your Hand lose 1 DMG.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> makes your unassigned units ashamed!</font>");
            $("#avnow").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what=="unit"){
                    dmgdec ($(this).attr("id"), 1);
                }
            });
            szoltmar = false;
            break;
        case 80:
            // When another Enemy appears:<br>This gains +2 DMG.
            if (monstapp != cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> becomes more dangerous!</font>");
                dmginc(cid, 2);
            }
            break;
        
        
    }
    
    
};