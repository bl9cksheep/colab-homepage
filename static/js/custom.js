(function () {
  "use strict";

  function showToast(message) {
    var toast = document.getElementById("copy-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "copy-toast";
      toast.className = "copy-toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 1400);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      try {
        var el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(el);
        if (ok) {
          resolve();
        } else {
          reject(new Error("copy failed"));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  function handleCopy(text) {
    copyText(text).then(function () {
      showToast("Email copied to clipboard");
    });
  }

  document.addEventListener("click", function (event) {
    var target = event.target.closest("[data-copy]");
    if (target) {
      event.preventDefault();
      var data = target.getAttribute("data-copy");
      if (data) handleCopy(data);
      return;
    }

    var mailLink = event.target.closest("a.social-icon[href^='mailto:']");
    if (mailLink) {
      event.preventDefault();
      var href = mailLink.getAttribute("href");
      if (!href) return;
      var email = href.replace(/^mailto:/, "");
      if (email) handleCopy(email);
    }
  });
})();
