import Navbar from './components/Navbar'
import BrokenNav from './components/BrokenNav'

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <header className="demo__header" id="home">
          <h1>React Responsive Navbar&nbsp;— Overlap Fix</h1>
          <p>
            A demo of a responsive navbar along with a fix for a common bug: content
            hidden (overlapped) by the navbar.
          </p>
        </header>

        <div className="demo">
          <section className="demo-block" id="before">
            <h2>
              <span className="badge badge--broken">Before · Bug</span>
              Navbar with <code>position: fixed</code> and no compensation
            </h2>
            <p>
              Because <code>fixed</code> takes the element out of the document flow,
              the content area slides up underneath the navbar. The "Hidden Content"
              title gets covered, exactly like the overlap bug often encountered.
            </p>
            <div className="before">
              <BrokenNav />
              <div className="before-content">
                <span className="title">Hidden Content</span>
                <p className="lines">
                  This text should start at the top edge, but the navbar covers it.<br />
                  You need compensating padding-top equal to the navbar height (without it = overlap).<br />
                  Buttons / headings end up hidden behind the navbar.
                </p>
              </div>
            </div>
          </section>

          <section className="demo-block" id="features">
            <h2>
              <span className="badge badge--fixed">After · Fix</span>
              Navbar with <code>position: sticky</code>
            </h2>
            <p>
              <code>sticky</code> keeps its space in the document flow, so content is
              never hidden — try scrolling this page, the navbar sticks to the top
              without overlapping the content.
            </p>
            <div className="after">
              <p>
                <strong>Fix applied in this demo:</strong>
              </p>
              <ul className="fix-list">
                <li>
                  Replace <code>position: fixed</code> →{' '}
                  <code>position: sticky; top: 0</code>
                </li>
                <li>
                  Lock the navbar height in the CSS variable <code>--nav-height</code>{' '}
                  so it stays consistent across screens
                </li>
                <li>
                  If you must keep <code>fixed</code>: give the content{' '}
                  <code>padding-top</code> equal to the navbar height
                </li>
                <li>
                  Combine with <code>scroll-padding-top</code> so anchor jumps (menu
                  links) are not hidden behind the navbar
                </li>
              </ul>
            </div>
          </section>

          <section className="demo-block" id="content">
            <h2>Responsive Menu</h2>
            <p>
              Width ≥ 768px: all links show horizontally. Width &lt; 768px: links are
              hidden and replaced with a hamburger button that opens a dropdown menu —
              try shrinking the browser width (or open device mode in DevTools).
            </p>
          </section>

          <section className="demo-block" id="about">
            <h2>About</h2>
            <p>
              A simple React + Vite app: one responsive, overlap-free Navbar component,
              complete with a before/after comparison of the fix.
            </p>
          </section>
        </div>
      </main>

      <footer>React Responsive Navbar Overlap Fix — 2026</footer>
    </div>
  )
}