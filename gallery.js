(function () {
  const mainWrap = document.getElementById("pdMainWrap");
  const mainImg  = document.getElementById("pdMainImg");
  const lens     = document.getElementById("pdLens");
  const thumbs   = document.querySelectorAll(".pd-thumb");
  const zoom     = 2.8;

  if (!mainWrap || !mainImg || !lens) return;

  // ── Switch image on thumb click ──
  thumbs.forEach(btn => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.src;
      if (src === mainImg.src.replace(location.origin + location.pathname.replace(/[^/]*$/, ""), "")) return;

      // Fade out → swap → fade in
      mainImg.classList.add("fading");
      setTimeout(() => {
        mainImg.src = src;
        lens.style.backgroundImage = "url(" + src + ")";
        mainImg.classList.remove("fading");
      }, 220);

      thumbs.forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // ── Magnifier on main image hover ──
  mainWrap.addEventListener("mouseenter", () => {
    lens.style.display = "block";
    lens.style.backgroundImage = "url(" + mainImg.src + ")";
  });
  mainWrap.addEventListener("mouseleave", () => {
    lens.style.display = "none";
  });
  mainWrap.addEventListener("mousemove", e => {
    const rect = mainWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lw = lens.offsetWidth;
    const lh = lens.offsetHeight;

    lens.style.left = Math.max(0, Math.min(rect.width  - lw, x - lw / 2)) + "px";
    lens.style.top  = Math.max(0, Math.min(rect.height - lh, y - lh / 2)) + "px";
    lens.style.backgroundSize = (rect.width * zoom) + "px " + (rect.height * zoom) + "px";
    lens.style.backgroundPosition =
      (-(x * zoom - lw / 2)) + "px " + (-(y * zoom - lh / 2)) + "px";
  });
})();
