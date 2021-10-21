
let reddit = {
    host : ["www.reddit.com"],
    css : ["_2Xq-4oyrEvHjL5U_EeMnK8 _20b4i5iUhjZQqDZ1BM_Q-9"]
}

let twitter = {
    host : ["twitter.com"],
    css : ["css-1dbjc4n r-aqfbo4 r-zso239 r-1hycxz", "css-1dbjc4n r-aqfbo4 r-1p0dtai r-1d2f490 r-12vffkv r-1xcajam r-zchlnj"]
}

let stack_overflow = {
    host : ["stackoverflow.com", "stackexchange.com", "serverfault.com", "superuser.com"],
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

let butler_hoops = {
    host : ["butlerhoops.com"],
    css : ["breadBoxTop", "breadBoxBottom", "sidebar", "discussionList"]
}

let RPGbot = {
    host : ["rpgbot.net"],
    css : ["custom-ad-placeholder"]
}

let url_list = [reddit, twitter, stack_overflow, quora, roll20, butler_hoops, RPGbot];

let observer = new window.MutationObserver(function(mutations, observer) {
    for (let i = 0; i < url_list.length; i++) {
        for (let h = 0; h < url_list[i].host.length; h++) {
            if (window.location.host.includes(url_list[i].host[h])) {
                for (let j = 0; j < url_list[i].css.length; j++) {
                    if (url_list[i] === butler_hoops) {
                        hide_butler(url_list[i].css[j])
                    } else if (url_list[i] === RPGbot) {
                        hide_RPGbot(url_list[i].css[j])
                    } else {
                        hide_side(url_list[i].css[j]);
                    }
                }
            }
        }
    }
});

window.addEventListener('load', function() {
    for (let i = 0; i < url_list.length; i++) {
        for (let h = 0; h < url_list[i].host.length; h++) {
            if (window.location.host.includes(url_list[i].host[h])) {
                for (let j = 0; j < url_list[i].css.length; j++) {
                    if (url_list[i] === butler_hoops) {
                        hide_butler(url_list[i].css[j])
                    } else if (url_list[i] === RPGbot) {
                        hide_RPGbot(url_list[i].css[j])
                    } else {
                        hide_side(url_list[i].css[j]);
                    }
                }
            }
        }
    }
});

window.addEventListener('load', function() {
    observer.observe(document, {
        subtree: true,
        childList: true
    })
}, true);

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

function hide_butler (css_class) {
    let elements = document.getElementsByClassName(css_class);
    if (css_class === "breadBoxTop") {
        /* eliminating header container */
        elements[0].parentElement.children[0].style.display = "none";
    } else if (css_class === "breadBoxBottom") {
        /* eliminating footer and sidebar containers */
        elements[0].parentElement.children[3].style.display = "none";
        elements[0].parentElement.children[1].children[0].style.display = "none";
        if (elements[0].parentElement.children[7]) {
            elements[0].parentElement.children[7].style.display = "none";

            /* eliminating mid-page containers */
            for (let child = 0; child < elements[0].parentElement.children[4].children[0].children[1].children.length; child++) {
                if (elements[0].parentElement.children[4].children[0].children[1].children[child].tagName === "DIV") {
                    elements[0].parentElement.children[4].children[0].children[1].children[child].style.display = "none";
                }
            }

            /* eliminating comment containers */
            for (let child = 0; child < elements[0].parentElement.children[4].children[0].children[0].children.length; child++) {
                
                if (elements[0].parentElement.children[4].children[0].children[0].children[child].style[0] === "text-align") {
                    elements[0].parentElement.children[4].children[0].children[0].children[child].style.display = "none";
                }
            }

            /* eliminating comment footer containers */
            for (let child = 0; child < elements[0].parentElement.children.length; child++) {
                if (elements[0].parentElement.children[child].style[0] === "text-align") {
                    elements[0].parentElement.children[child].style.display = "none";
                }
                
            }
        }
    }
}
