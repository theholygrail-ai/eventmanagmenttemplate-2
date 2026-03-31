import { NavLink } from "react-router-dom";

export default function CtaBand() {
  return (
    <section className="cta-band reveal">
      <div className="container">
        <h2>Ready to build your next premium conversion moment?</h2>
        <p>Apply once, then choose the right engagement tier with our team.</p>
        <NavLink className="btn btn-outline" to="/results#case-study">
          Read Full Case Study
        </NavLink>
        <NavLink className="btn btn-primary cta-pulse" to="/apply#book">
          Start Application
        </NavLink>
      </div>
    </section>
  );
}
