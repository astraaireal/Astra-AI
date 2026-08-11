import React, { useState, useEffect, useRef } from 'react';

// --- INJECTED ULTRA-LUXURY STYLES ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  body {
    background-color: #030712;
    color: #ffffff;
    overflow-x: hidden;
  }

  .glow-text {
    background: linear-gradient(135deg, #ffffff 0%, #1E90FF 50%, #4CC9F0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 30px rgba(30, 144, 255, 0.6));
  }

  .glass-card {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    border-color: rgba(76, 201, 240, 0.4);
    transform: translateY(-5px);
    box-shadow: 0 25px 60px rgba(30, 144, 255, 0.2);
  }

  .btn-primary {
    background: linear-gradient(135deg, #1E90FF 0%, #4CC9F0 100%);
    color: #000;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 16px 36px;
    border-radius: 50px;
    box-shadow: 0 0 35px rgba(76, 201, 240, 0.5);
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    cursor: pointer;
  }

  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 0 55px rgba(76, 201, 240, 0.8);
  }

  .orb-3d {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #4CC9F0, #1E90FF 50%, #030712 90%);
    box-shadow: 0 0 100px rgba(76, 201, 240, 0.6), inset 0 0 50px rgba(255, 255, 255, 0.8);
    animation: floatOrb 6s ease-in-out infinite;
  }

  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }

  .grid-bg {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  }
`;

// --- CANVAS PARTICLES ---
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(76, 201, 240, ${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
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
        ctx.fillStyle = '#4CC9F0';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
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
        padding: '12px 40px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* DIRECT PUBLIC LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img 
            src="/logo.png" 
            onError={(e) => { e.target.src = "/logo.png.png"; }}
            alt="ASTRA AI" 
            style={{ 
              height: '55px', 
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 15px rgba(76, 201, 240, 0.6))' 
            }} 
          />
        </div>

        <div style={{ display: 'flex', gap: '30px', fontSize: '12px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#94a3b8' }}>
          <a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a>
          <a href="#why" style={{ color: 'inherit', textDecoration: 'none' }}>Why Us</a>
          <a href="#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a>
          <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
        </div>

        <a href="#contact" className="btn-primary" style={{ padding: '10px 24px', fontSize: '11px' }}>
          Book Free Audit
        </a>
      </nav>

      {/* HERO SECTION */}
      <section style={{ paddingTop: '180px', paddingBottom: '120px', paddingLeft: '60px', paddingRight: '60px', maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center', zIndex: 10, position: 'relative' }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '8px 20px', borderRadius: '30px',
            background: 'rgba(30, 144, 255, 0.1)', border: '1px solid rgba(76, 201, 240, 0.3)',
            color: '#4CC9F0', fontSize: '11px', fontFamily: 'JetBrains Mono', letterSpacing: '2px',
            marginBottom: '30px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CC9F0', boxShadow: '0 0 10px #4CC9F0' }}></span>
            AUTONOMOUS REAL ESTATE AI EMPLOYEES
          </div>

          <h1 style={{ fontSize: '64px', fontWeight: '900', lineHeight: '1.08', marginBottom: '24px' }}>
            AI Employees <br />
            <span className="glow-text">That Work 24/7</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: '1.6', maxWidth: '560px', marginBottom: '40px', fontWeight: '300' }}>
            We help real estate businesses automate lead capture, customer communication and follow-ups using AI—turning cold inquiries into site visits automatically.
          </p>

          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#contact" className="btn-primary" style={{ fontSize: '12px' }}>
              Book Free AI Audit →
            </a>
            <a href="#services" style={{
              padding: '16px 36px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase',
              letterSpacing: '2px', textDecoration: 'none', background: 'rgba(255,255,255,0.02)'
            }}>
              View Services
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#fff', fontFamily: 'JetBrains Mono' }}>&lt;60s</div>
              <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '1px', marginTop: '4px' }}>RESPONSE TIME</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#4CC9F0', fontFamily: 'JetBrains Mono' }}>100%</div>
              <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '1px', marginTop: '4px' }}>QUALIFICATION</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#fff', fontFamily: 'JetBrains Mono' }}>24/7</div>
              <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '1px', marginTop: '4px' }}>UPTIME</div>
            </div>
          </div>
        </div>

        {/* 3D GRAPHIC ORB */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div className="orb-3d"></div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" style={{ padding: '100px 60px', maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div style={{ color: '#4CC9F0', fontSize: '12px', fontFamily: 'JetBrains Mono', letterSpacing: '3px', marginBottom: '10px' }}>CAPABILITIES</div>
          <h2 style={{ fontSize: '42px', fontWeight: '900' }}>AI Automation Suite</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {[
            {
              title: "AI Chatbots",
              desc: "Convert website visitors into qualified property leads automatically 24/7.",
              tag: "WEB CONVERSION"
            },
            {
              title: "WhatsApp Automation",
              desc: "Respond instantly and send automated listing brochures to prospective buyers.",
              tag: "INSTANT MESSAGING"
            },
            {
              title: "AI Voice Agents",
              desc: "Human-sounding voice agents that take phone calls, answer questions & book site visits.",
              tag: "VOICE TELEPHONY"
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '40px', borderRadius: '24px' }}>
              <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: '#4CC9F0', marginBottom: '20px' }}>{item.tag}</div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '14px' }}>{item.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', fontWeight: '300' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ padding: '100px 60px', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div className="glass-card" style={{ padding: '60px', borderRadius: '32px', textAlign: 'center', border: '1px solid rgba(76, 201, 240, 0.3)' }}>
          <h2 style={{ fontSize: '38px', fontWeight: '900', marginBottom: '10px' }}>Let's Build Your AI System</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '40px' }}>Book a 1-on-1 strategy session to automate your real estate lead pipeline.</p>

          <form style={{ display: 'grid', gap: '20px', textAlign: 'left' }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none' }} />
              <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none' }} />
            </div>
            <textarea rows="4" placeholder="Describe your business goals..." style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', resize: 'none' }}></textarea>
            <button className="btn-primary" style={{ justifyContent: 'center', width: '100%', fontSize: '12px' }}>
              Transmit Consultation Request 🔱
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 60px', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>
        © 2026 ASTRA AI. ALL RIGHTS RESERVED. INTELLIGENCE THAT EMPOWERS.
      </footer>
    </div>
  );
}