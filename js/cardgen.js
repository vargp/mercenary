/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var testgen = 1;
var testengen = 1;
var comgen = 1;
var recruit = 0;

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
            
            sumchar = char.length-2;
            numgen = Math.floor((Math.random() * sumchar) + 2);
            
            if (recruit > 0){
                numgen = 1;
            }
            
            // cheat
            //numgen = testgen;
            //testgen++;
            
            drawcard = char[numgen];
            cardbyid[hanylapvan].baseperc = drawcard.perc;
            cardbyid[hanylapvan].perc = cardbyid[hanylapvan].baseperc;
            cardbyid[hanylapvan].illus = "ch";
            cardbyid[hanylapvan].cost = drawcard.cost;
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
            numgen = comgen;
            console.log(comgen);
            drawcard = co[comgen];
            comgen++;            
            cardbyid[hanylapvan].illus = "co";
            
            break;
        case 4:
            // skill
            break;
        case 5:
            // buyable
            drawcard = buyable[recruit];
            console.log("Rec: "+recruit);
            numgen = recruit;
            recruit++;            
            cardbyid[hanylapvan].illus = "bu";
            cardbyid[hanylapvan].cost = drawcard.cost;
            break;
            
    }
    
    
    cardbyid[hanylapvan].type = drawcard.type;
    
    if (numgen < 10){
        cardbyid[hanylapvan].illus += "0";
    }
    cardbyid[hanylapvan].illus += numgen;
    console.log(cardbyid[hanylapvan].illus);
    
    
    cardbyid[hanylapvan].title = drawcard.title;
    cardbyid[hanylapvan].text = drawcard.text;
    cardbyid[hanylapvan].place = hova;
    cardbyid[hanylapvan].trait = drawcard.trait.toUpperCase();
    
    if (cardbyid[hanylapvan].type == "buy"){
        
    } else {
        cardbyid[hanylapvan].basedmg = drawcard.dmg;
        cardbyid[hanylapvan].basehp = drawcard.hp;    
        cardbyid[hanylapvan].dmg = cardbyid[hanylapvan].basedmg;
        cardbyid[hanylapvan].hp = cardbyid[hanylapvan].basehp;
    }
    
    
    if (mit == 0){
        $eztakepet.attr("src", "img/illus/empty.png");
    } else {
        $eztakepet.attr("src", "img/illus/" + cardbyid[hanylapvan].illus + ".jpg");
    }
    $eztadd.css("box-shadow", "0 0 10px 2px #000000");
    
    
};