/*
*Common Object with common settings to use on both Main modules
*/
var Common = {
    init: {

    },
    settings : {
        USERURL:  "http://jsonplaceholder.typicode.com/users",
        USERPOSTURL: "http://jsonplaceholder.typicode.com/posts",
        TITLE: document.querySelector(".main-content h1"),
        tmp: ""
    },
    getRestfulData: function (url, cb) {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function(e) {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    Common.settings.TITLE.innerHTML = Common.settings.tmp;
                    cb(JSON.parse(xhr.responseText));
                }else {
                    cb(xhr.status);
                }
            }
        };
        xhr.onerror = function(e) {
            cb(xhr.statusText);
        }
        xhr.send(null);
        this.settings.tmp = this.settings.TITLE.textContent;
        this.settings.TITLE.innerHTML = "Loading...";
    }
};
