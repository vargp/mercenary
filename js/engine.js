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
var gold = 200;
var fame = 0;
var curwave;
var maxwave = 10;
var battlenum = 1;
var curfray;
var enemytype;
var actheal;
var retaliate = true;
var theend = false;
var takedamage = 0;
var tdamount = 0;
var heamount = 0;
var getheal = 0;
var combattime = false;
var canceled = false;
var oppeff = false;
var discthis = 0;
var healed = 0;
var keepnum = 1;
var present = new Array();
var commfight = true;
var whoexp = 0;
var healerheal;
var whodies = 0;
var handdisc = false;
var endingturn = false;
var displayed = 0;
var bscamount = 0;
var monstszolt = false;
var slayer = 0;
var hdouble = false;
var rounddraw = false;
var skipcomb = false;

$(document).on( "click", "#endturn", function( event ) {
    
    $('.ui-draggable').draggable( "destroy" );
        
        
    combatstart();
    
    // see the rest in "endofturn" which will be called by the last step of combat
    
});

function discard(){
    
    $("#avnow").children(".cardc").each(function() {
        discfromhand($(this).attr("id"));
        
    });
    $("#deck").children().each(function() {
        cardbyid[$(this).attr("id")].place = "#deck";
        $(this).removeClass("attacking");
        $(this).removeClass("relentless");
    });
    
}

discfromhand = (what) => {
    
    canceled = false;
    discthis = what;
    if ($(".cardc[id=\""+what+"\"]").hasClass("attacking")){
        handdisc = false;
    } else {
        handdisc = true;
    }
    if ( !endingturn){
        writelog("<br><card id=\"" + what + "\">" + cardbyid[what].title + "</card> is discarded.</font>");
    }
    trigger (10);
    if (!canceled){
        //console.log("discard: "+what);
        if ($(".cardc[id=\""+what+"\"]").hasClass("ui-draggable")){
            $(".cardc[id=\""+what+"\"]").draggable( "destroy" );
        }
        $("#deck").append($(".cardc[id=\""+what+"\"]"));
        cardbyid[what].place = "#deck";
        
    }
    
};


function endofturn(){
    
    attacked = 0;
    attmonst = 0;
    
    trigger (6);
    
    $("#avnow").append($(".cardc.attacking"));
    
    endingturn = true;
    
    discard();
    
    endingturn = false;
    
    trigger(20);
    
    if (cardbyid[enemies[1].children()[0].id].hp <= 0){
        curwave ++;
    }
    
    $(".cardc.dead").remove();
    
    
    $("#deck").children(".cardc").each(function() {
        cardbyid[$(this).attr("id")].assign=0;
        cardbyid[$(this).attr("id")].assist=0;
        
    });
    
    
    
    $("#wave").html("Wave "+curwave+" / "+maxwave);
    
    if ((curwave > maxwave) || (bscore > 99) || (bscore < 1)){
        writelog("<br>The battle is over!");
        $("#keep").children(".cardc").each(function() {
            cardbyid[$(this).attr("id")].place="#deck";
            $("#deck").append($(this));
            $("#wave").html("Battle over!");
        });
        endbattle();
    } else {
        
        startturn();
        
    } 
    
    checkdropdisable();
    
}

function startturn(){
    
    writelog("<br><font color=\"orchid\">A new turn begins.</font>");
                
    sortdeck();

    rollchance();

    sortdeck();

    $("#keep").children(".cardc").each(function() {
        cardbyid[$(this).attr("id")].place="#avnow";
        makedrag($(this));
        $("#avnow").append($(this));

    });
    
    mongen();
    
    trigger(19);

    hold = false;
    szoltmar = false;
    $("#endturn").css("display", "inline-block");

}

function rollchance(){
    
    var croll;
    
    $("#deck").children().each(function() {
        croll = Math.floor((Math.random() * 100) + 1);
        //console.log("roll "+croll+" vs "+cardbyid[$(this).attr("id")].perc);
        if (cardbyid[$(this).attr("id")].perc >= croll){
            rounddraw = true;
            drawcard($(this).attr("id"));
            rounddraw = false;
            
        } 
    });
    
}

