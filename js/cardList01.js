//牌組
let cardName=["A1.jpg","A2.jpg","A3.jpg","A4.jpg","A4_2.jpg","A5.jpg","A6.jpg","A7.jpg","A8.jpg","A9.jpg","A10.jpg","B1.jpeg","B2.jpeg","B3.jpeg","B4.jpeg","B5.jpeg","B6.jpeg","B7.jpeg","B8.jpeg","B9.jpeg","B10.jpeg","C1.jpg","C2.jpg","C3.jpg","C4.jpg","C5.jpg","C6.jpg","C7.jpg","C7_2.jpg","C8.jpg","C9.jpg","C10.jpg","C11.jpg","C12.jpg","C13.jpg","D1.jpg","D2.jpg","D3.jpg","D4.jpg","D5.jpg","D6.jpg","D7.jpg","D8.jpg","D9.jpg","D10.jpg","D11.jpg","D12.jpg","D13.jpg","J1.jpeg","J2.jpeg"]
let cardList = $("#cardList01").find(".cardList");


for(let i=0;i<cardName.length;i++){
    let cardItem = $("<div class='cardItem'>");
    cardItem.append(`<img src="img/card/back.jpg" alt="unknown card">`);
    cardList.append(cardItem);
}

