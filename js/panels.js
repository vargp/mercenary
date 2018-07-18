/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var secmon;
var thirmon;

function choosecomm(){
    
    hidegame();
    $("#commander").css("display", "inline-block");
    for (let i = 1; i < co.length; i++) { 
        generate (3, "#commlist");
    }
    showcard(1);
    
}

$('#commlist').on( "click", ".cardc", function( event ) {
    $(".cardc").removeClass("selected");
    $(this).addClass("selected");
    commander = $(this).attr("id");
    writelog("<br>You chose <card id=\"" + commander + "\">" + cardbyid[commander].title + "</card> as Commander.");
});

$('#buy, #basicbuy').on( "click", ".cardc", function( event ) {
    
    if ($(this).hasClass("hide")){
        writelog("<br>You don't have enough money for that.");
    } else {
        gold -= cardbyid[$(this).attr("id")].cost;
        if ("dmg" in cardbyid[$(this).attr("id")]){
            writelog("<br>You recruited <card id=\"" + $(this).attr("id") + "\">" + cardbyid[$(this).attr("id")].title + "</card> into your army.");
        } else {
            writelog("<br>You purchased <card id=\"" + $(this).attr("id") + "\">" + cardbyid[$(this).attr("id")].title + "</card>.");
        }
        if (cardbyid[$(this).attr("id")].place == "#buy"){
            $("#seedeck").append($(this));
            cardbyid[$(this).attr("id")].place = "#deck";
        }
        if ($(this).attr("id") == RecNum){
            // Ardent Recruit
            recruit = 1;
            generate (1, "#seedeck");
            recruit = 0;
            cardbyid[hanylapvan].place="#deck";
        }
        resetbuy();
    }
    
});

$(document).on( "click", "#chosen", function( event ) {
    
    if (commander > 0){
        $(".cardc").removeClass("selected");
        $("#commander").css("display", "none");
        buycards();
        
    }
    
});

$(document).on( "click", "#buydone", function( event ) {
    
    
    $("#choosable").css("display", "none");
    $("#buydeck").css("display", "none");
    showgame();
    $("#inf").css("left", "1500px");
    $("#wave").css("display", "inline-block");
	
    $("#wave").html("Wave "+curwave+" / "+maxwave);
	
    $("#deck").append($("#seedeck").children(".cardc"));
        
    generate(6, "#game");
    $("#buydone").remove();
    var str = '<div class="cardf" id="endturn"><img class="smallcard" src="img/endturn.jpg"></div>';
    $("#game").append(str);
    
    $("#enc1").empty();
    $("#enc2").empty();
    $("#enc3").empty();
    
    startbattle();
    
    
});

function buycards(){
    
    $("#inf").css("display", "inline-block");
    $("#inf").css("left", "1255px");
    $("#wave").css("display", "none");
    $("#choosable").css("display", "inline-block");
    $("#buydeck").css("display", "inline-block");
    $("#game").empty();
    $("#game").append($(".cardc[id=\""+commander+"\"]"));
    var str = '<div class="cardf" id="buydone"><img class="smallcard" src="img/ready.jpg"></div>';
    $("#game").append(str);
    
    showcard(RecNum);
    
    resetbuy();
    
    
}

function resetbuy(){
    
    $("#buycap").html("You still have: "+gold+" Gold");
    $("#buy").empty();
    for (let i = 1; i < 7; i++) { 
        generate (1, "#buy");
    }
    $("#buy, #basicbuy").children().each(function() {
        if (cardbyid[$(this).attr("id")].cost > gold){
            $(this).addClass("hide");
        }
    });
    
}

function mongen(){
        
	secmon = false;
	thirmon = false;
	var mone;
    
    // first panel
    
    if ($("#enc1").children().length == 0){
        
        curwave ++;
        if (curwave > maxwave){
                writelog("<br>The battle is over!");
        } else {
                generate (2, "#enc1");
                $("#wave").html("Wave "+curwave+" / "+maxwave);
        }
    }
	
	// are there more than one monsters?
    
    mone = Math.floor((Math.random() * 100) + 1);
    if (mone <= (secmonchance[enemytype] + battlenum)){
            console.log("legyen második szörny.");
        secmon = true;
    }
	
	mone = Math.floor((Math.random() * 100) + 1);
    if (mone <= (thirmonchance[enemytype] + battlenum )){
		console.log("legyen harmadik szörny.");
        thirmon = true;
    }
    
	if ((!secmon) && (thirmon)){
            secmon = true;
            thirmon = false;
            console.log("csak harmadik ne legyen, akkor inkább csak második legyen.");
	}
	
	// second panel
	    
    
    if (($("#enc2").children().length == 0) || ((cardbyid[$("#enc2").children()[0].id].type != "monst") && (secmon))){
        if (secmon){
            $("#enc2").empty();
            generate (2, "#enc2");
            console.log("új második szörny jön.");
        } else {
            $("#enc2").empty();
            recruit = 5;
            generate (5, "#enc2");
            console.log("Fray van a második helyen.");
        }
    }
    
        
    // third panel
    
    
    if (($("#enc3").children().length == 0) || (cardbyid[$("#enc3").children()[0].id].type != "monst")){
        if (thirmon){
            $("#enc3").empty();
            generate (2, "#enc3");
            console.log("új harmadik szörny jön.");
        } else {
            if (cardbyid[enemies[2].children()[0].id].type == "monst"){
                mone = Math.floor((Math.random() * 100) + 1);
                if (mone <= 50){
                        $("#enc3").empty();
                        recruit = 6;
                        generate (5, "#enc3");
                        console.log("van második szörny - harmadik helyen Healer.");
                } else {
                        $("#enc3").empty();
                        recruit = 5;
                        generate (5, "#enc3");
                        console.log("van második szörny - harmadik helyen Fray.");
                }
            } else {
                $("#enc3").empty();
                recruit = 6;
                generate (5, "#enc3");
                console.log("nincs második szörny - harmadik helyen Healer.");
            }
        }
    }
	
	if ((cardbyid[enemies[2].children()[0].id].type == "fray") && (cardbyid[enemies[3].children()[0].id].type == "fray")){
            $("#enc3").empty();
            recruit = 6;
            generate (5, "#enc3");
            console.log("két Fray lett volna - harmadik helyen Healer.");
	}
    
    recruit = 0;
    
    $('#enc1 img:first').attr("class", "doublecard");
    $('#enc2 img:first').attr("class", "doublecard");
    $('#enc3 img:first').attr("class", "doublecard");
	
    if (curwave > maxwave){
        $("#enc1").empty();
        $("#enc2").empty();
        $("#enc3").empty();
        endbattle();
    }
}