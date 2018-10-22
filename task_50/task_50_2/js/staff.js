let id = 0;
function Staff(name, salary) {
    id += 1;
    this.id = id;
    this.name = name || "";
    this.salary = salary || 0;
    this.state = true;
    this.pic = "";
    this.picState = "";
}

Staff.prototype.doWork = function () {
    console.log("干活了");
};


function Waiter(name, salary) {
    Staff.call(this, name, salary);
}

Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;

Waiter.prototype.doWork = function (order) {

    let customer = order instanceof Array ? order[0][0] : order;
    let seat = customer.seat;

    switch (seat) {
        case 1:
            this.pic.style.top = "250px";
            this.pic.style.right = "1000px";
            break;
        case 2:
            this.pic.style.top = "250px";
            this.pic.style.right = "750px";
            break;
        case 3:
            this.pic.style.top = "250px";
            this.pic.style.right = "500px";
            break;
    }

    let that = this;

    let content = document.querySelector(".order" + seat);
    let board = document.querySelector(".board" + seat);

    if (order instanceof Array) {

        //上菜
        if (order[0].length == 2) {
            for (let i = 0; i < order.length; i++) {
                order[i][0].eat(order[i][1]);
            }

            setTimeout(function () {
                that.pic.style.top = "500px";
                that.pic.style.right = "500px";
                that.state = true;
            }, 500);
        }

        //付款
        if (order[0].length == 3) {
            content.innerHTML = "已付款，共计 " + order[0][1] + " 元";
            ifeRestaurant.cash += order[0][1];
            cash.innerHTML = "现金数量：" + ifeRestaurant.cash;
            let index = ifeRestaurant.customers.indexOf(customer);
            ifeRestaurant.customers.splice(index, 1);

            setTimeout(function () {
                content.innerHTML = "空闲";
                document.querySelector("#customer" + customer.cId).style.display = "none";
                board.innerHTML = "白板";
                that.pic.style.top = "500px";
                that.pic.style.right = "500px";
                that.state = true;


                //服务下一个顾客
                if (customers.length > 0) {
                    setTimeout(function () {

                        loopCustomer(customers[0], customer.seat);
                    }, 500);
                }

            }, 500);

        }

    }

};



function Cook(name, salary) {
    Staff.call(this, name, salary);
}

Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;

Cook.prototype.doWork = function () {

    let list = [];
    let liContent = [];
    let customer = arguments[0];
    let index = arguments[1];
    let that = this;

    customer.dishState[index] = 1;

    list.push([customer, index]);

    liContent.push(document.querySelector(".board" + customer.seat).children[0].children[index]);

    for (let i = 0; i < ifeRestaurant.customers.length; i++) {
        if (ifeRestaurant.customers[i] === customer) {
            continue;
        }
        for (let j = 0; j < ifeRestaurant.customers[i].orderDish.length; j++) {
            if (ifeRestaurant.customers[i].dishState[j] === 0 && ifeRestaurant.customers[i].orderDish[j].name === customer.orderDish[index].name) {
                ifeRestaurant.customers[i].dishState[j] = 1;
                list.push([ifeRestaurant.customers[i], j]);
                liContent.push(document.querySelector(".board" + ifeRestaurant.customers[i].seat).children[0].children[j]);
            }
        }
    }

    let content = document.querySelector(".state" + this.id);

    content.innerHTML = "正在做..." + customer.orderDish[index].name;

    //做菜
    let cookPro = new Promise(function (resolve, reject) {
        let tx = customer.orderDish[index].name + " ";
        let cdCook = new CountDown(customer.orderDish[index].cookTime, resolve, liContent, tx);
        cdCook.cd();
    });

    cookPro.then(function onFulfilled(value) {
        content.innerHTML = "空闲";

        for (let i = 0; i < liContent.length; i++) {
            liContent[i].innerHTML = customer.orderDish[index].name + " 已做";
        }

        that.state = true;

        //发布上菜消息
        let status = that.trigger("serve", list);
        if (!status) {
            let t = setInterval(function () {
                status = that.trigger("serve", list);
                if (status) {
                    clearInterval(t);
                }
            }, 1000);
        }
    });

};








