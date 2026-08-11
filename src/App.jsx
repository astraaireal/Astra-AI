import React, { useState, useEffect, useRef } from 'react';

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
    scroll-behavior: smooth;
  }

  body {
    background-color: #030712;
    color: #ffffff;
    overflow-x: hidden;
  }

  /* GLOW TEXT EFFECTS */
  .hero-title-blue {
    background: linear-gradient(135deg, #38BDF8 0%, #1E90FF 50%, #60A5FA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 30px rgba(30, 144, 255, 0.6));
  }

  /* GLASS CARDS */
  .glass-card {
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    border-color: rgba(56, 189, 248, 0.3);
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(30, 144, 255, 0.15);
  }

  /* BUTTONS */
  .btn-blue {
    background: linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%);
    color: #ffffff;
    font-weight: 700;
    font-size: 14px;
    padding: 14px 28px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 25px rgba(37, 99, 235, 0.5);
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    cursor: pointer;
  }

  .btn-blue:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
  }

  .btn-outline {
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
    font-weight: 600;
    font-size: 14px;
    padding: 14px 28px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    cursor: pointer;
  }

  .btn-outline:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .grid-bg {
    background-size: 50px 50px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  }

  .glow-orb-center {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(30, 144, 255, 0.15) 0%, rgba(3, 7, 18, 0) 70%);
    pointer-events: none;
    z-index: 1;
  }
