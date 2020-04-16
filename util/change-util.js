/**
 *@author xbh
 *@dateTime 2019-04-10 14:39
 *@description 转换工具类
 */
//请求类型转换
function type(type) {
    return type === '1' ? '课程' : '资源';
}

//响应分类转换
function powerType(powerType) {
    let type = '';
    if (powerType === 'BLACK') type = '黑名单';
    if (powerType === 'WRITE') type = '白名单';
    if (powerType === 'VIP') type = 'VIP用户';
    if (powerType === 'MINUTES') type = '分钟';
    if (powerType === 'HOURS') type = '小时';
    if (powerType === 'DATE') type = '天';
    return type;
}

module.exports = {type, powerType};
