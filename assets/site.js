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
        <a class="brand" href="index.html">Han Yan</a>
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

function profilePanelMarkup() {
  return `
    <img class="portrait" src="assets/images/portrait-han-yan.png" alt="Han Yan">
    <h2 class="profile-name">Han Yan (闫寒)</h2>
    <p class="contact">Assistant Professor, ISSP, The University of Tokyo<br>hanyanphy [AT] gmail.com</p>
    <p class="profile-summary">I work on theoretical condensed matter physics, with a focus on quantum spin systems, emergent gauge theories &amp; generalized symmetries, and their application in quantum information. I am also exploring the potential of AI for Physics.</p>
    <p class="profile-mini-links">
      <a href="research.html">Research</a> | <a href="media.html">Media</a> | <a href="resume.html">CV</a>
    </p>
    <div class="profile-links" aria-label="Profile links">
      <a class="profile-link orcid" href="https://orcid.org/0000-0002-9242-1915" aria-label="ORCID profile">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM7.37 5.48a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Zm-.86 3.68h1.72v8.86H6.51V9.16Zm3.33 0h4.65c3.27 0 5.02 2.34 5.02 4.43 0 2.27-1.78 4.43-5 4.43H9.84V9.16Zm1.72 1.55v5.76h2.74c2.88 0 3.43-2.18 3.43-2.88 0-1.13-.72-2.88-3.52-2.88h-2.65Z"/>
        </svg>
        <span>ORCID</span>
      </a>
      <a class="profile-link scholar" href="https://scholar.google.com/citations?user=gkX6R6QAAAAJ&amp;hl=en" aria-label="Google Scholar profile">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 3 1.8 9.2 12 15.4l8.36-5.08V17H22V9.2L12 3Zm0 14.22-6.9-4.2v2.96c0 2.45 3.1 4.02 6.9 4.02s6.9-1.57 6.9-4.02v-2.96L12 17.22Z"/>
        </svg>
        <span>Scholar</span>
      </a>
      <a class="profile-link github" href="https://github.com/hanyanphysics" aria-label="GitHub profile">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18A11.06 11.06 0 0 1 12 5.98c.98 0 1.95.13 2.87.38 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.42.36.78 1.07.78 2.15v3.16c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
        </svg>
        <span>GitHub</span>
      </a>
    </div>
  `;
}

function applyGlobalProfileLayout() {
  const main = document.querySelector("main");
  if (!main || main.querySelector(".global-layout")) return;

  const children = Array.from(main.children);
  const hero = children.find((node) => node.classList && node.classList.contains("hero"));
  const contentNodes = children.filter((node) => node !== hero);
  if (contentNodes.length === 0) return;

  const layout = document.createElement("div");
  layout.className = "global-layout";

  const aside = document.createElement("aside");
  aside.className = "global-profile";
  aside.innerHTML = profilePanelMarkup();

  const content = document.createElement("div");
  content.className = "global-content";
  contentNodes.forEach((node) => content.appendChild(node));

  layout.append(aside, content);
  if (hero) {
    main.insertBefore(layout, hero.nextSibling);
  } else {
    main.appendChild(layout);
  }
}

function normalizeArxivPdf(absUrl) {
  return `assets/papers/arxiv-${absUrl.split("/").pop()}.pdf`;
}

function insertMetaLinks(meta, links) {
  if (links.length === 0) return;
  const suffix = links
    .map((link) => `<a class="pdf-link" href="${link.href}" target="_blank" rel="noopener">${link.label}</a>`)
    .join(" | ");
  const trimmed = meta.innerHTML.trim();
  const end = trimmed.endsWith(".") ? trimmed.slice(0, -1) : trimmed;
  meta.innerHTML = `${end}. ${suffix}.`;
}

function wrapAuthors(meta) {
  if (meta.querySelector(".authors")) return;
  const html = meta.innerHTML;
  const strongIndex = html.indexOf("<strong>");
  const arxivIndex = html.search(/<a[^>]+href="https?:\/\/arxiv\.org\/abs\//i);
  const markers = [strongIndex, arxivIndex].filter((index) => index > 0);
  if (markers.length === 0) return;
  const splitAt = Math.min(...markers);
  const lead = html.slice(0, splitAt);
  if (!lead.includes("Han Yan") && !lead.includes(",")) return;
  const leadMarked = lead.replaceAll("Han Yan", '<span class="author-self">Han Yan</span>');
  const tail = html.slice(splitAt);
  meta.innerHTML = `<span class="authors">${leadMarked}</span>${tail.startsWith(" ") ? "" : " "}${tail}`;
}

function addPdfLinks(meta) {
  if (meta.querySelector(".pdf-link")) return;
  const links = [];

  const arxivAbs = meta.querySelector('a[href*="arxiv.org/abs/"]');
  if (arxivAbs) {
    links.push({
      label: "PDF",
      href: normalizeArxivPdf(arxivAbs.href),
    });
  }

  insertMetaLinks(meta, links);
}

function enhanceResearchPublications() {
  if (currentPageName() !== "research.html") return;
  document.querySelectorAll(".publication .publication-meta").forEach((meta) => {
    wrapAuthors(meta);
    addPdfLinks(meta);
  });
}

renderSiteNav();
applyGlobalProfileLayout();
enhanceResearchPublications();
