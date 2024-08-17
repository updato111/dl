// util_set_cache("twa_user_token01", "");

var mypoints = 0;
var mymoney = 0;
var userInfo = {
    "invite_code": "",
    "balance": "",
    "game_count": "",
    "points": "",
    "referrals": "",
    "nickname": "",
};
window.userid = "";
initApp();
//console.log(location.hostname);

/* if (location.hostname != 'localhost' && location.hostname != '127.0.0.1') {
    addGA("G-Y2LMMZK3N4");
} */
//addGA("G-Y2LMMZK3N4");
// alert(window.Telegram.WebApp.initDataUnsafe.start_param);

function initApp() {
    const dev_mode = localStorage.getItem("dev_mode");
    if (window.Telegram.WebApp.initData == "" && dev_mode == null) {
        //window.location.href = "https://telegram.org/";
        //return;
    }
    try {
        console.log("window.Telegram.WebApp.initDataUnsafe", window.Telegram.WebApp.initDataUnsafe);
        window.userid = window.Telegram.WebApp.initDataUnsafe.user.id;
    } catch (error) {
        console.log(error);
    }
    console.log("init login");
    //initPageData();
    //alert('strt');
    var token = "";
    try {
        token = getCacheV1('twa_user_token01');
    } catch (error) {
        console.log("error", error);
    }
    console.log("token::", token);
    //alert(token);
    if (token == null || token == "") {
        let invite_code = "";
        let start_param = window.Telegram.WebApp.initDataUnsafe.start_param;
        if (start_param && start_param != null && start_param != "") {
            start_param = start_param.split("_");
            if (start_param[0] == "i") {
                invite_code = start_param[1];
            }
        }
        util_post("/api/v1/appstore/login", {
            //util_post_http("http://localhost:9005/api.php?act=twa_login_debug", {
            initdata: window.Telegram.WebApp.initData,
            pid: invite_code,
        }, (res) => {
            if (res.code == 200) {
                setCacheV1("twa_user_token01", res.data, 8640);
                setTimeout(() => {
                    initUserinfo(true);
                }, 500);
            }
            console.log("res", res);
        }, (error) => {
            console.log("error", error);
        });
    } else {
        initUserinfo(true);
    }
}

function syncUserinfo(local_money, local_points) {
    util_post('/api/v1/appstore/sync-userinfo', {
        money: local_money,
        points: local_points,
    }, (response) => {
        console.log(response);
    }, (error) => {
        console.error(error);
    });
}

async function initUserinfo(initData) {
    var local_money = util_get_cache("user_money");
    if (local_money == "" || local_money == null) {
        local_money = "0";
    }
    var local_points = util_get_cache("user_points");
    if (local_points == "" || local_points == null) {
        local_points = "0";
    }
    util_get("/api/v1/appstore/userinfo?money=" + local_money + "&points=" + local_points, (res) => {
        if (res.code == '200') {
            // 更新余额到云端
            if ((local_money != "0" && local_money != "") || (local_points != "0" && local_points != "")) {
                util_set_cache("user_money", "");
                util_set_cache("user_points", "");
                syncUserinfo(local_money, local_points);
            }
            updateLocalNumber("money", "add", res.data.balance, true, true);
            updateLocalNumber("points", "add", res.data.points, true, true);
            userinfo = res.data;

            $("#userinfo_id").text(userinfo.invite_code);
            $("#userinfo_name").text(userinfo.nickname);

            // 登录失败情况下，清空twa_user_token01
            if (userinfo.invite_code == "" || userinfo.invite_code == null) {
                setCacheV1("twa_user_token01", "", 100);
            }
            if (initData) {
                initPageData(userinfo);
            }
            //hideLoading();
        }
        console.log("login res:: ", res);
    }, (err) => {
        console.log("error:: ", err);
    });
}

function showLoading() {
    $('#loading-component').show();
}
function hideLoading() {
    $('#loading-component').hide();
}

function jumpPage(page) {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    showLoading();

    const relativeUrl = new URL(page, window.location.href).href;
    window.location.assign(relativeUrl);
}

function nftIdToMoney(nftid) {
    let itme_money = 500;
    if (nftid > 4000) {
        itme_money = 100;
    } else if (nftid > 1000) {
        itme_money = 200;
    }
    return itme_money;
}

function util_get_http(url, successCallback, errorCallback) {
    var token = "";
    try {
        token = getCacheV1('twa_user_token01');
    } catch (error) {
        console.log("error", error);
    }
    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: successCallback,
        error: errorCallback
    });
}

function util_get(url, successCallback, errorCallback) {
    var token = "";
    try {
        token = getCacheV1('twa_user_token01');
    } catch (error) {
        console.log("error", error);
    }
    url = global_info.api_host + url;
    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: successCallback,
        error: errorCallback
    });
}

function util_post(url, data, successCallback, errorCallback) {
    var token = "";
    try {
        token = getCacheV1('twa_user_token01');
    } catch (error) {
        console.log("error", error);
    }
    url = global_info.api_host + url;
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: successCallback,
        error: errorCallback
    });
}

