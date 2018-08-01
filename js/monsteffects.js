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
                
                writelog("<br><font color=\"orchid\">Before Combat: <card id=\"" + cid + "\">" + cardbyid[cid].title + "</card> uses her special ability!</font>");
                cardbyid[cid].dmg += 2;
                if (cardbyid[cid].assist != 0){
                    cardbyid[cid].dmg += 2;
                }
                writelog("<br>DMG is now raised up to "+cardbyid[cid].dmg+".");
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
        
    }
    
    
};