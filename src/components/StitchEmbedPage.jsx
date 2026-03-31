import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ROUTE_TO_FILE = {
  "/": "/home_cinematic_l_atelier/code.html",
  "/programs": "/services_overview_l_atelier/code.html",
  "/results": "/the_gallery_of_dreams_l_atelier/code.html",
  "/apply": "/event_inquiry_funnel_l_atelier/code.html"
};

export default function StitchEmbedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const src = useMemo(() => ROUTE_TO_FILE[location.pathname] || ROUTE_TO_FILE["/"], [location.pathname]);

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
        title={`stitch-page-${location.pathname}`}
        src={src}
        onLoad={onLoad}
        style={{ border: 0, width: "100%", minHeight: "calc(100vh - 76px)", background: "#fff" }}
      />
    </main>
  );
}
