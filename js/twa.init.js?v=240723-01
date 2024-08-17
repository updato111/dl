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

