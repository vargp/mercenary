/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var secmon;
var thirmon;
var bfield = 0;
var bfdetails = 0;
var promotable = 0;
var numskill = 0;
var healable = 0;
var monstapp = 0;
var forcemon = "none";
var bossapp = 5;
var thisboss = 0;

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

$(document).on( "click", "#chosen", function( event ) {
    
    $("#battlescore").css("display", "none");
    $("#winbattle").css("display", "none");
    
    if (commander > 0){
        $(".cardc").removeClass("selected");
        $("#commander").css("display", "none");
        
        if (battlenum == 1){
        
            var data = cardbyid[commander].what+cardbyid[commander].abnum+"*";
            $.ajax({
                type: 'POST',
                url: "savedata2.php",
                data: data
              });

        }
        
        $(".endim").css("display", "none");
        buycards();
        
        
    }
    
});



function buycards(){
   
    bfield = 0;
    bfdetails = 0;
    $("#seedeck").append($("#deck").children(".cardc"));
        
    $("#inf").css("display", "inline-block");
    $("#inf").css("left", "1255px");
    $("#wave").css("display", "none");
    $("#choosable").css("display", "inline-block");
    $("#buydeck").css("display", "inline-block");
    if ($("#game").children().length > 1){
        $("#game").children()[1].remove();
        $("#game").children()[1].remove();
    } else {
        $("#game").children()[0].remove();
        $("#game").append($(".cardc[id=\""+commander+"\"]"));
    }
    var str = '<div class="cardf" id="buydone"><img class="smallcard" src="img/ready.jpg"></div>';
    $("#game").append(str);
    
    if (battlenum == bossapp){
        setTimeout(function(){
            writelog("<br><font color=\"red\">The Enemy Boss is revealed!</font>");
            generate(8, "#info");
            writelog("<br>It's <card id=\"" + hanylapvan + "\">" + cardbyid[hanylapvan].title + "</card>!");
            thisboss = hanylapvan;
        }, 300);
    }
    
    if (battlenum > 2){
        generate(8, "#info");
        thisboss = hanylapvan;
    }
    
    showcard(RecNum);
    
    resetbuy();
    
    
}

function resetbuy(){
    
    $("#buycap").html("You still have: "+gold+" Gold");
    $("#buy").empty();
    for (let i = 1; i < 7; i++) { 
        var skillchance = Math.floor((Math.random() * 5) + 1);
        if (skillchance == 1){
            generate (4, "#buy");
        } else {
            generate (1, "#buy");
        }
    }
    $("#buy, #basicbuy").children().each(function() {
        $(this).removeClass("hide");
        if (cardbyid[$(this).attr("id")].cost > gold){
            $(this).addClass("hide");
        }
    });
    
    promotable = 0;
    healable = 0;
    numskill = 0;
    
    if (cardbyid[commander].hp < cardbyid[commander].basehp){
            healable ++;
        }
    $("#seedeck").children(".cardc").each(function() {
        if (cardbyid[$(this).attr("id")].hp < cardbyid[$(this).attr("id")].basehp){
            healable ++;
        }
        if ((cardbyid[$(this).attr("id")].xp[1]) || (cardbyid[$(this).attr("id")].xp[2]) || (cardbyid[$(this).attr("id")].xp[3])){
            promotable ++;
        }
        if (cardbyid[$(this).attr("id")].what == "skill"){
            numskill ++;
        }
    });
    if (healable == 0){
        $(".cardc[id=\""+$("#basicbuy").children()[1].id+"\"]").addClass("hide");
    }
    if (promotable == 0){
        $(".cardc[id=\""+$("#basicbuy").children()[3].id+"\"]").addClass("hide");
    }
    
}


