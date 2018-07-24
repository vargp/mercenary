/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const RecNum = 9;

var fight = 0;
var attack = 0;
var step;
var combats;
var attacked;
var attmonst;
var delay;
var bscore = 50;
var cardbyid = new Array();
var hanylapvan = 0;
var dragid = 0;
var dontshow = false;
var enemies = new Array();
var battles = new Array();
var hold = false;
var commander = 0;
var gold = 100;
var fame = 0;
var curwave;
var maxwave = 10;
var battlenum = 1;
var curfray;
var enemytype;
var actheal;
var retaliate = true;

$(document).on( "click", "#endturn", function( event ) {
    
    $('.ui-draggable').draggable( "destroy" );
        
        
    combatstart();
    
    // see the rest in "endofturn" which will be called by the last step of combat
    
});

function discard(){
    
    $("#deck").append($("#avnow").children(".cardc"));
    $("#deck").children().each(function() {
        cardbyid[$(this).attr("id")].place = "#deck";
        $(this).removeClass("attacking");
    });
    
}


function endofturn(){
    
    trigger(10);
    
    $("#deck").append($(".cardc.attacking"));
    
    discard();
    
    $("#deck").children(".cardc").each(function() {
        cardbyid[$(this).attr("id")].assign=0;
        cardbyid[$(this).attr("id")].assist=0;
        
        
    });
        
    
    sortdeck();
    
    rollchance();
    
    
    $("#keep").children(".cardc").each(function() {
        cardbyid[$(this).attr("id")].place="#avnow";
        makedrag($(this));
        $("#avnow").append($(this));
        
    });
    
    
    
    hold = false;
    $("#endturn").css("display", "inline-block");
    
    // $("#dead").append($(".cardc.dead"));
    $(".cardc.dead").remove();
    
    mongen();
    
}

function rollchance(){
    
    var croll;
    
    $("#deck").children().each(function() {
        croll = Math.floor((Math.random() * 100) + 1);
        console.log("roll "+croll+" vs "+cardbyid[$(this).attr("id")].perc);
        if (cardbyid[$(this).attr("id")].perc >= croll){
            $("#avnow").append($(this));
            
            cardbyid[$(this).attr("id")].place = "#avnow";
            makedrag($(this));
                        
            if ($("#avnow").children().length > 12){
                cardbyid[$("#avnow").children()[0].id].place = "#deck";
                $("#sort").append($("#avnow").children()[0]);
            }
        } 
    });
    
}

function makedrag(ezt){
    
    if (cardbyid[ezt.attr("id")].what == "unit"){
    
        ezt.draggable({
            revert: "invalid",
            start: function( event, ui ) {
                console.log($(this).attr("id"));
                dragid = $(this).attr("id");
                $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revertDuration", 200 );
                honnandrag = cardbyid[dragid].place;
                            if (cardbyid[$(honnandrag).children()[0].id].type == "fray"){
                                    curfray += cardbyid[dragid].dmg;
                                    console.log("frayből drag");
                            }
            },
            stop: function( event, ui ) {
            }
            // helper: "clone"
        });
    
    }
    
}

function sortdeck(){
        
    $("#sort").append($("#deck").children(".cardc"));
    
    var lowestval;
    var lowestc;
    var deckc = $("#sort").children(".cardc").length;
    
    while (deckc > 0){
        lowestval = 0;
        $("#sort").children(".cardc").each(function() {
            if (cardbyid[$(this).attr("id")].perc >= lowestval){
                lowestval = cardbyid[$(this).attr("id")].perc;
                lowestc = $(this);
            }
        });
        $("#deck").append(lowestc);
        deckc --;
    }
    
    
}

function slash(){
    
    $("#takedmg").css("display", "inline-block");
    $("#slash").css("display", "inline-block");
    $("#takedmg").removeClass("damage").addClass("damage");
    setTimeout(function(){
        $("#takedmg").css("display", "none");
        $("#slash").css("display", "none");
    }, 1000);
    
}

function combatstart(){
    
    delay = 0;
    
    fight = 1;
    attack = 1;
    hold = true;
    $("#endturn").css("display", "none");
    
    checkass();
    
    trigger (1);
    
    
    writelog("<br><font color=\"orchid\">Combat round begins.</font>");
    nextstep();
        
    
    
    
}

