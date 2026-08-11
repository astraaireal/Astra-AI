import React, { useState, useEffect, useRef } from 'react';

// --- ULTRA-PREMIUM LUXURY STYLES ---
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

  /* GLOWING TEXT EFFECTS */
  .glow-text-cyan {
    background: linear-gradient(135deg, #ffffff 0%, #38BDF8 50%, #1E90FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 35px rgba(56, 189, 248, 0.5));
  }

  .glow-text-silver {
    background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #64748b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* GLASS CARDS & CONTAINERS */
  .glass-card {
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 24px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .glass-card:hover {
    background: rgba(15, 23, 42, 0.65);
    border-color: rgba(56, 189, 248, 0.4);
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.2);
  }

  /* BUTTON STYLES */
  .btn-primary {
    background: linear-gradient(135deg, #0284C7 0%, #2563EB 50%, #38BDF8 100%);
    color: #ffffff;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 1px;
    padding: 14px 32px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 30px rgba(37, 99, 235, 0.5);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    cursor: pointer;
  }

  .btn-primary:hover {
    transform: scale(1.04);
    box-shadow: 0 0 50px rgba(56, 189, 248, 0.8);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.03);
    color: #e2e8f0;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 1px;
    padding: 14px 32px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    cursor: pointer;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.3);
    color: #ffffff;
  }

  /* GRID & GLOW ORB BACKGROUNDS */
  .grid-bg {
    background-size: 60px 60px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  }

  .hero-orb {
    position: absolute;
    width: 650px;
    height: 650px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(56, 189, 248, 0.1) 40%, rgba(3, 7, 18, 0) 70%);
    pointer-events: none;
    z-index: 1;
    animation: pulseOrb 8s ease-in-out infinite alternate;
  }

  @keyframes pulseOrb {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.15); opacity: 1; }
  }

  /* LOGO HERO IMAGE HOVER & GLOW */
  .hero-logo-img {
    width: 100%;
    max-width: 440px;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 45px rgba(56, 189, 248, 0.45));
    transition: all 0.5s ease;
  }

  .hero-logo-img:hover {
    transform: scale(1.03) rotate(0.5deg);
    filter: drop-shadow(0 0 65px rgba(56, 189, 248, 0.7));
  }
`;

// --- INTERACTIVE BACKGROUND PARTICLES ---
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - dist / 130)})`;
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
        ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
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

// LOGO IMAGE COMPONENT WITH DOUBLE EXTENSION FALLBACK
function BrandLogoImage({ style, alt }) {
  return (
    <img 
      src="/logo.png" 
      onError={(e) => { 
        e.target.onerror = null; 
        e.target.src = "/logo.png.png"; 
      }} 
      alt={alt || "ASTRA AI Logo"} 
      style={style} 
    />
  );
}