$('#buy, #basicbuy').on( "click", ".cardc", function( event ) {
    
    if ($(this).hasClass("hide")){
        writelog("<br>You can't purchase that.");
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
            var data = cardbyid[$(this).attr("id")].what+cardbyid[$(this).attr("id")].abnum+"*";
            $.ajax({
                type: 'POST',
                url: "savedata2.php",
                data: data
              });
        }
        if ($(this).attr("id") == RecNum){
            // Ardent Recruit
            recruit = 1;
            generate (1, "#seedeck");
            recruit = 0;
            cardbyid[hanylapvan].place="#deck";
        }
        if (cardbyid[$(this).attr("id")].what == "rest"){
            writelog("<br>Your wounded units and your Commander regain 4 Health.");
            $("#seedeck").children(".cardc").each(function() {
                cardbyid[$(this).attr("id")].hp += 4;
                if (cardbyid[$(this).attr("id")].hp > cardbyid[$(this).attr("id")].basehp){
                    cardbyid[$(this).attr("id")].hp = cardbyid[$(this).attr("id")].basehp;
                }
            });
            cardbyid[commander].hp += 4;
            if (cardbyid[commander].hp > cardbyid[commander].basehp){
                cardbyid[commander].hp = cardbyid[commander].basehp;
            }
        }
        if (cardbyid[$(this).attr("id")].what == "train"){
            writelog("<br><card id=\"" + commander + "\">" + cardbyid[commander].title + "</card> has gained 1 DMG and 2 Health.");
            showcard(commander);
            cardbyid[commander].hp += 2;
            cardbyid[commander].basehp += 2;
            cardbyid[commander].dmg += 1;
            cardbyid[commander].basedmg += 1;
            setTimeout(function(){
                showcard(commander);
                $( ".stats" ).css("display", "none");
                $( ".stats" ).fadeIn(1000);
            }, 500);
            
        }
        if (cardbyid[$(this).attr("id")].what == "promote"){
            writelog("<br>Your Units that could be promoted have their stats increased.");
            $("#seedeck").children(".cardc").each(function() {
                promoteunit($(this).attr("id"));
            });
        }
        if (cardbyid[$(this).attr("id")].what == "drill"){
            writelog("<br>Your Skills gain +5 Speed.");
            $("#seedeck").children(".cardc").each(function() {
                if (cardbyid[$(this).attr("id")].what == "skill"){
                    cardbyid[$(this).attr("id")].perc += 5;
                    cardbyid[$(this).attr("id")].baseperc += 5;
                }
            });
        }
        resetbuy();
    }
    
});

var promoteunit = (who) => {
    if (cardbyid[who].xp[1]){
        cardbyid[who].xp[1] = false;
        cardbyid[who].dmg += 1;
        cardbyid[who].basedmg += 1;
    }
    if (cardbyid[who].xp[2]){
        cardbyid[who].xp[2] = false;
        cardbyid[who].hp += 2;
        cardbyid[who].basehp += 2;
    }
    if (cardbyid[who].xp[3]){
        cardbyid[who].xp[3] = false;
        cardbyid[who].perc += 3;
        cardbyid[who].baseperc += 3;
    }
    
};



$(document).on( "click", "#buydone", function( event ) {
    
    
    $("#choosable").css("display", "none");
       	 
    
    $("#buydone").remove();
    var str = '<div class="cardf" id="endreg"><img class="smallcard" src="img/ready.jpg"></div>';
    $("#game").append(str);
    
    regions();
    
});

function regions(){
    
    var basicfame;
    var modif;
    $(".bbox").css("box-shadow", "0 0 0 black");
    
    $("#battles").css("display", "inline-block");
 
    for (let i = 1; i < 4; i++) {
        recruit = 0;
        basicfame = battlenum + 5;
        battles[i].empty();
        generate(6, battles[i]);
        console.log("***** "+cardbyid[hanylapvan].title);
        console.log("basicfame: "+basicfame);
        basicfame += cardbyid[hanylapvan].fmod;
        console.log("after fmod: "+basicfame);
        voltreg[i] = cardbyid[hanylapvan].abnum;
        recruit = 7;
        generate (5, battles[i]);
        cardbyid[hanylapvan].montype = Math.floor((Math.random() * 4) + 1);
        modif =  3 - Math.floor((Math.random() * 5) + 1);
        cardbyid[hanylapvan].waves = wavesnum[battlenum] + modif;
        basicfame += modif;
        console.log(modif+" waves, basicfame: "+basicfame);
        modif =  3 - Math.floor((Math.random() * 5) + 1);
        cardbyid[hanylapvan].bsbase = bsbase[battlenum] + (modif * 8);
        basicfame -= modif;
        console.log(modif*frayval[battlenum]+" battlescore, basicfame: "+basicfame);
        modif =  3 - Math.floor((Math.random() * 5) + 1);
        cardbyid[hanylapvan].gold = goldbase[battlenum] + (modif * 20);
        basicfame -= modif;
        console.log(modif*20+" gold, basicfame: "+basicfame);
        modif =  2 - Math.floor((Math.random() * 3) + 1);
        cardbyid[hanylapvan].gold = cardbyid[hanylapvan].gold + (modif * 5);
        modif =  3 - Math.floor((Math.random() * 5) + 1);
        cardbyid[hanylapvan].goldlose = cardbyid[hanylapvan].gold-30 + (modif * 5);
        if (cardbyid[hanylapvan].goldlose < 0){
            cardbyid[hanylapvan].goldlose = 0;
        }
        modif =  2 - Math.floor((Math.random() * 3) + 1);
        basicfame += modif;
        console.log(modif+" rand mod, basicfame: "+basicfame);
        cardbyid[hanylapvan].fame = basicfame;
        if (cardbyid[hanylapvan].fame < 1){
            cardbyid[hanylapvan].fame = 1;
        }
        modif =  2 - Math.floor((Math.random() * 3) + 1);
        cardbyid[hanylapvan].famelose = cardbyid[hanylapvan].fame-4 + modif;
        if (cardbyid[hanylapvan].famelose < 0){
            cardbyid[hanylapvan].famelose = 0;
        }
        
    }
    
    
}

