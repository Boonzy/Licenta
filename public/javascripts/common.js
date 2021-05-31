function callApi(method, url, data) {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.addEventListener("load", onload);
        xhr.addEventListener("error", onerror);
        if (method == 'POST' || 'DELETE') {
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }
        if (data) {
            data = JSON.stringify(data);
        }
        xhr.send(data);
        function onload() {
            let data;
            if (this.responseText != '') {
                data = JSON.parse(this.responseText);
            }
            return resolve(data);
        }
        function onerror(e) {
            console.log("error callapi", e);
            return reject(e);
        }
    });
    return promise;
}