
class CardItem {
    cardDiv = null;
    style = "";
    back = null;
    front = null;
    constructor(jpgName, style = "left:0px;top:0px", show = false) {
        this.front = $(`<div class="front">`);
        this.front.append($(`<img src="img/card/${jpgName}" class="cardImage">`));
        this.back = $(`<div class="back">`);
        this.back.append($(`<img src="img/card/back.jpg" class="cardImage">`));
        this.style = style;
        this.cardDiv = $(`<div style="${this.style}" class="cardItem">`);
        this.cardDiv.append(this.front);
        this.cardDiv.append(this.back);
        if (show) {
            this.cardDiv.addClass("roll");
        } else {
            this.cardDiv.removeClass("roll");
        }
        return this;
    }

    getCardElement() {
        return this.cardDiv;
    }

    hide() {
        this.cardDiv.removeClass("roll");
    }

    show() {
        this.cardDiv.addClass("roll");
    }

    setStyle(style) {
        this.style = style;
        this.cardDiv.attr("style", this.style);
    }

}


class CardGame {


    cardList = [
        "A1.jpg", "A2.jpg", "A3.jpg", "A4.jpg", "A5.jpg", "A6.jpg", "A7.jpg", "A8.jpg", "A9.jpg", "A10.jpg", "A11.jpg", "A12.jpg", "A13.jpg", "A4_2.jpg", "A4_3.jpg",
        "B1.jpg", "B2.jpg", "B3.jpg", "B4.jpg", "B5.jpg", "B6.jpg", "B7.jpg", "B8.jpg", "B9.jpg", "B10.jpg", "B11.jpg", "B12.jpg", "B13.jpg",
        "C1.jpg", "C2.jpg", "C3.jpg", "C4.jpg", "C5.jpg", "C6.jpg", "C7.jpg", "C8.jpg", "C9.jpg", "C10.jpg", "C11.jpg", "C12.jpg", "C13.jpg", "C7_2.jpg",
        "D1.jpg", "D2.jpg", "D3.jpg", "D4.jpg", "D5.jpg", "D6.jpg", "D7.jpg", "D8.jpg", "D9.jpg", "D10.jpg", "D11.jpg", "D12.jpg", "D13.jpg",
        "J1.jpg", "J2.jpg"]

    randomSort() {
        let randomList = [...this.cardList];
        return randomList.sort(() => Math.random() - 0.5);
    }

    game01 = (element, cardnum = this.cardList.length) => {
        let randomCards = this.randomSort();
        let w = element.width() - 120;
        let h = 50;
        let cardList = new Array();
        let selectItem = new Array();
        //顯示選取的卡片
        let selectShow = () => {
            for (let i = 0; i < selectItem.length; i++) {

                selectItem[i].setStyle(``);
                selectItem[i].show();

            }
        }
        //設定物件顯示
        for (let i = 0; i < cardnum; i++) {
            let cardItem = new CardItem(randomCards[i], "", false);
            cardList.push(cardItem);
            element.append(cardItem.getCardElement());
        }
        // 計算弧度設定初始位置
        let setinit = () => {
            let r = (w * w) / (8 * h) + (h / 2);
            let cx = w / 2;
            let cy = r;
            selectItem = new Array();
            for (let i = 0; i < cardnum; i++) {
                let x = (i / (cardnum - 1)) * w;
                let dx = x - cx;
                let y = cy - Math.sqrt(r * r - dx * dx);
                cardList[i].setStyle(`left: ${x}px;top: ${h - y}px`);
                cardList[i].hide();
                cardList[i].getCardElement().off("click").on("click", () => {
                    if (selectItem.length < 3) {
                        cardList[i].setStyle(`transition: none;position: relative;left: ${parseFloat(cardList[i].getCardElement().css("left"), 10) - (cardList[i].getCardElement().prevAll(".roll").length * 220)}px;top: ${cardList[i].getCardElement().css("top")};`);
                        selectItem.push(cardList[i]);
                        setTimeout(() => {
                            selectShow();
                        }, 10);

                    }
                });
            }
            //設定重置按鈕
            let resetButton = $(`<button class="resetButton btn btn-light">重置</button>`);
            resetButton.on("click", () => {
                setinit();
            });
            element.append(resetButton);
            //洗牌
            let shuffleButton = $(`<button class="resetButton btn btn-light" style="left:80px;">洗牌</button>`);
            shuffleButton.on("click", () => {
                element.empty();
                cardList = new Array();
                let randomCards = this.randomSort();
                for (let i = 0; i < cardnum; i++) {
                    let cardItem = new CardItem(randomCards[i], `left:${0}px;top:${0}px`, false);
                    cardList.push(cardItem);
                    element.append(cardItem.getCardElement());
                }
                element.append(resetButton);
                element.append(shuffleButton);

                setTimeout(() => {
                    setinit();
                }, 100);
            });
            element.append(shuffleButton);
        }
        setinit();

    }

    game02 = (element) => {
        let randomCards = this.randomSort();
        let cardList = new Array();
        let selectItem = new Array();
        //顯示選取的卡片
        let selectShow = () => {
            for (let i = 0; i < selectItem.length; i++) {

                selectItem[i].setStyle(``);
                selectItem[i].show();

            }
        }
        //設定物件顯示
        for (let i = 0; i < randomCards.length; i++) {
            let cardItem = new CardItem(randomCards[i], "", false);
            cardList.push(cardItem);
            element.append(cardItem.getCardElement());
        }
        // 計算弧度設定初始位置
        let setinit = () => {
            selectItem = new Array();
            for (let i = 0; i < randomCards.length; i++) {
                cardList[i].setStyle(`left: ${i*110 +10}px;top: ${0}px`);
                cardList[i].hide();
                cardList[i].getCardElement().off("click").on("click", () => {
                    if (selectItem.length < 3) {
                        selectItem.push(cardList[i]);
                        selectShow();
                    }
                });
            }
            //設定重置按鈕
            let resetButton = $(`<button class="resetButton btn btn-light">重置</button>`);
            resetButton.on("click", () => {
                setinit();
            });
            element.append(resetButton);
        }
        setinit();
    }

}

let isMinScreen = () => {
    if (window.innerWidth < 768) {
        return true;
    } else {
        return false;
    }

}
$(() => {
    let cardGame01 = new CardGame();
    if (isMinScreen()) {
        cardGame01.game01($("#cardGame01"), 10);
    } else {
        cardGame01.game01($("#cardGame01"));
    }
    cardGame01.game02($("#cardGame02"));


});