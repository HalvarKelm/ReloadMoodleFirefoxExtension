function remove(tab){
    setTimeout(function(){
        browser.tabs.remove(
            tab.id
        );
    },1000);
}

//repeat every 29 minutes since moodle requires you to reload a tab every 30 mins stated here: https://docs.moodle.org/37/en/Session_handling
setInterval(function(){
    //get all tabs
    browser.tabs.query({}).then((tabs) => {
        //iterate over tabs
        for (var tab of tabs) {
            if(tab.url.match(new RegExp('(?:(?!\://moodle\.)(?:.|\n))*\://moodle\.'))){
                //moodle tab found
                var creating = browser.tabs.create({
                    active: false,
                    url: tab.url,
                });
                creating.then(
                    remove
                );
                break;
            }
        }
    });
    //1740000 miliseconds are 29 mins
}, 1740000);