$(document).on( "click", ".bbox", function( event ) {
    
    $(".bbox").css("box-shadow", "0 0 0 black");
    $(this).css("box-shadow", "0 0 6px 3px gold");
    bfield = $(this).children()[0].id;
    bfdetails = $(this).children()[1].id;
    //console.log(bfield);
    
});

$(document).on( "click", "#endreg", function( event ) {
    
    if (bfield > 0){
        $("#battles").css("display", "none");
        $("#endreg").remove();
        $("#deck").append($("#seedeck").children(".cardc"));
        $("#buydeck").css("display", "none");
        startbattle();
    }
    
});

function mongen(){
        
    secmon = false;
    thirmon = false;
    var mone;
        
    // first panel
    
    if ($("#enc1").children().length == 0){
        
        newmon ("#enc1");
        
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
    
    forcemon = "none";
    trigger(28);
    
    if ($("#enc2").children().length > 0){
        if ((cardbyid[$("#enc2").children()[0].id].type == "monst") && (forcemon != "none")){
            secmon = true;
        }
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
            newmon ("#enc2");
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
            newmon ("#enc3");
            console.log("új harmadik szörny jön.");
        } else {
            if (cardbyid[enemies[2].children()[0].id].type == "monst"){
                mone = Math.floor((Math.random() * 100) + 1);
                console.log("50 alatt healer: "+mone);
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
    
    forcemon = "none";
	
    if ((cardbyid[enemies[2].children()[0].id].type == "fray") && (cardbyid[enemies[3].children()[0].id].type == "fray")){
        $("#enc3").empty();
        recruit = 6;
        generate (5, "#enc3");
        console.log("két Fray lett volna - harmadik helyen Healer.");
    }
    
    recruit = 0;
    
    $('#enc1 img:first').attr("class", "doublecard");
    $('#enc1 div:first').css("height", "184px");
    $('#enc2 img:first').attr("class", "doublecard");
    $('#enc2 div:first').css("height", "184px");
    $('#enc3 img:first').attr("class", "doublecard");
    $('#enc3 div:first').css("height", "184px");

}

newmon = (where) => {
    
    var getthis;
    switch (enemytype){
        case 1:
            getthis = "Orc Enemy";
            break;
        case 2:
            getthis = "Beast Enemy";
            break;
        case 3:
            getthis = "Undead Enemy";
            break;
        case 4:
            getthis = "Demon Enemy";
            break;
               
    }
    
    if (forcemon != "none"){
        getthis = forcemon;
        forcemon = "none";
    }
    
    var monlen = en.length-1;
    
    do {
        mondraw = Math.floor((Math.random() * monlen) + 1);
    } while (en[mondraw].trait != getthis);
        
    generate (2, where);
    monstapp = hanylapvan;
    writelog("<br>A new Enemy appears: <card id=\"" + monstapp + "\">" + cardbyid[monstapp].title + "</card>.");
    
    trigger(29);
    
    trigger(16);
    
};