/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var shown;

$( document ).ready(function() {
        
        cardbyid.push(new Object());
                
        arrange();
        startgame();
        ccount();
    
});

var writelog = (text) => {
    $(".log").append(text);
    $(".log").scrollTop($(".log")[0].scrollHeight - $(".log").height());
};

$('body').on( "mouseenter", "card", function( event ) {
    console.log("cardid:" + $(this).attr("id"));
    //if (!hold) {
        showcard($(this).attr("id"));
    //}
    
});


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
    $("#tempoop").css("display", "none");
    $(".endim").css("display", "none");
    $(".endtext").css("display", "none");
    $("#choosable").css("display", "none");
    $("#buydeck").css("display", "none");
    $("#takedmg").css("display", "none");
    $("#slash").css("display", "none");
    $("#battles").css("display", "none");
    $("#logarea").css("top", "340px");
    $("#logarea").css("left", "1255px");
    $("#button").css("top", "20px");
    $("#button").css("left", "1255px");
    $("#button").css("white-space", "nowrap");
    $("#hand").css("top", "340px");
    $("#hand").css("left", "445px");
    $("#indeck").css("top", "605px");
    $("#indeck").css("left", "20px");
    $("#forkeep").css("top", "170px");
    $("#forkeep").css("left", "1255px");
    $("#inf").css("top", "170px");
    $("#inf").css("left", "1500px");
    $("#inf").css("min-width", "120px");
    $("#inf").css("display", "none");
    $("#keep").css("height", "105px");
    $("#en1").css("top", "20px");
    $("#en1").css("left", "445px");
    $("#en2").css("top", "20px");
    $("#en2").css("left", "715px");
    $("#en3").css("top", "20px");
    $("#en3").css("left", "985px");
    
    $("#battlescore").css("top", "130px");
    $("#battlescore").css("left", "1276px");
    $("#winbattle").css("top", "130px");
    $("#winbattle").css("left", "1276px");
    $("#wave").css("top", "114px");
    $("#wave").css("left", "1468px");
    $("#wave").css("display", "none");
    
    $("#button").css("top", "20px");
    $("#button").css("left", "1255px");
    $("#commander").css("top", "20px");
    $("#commander").css("left", "600px");
    $("#commander").css("max-width", "500px");
    $("#battles").css("top", "20px");
    $("#battles").css("left", "600px");
    $("#battles").css("max-width", "500px");
    $("#battle1").css("max-width", "360px");
    $("#battle2").css("max-width", "360px");
    $("#battle3").css("max-width", "360px");
    $("#battle1").addClass("bbox");
    $("#battle2").addClass("bbox");
    $("#battle3").addClass("bbox");
    
    $("#choosable").css("top", "20px");
    $("#choosable").css("left", "480px");
    $("#choosable").css("max-width", "730px");
    $("#buycap").css("width", "700px");
    $("#buycap").css("text-align", "center");
    $("#basicbuy").css("left", "60px");
    $("#reminder").css("width", "700px");
    $("#reminder").css("text-align", "center");
    $("#areatitle").css("width", "480px");
    $("#spend").css("width", "700px");
    $("#thisdeck").css("width", "700px");
    $("#buydeck").css("top", "460px");
    $("#buydeck").css("left", "480px");
    $("#buydeck").css("max-width", "730px");
        
    //$("#button").css("top", "520px");
    //$("#button").css("left", "600px");
    
    
    //var str = '<div class="cardf" id="endturn"><img class="smallcard" src="img/endturn.jpg"></div>';
    var str = '<div class="cardf" id="chosen"><img class="smallcard" src="img/ready.jpg"></div>';
    $("#game").append(str);
    
    
    
    $("#enc1").css("height", "305px");
    $("#en1").css("width", "240px");
    $("#enc1").css("max-width", "250px");
        
    $("#enc2").css("height", "305px");
    $("#en2").css("width", "240px");
    $("#enc2").css("max-width", "250px");
        
    $("#enc3").css("height", "305px");
    $("#en3").css("width", "240px");
    $("#enc3").css("max-width", "250px");
        
    enemies[1] = $("#enc1");
    enemies[2] = $("#enc2");
    enemies[3] = $("#enc3");
    battles[1] = $("#battle1");
    battles[2] = $("#battle2");
    battles[3] = $("#battle3");

    for (let i = 1; i < 4; i++) { 
        enemies[i].droppable({
            accept: ".canattack",
            drop: function( event, ui ) {
                
                $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revertDuration", 0 );
                $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revert", true );
                $(".cardc[id=\""+dragid+"\"]").addClass("attacking");
                $(".cardc[id=\""+dragid+"\"]").removeClass("tokeep");
                cardbyid[dragid].place="#"+enemies[i].attr("id");
                enemies[i].append(ui.draggable);
                    if (cardbyid[enemies[i].children()[0].id].type == "fray"){
                        curfray -= cardbyid[dragid].dmg;
                        console.log("fraybe drag");
                    }
                //$('#keep').append($(".cardc[id=\""+dragid+"\"]"));
                checkdropdisable();
                checkass();
            }
        });
    }
    
    $( "#forkeep" ).droppable({
        drop: function( event, ui ) {
            $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revertDuration", 0 );
            $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revert", true );
            $(".cardc[id=\""+dragid+"\"]").addClass("tokeep");
            cardbyid[dragid].place="#keep";
            $(".cardc[id=\""+dragid+"\"]").removeClass("attacking");
            $('#keep').append(ui.draggable);
            //$('#keep').append($(".cardc[id=\""+dragid+"\"]"));
            checkdropdisable();
            checkass();
        }
    });
      
    $( "#hand" ).droppable({
        accept: ".tokeep, .attacking",
        drop: function( event, ui ) {
            $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revertDuration", 0 );
            $(".cardc[id=\""+dragid+"\"]").draggable( "option", "revert", true );
            $(".cardc[id=\""+dragid+"\"]").removeClass("tokeep");
            $(".cardc[id=\""+dragid+"\"]").removeClass("attacking");
            cardbyid[dragid].place="#avnow";
            $('#avnow').append(ui.draggable);
            checkdropdisable();
            checkass();
        }
    });
    
    
}

