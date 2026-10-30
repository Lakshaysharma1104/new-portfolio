import { useEffect, useMemo, useState } from "react";

const ICON = {
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  react:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  tailwind:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  spring:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  postgres:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  kafka:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  github:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  vscode:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
};

const skills = [
  { name: "Java", group: "Languages", icon: ICON.java },
  { name: "JavaScript", group: "Languages", icon: ICON.javascript },
  { name: "React.js", group: "Frontend", icon: ICON.react },
  { name: "HTML", group: "Frontend", icon: ICON.html },
  { name: "CSS", group: "Frontend", icon: ICON.css },
  { name: "Tailwind CSS", group: "Frontend", icon: ICON.tailwind },
  { name: "Spring Boot", group: "Backend", icon: ICON.spring },
  { name: "REST APIs", group: "Backend", icon: ICON.spring },
  { name: "Microservices", group: "Backend", icon: ICON.spring },
  { name: "Spring Security", group: "Backend", icon: ICON.spring },
  { name: "JWT", group: "Backend", icon: ICON.spring },
  { name: "Apache Kafka", group: "Backend", icon: ICON.kafka, invert: true },
  { name: "Spring AI", group: "Backend", icon: ICON.spring },
  { name: "PostgreSQL", group: "Database", icon: ICON.postgres },
  { name: "Git", group: "Tools", icon: ICON.git },
  { name: "GitHub", group: "Tools", icon: ICON.github, invert: true },
  { name: "VS Code", group: "Tools", icon: ICON.vscode },
  { name: "DSA / OOP", group: "Core", icon: ICON.java },
];

const projects = [
  {
    featured: true,
    title: "AI-Powered Help Desk",
    period: "2024 — present",
    blurb:
      "Conversational support system with Spring Boot and Spring AI. Streams answers in real time, tracks conversations, and manages tickets with priority, status, timestamps, and user email in PostgreSQL.",
    tags: ["Spring Boot", "Spring AI", "PostgreSQL", "React", "Streaming APIs"],
    live: "https://help-desk-bot-dusky.vercel.app/",
    github: "https://github.com/Lakshaysharma1104/Help-desk-bot",
  },
  {
    title: "AI-Powered Fitness App",
    period: "2024 — present",
    blurb:
      "Workout and health tracker with a responsive UI, goal management, and AI-driven fitness suggestions. Backend and microservices handle user activity and recommendations.",
    tags: ["React", "Spring Boot", "Microservices", "AI"],
    github: "https://github.com/Lakshaysharma1104/GoalZen",
    extra: [
      { label: "Backend", href: "https://github.com/Lakshaysharma1104/Fitness_Backend" },
      {
        label: "Microservices",
        href: "https://github.com/Lakshaysharma1104/Fitness_Miceroservice",
      },
    ],
  },
  {
    title: "Student Placement Portal",
    period: "2025 — present",
    blurb:
      "Microservices placement platform for students, companies, jobs, and applications. JWT auth, role-based access, API Gateway, Eureka discovery, and secure RestClient communication.",
    tags: ["Java", "Spring Boot", "JWT", "Eureka", "API Gateway"],
    github: "https://github.com/Lakshaysharma1104/Student-Placement-Project",
  },
];

