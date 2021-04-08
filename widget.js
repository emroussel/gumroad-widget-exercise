// NOTE: this code will only work in modern browsers, it would need to be slightly modified and transformed
// using a tool like babel, parcel, etc. to be more widly compatible, but I did not focus on this for the
// sake of this exercise
(function () {
  const gumroadDomainRegex = /^(?:https?:\/\/)?(?:([A-Za-z0-9\-.])*\.)?(?:(gumroad\.com)|(gum\.co))\/*/i;

  const loadStylesheet = () => {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.type = "text/css";
    stylesheet.href = "./stylesheet.css";
    document.head.appendChild(stylesheet);
  };

  loadStylesheet();

  window.onload = () => {
    const container = document.createElement("div");
    container.classList.add("gumroad-product-container");
    container.addEventListener("click", (e) => {
      if (!e.target.classList.contains("gumroad-product-iframe")) {
        document.body.removeChild(container);
      }
    });

    const iframe = document.createElement("iframe");
    iframe.classList.add("gumroad-product-iframe");

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });

    const onLinkClick = (e) => {
      e.preventDefault();

      document.body.appendChild(container);
      iframe.src = e.target.href;
      container.appendChild(iframe);
    };

    const onLinkHover = (e) => {
      const headLinks = Array.from(document.getElementsByTagName("link"));

      if (!headLinks.some((headLink) => headLink.href === e.target.href)) {
        const prefetcher = document.createElement("link");
        prefetcher.rel = "prefetch";
        prefetcher.href = e.target.href;
        document.head.appendChild(prefetcher);
      }
    };

    for (const link of document.links) {
      if (link.href.match(gumroadDomainRegex) && !link.hasAttribute("data-gumroad-embed-ignore")) {
        link.addEventListener("click", onLinkClick);
        link.addEventListener("mouseover", onLinkHover);
      }
    }
  };
})();
