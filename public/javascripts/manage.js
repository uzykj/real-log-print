/**
 *@author xbh
 *@dateTime 2019-04-01 11:11
 *@description
 */
$(document).ready(function () {
    $('#but_add').click(function () {
        $('#myModalLabel').empty().text('添加账户');
        let html = `<input type="hidden" class="input_type" value="add">
                    <div class="form-group">
                        <label for="input_name" id="input_name">UID</label>
                        <input type="text" class="form-control" id="uid" placeholder="请输入uid">
                    </div>
                    <div class="form-group">
                        <label for="input_name" id="input_name">OID</label>
                        <input type="text" class="form-control" id="oid" placeholder="请输入oid">
                    </div>
                    <div class="form-group">
                        <label for="input_name" id="input_minip">起始IP</label>
                        <input type="text" class="form-control" id="minip" placeholder="请输入起始ip">
                    </div>
                    <div class="form-group">
                        <label for="input_name" id="input_maxip">结束IP</label>
                        <input type="text" class="form-control" id="maxip" placeholder="请输入结束ip">
                    </div>
                    <div class="form-group">
                        <label for="input_name" id="input_name">角色</label>
                        <input type="text" class="form-control" id="role" placeholder="请输入角色编码">
                    </div>                  
                    <div class="form-group">
                        <label for="input_name" id="input_name">分钟次数</label>
                        <input type="text" class="form-control" id="mcount" placeholder="请输入分钟次数">
                    </div>
                    <div class="form-group">
                        <label for="input_address" id="input_address">小时次数</label>
                        <input type="text" class="form-control" id="hcount" placeholder="请输入小时次数">
                    </div>
                    <div class="form-group">
                        <label for="input_description" id="input_description">天次数</label>
                        <input type="text" class="form-control" id="dcount" placeholder="请输入天次数">
                    </div>`;
        $('.modal-body').empty().html(html);
        $('#myModal').modal();
    });

    $('#modal_submit').click(function () {
        let type = $('.input_type').val();
        let uid = $('#uid').val();
        let oid = $('#oid').val();
        let minip = $('#minip').val();
        let maxip = $('#maxip').val();
        let role = $('#role').val();
        let mcount = $('#mcount').val();
        let hcount = $('#hcount').val();
        let dcount = $('#dcount').val();

        if (type === 'add') {
            modAdd(uid, oid, minip, maxip, role, mcount, hcount, dcount);
        } else if (type === 'update') {
            let id = $('#id').val();
            update(id, uid, oid, minip, maxip, role, mcount, hcount, dcount);
        }
    });
});

function modAdd(uid, oid, minip, maxip, role, mcount, hcount, dcount) {
    let url = '/manage/add';
    $.ajax({
        url: url,
        type: "post",
        data: {
            uid: uid,
            oid: oid,
            minip: maxip,
            maxip: maxip,
            role: role,
            mcount: mcount,
            hcount: hcount,
            dcount: dcount
        },
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

function manageUp(account) {
    account = JSON.parse(account);
    $('#myModalLabel').empty().text('更新账户');
    let html = `<input type="hidden" class="input_type" value="update">
                <input type="hidden" id="id" value="${account.id}">             
                <div class="form-group">
                    <label for="input_name" id="input_uid">UID</label>
                    <input type="text" class="form-control" id="uid" value="${account.uid}" placeholder="请输入uid">
                </div>
                <div class="form-group">
                    <label for="input_name" id="input_oid">OID</label>
                    <input type="text" class="form-control" id="oid" value="${account.oid}" placeholder="请输入oid">
                </div>
                <div class="form-group">
                    <label for="input_name" id="input_minip">起始IP</label>
                    <input type="text" class="form-control" id="minip" value="${account.minip}" placeholder="请输入起始ip">
                </div>
                <div class="form-group">
                    <label for="input_name" id="input_maxip">结束IP</label>
                    <input type="text" class="form-control" id="maxip" value="${account.maxip}" placeholder="请输入结束ip">
                </div>
                <div class="form-group">
                    <label for="input_name" id="input_role">角色</label>
                    <input type="text" class="form-control" id="role" value="${account.role}" placeholder="请输入角色编码">
                </div>                   
                <div class="form-group">
                    <label for="input_name" id="input_mcount">分钟次数</label>
                    <input type="text" class="form-control" id="mcount" value="${account.mcount}" placeholder="请输入分钟次数">
                </div>
                <div class="form-group">
                    <label for="input_address" id="input_hcount">小时次数</label>
                    <input type="text" class="form-control" id="hcount" value="${account.hcount}" placeholder="请输入小时次数">
                </div>
                <div class="form-group">
                    <label for="input_description" id="input_dcount">天次数</label>
                    <input type="text" class="form-control" id="dcount" value="${account.dcount}" placeholder="请输入天次数">
                </div>`;
    $('.modal-body').empty().html(html);
    $('#myModal').modal();
}

function update(id, uid, oid, minip, maxip, role, mcount, hcount, dcount) {
    let url = '/manage/update';
    $.ajax({
        url: url,
        type: "post",
        data: {
            id: id,
            uid: uid,
            oid: oid,
            minip: minip,
            maxip: maxip,
            role: role,
            mcount: mcount,
            hcount: hcount,
            dcount: dcount
        },
        success: function (result) {
            console.log(result);
            alert(result.status ? "更新成功" : "更新失败");
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function manageDel(id) {
    let url = '/manage/del';
    $.ajax({
        url: url,
        type: "get",
        data: {id: id},
        success: function (result) {
            alert(result.status ? "删除成功" : "删除失败");
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}
