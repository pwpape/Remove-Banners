
let reddit = {
    host : ["www.reddit.com"],
    css : ["_2Xq-4oyrEvHjL5U_EeMnK8 _20b4i5iUhjZQqDZ1BM_Q-9", "XPromoBlockingModal", "m-consolidate"]
}

let redditBlur = {
    host : ["www.reddit.com"],
    css : ["sidebar-grid"]
}

let twitter = {
    host : ["twitter.com"],
    css : ["css-1dbjc4n r-aqfbo4 r-zso239 r-1hycxz", "css-1dbjc4n r-aqfbo4 r-1p0dtai r-1d2f490 r-12vffkv r-1xcajam r-zchlnj"]
}

let stack_overflow = {
    host : ["stackoverflow.com", "stackexchange.com", "serverfault.com", "superuser.com", "askubuntu.com"],
    css : ["show-votes", "js-consent-banner"]
}

let quora = {
    host : ["www.quora.com"],
    css : ["q-sticky"]
}

let roll20 = {
    host : ["roll20.net", "app.roll20.net"],
    css : ["squareImageContainer"]
}

let RPGbot = {
    host : ["rpgbot.net"],
    css : ["custom-ad-placeholder"]
}

let url_list = [reddit, redditBlur, twitter, stack_overflow, quora, roll20, RPGbot];

let observer = new window.MutationObserver(iterateOverURLs);

window.addEventListener('load', iterateOverURLs);

window.addEventListener('load', () =>
    observer.observe(document, {
        subtree: true,
        childList: true
    }), true);

function iterateOverURLs () {
    for (let i = 0; i < url_list.length; i++) {
        for (let h = 0; h < url_list[i].host.length; h++) {
            if (window.location.host.includes(url_list[i].host[h])) {
                for (let j = 0; j < url_list[i].css.length; j++) {
                    if (url_list[i] === RPGbot) {
                        hide_RPGbot(url_list[i].css[j])
                    } else if (url_list[i] === redditBlur) {
                        removeBlur(url_list[i].css[j])
                    } else {
                        hide_side(url_list[i].css[j]);
                        hide_by_attribute();
                    }
                }
            }
        }
    }
}

function removeBlur(css_class) {
    let elements = document.getElementsByClassName(css_class);

    for (let el = 0; el < elements.length; el++) {
        elements[el].style.filter = "none";
    }
}

function hide_by_attribute () {
    let elements = document.querySelectorAll("[bundlename='bottom_bar_xpromo']");

    for (let el = 0; el < elements.length; el++) {
        elements[el].style.display = "none";
    }
}

function hide_side (css_class) {
    let elements = document.getElementsByClassName(css_class);

    for (let el = 0; el < elements.length; el++) {
        elements[el].style.display = "none";
    }
}

function hide_RPGbot (css_class) {
    let elements = document.getElementsByClassName(css_class);

    for (let el = 0; el < elements.length; el++) {
        elements[el].style.display = "none";
    }
}
