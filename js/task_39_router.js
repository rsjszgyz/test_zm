function changeURL(result1, result2) {
    let region = result1.join(",");
    let product = result2.join(",");
    let url = encodeURI("task_39.html" + "#region=" + region + "&product=" + product);
    let state = {
        title: null,
        url: url
    };
    window.history.pushState(state, null, url);
}

window.addEventListener("popstate", function () {
    let currentState = history.state;
    if (currentState) {
        let url = decodeURI(currentState.url);
        let regAndPro = url.split("#")[1];
        var result1 = regAndPro.split("&")[0].split("=")[1].split(",");
        var result2 = regAndPro.split("&")[1].split("=")[1].split(",");

        var inputs = document.querySelectorAll("input[type=checkbox]");
        for (let i = 0; i < inputs.length; i++) {
            if (result1.indexOf(inputs[i].value) !== -1 || result2.indexOf(inputs[i].value) !== -1) {
                inputs[i].checked = true;
            } else {
                inputs[i].checked = false;
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
})