import { Link } from "react-router-dom";

function Footer() {
  // const { pathname } = useLocation();
  // const isPublicFooter = ["/", "/home", "/about"].includes(pathname);

  // if (!isPublicFooter) {
  //   return (
  //     <footer className="border-t border-slate-200/90 bg-white/70 backdrop-blur-md">
  //       <div className="max-w-6xl mx-auto px-4 py-5 text-xs text-slate-600 flex flex-wrap gap-2 justify-between">
  //         <p>TeamTrack Workspace</p>
  //         <p>Secure Role-Based Task Management</p>
  //       </div>
  //     </footer>
  //   );
  // }

  return (
    <footer className="mt-8 border-t border-[#111827] bg-[#02050b] text-slate-200 font-mono">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.45fr_0.85fr_0.85fr_0.85fr_0.85fr]">
        <section className="lg:pr-8">
          <img
            src="/logoDark.svg"
            alt="TeamTrack"
            className="tt-footer-wordmark h-12 w-auto"
          />
          <p className="mt-8 max-w-md text-[15px] leading-8 text-slate-400">
            The role-based task management platform for secure team execution,
            admin control, and clean workflow visibility.
          </p>
        </section>

        <section className="space-y-7 lg:pt-1">
          <h4 className="text-[15px] font-bold tracking-wide text-slate-100">
            Products
          </h4>
          <ul className="mt-4 space-y-2.5 text-[15px] text-slate-300 underline underline-offset-4 decoration-slate-600">
            <li>
              <Link to="/home">TeamTrack</Link>
            </li>
            <li>
              <Link to="/workspace">TeamTrack Workspace</Link>
            </li>
          </ul>
        </section>

        <section className="lg:pt-1">
          <h4 className="text-[15px] font-bold tracking-wide text-slate-100">
            Resources
          </h4>
          <ul className="mt-4 space-y-2.5 text-[15px] text-slate-300 underline underline-offset-4 decoration-slate-600">
            <li>
              <a
                href="https://github.com/rohitxcodes"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://github.com/rohitxcodes/TeamTrack"
                target="_blank"
                rel="noreferrer"
              >
                Documentation
              </a>
            </li>

            <li>
              <Link to="/about#workspace-guide">Workspace Guide</Link>
            </li>
            <li>
              <Link to="/about#faq">FAQ</Link>
            </li>
          </ul>
        </section>

        <section className="lg:pt-1">
          <h4 className="text-[15px] font-bold tracking-wide text-slate-100">
            Social Media
          </h4>
          <ul className="mt-4 space-y-2.5 text-[15px] text-slate-300 underline underline-offset-4 decoration-slate-600">
            <li>
              <a
                href="https://github.com/rohitxcodes"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/hixrohit"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://x.com/devrohitxcodes"
                target="_blank"
                rel="noreferrer"
              >
                X (Twitter)
              </a>
            </li>
          </ul>
        </section>

        <section className="lg:pt-1">
          <h4 className="text-[15px] font-bold tracking-wide text-slate-100">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-[15px] text-slate-300 underline underline-offset-4 decoration-slate-600">
            <li>
              <a href="mailto:rohitvis695@gmail.com">Contact us</a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
