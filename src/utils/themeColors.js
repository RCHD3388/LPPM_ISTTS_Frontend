// Konversi OKLCH DaisyUI -> warna valid HEX/RGB
function oklchToCssColor(oklchRaw) {
  if (!oklchRaw) return "#000000";
  const str = oklchRaw.includes("oklch(") ? oklchRaw : `oklch(${oklchRaw})`;
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = str; // browser parse -> rgb(...) atau #rrggbb
  return ctx.fillStyle || "#000000";
}

// Ambil CSS variable (contoh: --color-primary)
export function getCssColor(varName) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return oklchToCssColor(raw);
}

// Tambah alpha
export function withAlpha(color, alpha = 0.2) {
  if (!color) return "rgba(0,0,0,0.2)";
  if (color.startsWith("#")) {
    const a = Math.round(alpha * 255).toString(16).padStart(2, "0");
    return `${color}${a}`;
  }
  const m = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
  if (m) {
    const [_, r, g, b] = m;
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return color;
}

// Update saat data-theme berubah
export function onThemeChange(callback) {
  const target = document.documentElement;
  const obs = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "attributes" && m.attributeName === "data-theme") {
        callback();
      }
    }
  });
  obs.observe(target, { attributes: true });
  return () => obs.disconnect();
}
    