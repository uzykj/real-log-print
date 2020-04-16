$(document).ready(function () {
    $('#modal_submit').click(function () {
        let type = $('.input_type').val();
        let uid = $('#uid').val();
        if (type === 'login') {
            let password = $('#password').val();
            if (!uid || uid === '') {
                styleUtil.basicErrorShow($("#input_uid"));
            } else if (!password || password === '') {
                styleUtil.basicErrorShow($("#input_pwd"));
            } else {
                loginmod(uid, password);
            }
        } else if (type === 'pwdset') {
            let oldpwd = $('#oldpwd').val();
            let newpwd = $('#newpwd').val();
            let pwdtwo = $('#pwdtwo').val();
            if (!oldpwd || oldpwd === '') {
                styleUtil.basicErrorShow($("#input_oldpwd"));
            } else if (!newpwd || newpwd === '') {
                styleUtil.basicErrorShow($("#input_newpwd"));
            } else if (!newpwd.length >= 5) {
                styleUtil.basicErrorShow($(".input_text").text('请输入6位数以上的密码'));
            } else if (!pwdtwo || pwdtwo === '') {
                styleUtil.basicErrorShow($("#input_pwdtwo"));
            } else if (newpwd !== pwdtwo) {
                styleUtil.basicErrorShow($(".input_text").text('两次密码输入不一致！'));
            } else {
                pwdmod(uid, oldpwd, newpwd);
            }
        }
    });
});

function login(uid) {
    console.log(uid);
    if (uid !== undefined && uid !== null && uid !== '') {
        alert('已登陆');
        return;
    }
    $('#myModalLabel').empty().text('登陆管理员');
    let html = `<input type="hidden" class="input_type" value="login">
                <div class="form-group">
                    <label for="input_uid" id="input_uid">管理员账户</label>
                    <input type="text" class="form-control" id="uid" placeholder="请输入管理员账户">
                </div>
                <div class="form-group">
                    <label for="input_pwd" id="input_pwd">管理员密码</label>
                    <input type="password" class="form-control" id="password" placeholder="请输入密码">
                </div>`;
    $('.modal-body').empty().html(html);
    $('#myModal').modal();
}

function loginmod(uid, password) {
    let url = '/admin/login';
    $.ajax({
        url: url,
        type: "post",
        data: {uid: uid, password: password},
        success: function (result) {
            alert(result.status ? "登陆成功" : result.message);
            window.location.href = '/';
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function pwdmod(uid, oldpwd, newpwd) {
    let url = '/admin/pwd';
    $.ajax({
        url: url,
        type: "post",
        data: {uid: uid, oldpwd: oldpwd, newpwd: newpwd},
        success: function (result) {
            alert(result.status ? '修改成功' : result.message);
            window.location.href = '/';
        },
        error: function (xhr, state, errorThrown) {
            alert("更新失败！");
            requesFail(xhr);
        }
    });
}

function pwdSet(uid) {
    console.log(uid);
    if (uid === undefined || uid === null || uid === '') {
        alert('未登陆');
        login();
        return;
    }
    $('#myModalLabel').empty().text('密码修改');
    let html = `<input type="hidden" class="input_type" value="pwdset">
                <div class="form-group">
                    <label for="input_uid" id="input_uid">当前账户</label>
                    <input type="text" class="form-control" id="uid" value="${uid}" disabled="disabled">
                </div>
                <div class="form-group">
                    <label for="input_oldpwd" id="input_oldpwd">旧密码</label>
                    <input type="password" class="form-control" id="oldpwd" placeholder="请输入旧密码">
                </div>
                <div class="form-group">
                    <label for="input_newpwd" id="input_newpwd">新密码</label>
                    <input type="password" class="form-control" id="newpwd" placeholder="请输入新密码">
                </div>
                <div class="form-group">
                    <label for="input_pwdtwo" id="input_pwdtwo">验证密码</label>
                    <input type="password" class="form-control" id="pwdtwo" placeholder="请再次输入新密码">
                </div>
                <span class="input_text"></span>`;
    $('.modal-body').empty().html(html);
    $('#myModal').modal();
}

//样式统一工具
var styleUtil = {
    //显示表单验证错误提示
    errorShow:
        function (obj, text) {
            if (obj !== undefined) {
                obj.text(text).attr("title", text);
                if (obj.css("opacity") !== "1") {
                    obj.animate({
                        left: "0",
                        opacity: 1
                    }, 200);
                } else {
                    obj
                        .css("opacity", "0.5")
                        .animate({
                            opacity: 1
                        }, 100);
                }
                return this;
            }
        },
    //隐藏表单验证错误提示
    errorHide:
        function (obj) {
            if (obj !== undefined) {
                if (obj.css("opacity") !== "0") {
                    obj.animate({
                        left: "20px",
                        opacity: 0
                    }, 200);
                }
                return this;
            }
        },
    //显示基础的表单验证错误提示
    basicErrorShow:
        function (obj) {
            obj
                .css("color", "#c33")
                .css("opacity", "0.5")
                .animate({
                    opacity: 1
                }, 100)
                .next("input,textarea")
                .css("border-color", "#c33");
            return this;
        },
    //显示一种特殊的基础表单验证错误提示
    specialBasicErrorShow:
        function (obj) {
            obj
                .css("color", "#c33")
                .css("opacity", "0.5")
                .animate({
                    opacity: 1
                }, 100)
                .next("span").next("input,textarea")
                .css("border-color", "#c33");
            return this;
        },
    //隐藏基础的表单验证错误提示
    basicErrorHide:
        function (obj) {
            obj
                .css("color", "#666")
                .css("opacity", "1")
                .next("input,textarea")
                .css("border-color", "");
            return this;
        },
    //隐藏一种特殊的基础表单验证错误提示
    specialBasicErrorHide:
        function (obj) {
            obj
                .css("color", "#333")
                .css("opacity", "1")
                .next("span")
                .next("input,textarea")
                .css("border-color", "");
            return this;
        }
};