function checkdropdisable(){
    for (let i = 1; i < 4; i++) { 
        if (enemies[i].children().length == 3){
            enemies[i].droppable( "option", "disabled", true );
        } else {
            enemies[i].droppable( "option", "disabled", false );
        }
    }
    
    if ($('#keep').children().length == keepnum){
        $('#forkeep').droppable( "option", "disabled", true );
    } else {
        $('#forkeep').droppable( "option", "disabled", false );
    }
    
}

function startgame(){
    
    choosecomm();
    
    recruit = 1;
    generate (1, "#basicbuy");
    generate (5, "#basicbuy");
    generate (5, "#basicbuy");
    generate (5, "#basicbuy");
    generate (5, "#info");
    recruit = 8;
    generate (5, "#basicbuy");    
    startingdeck();
    sortdeck();
    
    var bosscount = boss.length-1;
    bossnum = Math.floor((Math.random() * bosscount) + 1);
    
}

function startingdeck(){
    
    recruit = 0;
    
    for (let i = 1; i <= 6; i++) {
        // cheat
        //recruit = 4;
        // generate (1, "#deck");
        //generate (4, "#deck");
        //adadraw = 16;
        //generate(7, "#deck");
    }
    
    recruit = 1;
    for (let i = 1; i <= 4; i++) {
        generate (1, "#deck");
    }
    
    //for (let i = 1; i < startcards.length; i++) {
    //    recruit = startcards[i];
    //    generate (1, "#deck");
    //    recruit ++;
    //}
    
    
    var charcount = char.length-2;
    do {
        recruit = Math.floor((Math.random() * charcount) + 2);
    } while ((char[recruit].cost > 20) || (char[recruit].trait != "Warrior Hero"));
    generate (1, "#deck");
    do {
        recruit = Math.floor((Math.random() * charcount) + 2);
    } while ((char[recruit].cost > 20) || (char[recruit].trait != "Cleric Hero"));
    generate (1, "#deck");
    do {
        recruit = Math.floor((Math.random() * charcount) + 2);
    } while ((char[recruit].cost > 20) || (char[recruit].trait != "Mage Hero"));
    generate (1, "#deck");
    do {
        recruit = Math.floor((Math.random() * charcount) + 2);
    } while ((char[recruit].cost > 20) || (char[recruit].trait != "Ranger Hero"));
    generate (1, "#deck");
    do {
        recruit = Math.floor((Math.random() * charcount) + 2);
    } while ((char[recruit].cost > 20) || (char[recruit].trait != "Rogue Hero"));
    generate (1, "#deck");
    
    
    recruit = 0;
    
    generate (4, "#deck");
    
}

