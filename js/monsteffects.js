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
                writelog("<br><font color=\"orchid\">After combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
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
                    writelog("<br><font color=\"orchid\">After Attacking: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
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
                
                writelog("<br><font color=\"orchid\">After Attacking: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                retaliate = false;
            }
            break;
        case 4:
            // When Appears:<br>Every Unit in your Hand<br>loses 2 HP.
            if (monstapp == cid){

                writelog("<br><font color=\"orchid\">When Appears: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
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
                
                writelog("<br><font color=\"orchid\">After Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
                maxwave ++;
                $("#wave").html("Wave "+curwave+" / "+maxwave);
                writelog("<br>The number of Waves in this battle went up to "+maxwave+".");
            }
            
            break;
        case 6:
            // Before Combat:<br>Each Unit assigned to him<br>loses 3 HP.
            if (cardbyid[cid].assign != 0){
                
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
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
                    writelog("<br><font color=\"orchid\">After Attacking: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses his special ability!</font>");
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
                writelog("<br><font color=\"orchid\">When Appears: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses its special ability!</font>");
                newmon ("#enc3");
            }
            break;
        case 10:
            // When Appears:<br>Discard the first card from your hand.
            if (monstapp == cid){
                oppeff = true;
                writelog("<br><font color=\"orchid\">When Appears: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses its special ability!</font>");
                discfromhand($("#avnow").children()[0].id);
                oppeff = false;
            }
            break;
        case 11:
            // 
            break;
        case 12:
            // 
            break;
        case 13:
            // 
            break;
        case 14:
            // 
            break;
        case 15:
            // 
            break;
        case 16:
            // 
            break;
        case 17:
            // 
            break;
        case 18:
            // 
            break;
        case 19:
            // 
            break;
        case 20:
            // 
            break;
        case 21:
            // 
            break;
        case 22:
            // 
            break;
        case 23:
            // 
            break;
        case 24:
            // 
            break;
        case 25:
            // 
            break;
        case 26:
            // 
            break;
        case 27:
            // After Attacking:<br>Place a \"Losing Ground\"<br>Disadvantage card<br>into your Deck.
            writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> wracks up the ground!</font>");
            adadraw = 2;
            disadvadd();
            break;
        case 28:
            // 
            break;
        case 29:
            // 
            break;
        case 30:
            // 
            break;
        case 31:
            // 
            break;
        case 32:
            // 
            break;
        case 33:
            // When Appears:<br>She deals your Commander<br>4 Damage.
            if (monstapp == cid){
                writelog("<br><font color=\"orchid\"><card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> throws a javelin at your Commander!</font>");
                damage (commander, 4);
            }
            break;
        case 34:
            // 
            break;
        case 35:
            // 
            break;
        case 36:
            // 
            break;
        case 37:
            // 
            break;
        case 38:
            // 
            break;
        case 39:
            // 
            break;
        case 40:
            // 
            break;
        case 41:
            // 
            break;
        case 42:
            // 
            break;
        case 43:
            // 
            break;
        case 44:
            // 
            break;
        case 45:
            // 
            break;
        case 46:
            // 
            break;
        case 47:
            // 
            break;
        case 48:
            // 
            break;
        case 49:
            // 
            break;
        case 50:
            // 
            break;
        case 51:
            // 
            break;
        case 52:
            // 
            break;
        case 53:
            // 
            break;
        case 54:
            // 
            break;
        case 55:
            // 
            break;
        case 56:
            // 
            break;
        case 57:
            // 
            break;
        case 58:
            // 
            break;
        case 59:
            // 
            break;
        case 60:
            // 
            break;
        case 61:
            // 
            break;
        case 62:
            // 
            break;
        case 63:
            // 
            break;
        case 64:
            // 
            break;
        case 65:
            // 
            break;
        case 66:
            // 
            break;
        case 67:
            // 
            break;
        case 68:
            // 
            break;
        case 69:
            // 
            break;
        case 70:
            // 
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
            // 
            break;
        case 73:
            // 
            break;
        case 74:
            // 
            break;
        case 75:
            // 
            break;
        case 76:
            // 
            break;
        case 77:
            // 
            break;
        case 78:
            // 
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
            // 
            break;
        
        
    }
    
    
};