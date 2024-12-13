function handleCreated(id, bookmarkInfo) {
    browser.storage.sync.get('hoarderCredentials', function(result) {
        if (result && result.hoarderCredentials) {

            const apiUrl = "/api/trpc/bookmarks.createBookmark?batch=1";

            var serverUrl = result.hoarderCredentials.serverEndpoint;

            if (serverUrl.charAt(serverUrl.length - 1) == "/") {
                serverUrl = serverUrl.slice(0, serverUrl.length - 1);
            }

            fetch(serverUrl + apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + result.hoarderCredentials.apiKey
                },
                body: JSON.stringify({
                    "0": {
                        "json": {
                            "type": "link",
                            "url": bookmarkInfo["url"]
                        }
                    }
                })
            });
        }
    });
}

browser.bookmarks.onCreated.addListener(handleCreated);