async function saveOptions(e) {
    e.preventDefault();

    const success = document.getElementById("success-message");
    success.classList.add("hidden");

    if (!document.getElementById("server-endpoint").value || !document.getElementById("api-key").value) {
        alert("Please fill server url and api key");
        return
    }

    const elm = document.getElementById("submit-button");
    elm.classList.add("spinning");

    await browser.storage.sync.set({
        hoarderCredentials: {
            serverEndpoint: document.getElementById("server-endpoint").value,
            apiKey: document.getElementById("api-key").value
        }
    });
    setTimeout(() => {
        elm.classList.remove("spinning");
        success.classList.remove("hidden");
    }, 500);
    setTimeout(() => { success.classList.add("hidden") }, 3000);
}
document.getElementById("server-endpoint-form").addEventListener("submit", saveOptions);

async function restoreOptions() {
    let res = await browser.storage.sync.get('hoarderCredentials');
    if (res && res.hoarderCredentials) {
        document.getElementById("server-endpoint").value = res.hoarderCredentials.serverEndpoint;
        document.getElementById("api-key").value = res.hoarderCredentials.apiKey;
    }
}
document.addEventListener('DOMContentLoaded', restoreOptions);