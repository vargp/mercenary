/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
    
});

function buycards(){
    
    
    $("#choosable").css("display", "inline-block");
    $("#buydeck").css("display", "inline-block");
    $("#game").empty();
    $("#game").append($(".cardc[id=\""+commander+"\"]"));
    var str = '<div class="cardf" id="buydone"><img class="smallcard" src="img/ready.jpg"></div>';
    $("#game").append(str);
    recruit = 1;
    generate (1, "#basicbuy");
    generate (5, "#basicbuy");
    generate (5, "#basicbuy");
    generate (5, "#basicbuy");
    recruit = 0;
    showcard(9);
    
    for (let i = 1; i < 7; i++) { 
        generate (1, "#buy");
    }
    
    for (let i = 1; i < 60; i++) { 
        generate (1, "#seedeck");
    }
    
}