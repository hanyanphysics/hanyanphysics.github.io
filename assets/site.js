const sitePages = [
  { href: "index.html", label: "Home", page: "index.html" },
  { href: "research.html", label: "Research", page: "research.html" },
  { href: "media.html", label: "Media", page: "media.html" },
  { href: "grants.html", label: "Grants & Honors", page: "grants.html" },
  { href: "code.html", label: "Code", page: "code.html" },
  { href: "resume.html", label: "Resume", page: "resume.html" },
];

function currentPageName() {
  const page = window.location.pathname.split("/").pop();
  return page || "index.html";
}

function renderSiteNav() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const current = currentPageName();
  const navLinks = header.querySelector(".nav-links");

  if (!navLinks) {
    const links = sitePages.map((item) => `<a href="${item.href}">${item.label}</a>`);
    header.innerHTML = `
      <nav class="nav" aria-label="Main navigation">
        <a class="brand" href="index.html">Han's academic page</a>
        <div class="nav-links">
          ${links.join("\n          ")}
        </div>
      </nav>
    `;
  }

  header.querySelectorAll(".nav-links a").forEach((link) => {
    const target = link.getAttribute("href");
    if (target === current) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

renderSiteNav();