const roles = [
  "Java Full Stack Developer",
  "Spring Boot Engineer",
  "React.js Builder",
  "Open to internships",
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [spot, setSpot] = useState({ x: 200, y: 200 });
  const [progress, setProgress] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const groups = useMemo(
    () => ["All", ...new Set(skills.map((s) => s.group))],
    []
  );
  const visibleSkills =
    filter === "All" ? skills : skills.filter((s) => s.group === filter);

  useEffect(() => {
    const onMove = (e) => setSpot({ x: e.clientX, y: e.clientY });
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const word = roles[roleIndex];
    if (typed.length < word.length) {
      const t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 70);
      return () => clearTimeout(t);
    }
    const hold = setTimeout(() => {
      setTyped("");
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 1600);
    return () => clearTimeout(hold);
  }, [typed, roleIndex]);

  const copy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${label} copied`);
    } catch {
      setToast(value);
    }
    setTimeout(() => setToast(""), 2200);
  };

  const sendMail = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:sharmalakshay9000@gmail.com?subject=${encodeURIComponent(
      `Hello Lakshay — ${form.name}`
    )}&body=${body}`;
  };

  return (
    <>
      <div className="noise" />
      <div className="spotlight" style={{ left: spot.x, top: spot.y }} />
      <div className="progress" style={{ width: `${progress}%` }} />

      <nav className="nav">
        <a className="logo" href="#top">
          LS<span>.</span>
        </a>
        <ul className="nav-links">
          {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>
        <a className="nav-cta" href="#contact">
          Hire me
        </a>
        <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)}>
          Menu
        </button>
      </nav>
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>

      <header className="hero" id="top">
        <div>
          <p className="eyebrow">
            <span className="dot" /> Available for internships & full-time
          </p>
          <h1>
            Lakshay
            <br />
            <em>Sharma</em>
          </h1>
          <p className="role">
            {typed}
            <span style={{ opacity: 0.45 }}>|</span>
          </p>
          <p className="lead">
            CSE student at JMIT, building scalable backends with Java, Spring
            Boot, React, and PostgreSQL. I care about clean APIs, real product
            flows, and software that recruiters can actually click and try.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              Get in touch
            </a>
            <a className="btn btn-ghost" href="/Lakshay_Sharma_Resume.pdf" download>
              Download resume
            </a>
            <a
              className="btn btn-ghost"
              href="https://help-desk-bot-dusky.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Live help desk
            </a>
          </div>
          <div className="meta-row">
            <span>Yamunanagar, Haryana</span>
            <span>B.Tech CSE · 2023–2027</span>
            <span>CGPA 6.89 / 5th sem</span>
          </div>
        </div>
        <div className="photo-wrap">
          <div className="float-card">
            Smart India Hackathon
            <br />
            <strong>Internal Hackathon 2025</strong>
          </div>
          <div className="photo-frame">
            <img src="/lakshay.jpg" alt="Lakshay Sharma speaking at Smart India Hackathon" />
            <div className="photo-badge">JMIT · Radaur · SIH 2025</div>
          </div>
        </div>
      </header>

      <section id="about">
        <p className="section-kicker">About</p>
        <h2>Backend-minded, product-aware.</h2>
        <div className="about-grid">
          <article className="card">
            <p>
              I am a Computer Science student focused on Java full stack
              development. I like taking a messy real-world workflow — support
              tickets, workouts, campus placements — and turning it into
              services, APIs, and a UI people can use.
            </p>
            <p style={{ marginTop: 14 }}>
              Recent work includes an AI help desk with live streaming replies,
              a fitness platform with microservices, and a placement portal with
              JWT, API Gateway, and Eureka. Off the keyboard: chess, music, and
              sketching.
            </p>
            <div className="stat-row">
              <div className="stat">
                <b>3</b>
                <span>flagship projects</span>
              </div>
              <div className="stat">
                <b>2</b>
                <span>developer internships</span>
              </div>
              <div className="stat">
                <b>3 yrs</b>
                <span>HighFliers leadership</span>
              </div>
            </div>
          </article>
          <article className="card edu">
            <p className="when">Education</p>
            <h3>B.Tech, Computer Science & Engineering</h3>
            <p>
              Seth Jai Parkash Mukand Lal Institute of Engineering & Technology
              (JMIT), Yamunanagar
            </p>
            <p style={{ marginTop: 12 }}>2023 – 2027 · CGPA 6.89 (till 5th semester)</p>
          </article>
        </div>
      </section>

      <section id="skills">
        <p className="section-kicker">Skills</p>
        <h2>Languages, frameworks, tools.</h2>
        <div className="interest-row" style={{ marginBottom: 22 }}>
          {groups.map((g) => (
            <button
              key={g}
              className="pill"
              onClick={() => setFilter(g)}
              style={{
                color: filter === g ? "#1a0d04" : undefined,
                background: filter === g ? "var(--accent)" : undefined,
                borderColor: filter === g ? "var(--accent)" : undefined,
                cursor: "pointer",
              }}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="skill-grid">
          {visibleSkills.map((skill) => (
            <div className="card skill" key={skill.name}>
              <img className={skill.invert ? "invert" : ""} src={skill.icon} alt="" />
              <div>
                <strong>{skill.name}</strong>
                <br />
                <small>{skill.group}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience">
        <p className="section-kicker">Experience</p>
        <h2>Internships that built the core.</h2>
        <div className="exp-grid">
          <article className="card">
            <p className="when">Internship</p>
            <h3>Java Developer Intern</h3>
            <p style={{ margin: "6px 0 12px" }}>Stepping Skills</p>
            <p>
              Strengthened core Java, OOP, and problem-solving for backend work.
              Practiced small backend modules and data-structure based solutions.
            </p>
          </article>
          <article className="card">
            <p className="when">Internship</p>
            <h3>Spring Boot Developer Intern</h3>
            <p style={{ margin: "6px 0 12px" }}>Grapes Solutions</p>
            <p>
              Built and tested backend modules with REST APIs, dependency
              injection, Spring Data JPA, and a relational database.
            </p>
          </article>
        </div>
      </section>

      <section id="projects">
        <p className="section-kicker">Projects</p>
        <h2>Things you can open today.</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <article
              className={`card project ${project.featured ? "featured" : ""}`}
              key={project.title}
            >
              {project.featured && (
                <div className="project-visual">
                  <img src={ICON.spring} alt="" />
                </div>
              )}
              <div className={project.featured ? "project-copy" : ""}>
                <p className="when">{project.period}</p>
                <h3 style={{ fontSize: 28, margin: "8px 0 10px" }}>{project.title}</h3>
                <p>{project.blurb}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="links">
                  {project.live && (
                    <a className="chip-link" href={project.live} target="_blank" rel="noreferrer">
                      Live demo
                    </a>
                  )}
                  <a className="chip-link" href={project.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  {project.extra?.map((item) => (
                    <a
                      className="chip-link"
                      href={item.href}
                      key={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="leadership">
        <p className="section-kicker">Leadership</p>
        <h2>HighFliers Club · 2023–2027</h2>
        <article className="card">
          <p>
            Grew from volunteer to Co-Convenor over three years. Coordinated
            teams for college-wide events and MUNs, and learned how to plan
            under pressure — the same muscle I use to ship software on a
            deadline.
          </p>
          <div className="interest-row" style={{ marginTop: 18 }}>
            <span className="pill">Chess</span>
            <span className="pill">Music</span>
            <span className="pill">Sketching</span>
            <span className="pill">DSA on LeetCode (Java)</span>
          </div>
        </article>
      </section>

      <section id="contact">
        <p className="section-kicker">Contact</p>
        <h2>Recruiters, let’s talk.</h2>
        <div className="contact-grid">
          <div className="card contact-card">
            <p style={{ marginBottom: 8 }}>
              Fastest way: email or WhatsApp. I usually reply the same day.
            </p>
            <button
              onClick={() => copy("sharmalakshay9000@gmail.com", "Email")}
            >
              Email <span>sharmalakshay9000@gmail.com</span>
            </button>
            <a href="tel:+917988239151">
              Phone <span>+91 79882 39151</span>
            </a>
            <a href="https://wa.me/917988239151" target="_blank" rel="noreferrer">
              WhatsApp <span>Message now</span>
            </a>
            <a
              href="https://www.linkedin.com/in/lakshay-sharma-52070a383"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span>lakshay-sharma-52070a383</span>
            </a>
            <a href="https://github.com/Lakshaysharma1104" target="_blank" rel="noreferrer">
              GitHub <span>Lakshaysharma1104</span>
            </a>
            <a href="/Lakshay_Sharma_Resume.pdf" download>
              Resume <span>PDF download</span>
            </a>
          </div>
          <form className="card" onSubmit={sendMail}>
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Work email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              required
              placeholder="Role, timeline, or a short note"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button className="btn btn-primary" type="submit">
              Send message
            </button>
          </form>
        </div>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} Lakshay Sharma</span>
        <span>Java · Spring Boot · React</span>
      </footer>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
