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

    //APP点菜
    let content = document.querySelector(".order" + this.seat);
    let board = document.querySelector(".board" + this.seat);

    let that = this;

    let orderPro = new Promise(function (resolve, reject) {
        let tx = "点菜中...还差";
        let cdOrder = new CountDown(3, resolve, content, tx);
        cdOrder.cd();
    });

    orderPro.then(function onFulfilled(value) {
        let ulo = document.createElement("ul");
        for (let i = 0; i < that.orderDish.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = that.orderDish[i].name + " 还未上";
            ulo.appendChild(li);
        }
        content.innerHTML = "";
        content.appendChild(ulo);

        let ulc = document.createElement("ul");
        for (let i = 0; i < that.orderDish.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = that.orderDish[i].name + " 未做";
            ulc.appendChild(li);
        }

        board.innerHTML = "";
        board.appendChild(ulc);

        ifeRestaurant.customers.push(that);

        for (let i = 0; i < that.orderDish.length; i++) {
            //若菜还未做
            if (that.dishState[i] === 0) {
                //发布做菜消息
                let status = that.trigger("order", that, i);
                if (!status) {
                    let t = setInterval(function () {
                        //若菜已在做
                        if (that.dishState[i] === 1) {
                            clearInterval(t);
                        }
                        status = that.trigger("order", that, i);
                        if (status) {
                            clearInterval(t);
                        }
                    }, 1000);
                }
            }
        }

    });

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


