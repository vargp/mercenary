/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cardbyid = new Array();
var hanylapvan = 0;
var dragid = 0;
var dontshow = false;
var enemies = new Array();
var hold = false;
var commander;

$( document ).ready(function() {
        
        cardbyid.push(new Object());
        arrange();
        startgame();
    
});

var writelog = (text) => {
    $(".log").append(text);
    $(".log").scrollTop($(".log")[0].scrollHeight - $(".log").height());
};

$('body').on( "mouseenter", "card", function( event ) {
    console.log("cardid:" + $(this).attr("id"));
    if (!hold) {
        showcard($(this).attr("id"));
    }
    
});

function testgenerate(){
    
    generate (3, "#game");
    commander = 1;
     
    
    generate (2, "#enc1");
    generate (2, "#enc2");
    generate (2, "#enc3");
    
    for (let i = 1; i < 20; i++) { 
        generate (1, "#deck");
    }
    
    sortdeck();
    
    bscore = 50;
    
    
}

function hidegame(){
    
    $("#hand").css("display", "none");
    $("#indeck").css("display", "none");
    $("#forkeep").css("display", "none");
    $("#battlescore").css("display", "none");
    $("#winbattle").css("display", "none");
    $("#en1").css("display", "none");
    $("#en2").css("display", "none");
    $("#en3").css("display", "none");
        
}

function showgame(){
    
    $("#hand").css("display", "inline-block");
    $("#indeck").css("display", "inline-block");
    $("#forkeep").css("display", "inline-block");
    $("#battlescore").css("display", "inline-block");
    $("#winbattle").css("display", "inline-block");
    $("#en1").css("display", "inline-block");
    $("#en2").css("display", "inline-block");
    $("#en3").css("display", "inline-block");
    
    
}

function arrange(){
        
    
    $("#sort").css("display", "none");
    $("#dead").css("display", "none");
    $("#takedmg").css("display", "none");
    $("#slash").css("display", "none");
    $("#logarea").css("top", "340px");
    $("#logarea").css("left", "1255px");
    $("#button").css("top", "20px");
    $("#button").css("left", "1255px");
    $("#hand").css("top", "340px");
    $("#hand").css("left", "445px");
    $("#indeck").css("top", "605px");
    $("#indeck").css("left", "20px");
    $("#forkeep").css("top", "170px");
    $("#forkeep").css("left", "1255px");
    $("#keep").css("height", "105px");
    $("#en1").css("top", "20px");
    $("#en1").css("left", "445px");
    $("#en2").css("top", "20px");
    $("#en2").css("left", "715px");
    $("#en3").css("top", "20px");
    $("#en3").css("left", "985px");
    
    $("#battlescore").css("top", "130px");
    $("#battlescore").css("left", "1275px");
    $("#winbattle").css("top", "130px");
    $("#winbattle").css("left", "1275px");
        
    $("#button").css("top", "20px");
    $("#button").css("left", "1255px");
        
    //$("#button").css("top", "520px");
    //$("#button").css("left", "600px");
    
    var str = '<div class="cardf" id="endturn"><img class="smallcard" src="img/endturn.jpg"></div>';
    $("#game").append(str);
    
    //cheat
    testgenerate();
        
    showbscore();
    
    $("#enc1").css("height", "305px");
    $("#en1").css("width", "240px");
    $("#enc1").css("max-width", "250px");
    $('#enc1 img:first').attr("class", "doublecard");
    
    $("#enc2").css("height", "305px");
    $("#en2").css("width", "240px");
    $("#enc2").css("max-width", "250px");
    $('#enc2 img:first').attr("class", "doublecard");
    
    $("#enc3").css("height", "305px");
    $("#en3").css("width", "240px");
    $("#enc3").css("max-width", "250px");
    $('#enc3 img:first').attr("class", "doublecard");
    
    enemies[1] = $("#enc1");
    enemies[2] = $("#enc2");
    enemies[3] = $("#enc3");

    for (let i = 1; i < 4; i++) { 
        enemies[i].droppable({
            drop: function( event, ui ) {
                $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revertDuration", 0 );
                $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revert", true );
                $(".cardc[id=\""+dragid+"\"]").addClass("attacking");
                cardbyid[dragid].place="#keep";
                enemies[i].append(ui.draggable);
                //$('#keep').append($(".cardc[id=\""+dragid+"\"]"));

            }
        });
    }
    
    $( "#forkeep" ).droppable({
        drop: function( event, ui ) {
            $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revertDuration", 0 );
            $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revert", true );
            $(".cardc[id=\""+dragid+"\"]").addClass("tokeep");
            cardbyid[dragid].place="#keep";
            $('#keep').append(ui.draggable);
            //$('#keep').append($(".cardc[id=\""+dragid+"\"]"));
            
        }
    });
      
    $( "#hand" ).droppable({
        accept: ".tokeep",
        drop: function( event, ui ) {
            $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revertDuration", 0 );
            $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revert", true );
            $(".cardc[id=\""+dragid+"\"]").removeClass("tokeep");
            $(".cardc[id=\""+dragid+"\"]").removeClass("attacking");
            cardbyid[dragid].place="#avnow";
            $('#avnow').append(ui.draggable);
        }
    });
    
    
}

