var cId = 0;
function Customer() {
    cId += 1;
    this.cId = cId;
}

Customer.prototype.order = function () {
    let dishes = dishList.slice(0);
    let orderDish = [];
    //随机点多个菜
    let random = Math.floor(Math.random() * dishes.length + 1);
    for (let i = 0; i < random; i++) {
        let index = Math.floor(Math.random() * dishes.length);
        orderDish.push(dishes[index]);
        dishes.splice(index, 1);
    }

    return orderDish;
};

Customer.prototype.eat = function (index) {
    let eatContent = orderContent.childNodes[0].childNodes;
    eatContent[index].innerHTML = orderDish[index].name + " 已吃完";
    if (index == orderDish.length - 1) {
        orderContent.innerHTML = "付款";
        return orderDish.length;
    }
};