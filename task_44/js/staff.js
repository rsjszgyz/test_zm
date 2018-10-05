let id = 0;
function Staff(name, salary) {
    id += 1;
    this.id = id;
    this.name = name || "";
    this.salary = salary || 0;
}

Staff.prototype.doWork = function () {
    console.log("干活了");
};


var Waiter = (function () {
    var instance = null;
    function createWaiter(name, salary) {
        Staff.call(this, name, salary);
    }
    createWaiter.prototype = Object.create(Staff.prototype);
    createWaiter.prototype.constructor = createWaiter;
    createWaiter.prototype.doWork = function (order) {
        if (order instanceof Array) {
            console.log("服务员记录客人点菜");
        } else {
            console.log("服务员上菜：" + order);
        }
    };
    createWaiter.prototype.callCook = function (orderDish) {
        newCook.doWork(orderDish);
    };

    return {
        getInstance: function (name, salary) {
            if (!instance) {
                instance = new createWaiter(name, salary);
            }
            return instance;
        }
    };
})();


var Cook = (function () {
    var instance = null;
    function createCook(name, salary) {
        Staff.call(this, name, salary);
    }
    createCook.prototype = {
        constructor: createCook,
        doWork: function (orderDish) {
            console.log("厨师做菜：" + orderDish[0].name);
        },
        callWaiter: function (orderDish) {
            newWaiter.doWork(orderDish[0].name);
        }
    };

    return {
        getInstance: function (name, salary) {
            if (!instance) {
                instance = new createCook(name, salary);
            }
            return instance;
        }
    };
})();