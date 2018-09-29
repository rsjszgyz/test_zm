table.addEventListener("mouseover", function (ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    var spans = document.querySelectorAll("span");
    var state = true;
    for (let i = 0; i < spans.length; i++) {
        if (spans[i].className == "inactive") {
            state = false;
        }
    }
    if (state) {
        if (target.nodeName.toLowerCase() == "td" && target.childNodes[0].nodeName.toLowerCase() == "span") {
            var result1 = [];
            var result2 = [];
            result1.push(target.dataset.region);
            result2.push(target.dataset.product);
            var data = getDataCheckbox(result1, result2);
            drawBar(data);
            drawLine(data);

            var acBtn = document.querySelectorAll("button.active");
            if (acBtn.length > 0) {
                acBtn[0].classList.remove("active");
            }
            target.childNodes[1].classList.add("active");
        }
    }
});

table.addEventListener("click", function (ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.id == "edit") {
        var child = target.parentNode.childNodes;
        child[0].classList.add("inactive");
        child[1].classList.remove("active");
        child[2].classList.remove("inactive");
        child[2].focus();
        child[3].classList.add("active");
        child[4].classList.add("active");
    }
    if (target.id == "cancel") {
        var child = target.parentNode.childNodes;
        var oldValue = child[0].innerHTML;
        child[2].value = oldValue;
        child[0].classList.remove("inactive");
        child[2].classList.add("inactive");
        child[3].classList.remove("active");
        child[4].classList.remove("active");
    }
    if (target.id == "save") {
        var child = target.parentNode.childNodes;
        var newValue = child[2].value;
        if (Number(newValue) || newValue === "0") {
            child[0].classList.remove("inactive");
            child[2].classList.add("inactive");
            child[3].classList.remove("active");
            child[4].classList.remove("active");
            child[0].innerHTML = newValue;

            localStorage.clear();
            var newData = [];
            newData = objDeepCopy(sourceData);
            var index = child[2].dataset.index;
            var region = target.parentNode.dataset.region;
            var product = target.parentNode.dataset.product;
            for (let i = 0; i < newData.length; i++) {
                if (newData[i].region === region && newData[i].product === product) {
                    newData[i].sale[index] = newValue;
                }
            }
            localStorage.setItem("newData", JSON.stringify(newData));
        } else {
            alert("请输入正确的数字！");
        }
    }
});

function addInputPlur(ev) {
    var inputs = document.querySelectorAll("input[type=text]");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("blur", function (ev) {
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            var child = target.parentNode.childNodes;
            setTimeout(function () {
                if (child[3].className == "active" && child[4].className == "active") {
                    var oldValue = child[0].innerHTML;
                    child[2].value = oldValue;
                    child[0].classList.remove("inactive");
                    child[2].classList.add("inactive");
                    child[3].classList.remove("active");
                    child[4].classList.remove("active");
                }
            }, 500);
        });
    }
}

table.addEventListener("keydown", function (ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() == "input") {
        var keyCode = ev.keyCode;
        if (keyCode == 13 || keyCode == 27) {
            ev.preventDefault();
            var child = target.parentNode.childNodes;
            if (keyCode == 13) {
                var newValue = child[2].value;
                if (Number(newValue) || newValue === "0") {
                    child[0].classList.remove("inactive");
                    child[2].classList.add("inactive");
                    child[3].classList.remove("active");
                    child[4].classList.remove("active");
                    child[0].innerHTML = newValue;

                    localStorage.clear();
                    var newData = [];
                    newData = objDeepCopy(sourceData);
                    var index = child[2].dataset.index;
                    var region = target.parentNode.dataset.region;
                    var product = target.parentNode.dataset.product;
                    for (let i = 0; i < newData.length; i++) {
                        if (newData[i].region === region && newData[i].product === product) {
                            newData[i].sale[index] = newValue;
                        }
                    }
                    localStorage.setItem("newData", JSON.stringify(newData));
                } else {
                    alert("请输入正确的数字！");
                }
            } else {
                var oldValue = child[0].innerHTML;
                child[2].value = oldValue;
                child[0].classList.remove("inactive");
                child[2].classList.add("inactive");
                child[3].classList.remove("active");
                child[4].classList.remove("active");
            }
        }
    }
});


table.addEventListener("mouseleave", function () {
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


function getDataCheckbox(result1, result2) {
    var data = [];
    var r1 = 0;
    var r2 = 0;

    if (localStorage.getItem("newData")) {
        var newData = JSON.parse(localStorage.getItem("newData"));
        for (var i in newData) {
            r1 = result1.indexOf(newData[i].region);
            r2 = result2.indexOf(newData[i].product);
            if (r1 !== -1 && r2 !== -1) {
                data.push(newData[i]);
            }
        }
    } else {
        for (var i in sourceData) {
            r1 = result1.indexOf(sourceData[i].region);
            r2 = result2.indexOf(sourceData[i].product);
            if (r1 !== -1 && r2 !== -1) {
                data.push(sourceData[i]);
            }
        }
    }

    return data;
}

function showTable(data, regionNum, productNum) {
    var head = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    var html = "";
    if (data.length == 0) {
        table.innerHTML = html;
        return;
    }
    var thHtml = "";
    var trHtml = "";
    var tdHtml = "";
    if (regionNum == 1 && productNum > regionNum) {
        thHtml += "<th>地区</th><th>商品</th>";
    } else {
        thHtml += "<th>商品</th><th>地区</th>";
    }
    for (var i in head) {
        thHtml += "<th>" + head[i] + "</th>";
    }

    var pro = data[0].product;
    for (var i in data) {
        if (regionNum == 1 && productNum > regionNum) {
            if (i == 0) {
                tdHtml += "<td rowspan='" + data.length + "'>" + data[i].region + "</td>";
            }
            tdHtml += "<td data-region='" + data[i].region + "' data-product='" + data[i].product + "'>" + data[i].product + "</td>";
        } else {
            if (i == 0 || data[i].product !== pro) {
                tdHtml += "<td rowspan='" + regionNum + "'>" + data[i].product + "</td><td>" + data[i].region + "</td>";
                pro = data[i].product;
            } else {
                tdHtml += "<td data-region='" + data[i].region + "' data-product='" + data[i].product + "'>" + data[i].region + "</td>";
            }
        }

        for (var j = 0; j < 12; j++) {
            tdHtml += "<td data-region='" + data[i].region + "' data-product='" + data[i].product + "'>"
                + "<span>" + data[i].sale[j] + "</span>"
                + "<button id='edit'>编辑</button>"
                + "<input type='text' value='" + data[i].sale[j] + "' data-index='" + j + "' class='inactive' />"
                + "<button id='cancel'>取消</button><button id='save'>保存</button></td>";
            // tdHtml += "<td data-region='" + data[i].region + "' data-product='" + data[i].product + "'>" + data[i].sale[j] + "</td>";
        }

        // trHtml += "<tr data-region='" + data[i].region + "' data-product='" + data[i].product + "'>" + tdHtml + "</tr>";
        trHtml += "<tr>" + tdHtml + "</tr>";
        tdHtml = "";
    }
    html += thHtml + trHtml;
    table.innerHTML = html;
}


function objDeepCopy(source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === "object" ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}