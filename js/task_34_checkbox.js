var table = document.querySelector("#table");
var regionRadio = document.querySelector("#region-radio-wrapper");
var productRadio = document.querySelector("#product-radio-wrapper");

table.addEventListener("mouseover", function (ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    console.log("LLL" + target.nodeName.toLowerCase());
    if (target.nodeName.toLowerCase() == "td") {
        var result1 = [];
        var result2 = [];
        result1.push(target.dataset.region);
        console.log("hh" + result1[0]);
        result2.push(target.dataset.product);
        var data = getDataCheckbox(result1, result2);
        drawBar(data);
        drawLine(data);
    }
});

table.addEventListener("mouseleave", function (ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    var result1 = [];
    var result2 = [];
    var region = document.getElementsByName("region");
    var product = document.getElementsByName("product");
    for (var i = 1; i < region.length; i++) {
        if (region[i].checked == true) {
            result1.push(region[i].value);
        }
    }
    for (var i = 1; i < product.length; i++) {
        if (product[i].checked == true) {
            result2.push(product[i].value);
        }
    }
    var data = getDataCheckbox(result1, result2);
    drawBar(data);
    drawLine(data);
});

regionRadio.addEventListener("click", function (ev) {
    var result1 = [];
    var res = checkboxClick(ev);
    console.log("dd" + res);
    if (res) {
        result1 = res;
    }
    var result2 = [];
    var product = document.getElementsByName("product");
    for (var i = 1; i < product.length; i++) {
        if (product[i].checked == true) {
            result2.push(product[i].value);
        }
    }
    var data = getDataCheckbox(result1, result2);
    showTable(data, result1.length, result2.length);
    drawBar(data);
    drawLine(data);
});

productRadio.addEventListener("click", function (ev) {
    var result2 = [];
    var res = checkboxClick(ev);
    if (res) {
        result2 = res;
    }
    var result1 = [];
    var region = document.getElementsByName("region");
    for (var i = 1; i < region.length; i++) {
        if (region[i].checked == true) {
            result1.push(region[i].value);
        }
    }
    var data = getDataCheckbox(result1, result2);
    showTable(data, result1.length, result2.length);
    drawBar(data);
    drawLine(data);
});

function checkboxClick(ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() == "input") {
        var result = [];
        var type = target.getAttribute("checkbox-type");
        console.log("aa" + type);
        var state = target.checked;
        var name = target.name;
        var all = document.getElementsByName(name);
        if (type == "all") {
            // var state = target.getAttribute("checked");
            console.log("bb" + state);
            if (state) {
                for (var i = 0; i < all.length; i++) {
                    all[i].checked = true;
                }
            } else {
                for (var i = 0; i < all.length; i++) {
                    all[i].checked = false;
                }
            }
        } else {
            var st = false;
            for (var i = 0; i < all.length; i++) {
                if (all[i].checked == true) {
                    st = true;
                }
            }
            if (st) {
                var s = [];
                for (var i = 0; i < all.length; i++) {
                    if (all[i].checked == false) {
                        s.push(i);
                    }
                }
                if (s.length == 1 && s[0] == 0) {
                    all[0].checked = true;
                } else {
                    all[0].checked = false;
                }
            } else {
                target.checked = true;
            }
        }
        for (var i = 1; i < all.length; i++) {
            if (all[i].checked == true) {
                result.push(all[i].value);
            }
        }
        return result;
    }
}