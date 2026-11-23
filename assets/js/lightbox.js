// Full-screen photo viewer: click a photo to open; arrows / swipe to move; Esc to close.
(function () {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;
  const figs = Array.from(gallery.querySelectorAll(".photo"));
  const items = figs.map((f) => {
    const img = f.querySelector("img");
    const cap = f.querySelector("figcaption");
    return { src: img.currentSrc || img.src, alt: img.alt, caption: cap ? cap.textContent : "" };
  });

  const box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Photograph viewer");
  box.innerHTML =
    '<div class="lb-bar"><span class="lb-count"></span><button type="button" class="lb-close">Close</button></div>' +
    '<div class="lb-stage">' +
    '<button type="button" class="lb-prev" aria-label="Previous photograph"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 5l-7 7 7 7"/></svg></button>' +
    '<img alt="">' +
    '<button type="button" class="lb-next" aria-label="Next photograph"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5l7 7-7 7"/></svg></button>' +
    "</div>" +
    '<p class="lb-caption"></p>';
  document.body.appendChild(box);

  const img = box.querySelector("img");
  const count = box.querySelector(".lb-count");
  const caption = box.querySelector(".lb-caption");
  let i = 0, opener = null;

  function show(n) {
    i = (n + items.length) % items.length;
    img.src = items[i].src;
    img.alt = items[i].alt;
    caption.textContent = items[i].caption;
    count.textContent = i + 1 + " / " + items.length;
  }
  function open(n, btn) {
    opener = btn;
    show(n);
    box.hidden = false;
    document.body.style.overflow = "hidden";
    box.querySelector(".lb-close").focus();
  }
  function close() {
    box.hidden = true;
    document.body.style.overflow = "";
    if (opener) opener.focus();
  }

  figs.forEach((f, n) => {
    const btn = f.querySelector(".zoom");
    if (btn) btn.addEventListener("click", () => open(n, btn));
  });
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", () => show(i - 1));
  box.querySelector(".lb-next").addEventListener("click", () => show(i + 1));
  box.addEventListener("click", (e) => { if (e.target === box || e.target.classList.contains("lb-stage")) close(); });
  box.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(i - 1);
    else if (e.key === "ArrowRight") show(i + 1);
  });
  let x0 = null;
  box.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
