const qrcode = new QRCode("qrcode");

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
})

function generate() {
    document.getElementById("fullscreen").style.display = "block";
    document.getElementById("copy").style.display = "block";
    const text = document.getElementById("text").value;
    qrcode.makeCode(text);
    const download = document.getElementById("download");
    download.style.display = "block";
    const modalText = document.getElementById("modalText");
    modalText.innerHTML = text;
    modalText.href = text;
    window.history.pushState(null, "QR Code Generator", getPermaLink());
    setTimeout(() => {
        let dataString = document.getElementById("qrcode").querySelector("img").src;
        download.href = dataString;
        document.querySelector("img.qrcode").src = dataString;
        download.download = "qrcode.png";
    }, 100);
}

function modal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function getPermaLink() {
    return `${window.location.origin + window.location.pathname}?text=${document.getElementById("text").value}`;
}

function copyText() {
    const selection = getPermaLink();
    navigator.clipboard.writeText(selection);
}

function fillFromPermaLink() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("text")) {
        return;
    }
    document.getElementById("text").value = params.get("text");
    generate();
}

fillFromPermaLink();