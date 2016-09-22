function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; path=/; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function redirect2language(contextPath) {
    var contextHost = contextPath.substr(0, contextPath.length - 3);
    if (document.referrer && !document.referrer.startsWith(contextHost)) {
        var pathLanguage = contextPath.substr(contextPath.length - 3, 2);
        var userLanguage = getUserLanguage();
        if (pathLanguage !== userLanguage) {
            var path = window.location.pathname.replace('/' + pathLanguage + '/', '/' + userLanguage + '/');
            window.location.pathname = path;
        }
    }
}

function redirect2blog() {
    var lang = getUserLanguage();
    if (lang=="de") {
        window.location.pathname = window.location.pathname + "de/blog/"
    } else {
        window.location.pathname = window.location.pathname + "en/blog/"
    }
}

function getUserLanguage() {
    return (getCookie('lang') || navigator.language || navigator.systemLanguage).toLowerCase().substr(0,2);
}