$( "div" ).on( "mouseenter", ".cardc", function( event ) {
    
    event.stopImmediatePropagation();
    console.log("cardid:" + $(this).attr("id"));
    hoverid = $(this).attr("id");
    
    //if (!hold) {
        // $that = $(this);
        showcard($(this).attr("id")); 
    //}
     

});

$( "div" ).on( "mouseleave", ".cardc", function( event ) {
    event.stopImmediatePropagation();
    
    $( this ).css("box-shadow", "0 0 10px 2px #000");
    // $(".bigcard").css("box-shadow", "none");

});

function showcard(lapid){
    
    shown = cardbyid[lapid];
    displayed = lapid;
    
    //var imgsrc = "images/illus/" + shown.illus + ".jpg";
    //var showthis = "url(\"" + imgsrc + "\")";
    //$(".illus").css("background-image", showthis);
    
    var typeimg = "url(\"img/" + shown.type +".png\")";
    if (shown.what == "boss"){
        typeimg = "url(\"img/boss.png\")";
    }
    $(".cardtype").css("background-image", typeimg);
    //$(".bigcard").css("box-shadow", "0 0 10px 2px #fff");
    $(".bigcard").css("box-shadow", "5px 5px 10px 2px #000");
    
    var imgsrc = "img/illus/" + shown.illus + ".jpg";
    var showthis = "url(\"" + imgsrc + "\")";
    $(".illus").css("background-image", showthis);
    
    $("#takedmg").css("display", "none");
    $("#slash").css("display", "none");
    $(".cardtitle").text(shown.title);
    $(".cardtrait").text(shown.trait.toUpperCase());
    $(".cardtext").html(shown.text);
    $("#takedmg").html(shown.hp);
    
    if (shown.temp){
        $(".cardtrait").text(shown.trait.toUpperCase()+" *");
    }
    
    //writelog(("dmg" in shown)+" "+lapid+ "<br>");
    if ("dmg" in shown){
        $("#dmgval").css("display", "inline-block");
        $("#damage").css("display", "inline-block");
        $("#health").css("display", "inline-block");
        $("#dmgval").html(shown.dmg);
        $("#hpval").html(shown.hp);
        $("#hpval").css("display", "inline-block");
        if (shown.xp[1]){
                $("#damage").html("DMG*");
        } else {
                $("#damage").html("DMG");
        }
        if (shown.xp[2]){
                $("#health").html("HP*");
        } else {
                $("#health").html("HP");
        }
        
    } else {
        $("#dmgval").css("display", "none");
        $("#hpval").css("display", "none");
        $("#damage").css("display", "none");
        $("#health").css("display", "none");
    }
    
    if (("perc" in shown) && (!isNaN(shown.perc))){
        $(".percent").css("display", "inline-block");
        $(".percent").text(shown.perc);
		if (shown.xp[3]){
			$(".percent").text(shown.perc+"*");
		} 
    } else {
        $(".percent").css("display", "none");
    }
    
    var textshad;
    var textcol;
    
    $(".cardtitle").css("color", "white");
    
    $(".cardtext ccheat").css("color", "darkviolet");
    
    switch (shown.type){
        case "neut":
            textshad = "rgba(0, 0, 0, 0.6) 0px 0px 1px";
            textcol = "rgb(0, 0, 0)";
            
            break;
        case "monst":
        case "buy":    
        case "heal": 
        case "fray": 
        case "region":
        case "adv":
        case "disadv":
            textshad = "rgba(0, 0, 0, 1) 1px 1px 3px";
            textcol = "rgb(255, 255, 255)";
            $(".cardtext ccheat").css("color", "rgb(255, 255, 0)");
            break;
        case "comm":
            textcol = "rgb(59, 56, 14)";
            textshad = "rgba(155, 150, 18, 0.7) 1px 1px 3px";
            break;
        case "skred":
            textcol = "rgb(106, 0, 0)";
            textshad = "rgba(190, 120, 120, 0.8) 1px 1px 3px";
            break;
        case "skblue":
            textcol = "rgb(0, 60, 60)";
            textshad = "rgba(78, 170, 170, 0.8) 1px 1px 3px";
            break;
        case "skpurp":
            textcol = "rgb(26, 16, 54)";
            textshad = "rgba(170, 100, 170, 0.8) 1px 1px 3px";
            break;
        case "skgreen":
            textcol = "rgb(0, 20, 0)";
            textshad = "rgba(38, 140, 38, 0.5) 1px 1px 3px";
            break;
         case "skindi":
            textcol = "rgb(9, 3, 50)";
            textshad = "rgba(26, 9, 192, 0.5) 1px 1px 3px";
            break;
        case "boss":
            textcol = "rgb(166, 14, 14)";
            textshad = "rgba(46, 0, 0, 1) 1px 1px 3px";
            $(".cardtitle").css("color", textcol);
            
            break;
    }
    
    if (shown.what == "boss"){
        textcol = "rgb(166, 14, 14)";
        textshad = "rgba(46, 0, 0, 1) 1px 1px 3px";
        $(".cardtitle").css("color", textcol);
    }
    
    $(".cardtext").css("text-shadow", textshad);
    $(".cardtext").css("color", textcol);
    $(".cardtrait").css("text-shadow", textshad);
    $(".cardtrait").css("color", textcol);
    $(".percent").css("text-shadow", textshad);
    $(".percent").css("color", textcol);
    $(".stats").css("text-shadow", textshad);
    $(".stats").css("color", textcol);
    
    
    if ((shown.hp < shown.basehp) && (shown.what != "monst")){
        $("#hpval").css("color", "rgb(150, 0, 0)");
    }
        
    if ((shown.place=="#basicbuy") || (shown.place=="#buy")){
        $("#goldbag").css("display", "inline-block");
        $("#goldval").css("display", "inline-block");
        $("#goldval").text(shown.cost);
    } else {
        $("#goldval").css("display", "none");
        $("#goldbag").css("display", "none");
    }
	
    if (shown.type == "fray"){
        if (curfray > 0){
                $(".cardtext").html("The Monsters will gain<br>"+curfray+" Battlescore.");
        } else {
                $(".cardtext").html("You will gain<br>"+Math.abs(curfray)+" Battlescore.");
        }

    }
    if (shown.type == "heal"){
        $(".cardtext").html("Units assigned here will<br>regain "+healval[battlenum]+" Health each.");
    }
    
    if (shown.what == "info"){
        var infotext;
        
        if (bfdetails > 0){
            infotext = "This is your #"+battlenum+" battle.<br>";
            infotext += "Gold Reward: "+cardbyid[bfdetails].gold+" ("+cardbyid[bfdetails].goldlose+")<br>";
            infotext += "Fame Reward: "+cardbyid[bfdetails].fame+" ("+cardbyid[bfdetails].famelose+")<br>";
        } else {
            infotext = "This will be your #"+battlenum+" battle.<br>";
        }
        infotext += "Current Gold: "+gold;
        infotext += "<br>Current Fame: "+fame;
        $(".cardtext").html(infotext);
    }
    
    if (shown.what == "battinf"){
        var infotext;
        switch(shown.montype){
            case 1:
                infotext = "Enemy: Orcs";
                break;
            case 2:
                infotext = "Enemy: Beasts";
                break;
            case 3:
                infotext = "Enemy: Undead";
                break;
            case 4:
                infotext = "Enemy: Demons";
                break;
        }
        infotext += "<br>Waves: "+shown.waves;
        infotext += "<br>Starting Battlescore: "+shown.bsbase;
        infotext += "<br>Gold Reward: "+shown.gold+" ("+shown.goldlose+")";
        infotext += "<br>Fame Reward: "+shown.fame+" ("+shown.famelose+")";
        $(".cardtext").html(infotext);
    }
    
    if (shown.what == "rest"){
        var infotext = shown.text;
        infotext += "<br>("+healable +" Affected)";
        $(".cardtext").html(infotext);
    }
    if (shown.what == "promote"){
        var infotext = shown.text;
        infotext += "<br>("+ promotable +" Affected)";
        $(".cardtext").html(infotext);
    }
    if (shown.what == "drill"){
        var infotext = shown.text;
        infotext += "<br>("+ numskill +" Affected)";
        $(".cardtext").html(infotext);
    }
    
    if (parseInt($(".cardtext").css("height")) < 55){
        $(".cardtext").css("top", "400px");
    } else if (parseInt($(".cardtext").css("height")) < 80){
        $(".cardtext").css("top", "388px");
    } else if (parseInt($(".cardtext").css("height")) < 106){
        $(".cardtext").css("top", "376px");
    } else {
        $(".cardtext").css("top", "364px");
    }
    
    if (shown.place!="#buy"){
        var lejjebb = parseInt($(".cardtext").css("top"));
        lejjebb += 4;
        $(".cardtext").css("top", lejjebb);
    }
    
};