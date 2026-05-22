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
  const links = sitePages.map((item) => {
    const currentAttr = item.page === current ? ' aria-current="page"' : "";
    return `<a href="${item.href}"${currentAttr}>${item.label}</a>`;
  });

  header.innerHTML = `
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="index.html">Han's academic page</a>
      <div class="nav-links">
        ${links.join("\n        ")}
      </div>
    </nav>
  `;
}

renderSiteNav();
