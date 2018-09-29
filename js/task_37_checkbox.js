var table = document.querySelector("#table");
var regionRadio = document.querySelector("#region-radio-wrapper");
var productRadio = document.querySelector("#product-radio-wrapper");


regionRadio.addEventListener("click", function (ev) {
    var result1 = [];
    var res = checkboxClick(ev);
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

    addInputPlur(ev);
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

    addInputPlur(ev);
});

function checkboxClick(ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() == "input") {
        var result = [];
        var type = target.getAttribute("checkbox-type");
        var state = target.checked;
        var name = target.name;
        var all = document.getElementsByName(name);
        if (type == "all") {
            // var state = target.getAttribute("checked");
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