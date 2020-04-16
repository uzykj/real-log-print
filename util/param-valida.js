/**
 *@author xbh
 *@dateTime 2019-03-15 10:23
 *@description 参数效验,时间
 */



module.exports = {
    once: (param) => {
        return param = param === "" || param === '""' || param === "null" || param === undefined ? undefined : param;
    },
    option(param) {
        return {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        };
    },
    strEmpty(str) {
        return str !== '' && str !== null && str !== undefined;
    }
};
