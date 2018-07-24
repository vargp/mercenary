/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



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
    $("#battle1").css("max-width", "240px");
    $("#battle2").css("max-width", "240px");
    $("#battle3").css("max-width", "240px");
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
        }
    });
    
    
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
    
    
    
}

function startingdeck(){
    
    
    for (let i = 1; i <= 6; i++) {
        // cheat
        // startcards[i] = 7;
    }
    
    recruit = 1;
    for (let i = 1; i <= 6; i++) {
        generate (1, "#deck");
    }
    for (let i = 1; i <= 6; i++) {
        recruit = startcards[i];
        generate (1, "#deck");
        recruit ++;
    }
    recruit = 0;
    
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
    $(".cardtext").html(cid.text);
    $("#takedmg").html(cid.hp);
    
    //writelog(("dmg" in cid)+" "+lapid+ "<br>");
    if ("dmg" in cid){
        $("#dmgval").css("display", "inline-block");
        $("#damage").css("display", "inline-block");
        $("#health").css("display", "inline-block");
        $("#dmgval").html(cid.dmg);
        $("#hpval").html(cid.hp);
        $("#hpval").css("display", "inline-block");
		if (cid.xp[1]){
			$("#damage").html("DMG*");
		} else {
			$("#damage").html("DMG");
		}
		if (cid.xp[2]){
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
    
    if ("perc" in cid){
        $(".percent").css("display", "inline-block");
        $(".percent").text(cid.perc);
		if (cid.xp[3]){
			$(".percent").text(cid.perc+"*");
		} 
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
        case "buy":    
        case "heal": 
        case "fray": 
        case "region":
        case "adv":
        case "disadv":
            textshad = "rgba(0, 0, 0, 1) 1px 1px 3px";
            textcol = "rgb(255, 255, 255)";
            break;
        case "comm":
            textcol = "rgb(59, 56, 14)";
            textshad = "rgba(155, 150, 18, 1) 1px 1px 3px";
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
    
    if ((cid.place=="#basicbuy") || (cid.place=="#buy")){
        $("#goldbag").css("display", "inline-block");
        $("#goldval").css("display", "inline-block");
        $("#goldval").text(cid.cost);
    } else {
        $("#goldval").css("display", "none");
        $("#goldbag").css("display", "none");
    }
	
    if (cid.type == "fray"){
        if (curfray > 0){
                $(".cardtext").html("The Monsters will gain<br>"+curfray+" Battlescore.");
        } else {
                $(".cardtext").html("You will gain<br>"+Math.abs(curfray)+" Battlescore.");
        }

    }
    if (cid.type == "heal"){
        $(".cardtext").html("Units assigned here will<br>regain "+healval[battlenum]+" Health each.");
    }
    
    if (cid.what == "info"){
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
    
    if (cid.what == "battinf"){
        var infotext;
        switch(cid.montype){
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
        infotext += "<br>Waves: "+cid.waves;
        infotext += "<br>Starting Battlescore: "+cid.bsbase;
        infotext += "<br>Gold Reward: "+cid.gold+" ("+cid.goldlose+")";
        infotext += "<br>Fame Reward: "+cid.fame+" ("+cid.famelose+")";
        $(".cardtext").html(infotext);
    }
    
    if (parseInt($(".cardtext").css("height")) < 55){
        $(".cardtext").css("top", "398px");
    } else if (parseInt($(".cardtext").css("height")) < 100){
        $(".cardtext").css("top", "390px");
    } else if (parseInt($(".cardtext").css("height")) < 106){
        $(".cardtext").css("top", "380px");
    } else {
        $(".cardtext").css("top", "368px");
    }
    
    
};