function Customer() {

}

Customer.prototype.order = function (dish) {
    console.log("点了" + dish);
}

Customer.prototype.eat = function (dish) {
    console.log("吃了" + dish);
}