import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import homeHtml from "../../home_cinematic_l_atelier/code.html?raw";
import programsHtml from "../../services_overview_l_atelier/code.html?raw";
import resultsHtml from "../../the_gallery_of_dreams_l_atelier/code.html?raw";
import applyHtml from "../../event_inquiry_funnel_l_atelier/code.html?raw";

const ROUTE_TO_HTML = {
  "/": homeHtml,
  "/programs": programsHtml,
  "/results": resultsHtml,
  "/apply": applyHtml
};

export default function StitchEmbedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const html = useMemo(() => ROUTE_TO_HTML[location.pathname] || ROUTE_TO_HTML["/"], [location.pathname]);

  const onLoad = (event) => {
    const frame = event.currentTarget;
    const doc = frame.contentDocument;
    if (!doc) return;

    const mapLink = (text, href) => {
      const matches = [...doc.querySelectorAll("a,button")].filter((el) =>
        (el.textContent || "").trim().toLowerCase().includes(text)
      );
      matches.forEach((el) => {
        if (el.tagName.toLowerCase() === "a") {
          el.setAttribute("href", href);
          el.addEventListener("click", (e) => {
            e.preventDefault();
            navigate(href);
          });
        } else {
          el.style.cursor = "pointer";
          el.addEventListener("click", () => navigate(href), { once: false });
        }
      });
    };

    mapLink("home", "/");
    mapLink("services", "/programs");
    mapLink("program", "/programs");
    mapLink("gallery", "/results");
    mapLink("results", "/results");
    mapLink("inquiry", "/apply");
    mapLink("apply", "/apply");
    mapLink("plan my event", "/apply");
    mapLink("book", "/apply");
    mapLink("get a quote", "/apply");
    mapLink("start your journey", "/apply");
  };

  return (
    <main style={{ minHeight: "calc(100vh - 76px)" }}>
      <iframe
        key={location.pathname}
        title={`stitch-page-${location.pathname}`}
        srcDoc={html}
        onLoad={onLoad}
        style={{ border: 0, width: "100%", minHeight: "calc(100vh - 76px)", background: "#fff" }}
      />
    </main>
  );
}
