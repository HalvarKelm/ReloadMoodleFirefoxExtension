//repeat every 29 minutes since moodle requires you to reload a tab every 30 mins stated here: https://docs.moodle.org/37/en/Session_handling
setInterval(function(){

    //get all tabs
    browser.tabs.query({}).then((tabs) => {

        //iterate over tabs
        for (var tab of tabs) {

            //TODO: if the only matching tab is a document create a new tab and close it instantly
            //tab has to be inactive and the standard URL or another URL with .php but not .php/ so documents do not get reloaded
            if(!tab.active && (tab.url == 'https://moodle.hs-mannheim.de/' || tab.url.match(new RegExp('(?:(?!\://moodle\.)(?:.|\n))*\://moodle\.(?:(?!\.php)(?:.|\n))*\.php[^/;]+')))){
                browser.tabs.reload(
                    tab.id
                )
            }
        }
    });
    //1740000 miliseconds are 29 mins
}, 1740000);