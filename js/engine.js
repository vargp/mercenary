/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var fight = 0;
var attack = 0;
var step;
var combats;
var attacked;
var attmonst;
var delay;
var bscore;

$(document).on( "click", "#endturn", function( event ) {
    
    $('.ui-draggable').draggable( "destroy" );
    
    discard();
    
    combatstart();
    
    // see the rest in "endofturn" which will be called by the last step of combat
    
});

function discard(){
    
    $("#deck").append($("#avnow").children(".cardc"));
    
}

function endofturn(){
    
    $(".cardc").css("box-shadow", "0 0 10px 2px #000");
    
    $("#deck").append($(".cardc.attacking"));
    
    rollchance();
    
    sortdeck();
       
    $("#avnow").append($("#keep").children());
    
    $("#avnow").children().each(function() {
        makedrag($(this));
    });
    
    hold = false;
    $("#endturn").css("display", "inline-block");
    
    $("#dead").append($(".cardc.dead"));
    
}

function rollchance(){
    
    var croll;
    
    $("#deck").children().each(function() {
        croll = Math.floor((Math.random() * 100) + 1);
        console.log("roll "+croll+" vs "+cardbyid[$(this).attr("id")].perc);
        if (cardbyid[$(this).attr("id")].perc >= croll){
            $("#avnow").append($(this));
            if ($("#avnow").children().length > 12){
                $("#sort").append($("#avnow").children()[0]);
            }
        } 
    });
    
}

function makedrag(ezt){
    
    ezt.draggable({
        revert: "invalid",
        start: function( event, ui ) {
            console.log($(this).attr("id"));
            dragid = $(this).attr("id");
            $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revertDuration", 200 );
            honnandrag = cardbyid[dragid].place;
        },
        stop: function( event, ui ) {
        }
        // helper: "clone"
    });
    
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
    $("#takedmg").addClass("damage");
    setTimeout(function(){
        $("#takedmg").css("display", "none");
        $("#slash").css("display", "none");
    }, 1000);
    
}

function combatstart(){
    
    fight = 1;
    attack = 1;
    hold = true;
    $("#endturn").css("display", "none");
    
    reactions (0, 0, 0);
    
    nextstep();
    
}

function nextstep() {
    
    delay = 0;
    console.log("fight: "+fight+", attack: "+attack);
    attmonst = enemies[fight].children()[0].id;
    
    
    if (cardbyid[enemies[fight].children()[0].id].type == "monst"){
        if (enemies[fight].children()[attack] == undefined){
            if (attack == 3){
                // else skip this step
                console.log('hit the commander!');
                attacked = commander;
                combat();
                fight ++;
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
        
    } else if (cardbyid[enemies[fight].children()[0].id].type == "healer"){
        
    }
    
    attack++;
    
    
    if (fight == 4) {
        setTimeout (endofturn, delay);
    } else {
        setTimeout (nextstep, delay);
    }
    
}

function combat() {
    
    showcard(attacked);
    $(".cardc").css("box-shadow", "0 0 10px 2px #000");
    
    cardbyid[attacked].hp -= cardbyid[attmonst].dmg;
    $("#hpval").html(cardbyid[attacked].hp);
    setTimeout(function(){
        $(".cardc[id=\""+attacked+"\"]").css("box-shadow", "0 0 6px 3px red");
        $(".cardc[id=\""+attmonst+"\"]").css("box-shadow", "0 0 6px 3px gold");
        slash();
    }, 200);
    
    
    
        
    setTimeout(function(){
        showcard(attmonst);
        
        cardbyid[attmonst].hp -= cardbyid[attacked].dmg;
        $("#hpval").html(cardbyid[attmonst].hp);
        $(".cardc[id=\""+attmonst+"\"]").css("box-shadow", "0 0 6px 3px red");
        $(".cardc[id=\""+attacked+"\"]").css("box-shadow", "0 0 6px 3px gold");
        
        slash();
    }, 1300);
    
    setTimeout(checkdead, 1400, attacked);
    setTimeout(checkdead, 1400, attmonst);
    
}

var checkdead = (who) => {
     
    if (cardbyid[who].hp <= 0) {
        $(".cardc[id=\""+who+"\"]").addClass("dead");
        cardbyid[who].illus = "skull";
        cardbyid[who].trait = "dead";
        $(".cardc[id=\""+who+"\"]").children("img").attr("src", "img/illus/skull.jpg");
        writelog("<br><card id=\"" + who + "\">" + cardbyid[who].title + "</card> has died!");
        
    }
    
};

function showbscore() {
    var bper = 200 * (bscore / 100);
    $("#winbattle").css("width", bper+"px");
    
}

var reactions = (trigger, who, target) => {
    
};