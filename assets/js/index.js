//換卡
 let changecard=(itemlist)=>{
    
    $(".turncardWrap").removeClass("roll");
    setTimeout(()=>{ 
        $("#card1").attr("src","assets/img/card/"+itemlist[0]);
        $("#card2").attr("src","assets/img/card/"+itemlist[1]);
        $("#card3").attr("src","assets/img/card/"+itemlist[2]); 
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
let cardName=["A1.png","A2.png","A3.png","A4.png","A4_2.png","A5.png","A6.png","A7.png","A8.png","A9.png","A10.png","B1.jpeg","B2.jpeg","B3.jpeg","B4.jpeg","B5.jpeg","B6.jpeg","B7.jpeg","B8.jpeg","B9.jpeg","B10.jpeg","C1.PNG","C2.PNG","C3.PNG","C4.PNG","C5.PNG","C6.PNG","C7.PNG","C7_2.PNG","C8.PNG","C9.PNG","C10.PNG","C11.PNG","C12.PNG","C13.PNG","D1.PNG","D2.PNG","D3.PNG","D4.PNG","D5.PNG","D6.PNG","D7.PNG","D8.PNG","D9.PNG","D10.PNG","D11.PNG","D12.PNG","D13.PNG","J1.jpeg","J2.jpeg"]






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




newre();
random();