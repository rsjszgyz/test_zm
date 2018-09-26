function drawLine(data) {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        if (data.length == 0) {
            ctx.clearRect(0, 0, 700, 300);
            return;
        }
        ctx.clearRect(0, 0, 700, 300);
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(10, 250);
        ctx.lineTo(610, 250);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.lineWidth = 2;
        var max = getMax(data);
        var point = [];
        ctx.translate(10, 250);
        for (let i = 0; i < data.length; i++) {
            ctx.strokeStyle = colors[i];
            ctx.fillStyle = colors[i];
            for (let j = 0; j < 12; j++) {
                ctx.beginPath();
                let x = 45 * (j + 1);
                let y = -(data[i].sale[j] * 230 / max).toFixed(2);
                point.push(x);
                point.push(y);
                ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
                ctx.fill();
                if (j !== 0) {
                    console.log("22" + point[2]);
                    console.log("33" + point[3]);
                    ctx.beginPath();
                    ctx.moveTo(point[0], point[1]);
                    ctx.lineTo(point[2], point[3]);
                    ctx.stroke();
                    point.shift();
                    point.shift();
                    if (j == 11) {
                        point = [];
                    }
                }
            }
        }
        ctx.restore();
    }
}