`;

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
}

export default function App() {
  return (
    <div style={{ backgroundColor: '#030712', minHeight: '100vh', color: '#fff', position: 'relative' }} className="grid-bg">
      <style>{customStyles}</style>
      <ParticleCanvas />

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        padding: '16px 60px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(3, 7, 18, 0.75)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/logo.png" 
            onError={(e) => { e.target.style.display = 'none'; }}
            alt="ASTRA AI" 
            style={{ height: '38px', width: 'auto', objectFit: 'contain' }} 
          />
          <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '3px', color: '#fff' }}>
            ASTRA <span style={{ color: '#38BDF8', fontSize: '14px', letterSpacing: '2px' }}>AI</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '32px', fontSize: '13px', fontWeight: '500', color: '#94a3b8' }}>
          <a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a>
          <a href="#solutions" style={{ color: 'inherit', textDecoration: 'none' }}>Solutions</a>
          <a href="#work" style={{ color: 'inherit', textDecoration: 'none' }}>Work</a>
          <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
          <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
        </div>

        <a href="#contact" className="btn-blue" style={{ padding: '10px 22px', fontSize: '13px' }}>
          Book a Call →
        </a>
      </nav>

      {/* HERO SECTION */}
      <section id="home" style={{ paddingTop: '160px', paddingBottom: '100px', paddingLeft: '80px', paddingRight: '80px', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center', zIndex: 10, position: 'relative' }}>
        <div>
          <h1 style={{ fontSize: '64px', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-1px' }}>
            AI That Works.<br />
            <span className="hero-title-blue">Results That Last.</span>
          </h1>

          <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: '1.6', maxWidth: '520px', marginBottom: '36px', fontWeight: '400' }}>
            We build intelligent AI solutions that automate tasks, reduce costs, and scale your business to new heights.
          </p>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
            <a href="#contact" className="btn-blue">
              Book a Free Consultation →
            </a>
            <a href="#work" className="btn-outline">
              Explore Our Work ›
            </a>
          </div>

          {/* STATS OVERVIEW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>50+</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Projects Delivered</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>30+</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Happy Clients</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>10x</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Efficiency Gain</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>99.9%</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Uptime & Reliability</div>
            </div>
          </div>
        </div>

        {/* HERO GRAPHIC RIGHT */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div className="glow-orb-center"></div>
          <img 
            src="/logo.png" 
            alt="ASTRA AI Metallic Emblem" 
            style={{ 
              width: '100%', 
              maxWidth: '480px', 
              height: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 50px rgba(56, 189, 248, 0.4))',
              position: 'relative',
              zIndex: 2
            }} 
          />
        </div>
      </section>

      {/* OUR AI SOLUTIONS */}
      <section id="solutions" style={{ padding: '80px 80px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Our AI Solutions</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Powerful solutions for a smarter tomorrow</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            {
              icon: "🤖",
              title: "AI Agents",
              desc: "Intelligent agents that automate tasks and handle complex workflows."
            },
            {
              icon: "🎙️",
              title: "Voice AI",
              desc: "Natural conversations that engage, assist and convert effortlessly."
            },
            {
              icon: "⚡",
              title: "Automation",
              desc: "Streamline operations and save time with AI-powered automation."
            }
          ].map((card, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '36px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '24px'
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{card.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', marginBottom: '24px' }}>{card.desc}</p>
              <a href="#contact" style={{ color: '#38BDF8', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}>→</a>
            </div>
          ))}
        </div>

        {/* TRUSTED BRANDS */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#64748b', letterSpacing: '1px', marginBottom: '30px' }}>TRUSTED BY INNOVATIVE BRANDS</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', opacity: 0.5, flexWrap: 'wrap', fontSize: '14px', fontWeight: '600' }}>
            <span>Acme Corp</span>
            <span>Globex</span>
            <span>InnoSync</span>
            <span>Vertex</span>
            <span>Nexora</span>
            <span>BuildSmart</span>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ASTRA AI */}
      <section id="about" style={{ padding: '80px 80px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Why Choose Astra AI</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            { title: "Cutting-Edge AI", desc: "Latest technologies for maximum impact" },
            { title: "Built for Scale", desc: "Solutions that grow with your business" },
            { title: "Secure & Reliable", desc: "Enterprise-grade security you can trust" },
            { title: "24/7 Support", desc: "Always here when you need us" }
          ].map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h4>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR PROCESS */}
      <section id="work" style={{ padding: '80px 80px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Our Process</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>A proven journey to powerful results</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            { step: "01", title: "Discover", desc: "We understand your goals and challenges" },
            { step: "02", title: "Design", desc: "We create a tailored AI solution for you" },
            { step: "03", title: "Build", desc: "We develop and test with precision" },
            { step: "04", title: "Deploy", desc: "We launch and support for ongoing success" }
          ].map((proc, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '28px' }}>
              <div style={{ fontSize: '12px', color: '#38BDF8', fontWeight: '700', fontFamily: 'JetBrains Mono', marginBottom: '12px' }}>{proc.step}</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{proc.title}</h4>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 80px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>What Our Clients Say</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Trusted by businesses building a smarter tomorrow</p>
        </div>

        <div className="glass-card" style={{ padding: '40px', position: 'relative' }}>
          <div style={{ fontSize: '32px', color: '#38BDF8', marginBottom: '16px' }}>“</div>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#e2e8f0', marginBottom: '24px' }}>
            Astra AI transformed our operations and helped us scale faster than we imagined. Their AI solutions are a game changer!
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#38BDF8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#000' }}>JC</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700' }}>John Carter</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>CEO, Acme Corp</div>
            </div>
          </div>
        </div>
      </section>

      {/* READY TO BUILD CTA BANNER */}
      <section id="contact" style={{ padding: '80px 80px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div className="glass-card" style={{
          padding: '60px', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 144, 255, 0.1) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.2)'
        }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>Ready to Build the Future?</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '32px' }}>Let's create intelligent solutions that drive real results.</p>
          <a href="#contact" className="btn-blue">
            Book a Free Consultation →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 80px 30px', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', gap: '40px', marginBottom: '50px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '2px', marginBottom: '8px' }}>ASTRA AI</div>
            <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '1px' }}>INTELLIGENCE THAT EMPOWERS</div>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '16px' }}>Company</div>
            <div style={{ display: 'grid', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
              <span>About Us</span>
              <span>Our Process</span>
              <span>Careers</span>
              <span>Blog</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '16px' }}>Services</div>
            <div style={{ display: 'grid', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
              <span>AI Agents</span>
              <span>Voice AI</span>
              <span>Automation</span>
              <span>Integrations</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '16px' }}>Solutions</div>
            <div style={{ display: 'grid', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
              <span>For Startups</span>
              <span>For Enterprises</span>
              <span>E-commerce</span>
              <span>Healthcare</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '16px' }}>Contact</div>
            <div style={{ display: 'grid', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
              <span>hello@astraai.com</span>
              <span>+91 98765 43210</span>
              <span>India | Global</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
          <span>© 2026 Astra AI. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}