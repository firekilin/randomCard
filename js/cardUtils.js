function flipMove($el, changeDomFn, duration = 1000) {
    const el = $el.getCardElement()[0];

    // First
    const first = $el.getCardElement().offset();

    // DOM 變更
    changeDomFn();

    // Last
    const last = $el.getCardElement().offset();

    const dx = first.left - last.left;
    const dy = first.top - last.top;
    console.log(dx, dy);
    // Invert
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = "none";

    // 強制 reflow
    el.offsetHeight;

    // Play
    el.style.transform = "";
    el.style.transition = `transform ${duration}ms ease`;
    $el.show();
}



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

    getLocation() {
        return this.cardDiv[0].getBoundingClientRect();
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
         let cardListElement = $("<div class='cardList'>");
        let cardSelectElement = $("<div class='cardSelect'>");
        let randomCards = this.randomSort();
        let w = element.width() - 120;
        let h = 50;
       
        let setinit = () => {
            element.empty();
            cardListElement.empty();
            cardSelectElement.empty();
            let r = (w * w) / (8 * h) + (h / 2);
            let cx = w / 2;
            let cy = r;
            
            //設定物件顯示
            for (let i = 0; i < cardnum; i++) {
                let cardItem = new CardItem(randomCards[i], "", false);
                cardItem.setStyle(`left: 0px;top: 0px`);

                cardItem.hide();
                cardItem.getCardElement().off("click").on("click", () => {
                    if (cardSelectElement.children().length < 3) {
                        flipMove(cardItem, () => {
                            cardItem.setStyle(``);
                            cardSelectElement.append(cardItem.getCardElement());
                        });

                    }
                });
                cardListElement.append(cardItem.getCardElement());
                setTimeout(() => {
                     let x = (i / (cardnum - 1)) * w;
                    let dx = x - cx;
                    let y = cy - Math.sqrt(r * r - dx * dx);
                    cardItem.setStyle(`left: ${x}px;top: ${h - y}px`);

                }, 100);
            }


            //設定重置按鈕
            let resetButton = $(`<button class="resetButton btn btn-light">重置</button>`);
            resetButton.on("click", () => {
                setinit();
            });


            //洗牌
            let shuffleButton = $(`<button class="resetButton btn btn-light" style="left:80px;">洗牌</button>`);
            shuffleButton.on("click", () => {

                randomCards = this.randomSort();
                setinit();

            });
            element.append(cardListElement);
            element.append(resetButton);
            element.append(shuffleButton);
            element.append(cardSelectElement);

        }
        setinit();
    }

    game02 = (element) => {
        let cardListElement = $("<div class='cardList'>");
        let cardSelectElement = $("<div class='cardSelect'>");
        let randomCards = this.randomSort();

        let setinit = () => {
            element.empty();
            cardListElement.empty();
            cardSelectElement.empty();

            //設定物件顯示
            for (let i = 0; i < randomCards.length; i++) {
                let cardItem = new CardItem(randomCards[i], "", false);
                cardItem.setStyle(`left: 0px;top: 0px`);

                cardItem.hide();
                cardItem.getCardElement().off("click").on("click", () => {
                    if (cardSelectElement.children().length < 3) {
                        flipMove(cardItem, () => {
                            cardItem.setStyle(``);
                            cardSelectElement.append(cardItem.getCardElement());
                        });

                    }
                });
                cardListElement.append(cardItem.getCardElement());
                setTimeout(() => {
                    cardItem.setStyle(`left: ${i * 110 + 10}px;top: ${0}px`);

                }, 100);
            }


            //設定重置按鈕
            let resetButton = $(`<button class="resetButton btn btn-light">重置</button>`);
            resetButton.on("click", () => {
                setinit();
            });


            //洗牌
            let shuffleButton = $(`<button class="resetButton btn btn-light" style="left:80px;">洗牌</button>`);
            shuffleButton.on("click", () => {

                randomCards = this.randomSort();
                setinit();

            });
            element.append(cardListElement);
            element.append(resetButton);
            element.append(shuffleButton);
            element.append(cardSelectElement);

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
        cardGame01.game01($("#cardGame01"),22);
    }
    cardGame01.game02($("#cardGame02"));


});