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
var voltreg = [];
voltreg[1] = 0;
voltreg[2] = 0;
voltreg[3] = 0;
var regemon = [];
regemon[1] = 0;
regemon[2] = 0;
regemon[3] = 0;

var noblob = false;

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
    var drawed;
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
            // numgen = 19;
            //testgen++;
            
            drawed = char[numgen];
            cardbyid[hanylapvan].baseperc = drawed.perc;
            cardbyid[hanylapvan].perc = cardbyid[hanylapvan].baseperc;
            cardbyid[hanylapvan].illus = "ch";
            cardbyid[hanylapvan].cost = drawed.cost;
            break;
        case 2:
            // enemy
            
            numgen = mondraw;
            
            //cheat
            // numgen = 51;
            
            if ((noblob) && (numgen == 9)){
                numgen = 10;
            }
            
            drawed = en[numgen];            
            cardbyid[hanylapvan].illus = "en";
            
            break;
        case 3:
            // commander
            numgen = comgen;
            //console.log(comgen);
            drawed = co[comgen];
            comgen++;            
            cardbyid[hanylapvan].illus = "co";
            
            break;
        case 4:
            // skill
            sumcard = skill.length-1;
            numgen = Math.floor((Math.random() * sumcard) + 1);
            //cheat
            //numgen = 23;
            drawed = skill[numgen];          
            cardbyid[hanylapvan].illus = "sk"; 
            cardbyid[hanylapvan].baseperc = drawed.perc;
            cardbyid[hanylapvan].perc = cardbyid[hanylapvan].baseperc;
            cardbyid[hanylapvan].cost = drawed.cost;
            break;
        case 5:
            // buyable
            drawed = buyable[recruit];
            //console.log("Rec: "+recruit);
            numgen = recruit;
            recruit++;            
            cardbyid[hanylapvan].illus = "bu";
            cardbyid[hanylapvan].cost = drawed.cost;
            break;
        case 6:
            // region
            sumcard = reg.length-3;
            do {
                numgen = Math.floor((Math.random() * sumcard) + 1);
            } while ((reg[numgen].trait == reg[voltreg[1]].trait) || (reg[numgen].trait == reg[voltreg[2]].trait) || (reg[numgen].trait == reg[voltreg[3]].trait));
            
            //cheat
            //numgen = 14;
            if (recruit > 0){
                numgen = recruit;
            }
            
            drawed = reg[numgen];          
            cardbyid[hanylapvan].illus = "reg"; 
            cardbyid[hanylapvan].fmod = drawed.fmod;
            break;
        case 7:
            // adv & disadv
            
            // cheat
            // adadraw = 6;
            
            numgen = adadraw;
            drawed = ada[numgen];          
            cardbyid[hanylapvan].illus = "ada"; 
            cardbyid[hanylapvan].temp = true;
            cardbyid[hanylapvan].baseperc = drawed.perc;
            cardbyid[hanylapvan].perc = cardbyid[hanylapvan].baseperc;
            break;
        case 8:
            // boss
            numgen = bossnum;
                        
            drawed = boss[numgen];            
            cardbyid[hanylapvan].illus = "boss";
            break;
    }
    
    
    cardbyid[hanylapvan].what = drawed.what;
    cardbyid[hanylapvan].type = drawed.type;
    cardbyid[hanylapvan].trig = drawed.trig;
    
    if (numgen < 10){
        cardbyid[hanylapvan].illus += "0";
    }
    cardbyid[hanylapvan].illus += numgen;
    //console.log(cardbyid[hanylapvan].illus);
    
    cardbyid[hanylapvan].assign = 0;
    cardbyid[hanylapvan].assist = 0;
    
    cardbyid[hanylapvan].title = drawed.title;
    cardbyid[hanylapvan].text = drawed.text;
    cardbyid[hanylapvan].abnum = numgen;
    cardbyid[hanylapvan].place = hova;
    cardbyid[hanylapvan].trait = drawed.trait;
    
    cardbyid[hanylapvan].xp = new Array();
    cardbyid[hanylapvan].xp[1] = false;
    cardbyid[hanylapvan].xp[2] = false;
    cardbyid[hanylapvan].xp[3] = false;
	
    //console.log("EZ HIBAS LESZ: "+drawed);
    
    if ("dmg" in drawed){
        cardbyid[hanylapvan].basedmg = drawed.dmg;
        cardbyid[hanylapvan].basehp = drawed.hp;    
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