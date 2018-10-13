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
            let ulo = document.createElement("ul");
            for (let i = 0; i < order.length; i++) {
                let li = document.createElement("li");
                li.innerHTML = order[i].name + " 还未上";
                ulo.appendChild(li);
            }
            orderContent.innerHTML = "";
            orderContent.appendChild(ulo);

            waiter.classList.add("toCookMove");

            let ulc = document.createElement("ul");
            for (let i = 0; i < order.length; i++) {
                let li = document.createElement("li");
                li.innerHTML = order[i].name + " 未做";
                ulc.appendChild(li);
            }
            stateContent.innerHTML = "";
            stateContent.appendChild(ulc);
        } else {
            waiter.classList.add("toCustomerMove");
            if (order < orderDish.length - 1) {
                setTimeout(function () {
                    waiter.classList.remove("toCustomerMove");
                }, 500);
            }
        }
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
        doWork: function (index) {
            let liContent = stateContent.childNodes[0].childNodes;
            liContent[index].innerHTML = orderDish[index].name + " 已做";
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


//命令对象
var DishCommand = function (receiver) {
    return function (order) {
        receiver.doWork(order);
    }
};