function nextstep() {
    
    delay = 0;
    console.log("fight: "+fight+", attack: "+attack);
    attmonst = enemies[fight].children()[0].id;
    
    
    if ((cardbyid[enemies[fight].children()[0].id].type == "monst") && (cardbyid[enemies[fight].children()[0].id].hp > 0)){
        if (enemies[fight].children()[attack] == undefined){
            if (attack == 3){
                // else skip this step
                console.log('hit the commander!');
                attacked = commander;
                combat();
                fight ++;
                console.log("már a commandert csapta, fight ++");
                attack = 0;
                delay = 2400;
            } else {
                console.log("hoppskipp!");
            }
        } else {
            attacked = enemies[fight].children()[attack].id;
            
            combat();
            delay = 2400;
        }
    } else if (cardbyid[enemies[fight].children()[0].id].type == "fray"){
        $(".cardc").css("box-shadow", "0 0 10px 2px #000");
        $(".cardc[id=\""+enemies[fight].children()[0].id+"\"]").css("box-shadow", "0 0 6px 3px gold");
        
        if (curfray > 0){
            writelog("<br><font color=\"orange\">The Monsters gain "+curfray+" Battlescore.</font>");
        } else {
            writelog("<br><font color=\"orange\">You gain "+Math.abs(curfray)+" Battlescore.</font>"); 
        }
        
        trigger (7);
        fight ++;
        console.log("fray volt, fight ++");
        bscore -= curfray;
        curfray = frayval[battlenum];
        showbscore();
        attack = 0;
        delay = 1200;
        
    } else if (cardbyid[enemies[fight].children()[0].id].type == "heal"){
		
        $(".cardc").css("box-shadow", "0 0 10px 2px #000");

        if (enemies[fight].children()[attack] != undefined){
            $(".cardc[id=\""+enemies[fight].children()[attack].id+"\"]").css("box-shadow", "0 0 6px 3px gold");
            showcard(enemies[fight].children()[attack].id);

            heal(enemies[fight].children()[attack].id, healval[battlenum]);

            $("#hpval").html(cardbyid[enemies[fight].children()[attack].id].hp);
            $("#takedmg").css("display", "inline-block");
            $("#takedmg").addClass("damage");
            setTimeout(function(){
                    $("#takedmg").css("display", "none");
            }, 1000);
            delay = 1200;
            writelog("<br><card id=\"" + enemies[fight].children()[attack].id + "\">" + cardbyid[enemies[fight].children()[attack].id].title + "</card> <font color=\"Aqua\">regained "+actheal+" Health.</font>");
        }
        if (attack == 2){
            attack = 0;
            fight ++;
            console.log("heal volt, fight ++");
        }
		
        
    } else if (cardbyid[enemies[fight].children()[0].id].hp <= 0){
        attack = 0;
        fight ++;
        console.log("szörny halott, fight ++");
    }
    
    attack++;
    
    
    if (fight == 4) {
        delay +=500;
        setTimeout(function(){
            writelog("<br><font color=\"orchid\">Combat round ends.</font>");
            $(".cardc").css("box-shadow", "0 0 10px 2px #000");
            trigger (6);
            endofturn();
        }, delay);
    } else {
        setTimeout (nextstep, delay);
    }
    
}

function heal(who, amount) {
    
    actheal = cardbyid[who].basehp - cardbyid[who].hp;
    if (actheal >= amount){
        actheal = amount;
    }
    cardbyid[who].hp += actheal;
    
}

function combat() {
    
    retaliate = true;
    
    showcard(attacked);
    $(".cardc").css("box-shadow", "0 0 10px 2px #000");
    $("#takedmg").css("display", "none");
    
    cardbyid[attacked].hp -= cardbyid[attmonst].dmg;
    writelog("<br><card id=\"" + attmonst + "\">" + cardbyid[attmonst].title + "</card><font color=\"red\"> attacks <card id=\"" + attacked + "\">" + cardbyid[attacked].title + "</card></font>!");
    //writelog("<br><card id=\"" + attacked + "\">" + cardbyid[attacked].title + "</card> has lost "+cardbyid[attmonst].dmg+" health.");
    writelog("<br>Damage: "+cardbyid[attmonst].dmg+" Health.</font>");
    $("#hpval").html(cardbyid[attacked].hp);
    setTimeout(function(){
        $(".cardc[id=\""+attacked+"\"]").css("box-shadow", "0 0 6px 3px red");
        $(".cardc[id=\""+attmonst+"\"]").css("box-shadow", "0 0 6px 3px gold");
        slash();
        trigger(3);
    }, 200);
    
    setTimeout(function(){
        showcard(attmonst);
        $(".cardc[id=\""+attmonst+"\"]").css("box-shadow", "0 0 6px 3px red");
        $(".cardc[id=\""+attacked+"\"]").css("box-shadow", "0 0 6px 3px gold");
        
        if (retaliate){
            
            cardbyid[attmonst].hp -= cardbyid[attacked].dmg;
            writelog("<br><card id=\"" + attacked + "\">" + cardbyid[attacked].title + "</card><font color=\"springgreen\"> attacks <card id=\"" + attmonst + "\">" + cardbyid[attmonst].title + "</card></font>!");
            //writelog("<br><card id=\"" + attmonst + "\">" + cardbyid[attmonst].title + "</card> took "+cardbyid[attacked].dmg+" damage!");
            writelog("<br>Damage: "+cardbyid[attacked].dmg+" Health.</font>");
            $("#hpval").html(cardbyid[attmonst].hp);
            
            slash();
            trigger (5);
        
        } else {
            writelog("<br><card id=\"" + attacked + "\">" + cardbyid[attacked].title + "</card><font color=\"springgreen\"> can't retaliate!");
        }
        
    }, 1300);
    
    
    
    setTimeout(checkdead, 2000, attacked, 0);
    setTimeout(checkdead, 2000, attmonst, attacked);
    
}

