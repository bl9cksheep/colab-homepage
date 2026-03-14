(function () {
  "use strict";

  function showToast(message) {
    var toast = document.getElementById("copy-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "copy-toast";
      toast.className = "copy-toast";
      toast.style.position = "fixed";
      toast.style.left = "50%";
      toast.style.bottom = "24px";
      toast.style.transform = "translateX(-50%) translateY(10px)";
      toast.style.background = "rgba(0, 0, 0, 0.85)";
      toast.style.color = "#fff";
      toast.style.padding = "10px 16px";
      toast.style.borderRadius = "999px";
      toast.style.fontSize = "14px";
      toast.style.letterSpacing = "0.2px";
      toast.style.opacity = "0";
      toast.style.pointerEvents = "none";
      toast.style.transition = "opacity 0.2s ease, transform 0.2s ease";
      toast.style.zIndex = "2000";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";

    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.classList.remove("show");
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(10px)";
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
