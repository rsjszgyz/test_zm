var cId = 0;
function Customer() {
    cId += 1;
    this.cId = cId;
    this.orderDish = [];
    this.seat = 0;
    this.dishState = [];
}

Customer.prototype.order = function () {
    let dishes = dishList.slice(0);
    //随机点多个菜
    let random = Math.floor(Math.random() * dishes.length + 1);
    for (let i = 0; i < random; i++) {
        let index = Math.floor(Math.random() * dishes.length);
        this.orderDish.push(dishes[index]);
        this.dishState.push(0);
        dishes.splice(index, 1);
    }

};

Customer.prototype.eat = function (index) {

    let eatContent = document.querySelector(".order" + this.seat).children[0].children[index];

    let that = this;

    //吃菜
    let eatPro = new Promise(function (resolve, reject) {
        let tx = that.orderDish[index].name + " 正在吃 ";
        let cdEat = new CountDown(3, resolve, eatContent, tx);
        cdEat.cd();
    });

    eatPro.then(function onFulfilled(value) {
        that.dishState[index] = 2;
        eatContent.innerHTML = that.orderDish[index].name + " 已吃完";
        let state = true;
        for (let i = 0; i < that.dishState.length; i++) {
            if (that.dishState[i] !== 2) {
                state = false;
                break;
            }
        }

        if (state) {
            let spend = 0;
            for (let i = 0; i < that.orderDish.length; i++) {
                spend += that.orderDish[i].price - that.orderDish[i].cost;
            }

            let list = [];
            list.push([that, spend, that.seat]);

            //发布付款消息
            let status = that.trigger("pay", list);
            if (!status) {
                let t = setInterval(function () {
                    status = that.trigger("pay", list);
                    if (status) {
                        clearInterval(t);
                    }
                }, 1000);
            }
        }

    });

};


