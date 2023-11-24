document.addEventListener("DOMContentLoaded", () => {
    let userlink = document.getElementById("userlink");
    let generate = document.getElementById("generate");
    let short_link = document.getElementById("short_link");
    let copy = document.getElementById("copy");

    generate.addEventListener("click", () => {
        let url = userlink.value;
        fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
        .then((resp) => resp.json())
        .then((response) => {
            short_link.value = response.result.short_link;
        })
        .catch((error) => {
            short_link.value = "Sorry, something went wrong!";
        });
    });

    copy.addEventListener("click", () => {
        navigator.clipboard.writeText(short_link.value)
        .then(() => {
            const messageElement = document.createElement("div");
            messageElement.className = "copy-message";
            messageElement.textContent = "Copied!";

            copy.parentNode.insertBefore(messageElement, copy.nextSibling);

            setTimeout(() => {
                messageElement.remove();
            }, 2000);
        })
        .catch((error) => {
            short_link.value = "Sorry, something went wrong!";
        });
    });
});