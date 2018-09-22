function getDataCheckbox(result1, result2) {
    var data = [];
    var r1 = 0;
    var r2 = 0;
    for (var i in sourceData) {
        r1 = result1.indexOf(sourceData[i].region);
        r2 = result2.indexOf(sourceData[i].product);
        if (r1 !== -1 && r2 !== -1) {
            data.push(sourceData[i]);
        }
    }
    return data;
}

function showTable(data, regionNum, productNum) {
    var head = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    var html = "";
    if (data.length == 0) {
        tableWrapper.innerHTML = html;
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
            tdHtml += "<td>" + data[i].product + "</td>";
        } else {
            if (i == 0 || data[i].product !== pro) {
                tdHtml += "<td rowspan='" + regionNum + "'>" + data[i].product + "</td><td>" + data[i].region + "</td>";
                pro = data[i].product;
            } else {
                tdHtml += "<td>" + data[i].region + "</td>";
            }
        }

        for (var j = 0; j < 12; j++) {
            tdHtml += "<td>" + data[i].sale[j] + "</td>";
        }
        trHtml += "<tr>" + tdHtml + "</tr>";
        tdHtml = "";
    }
    html += "<table border='1'>" + thHtml + trHtml + "</table>";
    tableWrapper.innerHTML = html;
}