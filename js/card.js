//換卡
 let changecard=(itemlist)=>{
    
    $(".turncardWrap").removeClass("roll");
    setTimeout(()=>{ 
        $("#card1").attr("src","img/card/"+itemlist[0]);
        $("#card2").attr("src","img/card/"+itemlist[1]);
        $("#card3").attr("src","img/card/"+itemlist[2]); 
    }, 500);
    
}
//翻卡
$(".turncardWrap").on("click",(e)=>{
    $(e.currentTarget).addClass("roll");
 })

//
$("#allOpen").on("click",()=>{
    $(".turncardWrap").addClass("roll");
})


//牌組
let cardName=["A1.jpg","A2.jpg","A3.jpg","A4.jpg","A4_2.jpg","A5.jpg","A6.jpg","A7.jpg","A8.jpg","A9.jpg","A10.jpg","B1.jpeg","B2.jpeg","B3.jpeg","B4.jpeg","B5.jpeg","B6.jpeg","B7.jpeg","B8.jpeg","B9.jpeg","B10.jpeg","C1.jpg","C2.jpg","C3.jpg","C4.jpg","C5.jpg","C6.jpg","C7.jpg","C7_2.jpg","C8.jpg","C9.jpg","C10.jpg","C11.jpg","C12.jpg","C13.jpg","D1.jpg","D2.jpg","D3.jpg","D4.jpg","D5.jpg","D6.jpg","D7.jpg","D8.jpg","D9.jpg","D10.jpg","D11.jpg","D12.jpg","D13.jpg","J1.jpeg","J2.jpeg"]






 //全隨機
class cardlist{
    constructor(str){
        return $(`<div class="col-2" >
        ${str}
        </div>`);
    }
    
}
let random=()=>{
    let newcard=[];
    for(let i=0;i<3;i++){
        newcard.push(cardName[parseInt(Math.random()*cardName.length)]);
    }
    changecard(newcard);
}
$("#random").on("click",()=>{
    random();
});




//隨機不重複
class cardlist_re{
    constructor(str,name){
        return $(`<div class="col-2" id="carditem${str}">
        ${name}
        </div>`);
    }
}
let random_re=()=>{
    let newcard=[];
    let newcardName=[];
    let i=0;
    while(i<3){
        if($("#ready").children().length==0){
            newre();
            for(let j=0;j<newcard.length;j++){
                $("#carditem"+newcard[j]).remove();
            }
        }

        let randnum=parseInt(Math.random()*cardName.length);
        if($("#carditem"+randnum).length==1){
            newcardName.push(cardName[randnum]);
            newcard.push(randnum);
            $("#carditem"+randnum).remove();
            i++;
        }
    }
    changecard(newcardName);
}
$("#random_re").on("click",()=>{
    random_re();
});



//顯示牌組
let newre=()=>{
    for(let i=0;i<cardName.length;i++){
        $("#store").append(new cardlist(cardName[i]));
    }
    for(let i=0;i<cardName.length;i++){
        $("#ready").append(new cardlist_re(i,cardName[i]));
    }
}


//初始化 載入圖片
let init=()=>{
    for(let i=0;i<cardName.length;i++){
        $("body").append($(`<img src="img/card/${cardName[i]}" style="display:none;">`));
    }
  
}

init();//載入圖片

newre();
random();