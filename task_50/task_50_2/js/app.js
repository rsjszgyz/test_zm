//发布订阅模式
let Event = (function () {
    let list = {},
        listen,
        trigger,
        remove;

    listen = function (key, obj) {
        if (!list[key]) {
            list[key] = [];
        }
        list[key].push(obj);
    };

    trigger = function () {
        let status = false;
        let key = Array.prototype.shift.call(arguments);
        let objs = list[key];
        if (!objs || objs.length === 0) {
            return false;
        }
        for (let i = 0, obj; obj = objs[i++];) {
            if (obj.state) {
                obj.state = false;
                obj.doWork.apply(obj, arguments);
                status = true;
                break;
            }
        }
        return status;
    };

    remove = function (key, obj) {
        let objs = list[key];
        if (!objs) {
            return false;
        }
        if (!obj) {
            objs && (objs.length = 0);
        } else {
            for (let i = objs.length - 1; i >= 0; i--) {
                let _obj = objs[i];
                if (_obj === obj) {
                    objs.splice(i, 1);
                }
            }
        }
    };

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();

let initEvent = function (obj) {
    for (let i in Event) {
        obj[i] = Event[i];
    }
};


initEvent(Customer.prototype);
initEvent(Staff.prototype);


let ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 3,
    staff: []
});

let cash = document.querySelector(".cash");
cash.innerHTML = "现金数量：" + ifeRestaurant.cash;


let cook1 = new Cook("Tony1", 10000);
cook1.pic = document.querySelector("#cook1");
cook1.picState = document.querySelector(".state1");

let cook2 = new Cook("Tony2", 10000);
cook2.pic = document.querySelector("#cook2");
cook2.picState = document.querySelector(".state2");

let cook3 = new Cook("Tony3", 10000);
cook3.pic = document.querySelector("#cook3");
cook3.picState = document.querySelector(".state3");

let cooks = [];
cooks.push(cook1);
cooks.push(cook2);
cooks.push(cook3);


let waiter1 = new Waiter("Mary1", 6000);
waiter1.pic = document.querySelector("#waiter1");

let waiter2 = new Waiter("Mary2", 6000);
waiter2.pic = document.querySelector("#waiter2");

let waiter3 = new Waiter("Mary3", 6000);
waiter3.pic = document.querySelector("#waiter3");

let waiters = [];
waiters.push(waiter1);
waiters.push(waiter2);
waiters.push(waiter3);



Cook.prototype.listen("serve", waiter1);
//Waiter.prototype.listen("cook", cook1);
Customer.prototype.listen("order", cook1);
Customer.prototype.listen("pay", waiter1);



ifeRestaurant.hire(cook1);
ifeRestaurant.hire(waiter1);

//菜单列表
let dishList = [];
dishList.push(new Dish("地三鲜", 10, 20, 3));
dishList.push(new Dish("宫保鸡丁", 20, 30, 4));
dishList.push(new Dish("水煮肉", 30, 40, 5));
dishList.push(new Dish("重庆鸡公煲", 40, 50, 6));
dishList.push(new Dish("麻辣香锅", 50, 60, 7));
dishList.push(new Dish("烤鱼", 60, 70, 8));

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

let waiting = document.querySelector(".waiting");
let seats = document.querySelector(".order");



//
function loopCustomer(customer, seat) {
    customers.shift();
    let cust = document.querySelector("#customer" + (customer.cId));

    //seats.children[seat - 1].innerHTML = "等待点菜";

    switch (seat) {
        case 1:
            cust.classList.add("customerMoveOne");
            customer.seat = 1;
            break;
        case 2:
            cust.classList.add("customerMoveTwo");
            customer.seat = 2;
            break;
        case 3:
            cust.classList.add("customerMoveThree");
            customer.seat = 3;
            break;

    }

    //点菜
    customer.order();

}


loopCustomer(customers[0], 1);
loopCustomer(customers[0], 2);
loopCustomer(customers[0], 3);



//顾客随机到达
function custRandom(n) {
    setInterval(function () {
        let random = Math.floor(Math.random() * 3 + 1);
        let one = document.querySelectorAll(".customerMoveOne");
        let two = document.querySelectorAll(".customerMoveTwo");
        let three = document.querySelectorAll(".customerMoveThree");
        let m = waiting.children.length - one.length - two.length - three.length + random - 8;
        if (m > 0) {
            random -= m;
        }
        for (let i = 0; i < random; i++) {
            let cust = "customer" + Math.floor(Math.random() * 8 + 1);
            let newCust = new Customer();
            customers.push(newCust);
            let newCustId = "customer" + newCust.cId;
            let cDiv = document.createElement("div");
            cDiv.id = newCustId;
            let cimg = document.createElement("img");
            cimg.src = "img/" + cust + ".png";
            cDiv.appendChild(cimg);
            waiting.appendChild(cDiv);
        }
    }, n * t * 1000);
}

custRandom(6);



let buttons = document.querySelector(".button");
buttons.addEventListener("click", function (ev) {
    var ev = ev || window.event;
    let target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() == "button") {
        let id = target.id;
        let index = 0;
        let cook = document.querySelector(".cook");
        let waiter = document.querySelector(".waiter");
        switch (id) {
            //增加厨师
            case "button1":
                for (let i = 1; i < cook.children.length; i++) {
                    if (window.getComputedStyle(cook.children[i]).visibility == "hidden") {
                        index = i;
                        break;
                    }
                }

                if (index == 0) {
                    alert("最多3个厨师");
                    return;
                }

                cook.children[index].style.visibility = "visible";
                document.querySelector(".state" + (index + 1)).style.visibility = "visible";

                //Waiter.prototype.listen("cook", cooks[index]);
                Customer.prototype.listen("order", cooks[index]);
                break;

            //增加服务员
            case "button2":
                for (let i = 1; i < waiter.children.length; i++) {
                    if (window.getComputedStyle(waiter.children[i]).visibility == "hidden") {
                        index = i;
                        break;
                    }
                }

                if (index == 0) {
                    alert("最多3个服务员");
                    return;
                }

                waiter.children[index].style.visibility = "visible";

                Cook.prototype.listen("serve", waiters[index]);
                //Customer.prototype.listen("order", waiters[index]);
                Customer.prototype.listen("pay", waiters[index]);
                break;

            //减少厨师
            case "button3":
                for (let i = 2; i >= 1; i--) {
                    if (cook.children[i].style.visibility == "visible") {
                        index = i;
                        break;
                    }
                }

                if (index == 0) {
                    alert("最少1个厨师");
                    return;
                }

                cook.children[index].style.visibility = "";
                document.querySelector(".state" + (index + 1)).style.visibility = "";

                Customer.prototype.remove("order", cooks[index]);
                break;

            //减少服务员
            case "button4":
                for (let i = 2; i >= 1; i--) {
                    if (waiter.children[i].style.visibility == "visible") {
                        index = i;
                        break;
                    }
                }

                if (index == 0) {
                    alert("最少1个服务员");
                    return;
                }

                waiter.children[index].style.visibility = "";

                Cook.prototype.remove("serve", waiters[index]);
                //Customer.prototype.remove("order", waiters[index]);
                Customer.prototype.remove("pay", waiters[index]);
                break;

        }

    }
});



