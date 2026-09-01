// Applies the stored theme before first paint, so a dark-theme visitor never
// sees a white flash. It lives in its own file rather than inline in every
// page head because an inline script forces the Content-Security-Policy to
// either allow 'unsafe-inline' or pin a hash to its bytes; a plain (non-module)
// script in the head is render-blocking, which is exactly what this needs.
(function () {
  var t = localStorage.getItem("wg7tf2-theme");
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
})();