var checkdead = (who, bywhom) => {
     
    if (cardbyid[who].hp <= 0) {
        $(".cardc[id=\""+who+"\"]").addClass("dead");
        cardbyid[who].illus = "skull";
        cardbyid[who].trait = "dead";
        $(".cardc[id=\""+who+"\"]").children("img").attr("src", "img/illus/skull.jpg");
        writelog("<br><card id=\"" + who + "\">" + cardbyid[who].title + "</card><font color=\"SlateGrey\"> has died!");
        if (cardbyid[who].type == "monst"){
            bscore += 2;
            writelog("<br><font color=\"orange\">You gain 2 Battlescore.</font>");
            showbscore();
            if (bywhom > 0){
                gainexp(bywhom);
            }
        } else {
            bscore -= 2;
            writelog("<br><font color=\"orange\">The monsters gain 2 Battlescore.</font>");
            showbscore();
        }
    }
    
};

function showbscore() {
    var bper = 200 * (bscore / 100);
    if (bscore <= 0){
        bper = 0;
        // Retreat!
    }
    if (bscore >= 100){
        bper = 200;
        // Victory!
    }
    $("#winbattle").css("width", bper+"px");
    
    
}

var gainexp = (who) => {
	if (((cardbyid[who].xp[1]) && (cardbyid[who].xp[2]) && (cardbyid[who].xp[3])) || (cardbyid[who].hp <= 0) || (who == commander) ){
		// nem tud többet kapni
	} else {
		do {
                    whichxp = Math.floor((Math.random() * 3) + 1);
		} while (cardbyid[who].xp[whichxp]);
		cardbyid[who].xp[whichxp] = true;
		writelog("<br><card id=\"" + who + "\">" + cardbyid[who].title + "</card><font color=\"yellowgreen\"> has earned a promotion!");
	}
    
};

function checkass() {
    
    for (let i = 1; i < 4; i++) {
        
        cardbyid[enemies[i].children()[0].id].assign = 0;
        cardbyid[enemies[i].children()[0].id].assist = 0;
                
        for (let j = 1; j < 3; j++) {
            if (enemies[i].children()[j] != undefined){
                
                // monsters
                
                if (j == 1){
                    cardbyid[enemies[i].children()[0].id].assign = enemies[i].children()[j].id;
                } else {
                    cardbyid[enemies[i].children()[0].id].assist = enemies[i].children()[j].id;
                }
                
                // units
                
                cardbyid[enemies[i].children()[j].id].assign = enemies[i].children()[0].id;
                if (j == 1){
                    if (enemies[i].children()[2] != undefined){
                        cardbyid[enemies[i].children()[1].id].assist = enemies[i].children()[2].id;
                    }
                } else {
                    cardbyid[enemies[i].children()[2].id].assist = enemies[i].children()[1].id;
                }
            
            console.log(enemies[i].children()[j].id+". assign: "+cardbyid[enemies[i].children()[j].id].assign);
            console.log(enemies[i].children()[j].id+". assist: "+cardbyid[enemies[i].children()[j].id].assist);
            }
            
        }
    }
    
}


var trigger = (trig) => {
    
    switch(trig){
        case 1:
        case 6:
            trigmonst(trig);
            trigassigned(trig);
            trighand(trig);
            break;
        case 3:
            if (cardbyid[attmonst].trig == 3){
                monsteff(attmonst);
            }
            break;
        case 5:
            if (cardbyid[attacked].trig == 5){
                uniteff(attacked);
            }
            break;
        case 7:
            trigfray(trig);
            break;
        case 10:
            trighand(trig);
            break;
    }
    
    
};

