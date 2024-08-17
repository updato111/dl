function getData(url, callback) {
    var request = new XMLHttpRequest();
    request.open('get', url, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            callback(request.responseText);
        }
    };
}

function initpage() {
    let tempTime = global_info.timestamp;
    getData(global_info.cdn_host + "/themes/" + global_info.themes + "/" + global_info.path + "?v=" + tempTime, function (template_content) {
        getData(global_info.cdn_host + "/config/" + global_info.themes + "/" + global_info.lang + ".json?v=" + tempTime, function (config) {
            var config_json = JSON.parse(config);
            config_json = Object.assign({}, config_json, {
                global_info: global_info,
            });
            window.global_config = config_json;
            var template = Handlebars.compile(template_content);
            var content = template(config_json);
            if (content.includes('handlebars.min.js')) {
                return;
            }
            var temp_content = document.open("text/html", "replace");
            temp_content.write(content);
            temp_content.close();
        });
    });
}
