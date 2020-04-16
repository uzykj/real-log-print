/**
 *@author xbh
 *@dateTime 2019-04-01 11:11
 *@description
 */
$(document).ready(function () {
    $('#but_add').click(function () {
        $('#myModalLabel').empty().text('添加管理员');
        let html = `<input type="hidden" id="admin" value="1">
                    <div class="form-group">
                        <label for="input_name" id="input_name">UID</label>
                        <input type="text" class="form-control" id="uid" placeholder="请输入uid">
                    </div>
                    <div class="form-group">
                        <label for="input_name" id="input_name">OID</label>
                        <input type="text" class="form-control" id="oid" placeholder="请输入oid">
                    </div>
                    <div class="form-group">
                        <label for="input_name" id="input_name">IP</label>
                        <input type="text" class="form-control" id="ips" placeholder="请输入ip">
                    </div>
                    <div class="form-group">
                        <label for="input_name" id="input_name">角色</label>
                        <input type="text" class="form-control" id="role" placeholder="请输入角色编码">
                    </div>`;
        $('.modal-body').empty().html(html);
        $('#myModal').modal();
    });

    $('#modal_submit').click(function () {
        let uid = $('#uid').val();
        let oid = $('#oid').val();
        let ips = $('#ips').val();
        let role = $('#role').val();
        let admin = $('#admin').val();
        modAdd(uid, oid, ips, role, admin);
    });
});

function modAdd(uid, oid, ips, role, admin) {
    let url = '/manage/add';
    $.ajax({
        url: url,
        type: "post",
        data: {
            uid: uid,
            oid: oid,
            ips: ips,
            role: role,
            admin: admin
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

function upAdmin(id) {
    let url = '/admin/add';
    $.ajax({
        url: url,
        type: "get",
        data: {id: id},
        success: function (result) {
            console.log(result);
            alert(result.status ? "添加管理员成功" : "添加管理员失败");
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function delAdmin(id) {
    let url = '/admin/del';
    $.ajax({
        url: url,
        type: "get",
        data: {id: id},
        success: function (result) {
            alert(result.status ? "删除管理员成功" : "删除管理员失败");
            window.location.reload();
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}
