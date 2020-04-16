$(document).ready(function () {
    var myInterval = window.setInterval(accessFun, 3000);

    function stopInterval() {
        window.clearTimeout(myInterval);
        //myInterval.unref();
    }

    //超时时间
    window.setTimeout(stopInterval, 5000000000);
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
                    html +=
                        `<tr>
                            <td>
                                ${result[i].account.nickname !== '' ? `${result[i].account.nickname}(${result[i].account.uid})` : result[i].account.uid} 
                            </td>
                            <td>${result[i].account.organName !== '' ? `${result[i].account.organName}(${result[i].account.oid})` : result[i].account.oid} </td>
                            <td>${result[i].account.ips} </td>
                            <td>${result[i].type === 1 ? '课程' : '资源'}</td>`
                    if (result[i].context.status) {
                        html += `<td class="td_green" >${result[i].context.message}</td>`;
                        html += `<td>
                                    <span class="span_info">${result[i].context.astrict.used}</span>
                                </td>`;
                    } else {
                        html += `<td class="td_red">${result[i].context.message}</td>`;
                        html += `<td>
                                    <span class="td_red">${result[i].context.astrict.power}</span>                               
                                </td>`;
                    }
                    html += `</tr>`;
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