export default function App() {
  return (
    <div style={{ backgroundColor: '#030712', minHeight: '100vh', color: '#fff', position: 'relative' }} className="grid-bg">
      <style>{customStyles}</style>
      <ParticleCanvas />

      {/* NAVIGATION BAR */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        padding: '16px 50px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(3, 7, 18, 0.8)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <BrandLogoImage style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
          <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '3px', color: '#fff' }}>
            ASTRA <span style={{ color: '#38BDF8', fontSize: '13px' }}>AI</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '32px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8' }}>
          <a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="#solutions" style={{ color: 'inherit', textDecoration: 'none' }}>Solutions</a>
          <a href="#why" style={{ color: 'inherit', textDecoration: 'none' }}>Why Us</a>
          <a href="#process" style={{ color: 'inherit', textDecoration: 'none' }}>Process</a>
          <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
        </div>

        <a href="#contact" className="btn-primary" style={{ padding: '10px 24px', fontSize: '12px' }}>
          Book Free Audit →
        </a>
      </nav>

      {/* HERO SECTION */}
      <section id="home" style={{
        paddingTop: '180px', paddingBottom: '110px', paddingLeft: '60px', paddingRight: '60px',
        maxWidth: '1350px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr',
        gap: '50px', alignItems: 'center', zIndex: 10, position: 'relative'
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '8px 20px', borderRadius: '30px',
            background: 'rgba(37, 99, 235, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38BDF8', fontSize: '11px', fontFamily: 'JetBrains Mono', letterSpacing: '2px',
            marginBottom: '28px', fontWeight: '600'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 12px #38BDF8' }}></span>
            NEXT-GEN ENTERPRISE AI AGENTS
          </div>

          <h1 style={{ fontSize: '62px', fontWeight: '900', lineHeight: '1.08', marginBottom: '22px', letterSpacing: '-1.5px' }}>
            Intelligence <br />
            <span className="glow-text-cyan">That Empowers.</span>
          </h1>

          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: '1.65', maxWidth: '530px', marginBottom: '40px', fontWeight: '300' }}>
            We architect autonomous AI systems, intelligent voice bots, and automated workflows that scale your business revenue 24/7 with zero operational friction.
          </p>

          <div style={{ display: 'flex', gap: '18px', marginBottom: '60px' }}>
            <a href="#contact" className="btn-primary">
              Book a Free Consultation →
            </a>
            <a href="#solutions" className="btn-secondary">
              Explore AI Suite ›
            </a>
          </div>

          {/* KEY METRICS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff', fontFamily: 'JetBrains Mono' }}>50+</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', letterSpacing: '0.5px' }}>Deployments</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#38BDF8', fontFamily: 'JetBrains Mono' }}>10x</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', letterSpacing: '0.5px' }}>Efficiency</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff', fontFamily: 'JetBrains Mono' }}>&lt;60s</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', letterSpacing: '0.5px' }}>Response Time</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#38BDF8', fontFamily: 'JetBrains Mono' }}>99.9%</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', letterSpacing: '0.5px' }}>Uptime</div>
            </div>
          </div>
        </div>

        {/* HERO LOGO GRAPHIC */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div className="hero-orb"></div>
          <div style={{ position: 'relative', zIndex: 2, padding: '20px' }}>
            <BrandLogoImage className="hero-logo-img" alt="ASTRA AI Emblem" />
          </div>
        </div>
      </section>

      {/* AI SOLUTIONS SECTION */}
      <section id="solutions" style={{ padding: '100px 60px', maxWidth: '1350px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div style={{ color: '#38BDF8', fontSize: '12px', fontFamily: 'JetBrains Mono', letterSpacing: '3px', marginBottom: '12px', fontWeight: '700' }}>OUR CAPABILITIES</div>
          <h2 style={{ fontSize: '40px', fontWeight: '900' }}>Autonomous AI Solutions</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {[
            {
              icon: "🤖",
              title: "Autonomous AI Agents",
              desc: "Self-learning agents capable of executing complex multi-step workflows and customer engagement.",
              tag: "AGENTS & BOT SUITE"
            },
            {
              icon: "🎙️",
              title: "Human-Like Voice AI",
              desc: "Ultra-realistic telephony voice bots that make outbound sales calls and answer customer inquiries live.",
              tag: "TELEPHONY & CALLS"
            },
            {
              icon: "⚡",
              title: "Workflow Automation",
              desc: "Seamless integration across your CRM, WhatsApp, Email, and internal databases to eliminate manual labor.",
              tag: "PROCESS INTEGRATION"
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '40px' }}>
              <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: '#38BDF8', marginBottom: '20px', letterSpacing: '1px' }}>{item.tag}</div>
              <div style={{ fontSize: '36px', marginBottom: '20px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '14px' }}>{item.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.65', fontWeight: '300' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* TRUSTED BRAND BAR */}
        <div style={{ marginTop: '90px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '2px', fontFamily: 'JetBrains Mono', marginBottom: '30px' }}>POWERING NEXT-GEN ENTERPRISES</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', opacity: 0.5, flexWrap: 'wrap', fontSize: '15px', fontWeight: '700', letterSpacing: '1px' }}>
            <span>ACME CORP</span>
            <span>GLOBEX</span>
            <span>INNOSYNC</span>
            <span>VERTEX AI</span>
            <span>NEXORA</span>
            <span>BUILDSMART</span>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ASTRA AI */}
      <section id="why" style={{ padding: '80px 60px', maxWidth: '1350px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '38px', fontWeight: '900' }}>Why Choose Astra AI</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {[
            { title: "Cutting-Edge AI", desc: "Leveraging state-of-the-art LLMs and neural vision models." },
            { title: "Built for Scale", desc: "Architected to handle millions of queries with zero latency." },
            { title: "Bank-Grade Security", desc: "Encrypted data pipelines ensuring complete privacy & compliance." },
            { title: "24/7 Active Monitoring", desc: "Dedicated support and automatic self-healing agent pipelines." }
          ].map((card, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '10px' }}>{card.title}</h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR PROCESS */}
      <section id="process" style={{ padding: '100px 60px', maxWidth: '1350px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div style={{ color: '#38BDF8', fontSize: '12px', fontFamily: 'JetBrains Mono', letterSpacing: '3px', marginBottom: '12px', fontWeight: '700' }}>ROADMAP</div>
          <h2 style={{ fontSize: '40px', fontWeight: '900' }}>Our 4-Step Process</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {[
            { num: "01", title: "Discovery", desc: "We audit your manual bottlenecks and data infrastructure." },
            { num: "02", title: "Architecture", desc: "We design custom AI models tailored to your exact business logic." },
            { num: "03", title: "Integration", desc: "We deploy and thoroughly test agents within your tech stack." },
            { num: "04", title: "Scale", desc: "Continuous optimization and monitoring for compounding ROI." }
          ].map((proc, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '32px' }}>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#38BDF8', fontFamily: 'JetBrains Mono', marginBottom: '16px' }}>{proc.num}</div>
              <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px' }}>{proc.title}</h4>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / CTA BANNER */}
      <section id="contact" style={{ padding: '100px 60px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div className="glass-card" style={{
          padding: '60px', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(37, 99, 235, 0.15) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}>
          <h2 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '14px' }}>Ready to Automate Your Empire?</h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '40px' }}>Book a 1-on-1 consultation session with our AI engineering team.</p>

          <form style={{ display: 'grid', gap: '20px', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none' }} />
              <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none' }} />
            </div>
            <textarea rows="4" placeholder="Describe your business goals..." style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', resize: 'none' }}></textarea>
            <button className="btn-primary" style={{ justifyContent: 'center', width: '100%', fontSize: '13px' }}>
              Transmit Consultation Request 🔱
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 60px 30px', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <BrandLogoImage style={{ height: '36px', width: 'auto' }} />
            <span style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '2px' }}>ASTRA AI</span>
          </div>

          <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>
            INTELLIGENCE THAT EMPOWERS
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
          <span>© 2026 ASTRA AI. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}