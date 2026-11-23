export function showToast(message) {
  let container = document.querySelector(".js-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className =
      "js-toast-container fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none max-w-[calc(100vw-2rem)] sm:max-w-sm";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.setAttribute("role", "status");
  toast.className =
    "pointer-events-auto flex items-center gap-3 px-4 py-3.5 bg-surface-container-lowest/95 dark:bg-[#161619]/95 backdrop-blur-md border border-outline-variant/50 dark:border-zinc-700/80 shadow-xl text-on-surface dark:text-zinc-100 opacity-0 translate-y-2 transition-all duration-300 ease-out";

  const icon = document.createElement("span");
  icon.className =
    "material-symbols-outlined text-[18px] text-secondary dark:text-secondary-fixed-dim shrink-0";
  icon.textContent = "check_circle";

  const text = document.createElement("span");
  text.className =
    "text-xs font-medium tracking-wide text-on-surface dark:text-zinc-100 leading-snug";
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "translate-y-2");
    toast.classList.add("opacity-100", "translate-y-0");
  });

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-2");

    setTimeout(() => {
      toast.remove();
      if (container && container.children.length === 0) {
        container.remove();
      }
    }, 300);
  }, 2500);
}