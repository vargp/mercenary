/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var testgen = 1;
var testengen = 1;
var comgen = 1;
var recruit = 0;
var adadraw = 0;
var mondraw = 0;
var bossnum = 0;

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
    var sumcard;
    var hanylapos;
    var cardtext = "";
    
    cardbyid[hanylapvan].temp = false;

    
    var mifele = mit;

    switch (mifele){
        case 1:
            // char
            
            sumcard = char.length-2;
            numgen = Math.floor((Math.random() * sumcard) + 2);
            
            if (recruit > 0){
                numgen = recruit;
            }
            
            // cheat
            //numgen = 9;
            //testgen++;
            
            drawcard = char[numgen];
            cardbyid[hanylapvan].baseperc = drawcard.perc;
            cardbyid[hanylapvan].perc = cardbyid[hanylapvan].baseperc;
            cardbyid[hanylapvan].illus = "ch";
            cardbyid[hanylapvan].cost = drawcard.cost;
            break;
        case 2:
            // enemy
            
            numgen = mondraw;
            
            //cheat
            // numgen = 80;
            
            drawcard = en[numgen];            
            cardbyid[hanylapvan].illus = "en";
            break;
        case 3:
            // commander
            numgen = comgen;
            //console.log(comgen);
            drawcard = co[comgen];
            comgen++;            
            cardbyid[hanylapvan].illus = "co";
            
            break;
        case 4:
            // skill
            sumcard = skill.length-1;
            numgen = Math.floor((Math.random() * sumcard) + 1);
            //cheat
            //numgen = 27;
            drawcard = skill[numgen];          
            cardbyid[hanylapvan].illus = "sk"; 
            cardbyid[hanylapvan].baseperc = drawcard.perc;
            cardbyid[hanylapvan].perc = cardbyid[hanylapvan].baseperc;
            cardbyid[hanylapvan].cost = drawcard.cost;
            break;
        case 5:
            // buyable
            drawcard = buyable[recruit];
            //console.log("Rec: "+recruit);
            numgen = recruit;
            recruit++;            
            cardbyid[hanylapvan].illus = "bu";
            cardbyid[hanylapvan].cost = drawcard.cost;
            break;
        case 6:
            // region
            sumcard = reg.length-3;
            numgen = Math.floor((Math.random() * sumcard) + 1);
            
            //cheat
            //numgen = 38;
            if (recruit > 0){
                numgen = recruit;
            }
            
            drawcard = reg[numgen];          
            cardbyid[hanylapvan].illus = "reg"; 
            cardbyid[hanylapvan].fmod = drawcard.fmod;
            break;
        case 7:
            // adv & disadv
            
            // cheat
            // adadraw = 6;
            
            numgen = adadraw;
            drawcard = ada[numgen];          
            cardbyid[hanylapvan].illus = "ada"; 
            cardbyid[hanylapvan].temp = true;
            cardbyid[hanylapvan].baseperc = drawcard.perc;
            cardbyid[hanylapvan].perc = cardbyid[hanylapvan].baseperc;
            break;
        case 8:
            // boss
            numgen = bossnum;
                        
            drawcard = boss[numgen];            
            cardbyid[hanylapvan].illus = "boss";
            break;
    }
    
    
    cardbyid[hanylapvan].what = drawcard.what;
    cardbyid[hanylapvan].type = drawcard.type;
    cardbyid[hanylapvan].trig = drawcard.trig;
    
    if (numgen < 10){
        cardbyid[hanylapvan].illus += "0";
    }
    cardbyid[hanylapvan].illus += numgen;
    //console.log(cardbyid[hanylapvan].illus);
    
    cardbyid[hanylapvan].assign = 0;
    cardbyid[hanylapvan].assist = 0;
    
    cardbyid[hanylapvan].title = drawcard.title;
    cardbyid[hanylapvan].text = drawcard.text;
    cardbyid[hanylapvan].abnum = numgen;
    cardbyid[hanylapvan].place = hova;
    cardbyid[hanylapvan].trait = drawcard.trait;
    
    cardbyid[hanylapvan].xp = new Array();
    cardbyid[hanylapvan].xp[1] = false;
    cardbyid[hanylapvan].xp[2] = false;
    cardbyid[hanylapvan].xp[3] = false;
	
    if ("dmg" in drawcard){
        cardbyid[hanylapvan].basedmg = drawcard.dmg;
        cardbyid[hanylapvan].basehp = drawcard.hp;    
        if (cardbyid[hanylapvan].what == "monst"){
            cardbyid[hanylapvan].basedmg += monplusdmg[battlenum];
            cardbyid[hanylapvan].basehp += monplushp[battlenum];
        }
        cardbyid[hanylapvan].dmg = cardbyid[hanylapvan].basedmg;
        cardbyid[hanylapvan].hp = cardbyid[hanylapvan].basehp;
	
		 
    } else {
        
    }
    
    
    if (mit == 0){
        $eztakepet.attr("src", "img/illus/empty.png");
    } else {
        $eztakepet.attr("src", "img/illus/" + cardbyid[hanylapvan].illus + ".jpg");
    }
    $eztadd.css("box-shadow", "0 0 10px 2px #000000");
    
    
};