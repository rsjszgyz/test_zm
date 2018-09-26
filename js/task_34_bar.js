function drawBar(data) {
    var bar = document.querySelector("#bar");
    var html = "";
    if (data.length == 0) {
        bar.innerHTML = html;
        return;
    }
    html += '<polyline points="10,0 10,250 610,250" style="fill:white;stroke: black;stroke-width: 2" />';
    var max = getMax(data);
    console.log("max" + max);
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < 12; j++) {
            let bHtml = "";
            let height = 0;
            let width = 0;
            let y = 0;
            height = (data[i].sale[j] * 230 / max).toFixed(2);
            width = 35 / data.length;
            y = 250 - height;
            bHtml += '<rect x="' + (20 + width * i + 45 * j) + '" y="' + y + '" width="' + width + '" height="' + height + '" style="fill:' + colors[i] + '" />';
            html += bHtml;
        }
    }
    bar.innerHTML = html;
}

function getMax(data) {
    let max = data[0].sale[0];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < 12; j++) {
            max = max < data[i].sale[j + 1] ? data[i].sale[j + 1] : max;
        }
    }
    return max;
}