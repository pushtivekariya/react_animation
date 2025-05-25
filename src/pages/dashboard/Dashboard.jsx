import React, { useState } from 'react';
import { Card, Tabs, message, Typography, Row, Col } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import Animation from '../animations/Animation';
import styles from './dashboard.module.scss';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('1');

  // Actual code from the files
  const jsxCode = `import React, { useEffect, useRef } from 'react';
import './animation.scss';

const Animation = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      const particles = [];
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
      
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 20 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: (Math.random() - 0.5) * 0.02,
          waveOffset: Math.random() * Math.PI * 2,
          waveSpeed: Math.random() * 0.02 + 0.01,
          waveAmplitude: Math.random() * 20 + 10
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    const drawWave = (ctx, x, y, size, color, angle, waveOffset) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      // Draw wave shape
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      
      for (let i = -size; i <= size; i += 5) {
        const waveY = Math.sin(i * 0.1 + waveOffset) * 10;
        ctx.lineTo(i, waveY);
      }
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#2d2d2d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.angle += particle.angleSpeed;
        particle.waveOffset += particle.waveSpeed;

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

        // Draw particle
        drawWave(
          ctx,
          particle.x,
          particle.y,
          particle.size,
          particle.color,
          particle.angle,
          particle.waveOffset
        );
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="animation-container">
      <canvas ref={canvasRef} className="wave-canvas" />
      <div className="floating-text">
        <h2>Mesmerizing Waves</h2>
        <p>Watch the beautiful dance of colors</p>
      </div>
    </div>
  );
};

export default Animation;`;

  const scssCode = `@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.wave-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.floating-text {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: float 6s ease-in-out infinite;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 32px;
    margin-bottom: 12px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 18px;
    opacity: 0.9;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        message.success('Code copied to clipboard!');
      },
      () => {
        message.error('Failed to copy code');
      }
    );
  };

  const CodeBlock = ({ code, language }) => (
    <div className={styles.codeWrapper}>
      <div className={styles.codeHeader}>
        <span className={styles.language}>{language}</span>
        <button
          className={styles.copyButton}
          onClick={() => handleCopy(code)}
        >
          <CopyOutlined /> Copy
        </button>
      </div>
      <pre className={styles.codeBlock}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className={styles.dashboard}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title="Animation Preview"
            className={styles.card}
          >
            <div className={styles.previewContainer}>
              <Animation />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="Source Code"
            className={styles.card}
          >
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              type="card"
              size="middle"
            >
              <TabPane tab="JSX" key="1">
                <CodeBlock code={jsxCode} language="jsx" />
              </TabPane>
              <TabPane tab="SCSS" key="2">
                <CodeBlock code={scssCode} language="scss" />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;