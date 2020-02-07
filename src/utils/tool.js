// 导出节流
export const throttle = (function () {
    // 当前时间
    var currentTime = 0;
    // 清除定时器
    var timer = null;
    // 返回一个节流函数
    return function (callback, timeout) {
        // 没有设置事件的时候默认设置为300ms
        timeout = timeout || 300;
        // 清除定时器
        clearTimeout(timer);
        // 获取最后的事件
        var lastTime = new Date().getTime();
        // 判断，如果触发事件的时间-上一次触发该事件的时间>设置的时间时
        if (lastTime - currentTime > timeout) {
            // 执行需要做的事情
            callback();
            // 将当前触发该事件的时间赋值给上一次触发该事件的时间
            currentTime = lastTime;
      
        } else {
            // 避免最后一次触发改事件的时候，不执行，需要重新调用一次需要做的事情
            timer = setTimeout(() => {
                callback();
            }, timeout)
        }
    }
})()