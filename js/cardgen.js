/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var testgen = 1;
var testengen = 1;

var generate = (mit, hova) => {
    
    var honnandrag;
    
    hanylapvan++;
    var $eztadd = $("<div></div>"); 
    var $eztakepet = $("<img></img>");
    $eztadd.attr("class", "cardc");
    $eztadd.attr("id", hanylapvan);
    $eztakepet.attr("class", "smallcard");  
    $eztadd.append($eztakepet);
    
    $(hova).append($eztadd);  
    
    // if not szörny
    
    
    cardbyid.push(new Object());
    
    cardbyid[hanylapvan].place = hova;
    
    var laphuz;
    var numgen;
    var drawcard;
    var sumchar;
    var hanylapos;
    var cardtext = "";
    
    

    
    var mifele = mit;

    switch (mifele){
        case 1:
            // char
            
            sumchar = char.length-1;
            numgen = Math.floor((Math.random() * sumchar) + 1);
            
            // cheat
            //numgen = testgen;
            //testgen++;
            
            drawcard = char[numgen];
            cardbyid[hanylapvan].baseperc = drawcard.perc;
            cardbyid[hanylapvan].perc = cardbyid[hanylapvan].baseperc;
            cardbyid[hanylapvan].illus = "ch";
            break;
        case 2:
            // enemy
            sumchar = en.length-1;
            numgen = Math.floor((Math.random() * sumchar) + 1);
            drawcard = en[numgen];
            cardbyid[hanylapvan].illus = "en";
            break;
        case 3:
            // commander
            sumchar = co.length-1;
            numgen = Math.floor((Math.random() * sumchar) + 1);
            drawcard = co[numgen];
            cardbyid[hanylapvan].illus = "co";
            break;
    }
    
    
    cardbyid[hanylapvan].type = drawcard.type;
    
    if (numgen < 10){
        cardbyid[hanylapvan].illus += "0";
    }
    cardbyid[hanylapvan].illus += numgen;
    console.log(cardbyid[hanylapvan].illus);
    
    cardbyid[hanylapvan].title = drawcard.title;
    cardbyid[hanylapvan].trait = drawcard.trait.toUpperCase();
    cardbyid[hanylapvan].text = drawcard.text;
    cardbyid[hanylapvan].place = hova;
    cardbyid[hanylapvan].basedmg = drawcard.dmg;
    cardbyid[hanylapvan].basehp = drawcard.hp;    
    cardbyid[hanylapvan].dmg = cardbyid[hanylapvan].basedmg;
    cardbyid[hanylapvan].hp = cardbyid[hanylapvan].basehp;
    $eztakepet.attr("src", "img/illus/" + cardbyid[hanylapvan].illus + ".jpg");
    $eztadd.css("box-shadow", "0 0 10px 2px #000000");
    
    
};