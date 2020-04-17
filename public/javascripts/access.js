$(document).ready(function () {
    var myInterval = window.setInterval(accessFun, 2000);

    function stopInterval() {
        window.clearTimeout(myInterval);
        //myInterval.unref();
    }

    //超时时间
    window.setTimeout(stopInterval, 24 * 60 * 60 * 1000);
});


function accessFun() {
    let url = '/access';
    $.ajax({
        url: url,
        type: "get",
        async: true,
        success: function (result) {
            result = result.data;
            if (result.length > 0) {
                let html = "";
                for (var i = 0; i < result.length; i++) {
                    var item = result[i];
                    html +=
                        `<tr>
                            <td style="width: 5%; height: 100px">${item.type}</td>
                            <td style="width: 15%; height: 100px">${item.time}</td>
                            <td style="width: 80%; height: 100px">${JSON.stringify(item.logData)}</td>
                        </tr>`;
                }
                $('#access_tbody').empty().html(html);
            }
        },
        error: function (xhr, state, errorThrown) {
            console.log("刷新失败！");
            requesFail(xhr);
        }
    });
}


