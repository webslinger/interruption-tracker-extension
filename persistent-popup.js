var popupWindow = window.open(
    chrome.extension.getURL("persistent_popup.html"),
    "Interrupted!",
    "width=395,height=110"
);
window.close();