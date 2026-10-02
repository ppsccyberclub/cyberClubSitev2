document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminal");
  const currentPath = window.location.pathname;

  // If user explicitly visits desktop.html, keep terminal hidden
  if (currentPath === "/desktop.html") {
    if (terminal) terminal.classList.add("closed");
    return;
  }

  // On all other pages/posts, ensure it is visible without animating
  if (terminal) {
    terminal.classList.remove("closed", "swoop");
  }

  // Red control button: Close/minimize back to desktop
  const closeLink = document.querySelector(".controls .dot.red")?.closest("a");
  if (closeLink) {
    closeLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (terminal) {
        terminal.classList.add("closed");
        terminal.classList.remove("swoop");
      }
    });
  }

  // Sidebar Terminal icon: Open from desktop with swoop animation
  const sidebarTerminalIcon = document.querySelector('.desktop-sidebar a[title="Terminal"]');
  if (sidebarTerminalIcon) {
    sidebarTerminalIcon.addEventListener("click", (e) => {
      e.preventDefault();
      if (terminal) {
        terminal.classList.remove("closed");
        terminal.classList.add("swoop");
      }
    });
  }
});