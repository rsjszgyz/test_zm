function Restaurant(config) {
    this.cash = config.cash;
    this.seats = config.seats;
    this.staff = config.staff;
    this.customers = [];
}

Restaurant.prototype.hire = function (staff) {
    if (staff) {
        this.staff.push(staff);
    }
};

Restaurant.prototype.fire = function (staffDel) {
    const index = this.staff.indexOf(staffDel);
    if (index != -1) {
        this.staff.splice(index, 1);
        console.log("删除成功");
    } else {
        console.log("该员工不存在");
    }
}



//显示剩余时间
function CountDown(time, resolve, content, tx) {
    this.time = time;
    this.resolve = resolve;
    this.content = content;
    this.tx = tx;
}

CountDown.prototype.cd = function () {
    let that = this;
    let i = setInterval(function () {

        if (that.content instanceof Array) {
            for (let i = 0; i < that.content.length; i++) {
                that.content[i].innerHTML = that.tx + that.time;
            }
        } else {
            that.content.innerHTML = that.tx + that.time;
        }

        that.time--;

        if (that.time < 0) {
            clearInterval(i);
            let result = true;

            that.resolve(result);
        }
    }, 1000 * t);
};