function drawcard(ezt){
    
    $("#avnow").append($(".cardc[id=\""+ezt+"\"]"));   
    cardbyid[ezt].place = "#avnow";
    
    if (!rounddraw){
        writelog("<br>You draw <card id=\"" + ezt + "\">" + cardbyid[ezt].title + "</card>.");
    }
    
    makedrag($(".cardc[id=\""+ezt+"\"]"));
    justdrawn = ezt;
    trigger (9);
    // console.log("draw: "+ezt);
    
    if ($("#avnow").children().length > 12){
        
        discfromhand($("#avnow").children()[0].id);
        
    } 
    
    
}

function makedrag(ezt){
    
    if (cardbyid[ezt.attr("id")].what != "ada"){
    
        ezt.draggable({
            revert: "invalid",
            start: function( event, ui ) {
                //console.log($(this).attr("id"));
                dragid = $(this).attr("id");
                $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revertDuration", 200 );
                honnandrag = cardbyid[dragid].place;
                            if (cardbyid[$(honnandrag).children()[0].id].type == "fray"){
                                    curfray += cardbyid[dragid].dmg;
                                    //console.log("frayből drag");
                            }
            },
            stop: function( event, ui ) {
            }
            // helper: "clone"
        });
        
        if (cardbyid[ezt.attr("id")].what == "unit"){
            $(".cardc[id=\""+ezt.attr("id")+"\"]").addClass("canattack");
        }
        
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
    
    skipcomb = false;
    
    trigger (1);
    
    hdouble = false;
    
    writelog("<br><font color=\"orchid\">Combat begins.</font>");
    nextstep();
        
    
    
    
}

function nextstep() {
    
    delay = 0;
    //console.log("fight: "+fight+", attack: "+attack);
    
    healed = 0;
    monstszolt = false;
    attacked = 0;
    
    attmonst = enemies[fight].children()[0].id;
    
    if (theend || skipcomb){
        fight = 4;
    } else {
           
        if ((cardbyid[enemies[fight].children()[0].id].type == "monst") && (cardbyid[enemies[fight].children()[0].id].hp > 0)){
            if (enemies[fight].children()[attack] == undefined){
                if (attack == 3){
                    // else skip this step
                    //console.log('hit the commander!');
                                    if (commfight){
                                            attacked = commander;
                                            combat();
                                            delay = 2400;
                                    }
                                    commfight = true;
                    fight ++;
                    //console.log("már a commandert csapta, fight ++");
                    attack = 0;

                } else {
                    //console.log("hoppskipp!");
                }
            } else {
                attacked = enemies[fight].children()[attack].id;
                if (cardbyid[attacked].hp > 0){
                        combat();
                        delay = 2400;
                }

            }
        } else if (cardbyid[enemies[fight].children()[0].id].type == "fray"){
            
            $(".cardc").css("box-shadow", "0 0 10px 2px #000");
            $(".cardc[id=\""+enemies[fight].children()[0].id+"\"]").css("box-shadow", "0 0 6px 3px gold");
            writelog("<br>In The Fray:</font>");
            
            trigger (7);
            fight ++;
            //console.log("fray volt, fight ++");
            
            checkass();
            
            curfray = curfray * -1;
            bscorechange (curfray);
            curfray = frayval[battlenum];
            
            attack = 0;
            delay = 1200;

        } else if (cardbyid[enemies[fight].children()[0].id].type == "heal"){

            $(".cardc").css("box-shadow", "0 0 10px 2px #000");
            
            if (!hdouble){
                writelog("<br>At The Healer:</font>");
                hdouble = true;
            }


            if (enemies[fight].children()[attack] != undefined){

                healed = enemies[fight].children()[attack].id;
                healerheal = healval[battlenum];

                trigger (8);

                $(".cardc[id=\""+enemies[fight].children()[attack].id+"\"]").css("box-shadow", "0 0 6px 3px gold");
                showcard(enemies[fight].children()[attack].id);

                heal(enemies[fight].children()[attack].id, healerheal);

                $("#hpval").html(cardbyid[enemies[fight].children()[attack].id].hp);
                $("#takedmg").css("display", "inline-block");
                $("#takedmg").addClass("damage");
                setTimeout(function(){
                    $("#takedmg").css("display", "none");
                }, 1000);
                delay = 1200;

            }
            if (attack == 2){
                attack = 0;
                fight ++;
                //console.log("heal volt, fight ++");
            }


        } else if (cardbyid[enemies[fight].children()[0].id].hp <= 0){
            attack = 0;
            fight ++;
            //console.log("szörny halott, fight ++");
        }

        attack++;
        
    }
        
    if (fight == 4) {
        delay +=500;
        if (!theend){
            setTimeout(function(){
                writelog("<br><font color=\"orchid\">Combat ends.</font>");
                $(".cardc").css("box-shadow", "0 0 10px 2px #000");
                
                setTimeout(function(){
                    
                    endofturn();
                    
                }, 200);
            }, delay);
        }
    } else {
        setTimeout (nextstep, delay);
    }
    
}


function combat() {
    
    retaliate = true;
    
    
    $(".cardc").css("box-shadow", "0 0 10px 2px #000");
    $("#takedmg").css("display", "none");
    
    trigger(2);
    combattime = true;
    
    writelog("<br><card id=\"" + attmonst + "\">" + cardbyid[attmonst].title + "</card><font color=\"red\"> attacks <card id=\"" + attacked + "\">" + cardbyid[attacked].title + "</card></font>!");
    //writelog("<br><card id=\"" + attacked + "\">" + cardbyid[attacked].title + "</card> has lost "+cardbyid[attmonst].dmg+" health.");
    
    
    setTimeout(function(){
        showcard(attacked);
        damage(attacked, cardbyid[attmonst].dmg);
        $(".cardc[id=\""+attacked+"\"]").css("box-shadow", "0 0 6px 3px red");
        $(".cardc[id=\""+attmonst+"\"]").css("box-shadow", "0 0 6px 3px gold");
        slash();
        combattime = false;
        trigger(3);
        $("#hpval").css("color", "rgb(150, 0, 0)");
    }, 200);
    
    setTimeout(function(){
        showcard(attmonst);
        $(".cardc[id=\""+attmonst+"\"]").css("box-shadow", "0 0 6px 3px red");
        $(".cardc[id=\""+attacked+"\"]").css("box-shadow", "0 0 6px 3px gold");
        
        if (retaliate){
            
            trigger (4);
            combattime = true;
            
            writelog("<br><card id=\"" + attacked + "\">" + cardbyid[attacked].title + "</card><font color=\"springgreen\"> retaliates!</font>");
                        
            damage(attmonst, cardbyid[attacked].dmg);
            
            //writelog("<br><card id=\"" + attmonst + "\">" + cardbyid[attmonst].title + "</card> took "+cardbyid[attacked].dmg+" damage!");
            
            slash();
            combattime = false;
                                    
            trigger (5);
        
        } else {
            if (!theend){
                writelog("<br><card id=\"" + attacked + "\">" + cardbyid[attacked].title + "</card><font color=\"springgreen\"> can't retaliate!");
            }
        }
        
        combattime = false;
        
    }, 1300);
    
    
}


function heal(who, amount) {
    
    if (cardbyid[who].hp > 0){
    // dont heal the dead
    
        getheal = who;
        heamount = amount;

        trigger(15);

        actheal = cardbyid[who].basehp - cardbyid[who].hp;
        if (actheal >= heamount){
            actheal = heamount;
        }

        if (actheal < 0){
            actheal = 0;
        }

        cardbyid[who].hp += actheal;
        writelog("<br><card id=\"" + who + "\">" + cardbyid[who].title + "</card> <font color=\"Aqua\">regained "+actheal+" Health.</font>");
    
    }
    
}

var damage = (who, amount) => {
    
    if (cardbyid[who].hp > 0){
    // dont damage the dead

        takedamage = who;
        tdamount = amount;

        trigger (14);

        if (tdamount < 0){
            tdamount = 0;
        }

        cardbyid[takedamage].hp -= tdamount;
        writelog("<br><card id=\"" + takedamage + "\">" + cardbyid[takedamage].title + "</card> has lost "+tdamount+" Health.");
        //writelog("<br>Damage: "+tdamount+" Health.</font>");
        $("#hpval").html(cardbyid[takedamage].hp);

        if (!combattime){
            checkdead(takedamage, 0);
        } else {
            checkdead(takedamage, attacked);
        }
    
    }
        
};

var checkdead = (who, bywhom) => {
    
    
    if (cardbyid[who].hp <= 0) {
        writelog("<br><card id=\"" + who + "\">" + cardbyid[who].title + "</card><font color=\"SlateGrey\"> has died!");
        whodies = who;
        slayer = bywhom;
        cardbyid[who].hp = 99;
        trigger (22);
        if (cardbyid[who].hp == 99){
            cardbyid[who].hp = 0;
        }
    }
    
    if (cardbyid[who].hp <= 0) {
        $(".cardc[id=\""+who+"\"]").addClass("dead");
        cardbyid[who].illus = "skull";
        cardbyid[who].trait = "dead";
        $(".cardc[id=\""+who+"\"]").children("img").attr("src", "img/illus/skull.jpg");
        
        if (cardbyid[who].type == "monst"){
            writelog("<br>For killing a Monster:</font>");
            bscorechange(2);
            
            if (bywhom > 0){
                gainexp(bywhom);
            }
        } else {
            if (who == commander){
                theend = true;
                setTimeout(function(){
                    writelog("<br><font color=\"red\">Oh no! Your Commander is dead!!</font>");
                    writelog("<br><font color=\"orange\">You have lost the game.</font>");
                    retaliate = false;
                    sadend();
                }, 1000);
            } else {
                writelog("<br>For killing a Unit:</font>");
                bscorechange(-2);
                                
            }
            
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
    whoexp = who;
    if (((cardbyid[who].xp[1]) && (cardbyid[who].xp[2]) && (cardbyid[who].xp[3])) || (cardbyid[who].hp <= 0) || (who == commander) ){
        // nem tud többet kapni
    } else {
        do {
            whichxp = Math.floor((Math.random() * 3) + 1);
        } while (cardbyid[who].xp[whichxp]);
        cardbyid[who].xp[whichxp] = true;
        writelog("<br><card id=\"" + who + "\">" + cardbyid[who].title + "</card><font color=\"yellowgreen\"> gains experience!");
        trigger(17);
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
            
            //console.log(enemies[i].children()[j].id+". assign: "+cardbyid[enemies[i].children()[j].id].assign);
            //console.log(enemies[i].children()[j].id+". assist: "+cardbyid[enemies[i].children()[j].id].assist);
            }
            
        }
    }
    
    checkfray();
    
}

function checkfray() {
    
    curfray = frayval[battlenum];
    
    for (let i = 1; i < 4; i++) {
        if (cardbyid[enemies[i].children()[0].id].type == "fray"){
            if (enemies[i].children()[1] != undefined){
                curfray -= cardbyid[enemies[i].children()[1].id].dmg;
            }
            if (enemies[i].children()[2] != undefined){
                curfray -= cardbyid[enemies[i].children()[2].id].dmg;
            }
        }
    }
    
}


var trigger = (trig) => {
    
    trigmonst(trig);
    trigassigned(trig);
    trighand(trig);
    
    if (cardbyid[commander].trig == trig){
        commeff(commander);
    }
    if (cardbyid[bfield].trig == trig){
        regeff(bfield);
    }
    
    if (trig == 18){
        trigdeck(trig);
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



trigmonst = (trig) => {
    for (let i = 1; i < 4; i++) {
        if (enemies[i].children()[0] != undefined){ 
            // console.log("type: "+cardbyid[enemies[i].children()[0].id].type+", trig: "+cardbyid[enemies[i].children()[0].id].trig)
            if ((cardbyid[enemies[i].children()[0].id].what == "monst") && (cardbyid[enemies[i].children()[0].id].trig == trig) && (cardbyid[enemies[i].children()[0].id].hp > 0)){
                //console.log("triggered!");
                //setTimeout(monsteff, delay, enemies[i].children()[0].id);
                monsteff(enemies[i].children()[0].id);
            }
        }
    }
};

trighand = (trig) => {
    $("#avnow").children().each(function() {
        if (cardbyid[$(this).attr("id")].trig == trig){
            switch(cardbyid[$(this).attr("id")].what){
                case "unit":
                    if (cardbyid[$(this).attr("id")].hp > 0){
                        uniteff($(this).attr("id"));
                    }
                    break;
                case "skill":
                    skilleff($(this).attr("id"));
                    break;
                case "ada":
                    adaeff($(this).attr("id"));
                    break;
            }
        }
    });
    
};

trigdeck = (trig) => {
    $("#deck").children().each(function() {
        if (cardbyid[$(this).attr("id")].trig == trig){
            switch(cardbyid[$(this).attr("id")].what){
                case "unit":
                    if (cardbyid[$(this).attr("id")].hp > 0){
                        uniteff($(this).attr("id"));
                    }
                    break;
                case "skill":
                    skilleff($(this).attr("id"));
                    break;
                case "ada":
                    adaeff($(this).attr("id"));
                    break;
            }
        }
    });
    
};

function startbattle(){
    
    writelog("<br><font color=\"orchid\">Battle starts.</font>");
    
    showgame();
    $("#inf").css("left", "1500px");
    if (battlenum >=2){
        $("#info").children()[1].remove();
    }
    
    
    $("#game").append($(".cardc[id=\""+bfield+"\"]"));
    var str = '<div class="cardf" id="endturn"><img class="smallcard" src="img/endturn.jpg"></div>';
    $("#game").append(str);
    
    $("#enc1").empty();
    $("#enc2").empty();
    $("#enc3").empty();
    
    keepnum = 1;
    
    maxwave = cardbyid[bfdetails].waves;
    curwave = 1;
    $("#wave").css("display", "inline-block");
	
    $("#wave").html("Wave "+curwave+" / "+maxwave);
    curfray = frayval[battlenum];
    bscore = cardbyid[bfdetails].bsbase;
    showbscore();
    
    terrada(true);
    terrada(false);
    
    trigger (18);
    
    enemytype = cardbyid[bfdetails].montype;
    
    startturn();
    
}

terrada = (adv) => {
    
    switch (cardbyid[bfield].what){
        case "mountain":
            if (adv){
                adadraw = 1;
                generate(7, "#deck");
            } else {
                adadraw = 2;
                disadvadd();
            }
            break;
        case "woodland":
            if (adv){
                adadraw = 3;
                generate(7, "#deck");
            } else {
                adadraw = 4;
                disadvadd();
            }
            break;
        case "swamp":
            if (adv){
                adadraw = 5;
                generate(7, "#deck");
            } else {
                adadraw = 6;
                disadvadd();
            }
            break;
        case "plains":
            if (adv){
                adadraw = 7;
                generate(7, "#deck");
            } else {
                adadraw = 8;
                disadvadd();
            }
            break;
        case "fortress":
            if (adv){
                adadraw = 9;
                generate(7, "#deck");
            } else {
                adadraw = 10;
                disadvadd();
            }
            break;
        
    }
    
}

function endbattle(){
    
    hidegame();
    $("#battlescore").css("display", "inline-block");
    $("#winbattle").css("display", "inline-block");
    
    $("#wave").text("Battle Over");
    
    writelog("<br><font color=\"orchid\">Battle ends.</font>");
    
    $("#deck").append($(".cardc.attacking"));
    
    $("#deck").append($("#keep").children(".cardc"));
    
    $("#deck").append($("#tempoop").children(".cardc"));
        
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
            //console.log("remove: "+$(this));
            cardbyid[$(this).attr("id")].place = "oog";
            $(this).remove();
        }
    
    });
    
    cardbyid[commander].dmg = cardbyid[commander].basedmg;
    if (cardbyid[commander].hp > cardbyid[commander].basehp){
        cardbyid[commander].hp = cardbyid[commander].basehp;
    }
    
    sortdeck();
    
    battlenum ++;
    
    writelog("<br>Your Battlescore is "+bscore+".");
    
    if (bscore >= 50){
        gold += cardbyid[bfdetails].gold;
        fame += cardbyid[bfdetails].fame;
        $(".endim").css("display", "inline-block");
        $(".endimage").attr("src", "img/victory.jpg");
        writelog("<br><font color=\"orchid\">Victory! You won the battle.</font>");
    } else {
        gold += cardbyid[bfdetails].goldlose;
        fame += cardbyid[bfdetails].famelose;
        $(".endim").css("display", "inline-block");
        $(".endimage").attr("src", "img/retreat.jpg");
        writelog("<br><font color=\"orchid\">Retreat! You lost the battle.</font>");
    }
    
    writelog("<br>Your units and Commander regain half their lost Health in the camp.");
    var difference = 0;
    $("#deck").children(".cardc").each(function() {
        difference = Math.floor((cardbyid[$(this).attr("id")].basehp - cardbyid[$(this).attr("id")].hp)/2);
        if (difference > 0){
            cardbyid[$(this).attr("id")].hp += difference;
            //console.log(cardbyid[$(this).attr("id")].title+" healed "+difference);
        }
    });
    difference = Math.floor((cardbyid[commander].basehp - cardbyid[commander].hp)/2);
    if (difference > 0){
        cardbyid[commander].hp += difference;
        //console.log("Commander healed "+difference);
    }
    
    $("#game").children()[2].remove();
    var str = '<div class="cardf" id="chosen"><img class="smallcard" src="img/ready.jpg"></div>';
    $("#game").append(str);
    
}