trigassigned = (trig) => {
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 3; j++) {
            if (enemies[i].children()[j] != undefined){   
                if ((cardbyid[enemies[i].children()[j].id].trig == trig) && (cardbyid[enemies[i].children()[j].id].hp > 0)){
                    uniteff(enemies[i].children()[j].id);
                }
            }
        }
    }
};

trigfray = (trig) => {
    if (enemies[fight].children()[1] != undefined){
        if (cardbyid[enemies[fight].children()[1].id].trig == trig){
            uniteff(enemies[fight].children()[1].id);
        }
    }
    if (enemies[fight].children()[2] != undefined){
        if (cardbyid[enemies[fight].children()[2].id].trig == trig){
            uniteff(enemies[fight].children()[2].id);
        }
    }
};

trigmonst = (trig) => {
    for (let i = 1; i < 4; i++) {
        console.log("type: "+cardbyid[enemies[i].children()[0].id].type+", trig: "+cardbyid[enemies[i].children()[0].id].trig)
        if ((cardbyid[enemies[i].children()[0].id].type == "monst") && (cardbyid[enemies[i].children()[0].id].trig == trig) && (cardbyid[enemies[i].children()[0].id].hp > 0)){
            console.log("triggered!");
            //setTimeout(monsteff, delay, enemies[i].children()[0].id);
            monsteff(enemies[i].children()[0].id);
        }
    }
};

trighand = (trig) => {
    $("#avnow").children().each(function() {
        if (cardbyid[$(this).attr("id")].trig == trig){
            switch(cardbyid[$(this).attr("id")].what){
                case "unit":
                    uniteff($(this).attr("id"));
                    break;
                case "skill":
                    break;
                case "ada":
                    break;
            }
        }
    });
    
};

function startbattle(){
    
    writelog("<br><font color=\"orchid\">Battle starts.</font>");
    
    showgame();
    $("#inf").css("left", "1500px");
    $("#wave").css("display", "inline-block");
	
    $("#wave").html("Wave "+curwave+" / "+maxwave);
    
    $("#game").append($(".cardc[id=\""+bfield+"\"]"));
    var str = '<div class="cardf" id="endturn"><img class="smallcard" src="img/endturn.jpg"></div>';
    $("#game").append(str);
    
    $("#enc1").empty();
    $("#enc2").empty();
    $("#enc3").empty();
    
    maxwave = cardbyid[bfdetails].waves;
    curwave = 0;
    curfray = frayval[battlenum];
    bscore = cardbyid[bfdetails].bsbase;
    showbscore();
    
    adadraw = 1;
    generate(7, "#deck");
    adadraw = 2;
    generate(7, "#deck");
    sortdeck();
    rollchance();
    
    enemytype = 1;
    mongen();
    
}

function endbattle(){
    
    writelog("<br><font color=\"orchid\">Battle ends.</font>");
    
    $("#deck").append($(".cardc.attacking"));
    
    $("#deck").append($("#keep").children(".cardc"));
        
    discard();
    
    $("#deck").children(".cardc").each(function() {

        cardbyid[$(this).attr("id")].assign=0;
        cardbyid[$(this).attr("id")].assist=0;
        cardbyid[$(this).attr("id")].dmg = cardbyid[$(this).attr("id")].basedmg;
        cardbyid[$(this).attr("id")].perc = cardbyid[$(this).attr("id")].baseperc;
        if (cardbyid[$(this).attr("id")].hp > cardbyid[$(this).attr("id")].basehp){
            cardbyid[$(this).attr("id")].hp = cardbyid[$(this).attr("id")].basehp;
        }
        if (cardbyid[$(this).attr("id")].temp){
            console.log("remove: "+$(this));
            cardbyid[$(this).attr("id")].place = "oog";
            $(this).remove();
        }
    
    });
    
    sortdeck();
    
    battlenum ++;
    
    if (bscore >= 50){
        gold += cardbyid[bfdetails].gold;
        fame += cardbyid[bfdetails].fame;
        writelog("<br><font color=\"orchid\">Victory! You won the battle.</font>");
    } else {
        gold += cardbyid[bfdetails].goldlose;
        fame += cardbyid[bfdetails].famelose;
        writelog("<br><font color=\"orchid\">Retreat! You lost the battle.</font>");
    }
    
    buycards();
    
}