let ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 1,
    staff: []
});

let cash = document.querySelector(".cash");
cash.innerHTML = "现金数量：" + ifeRestaurant.cash;

let newCook = Cook.getInstance("Tony", 10000);
ifeRestaurant.hire(newCook);
let newWaiter = Waiter.getInstance("Mary", 6000);
ifeRestaurant.hire(newWaiter);

//菜单列表
let dishList = [];
dishList.push(new Dish("地三鲜", 10, 20, 3));
dishList.push(new Dish("宫保鸡丁", 20, 30, 4));
dishList.push(new Dish("麻辣香锅", 30, 40, 5));

//顾客列表
let customers = [];
let customer1 = new Customer();
let customer2 = new Customer();
let customer3 = new Customer();
customers.push(customer1);
customers.push(customer2);
customers.push(customer3);

//设置时间单位
let t = 1;

//点菜列表
let orderDish = [];

let orderContent = document.querySelector(".order");
let waiter = document.querySelector(".waiter");
let stateContent = document.querySelector(".state");

//顾客数量
let num = 0;

//
function loopCustomer(num) {
    orderDish = [];
    let customer = document.querySelector("#customer" + (num + 1));
    customer.classList.add("customerMove");
    if (waiter.classList.length > 1) {
        waiter.classList.remove("waiterMove", "toCookMove", "toCustomerMove", "waiterBack");
    }
    waiter.classList.add("waiterMove");

    //点菜
    let orderPro = new Promise(function (resolve, reject) {
        let tx = "点菜中...还差";
        let arg = "";
        let cdOrder = new CountDown(customers[num].order, 4, resolve, orderContent, tx, arg);
        cdOrder.cd();
    });

    orderPro.then(function onFulfilled(value) {

        //记录点菜
        orderDish = value;
        let orderCommand = DishCommand(newWaiter);
        orderCommand(value);

        let cookCommand = DishCommand(newCook);
        let liContent = stateContent.childNodes[0].childNodes;
        let eatContent = orderContent.childNodes[0].childNodes;

        //点菜数量
        let index = 0;

        //
        function loopArray(index) {

            //做菜
            let cookPro = new Promise(function (resolve, reject) {
                let tx = value[index].name + " ";
                let arg = index;
                let cdCook = new CountDown(cookCommand, value[index].cookTime + 1, resolve, liContent[index], tx, arg);
                cdCook.cd();
            });

            cookPro.then(function onFulfilled(val) {

                //上菜
                let serveCommand = DishCommand(newWaiter);
                serveCommand(index);

                //吃菜
                let eatPro = new Promise(function (resolve, reject) {
                    let tx = orderDish[index].name + " 正在吃 ";
                    let arg = index;
                    let cdEat = new CountDown(customers[num].eat, 4, resolve, eatContent[index], tx, arg);
                    cdEat.cd();
                });

                eatPro.then(function onFulfilled(value) {

                    //顾客点的菜都已吃完
                    if (value == orderDish.length) {
                        let spend = 0;
                        for (let i = 0; i < orderDish.length; i++) {
                            spend += orderDish[i].price - orderDish[i].cost;
                        }
                        ifeRestaurant.cash += spend;
                        cash.innerHTML = "现金数量：" + ifeRestaurant.cash;

                        setTimeout(function () {

                            //服务下一个顾客
                            num++;

                            if (num < customers.length) {
                                orderContent.innerHTML = "空闲";
                                stateContent.innerHTML = "空闲";
                                waiter.classList.add("waiterBack");
                                customer.style.display = "none";
                                setTimeout(function () {
                                    loopCustomer(num);
                                }, 1000);
                            }

                            if (num == customers.length) {
                                orderContent.innerHTML = "空闲";
                                stateContent.innerHTML = "空闲";
                                waiter.classList.add("waiterBack");
                                customer.style.display = "none";
                            }
                        }, 500);
                    }
                });

                //做下一个菜
                index++;
                if (index < orderDish.length) {
                    loopArray(index);
                }
            });
        }

        loopArray(index);

    });

}

loopCustomer(num);


//显示剩余时间
function CountDown(fn, time, resolve, content, tx, arg) {
    this.fn = fn;
    this.time = time;
    this.resolve = resolve;
    this.content = content;
    this.tx = tx;
    this.arg = arg;
    CountDown.prototype.cd = function () {
        let i = setInterval(function () {
            time--;
            content.innerHTML = "";
            content.innerHTML = tx + time;
            if (time <= 0) {
                clearInterval(i);
                let result = fn(arg);
                resolve(result);
            }
        }, 1000 * t);
    };
}