removecard = (what) => {
    
    canceled = false;
    trigger(12);
    if (!canceled){
        writelog("<br><card id=\"" + what + "\">" + cardbyid[what].title + "</card> is removed from the game.</font>");
        cardbyid[what].place = "#tempoop";
        $("#tempoop").append($(".cardc[id=\""+what+"\"]"));
    }
    
};

bscorechange = (amount) => {
    
    bscamount = amount;
    trigger(27);
    bscore += bscamount;
    showbscore();
    if (bscamount > 0){
        writelog("<br><font color=\"orange\">You gain "+bscamount+" Battlescore.</font>");
    } else {
        writelog("<br><font color=\"orange\">The Monsters gain "+Math.abs(bscamount)+" Battlescore.</font>");
    }
    
    
};

dmginc = (who, amount) => {
    
    // monsters damage increased
    canceled = false;
    trigger(24);
    if (!canceled){
        cardbyid[who].dmg += amount;
    }
    
};

percdec = (who, amount) => {
    
    // hero units perc decreased
    canceled = false;
    trigger(25);
    if (!canceled){
        cardbyid[who].perc -= amount;
        if (cardbyid[who].perc < 0){
            cardbyid[who].perc = 0;
        }
    }
    
};

dmgdec = (who, amount) => {
    
    // hero units dmg decreased
    canceled = false;
    trigger(26);
    if (!canceled){
        cardbyid[who].dmg -= amount;
        if (cardbyid[who].dmg < 0){
            cardbyid[who].dmg = 0;
        }
    }
    
};

function disadvadd(){
    
    canceled = false;
    trigger(23);
    if (!canceled){
        generate(7, "#deck");
    }
    
}

function getpresent(){
	present = [];
	present.push(commander);
	$("#avnow").children(".cardc").each(function() {
            if (cardbyid[$(this).attr("id")].what == "unit"){
                present.push($(this).attr("id"));
            }
	});
	for (let i = 1; i < 4; i++) {
            for (let j = 1; j < 3; j++) {
                if (enemies[i].children()[j] != undefined){   
                    present.push(enemies[i].children()[j].id);
                }
        }
    }
	
}

function sadend(){
    
    hidegame();
    $("#endturn").remove()
    var str = '<div class="cardf" id="restart"><img class="smallcard" src="img/restart.jpg"></div>';
    $("#game").append(str);
    $(".endim").css("display", "inline-block");
    $(".endimage").attr("src", "img/dead.jpg");
    
}

$(document).on( "click", "#restart", function( event ) {
    location.reload();
});