function startgame(){
    
    rollchance();
    sortdeck();
    
    $("#avnow").children().each(function() {
        makedrag($(this));
    });
    
}

$( "div" ).on( "mouseenter", ".cardc", function( event ) {
    
    event.stopImmediatePropagation();
    console.log("cardid:" + $(this).attr("id"));
    hoverid = $(this).attr("id");
    
    if (!hold) {
        // $that = $(this);
        showcard($(this).attr("id")); 
    }
     

});

$( "div" ).on( "mouseleave", ".cardc", function( event ) {
    event.stopImmediatePropagation();
    
    $( this ).css("box-shadow", "0 0 10px 2px #000");
    // $(".bigcard").css("box-shadow", "none");

});

function showcard(lapid){
    
    cid = cardbyid[lapid];
    
    //var imgsrc = "images/illus/" + cid.illus + ".jpg";
    //var showthis = "url(\"" + imgsrc + "\")";
    //$(".illus").css("background-image", showthis);
    
    var typeimg = "url(\"img/" + cid.type +".png\")";
    $(".cardtype").css("background-image", typeimg);
    //$(".bigcard").css("box-shadow", "0 0 10px 2px #fff");
    $(".bigcard").css("box-shadow", "5px 5px 10px 2px #000");
    
    var imgsrc = "img/illus/" + cid.illus + ".jpg";
    var showthis = "url(\"" + imgsrc + "\")";
    $(".illus").css("background-image", showthis);
    
    $("#takedmg").css("display", "none");
    $("#slash").css("display", "none");
    $(".cardtitle").text(cid.title);
    $(".cardtrait").text(cid.trait);
    $(".percent").text(cid.perc);
    $(".cardtext").html(cid.text);
    $("#dmgval").html(cid.dmg);
    $("#hpval").html(cid.hp);
    $("#takedmg").html(cid.hp);
    
    if ("perc" in cid){
        $(".percent").css("display", "inline-block");
    } else {
        $(".percent").css("display", "none");
    }
    
    var textshad;
    var textcol;
    
    switch (cid.type){
        case "neut":
            textshad = "rgba(0, 0, 0, 0.6) 0px 0px 1px";
            textcol = "rgb(0, 0, 0)";
            break;
        case "monst":
            textshad = "rgba(0, 0, 0, 1) 1px 1px 3px";
            textcol = "rgb(255, 255, 255)";
            break;
    }
    
    $(".cardtext").css("text-shadow", textshad);
    $(".cardtext").css("color", textcol);
    $(".cardtrait").css("text-shadow", textshad);
    $(".cardtrait").css("color", textcol);
    $(".percent").css("text-shadow", textshad);
    $(".percent").css("color", textcol);
    $(".stats").css("text-shadow", textshad);
    $(".stats").css("color", textcol);
    
};