function util_post_http(url, data, successCallback, errorCallback) {
    var token = "";
    try {
        token = getCacheV1('twa_user_token01');
    } catch (error) {
        console.log("error", error);
    }
    //url = global_info.api_host + url;
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: successCallback,
        error: errorCallback
    });
}

function util_get_cache(name) {
    var val = localStorage.getItem(name);
    if (!val || val == null || val == "") {
        return "";
    } else {
        return val;
    }
}
function util_set_cache(name, val) {
    localStorage.setItem(name, val);
    return true;
}

function addCommasToNumber(number) {
    return Number(number).toLocaleString();
}

function convertStringTimestampToDate(timestampString) {
    let timestamp = parseInt(timestampString, 10) * 1000;
    let date = new Date(timestamp);
    let localDate = date.toLocaleDateString();
    return localDate;
}

function setCacheV1(key, value, expirationMinutes) {
    const currentTime = new Date().getTime();
    const expirationTime = expirationMinutes ? currentTime + expirationMinutes * 60 * 1000 : null;
    const data = {
        value: value,
        expirationTime: expirationTime
    };
    localStorage.setItem(key, JSON.stringify(data));
}

function getCacheV1(key) {
    const cachedData = localStorage.getItem(key);
    if (!cachedData) {
        return null;
    }
    const parsedData = JSON.parse(cachedData);
    const expirationTime = parsedData.expirationTime;
    if (expirationTime && new Date().getTime() > expirationTime) {
        localStorage.removeItem(key);
        return null;
    }
    return parsedData.value;
}

function getChinaTime() {
    const now = new Date();
    const options = { timeZone: 'Asia/Shanghai', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const chinaTimeString = new Intl.DateTimeFormat('zh-CN', options).format(now);
    const chinaHour = parseInt(chinaTimeString.split(':')[0], 10);
    return chinaHour;
}

function getValueCloudStorage(key) {
    return new Promise((resolve, reject) => {
        try {
            window.Telegram.WebApp.CloudStorage.getItem(key, function (error, value) {
                if (error) {
                    reject(error);
                } else {
                    resolve(value || null);
                }
            });
        } catch (error) {
            // 处理本地存储的情况
            resolve(localStorage.getItem(key));
        }
    });
}

function setValueCloudStorage(key, value) {
    return new Promise((resolve, reject) => {
        try {
            window.Telegram.WebApp.CloudStorage.setItem(key, value, function (error, res) {
                if (error) {
                    reject(error);
                } else {
                    resolve(res || null);
                }
            });
        } catch (error) {
            // 处理本地存储的情况
            localStorage.setItem(key, value);
            resolve(null);
        }
    });
}


function showMessage(message) {
    var $message = $('<div class="message">' +
        '<p class="message-content">' + message + '</p>' +
        '<span class="close-btn">&times;</span>' +
        '</div>');

    $message.appendTo($('#messageContainer')).fadeIn();

    $message.find('.close-btn').click(function () {
        $(this).parent('.message').fadeOut(function () {
            $(this).remove();
        });
    });

    setTimeout(function () {
        $message.fadeOut(function () {
            $(this).remove();
        });
    }, 2000); // 2 seconds
}

async function updateLocalNumber(name, type, num, init_mode, set_dom) {
    var local_num = util_get_cache("user_" + name);
    if (local_num == "") {
        local_num = 0;
    } else {
        local_num = parseInt(local_num);
    }
    var new_num = 0;
    if (type == "add") {
        new_num = local_num + num;
    } else {
        new_num = local_num - num;
    }
    if (init_mode) {
        util_set_cache("user_" + name, "");
        if (name == "points") {
            mypoints = 0;
        } else {
            mymoney = 0;
        }
    } else {
        util_set_cache("user_" + name, new_num);
    }
    if (name == "points") {
        if (type == "add") {
            mypoints = mypoints + num;
        } else {
            mypoints = mypoints - num;
        }
        if (set_dom) {
            $("#now_points").text(addCommasToNumber(mypoints));
            $("#userinfo_points").text(addCommasToNumber(mypoints));
        }

    } else {
        if (type == "add") {
            mymoney = mymoney + num;
        } else {
            mymoney = mymoney - num;
        }
        if (set_dom) {
            $("#now_money").text(addCommasToNumber(mymoney));
            $("#userinfo_money").text(addCommasToNumber(mymoney));
            $("#userinfo_money01").text(addCommasToNumber(mymoney));
        }
    }
}

function addGA(trackingId) {
    if (location.hostname != 'localhost' && location.hostname != '127.0.0.1') {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', trackingId);
        };
    }
}

function getFormattedTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    let minutes = Math.floor(now.getMinutes() / 1) * 1;
    minutes = minutes.toString().padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
}

function getFormattedTimestamp01() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    return `${year}${month}${day}${hours}`;
}


function showLoading01() {
    Swal.fire({
        showConfirmButton: false,
        html: `<div class="flex justify-center mt-2"><svg class='w-12 h-12 animate-spin' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3B82F6"><path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path></svg></div>`,
        customClass: {
            container: "swal2-backdrop-diy"
        },
    });
}

function hideLoading01() {
    Swal.close();
}
