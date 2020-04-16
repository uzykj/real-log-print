$(document).ready(function () {
    $('#but_ip_add').click(function () {
        $('#myModalLabel').empty().text('新增IP白名单');
        let html = `<input type="hidden" id="color" value="1">
                    <input type="hidden" id="power" value="IP"> 
                    <div class="form-group">
                        <label for="input_name" id="input_minip">起始IP</label>
                        <input type="text" class="form-control" id="minip" placeholder="请输入起始IP">
                    </div>
                    <div class="form-group">
                        <label for="input_name" id="input_maxip">结束IP</label>
                        <input type="text" class="form-control" id="maxip" placeholder="请输入结束IP">
                    </div>`;
        $('.modal-body').empty().html(html);
        $('#myModal').modal();
    });

    $('#but_organ_add').click(function () {
        $('#myModalLabel').empty().text('新增机构白名单');
        let html = `<input type="hidden" id="color" value="1">
                    <input type="hidden" id="power" value="ORGAN"> 
                    <div class="form-group">
                        <label for="input_name" id="input_oid">机构ID</label>
                        <input type="text" class="form-control" id="oid" placeholder="请输入机构ID">
                    </div>`;
        $('.modal-body').empty().html(html);
        $('#myModal').modal();
    });

    $('#modal_submit').click(function () {
        let color = $('#color').val();
        let power = $('#power').val();
        let param = {
            color: color
        };
        if (power === 'IP') {
            let minip = $('#minip').val();
            let maxip = $('#maxip').val();
            if (!minip && minip === '') {
                styleUtil.basicErrorShow($("#input_minip"));
                return;
            }
            param.powertype = power;
            param.minip = minip;
            param.maxip = maxip;
            modAdd(param);
        } else if (power === 'ORGAN') {
            let oid = $('#oid').val();
            if (!oid && oid === '') {
                styleUtil.basicErrorShow($("#input_oid"));
                return;
            }
            param.powertype = power;
            param.oid = oid;
            modAdd(param);
        }
    });
});

function modAdd(param) {
    let url = '/manage/add';
    $.ajax({
        url: url,
        type: "post",
        data: param,
        success: function (result) {
            console.log(result);
            alert(result.status ? "添加成功" : "添加失败");
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function upWhite(id) {
    let url = '/white/add';
    $.ajax({
        url: url,
        type: "get",
        data: {id: id},
        success: function (result) {
            console.log(result);
            alert(result.status ? "添加黑名单成功" : "添加黑名单失败");
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function delWhite(id) {
    let url = '/white/del';
    $.ajax({
        url: url,
        type: "get",
        data: {id: id},
        success: function (result) {
            alert(result.status ? "删除黑名单成功" : "删除黑名单失败");
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}
