var cId = 0;
function Customer() {
    cId += 1;
    this.cId = cId;
}

Customer.prototype.order = function (dishList) {
    let orderDish = [];
    let random = Math.floor(Math.random() * dishList.length);
    orderDish.push(dishList[random]);
    console.log("顾客" + this.cId + "点了" + dishList[random].name);
    return orderDish;
};

Customer.prototype.callWaiter = function (orderDish) {
    newWaiter.doWork(orderDish);
};

Customer.prototype.eat = function (orderDish) {
    console.log("顾客" + this.cId + "吃了" + orderDish[0].name);
};