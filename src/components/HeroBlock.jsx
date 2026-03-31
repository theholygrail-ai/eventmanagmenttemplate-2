import { NavLink } from "react-router-dom";

export default function HeroBlock({ title, copy, kicker, children, showApply = true }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="kicker hero-kicker">{kicker}</p>
          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="hero-copy-p">{copy}</p>
          <div className="hero-actions">
            {showApply && (
              <NavLink className="btn btn-primary" to="/apply#book">
                Book Discovery Call
              </NavLink>
            )}
            <NavLink className="btn btn-outline" to="/programs">
              View Our Programs
            </NavLink>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
