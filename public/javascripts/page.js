$(document).ready(function () {
    let current = $("input[name='current']").val();
    let pageCount = $("input[name='pageCount']").val();
    //初始化加载分页
    getPage(current, pageCount);
});
function getPage(pageIndex, totalPage) {    //
    var pageType = $("input[name='pageType']").val();
    var url;
    if (pageType === 1) {
        url = '?page=';
    } else {
        if (window.location.href.indexOf('?page=') !== -1) {
            url = window.location.href.split('?')[0] + '?page=';
        }
    }
    $(".information_page").createPage({    //创建分页
        pageCount: totalPage,      //总页数
        current: pageIndex,         //当前页
        url: url,
        backFn: function (p) {    //p不用管
            getPage(p, totalPage);         //点击页码或者跳转页码时的回掉函数，p为要跳转的页码
        }
    });
}
