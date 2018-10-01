let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];

var colors = ["#F49AC1", "#FED5A3", "#D19D8D", "#C3E8F2", "#4F96E8", "#91FF8B", "#65180D", "#E8C573", "#9C5CA1"];

//hash方式
// window.onload = function () {
//     if (!window.location.hash) {
//         window.location.hash = encodeURI("#region=华东&product=手机");
//     }
//     var url = decodeURI(window.location.hash);
//     var regAndPro = url.slice(1);
//     var result1 = regAndPro.split("&")[0].split("=")[1].split(",");
//     var result2 = regAndPro.split("&")[1].split("=")[1].split(",");
//     var inputs = document.querySelectorAll("input[type=checkbox]");
//     for (let i = 0; i < inputs.length; i++) {
//         if (result1.indexOf(inputs[i].value) !== -1 || result2.indexOf(inputs[i].value) !== -1) {
//             inputs[i].checked = true;
//         }
//     }
//     var regInput = document.querySelectorAll("input[name=region]");
//     var proInput = document.querySelectorAll("input[name=product]");
//     regInput[0].checked = true;
//     proInput[0].checked = true;
//     for (let i = 1; i < regInput.length; i++) {
//         if (regInput[i].checked == false) {
//             regInput[0].checked = false;
//             break;
//         }
//     }
//     for (let i = 1; i < proInput.length; i++) {
//         if (proInput[i].checked == false) {
//             proInput[0].checked = false;
//             break;
//         }
//     }

//     var data = getDataCheckbox(result1, result2);
//     showTable(data, result1.length, result2.length);
//     drawBar(data);
//     drawLine(data);
//     addInputPlur();
// }


//pushState方式
window.onload = function () {
    if (!history.state) {
        var state = {
            title: null,
            url: ""
        };
        if (window.location.href == "file:///E:/MyProject/task_39.html") {
            state.url = encodeURI("task_39.html#region=华东&product=手机");
            history.replaceState(state, null, state.url);
        } else {
            state.url = window.location.href;
            history.replaceState(state, null, window.location.href);
        }
    }

    var currentState = history.state;
    var url = decodeURI(currentState.url);
    var regAndPro = url.split("#")[1];
    var result1 = regAndPro.split("&")[0].split("=")[1].split(",");
    var result2 = regAndPro.split("&")[1].split("=")[1].split(",");

    var inputs = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < inputs.length; i++) {
        if (result1.indexOf(inputs[i].value) !== -1 || result2.indexOf(inputs[i].value) !== -1) {
            inputs[i].checked = true;
        }
    }
    var regInput = document.querySelectorAll("input[name=region]");
    var proInput = document.querySelectorAll("input[name=product]");
    regInput[0].checked = true;
    proInput[0].checked = true;
    for (let i = 1; i < regInput.length; i++) {
        if (regInput[i].checked == false) {
            regInput[0].checked = false;
            break;
        }
    }
    for (let i = 1; i < proInput.length; i++) {
        if (proInput[i].checked == false) {
            proInput[0].checked = false;
            break;
        }
    }

    var data = getDataCheckbox(result1, result2);
    showTable(data, result1.length, result2.length);
    drawBar(data);
    drawLine(data);
    addInputPlur();
}