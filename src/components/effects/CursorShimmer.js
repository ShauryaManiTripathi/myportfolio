// CursorShimmer Component - Global shimmer effect that follows cursor
import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../../context/ThemeContext';

// Pixel class for cursor shimmer particles
class CursorPixel {
  constructor(x, y, options = {}) {
    this.x = x;
    this.y = y;
    this.baseOpacity = Math.random() * 0.3 + 0.1; // Base opacity when visible
    this.opacity = 0;
    this.colors = options.colors || ['#90caf9', '#ff9e80', '#4caf50'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.size = options.size || 1.5;
    this.maxRadius = options.maxRadius || 200;
    this.fadeRadius = options.fadeRadius || 150;
  }

  update(mouseX, mouseY) {
    const distance = Math.sqrt(
      Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2)
    );

    if (distance <= this.maxRadius) {
      // Calculate opacity based on distance from cursor
      let proximityOpacity;
      if (distance <= this.fadeRadius) {
        // Full opacity within fade radius
        proximityOpacity = 1;
      } else {
        // Fade out from fade radius to max radius
        const fadeDistance = this.maxRadius - this.fadeRadius;
        const currentFadeDistance = distance - this.fadeRadius;
        proximityOpacity = 1 - (currentFadeDistance / fadeDistance);
      }
      
      this.opacity = this.baseOpacity * proximityOpacity;
      
      // Add random sparkle effect when near cursor
      if (distance <= this.fadeRadius && Math.random() < 0.05) {
        this.opacity *= Math.random() * 0.5 + 0.8;
        // Occasionally change color
        if (Math.random() < 0.1) {
          this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        }
      }
    } else {
      this.opacity = 0;
    }
  }

  draw(ctx) {
    if (this.opacity > 0.01) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.restore();
    }
  }
}

// CursorShimmerCanvas class
class CursorShimmerCanvas {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.pixels = [];
    this.isAnimating = false;
    this.mouseX = -1000;
    this.mouseY = -1000;
    this.gap = options.gap || 12;
    this.colors = options.colors || ['#90caf9', '#ff9e80', '#4caf50'];
    this.pixelSize = options.pixelSize || 1.5;
    this.density = options.density || 0.4;
    this.maxRadius = options.maxRadius || 200;
    this.fadeRadius = options.fadeRadius || 150;
    
    this.initializePixels();
    this.bindEvents();
    this.startAnimation();
  }

  initializePixels() {
    this.pixels = [];
    
    for (let x = 0; x < this.canvas.width; x += this.gap) {
      for (let y = 0; y < this.canvas.height; y += this.gap) {
        if (Math.random() < this.density) {
          this.pixels.push(new CursorPixel(x, y, {
            colors: this.colors,
            size: this.pixelSize,
            maxRadius: this.maxRadius,
            fadeRadius: this.fadeRadius
          }));
        }
      }
    }
  }

  bindEvents() {
    this.handleMouseMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    };

    this.handleMouseLeave = () => {
      this.mouseX = -1000;
      this.mouseY = -1000;
    };

    // Listen to mouse events on the entire window
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseleave', this.handleMouseLeave);
  }

  startAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animate();
    }
  }

  stopAnimation() {
    this.isAnimating = false;
  }

  animate() {
    if (!this.isAnimating) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.pixels.forEach(pixel => {
      pixel.update(this.mouseX, this.mouseY);
      pixel.draw(this.ctx);
    });

    requestAnimationFrame(() => this.animate());
  }

  resize() {
    this.initializePixels();
  }

  updateColors(newColors) {
    this.colors = newColors;
    this.pixels.forEach(pixel => {
      pixel.colors = newColors;
      pixel.color = newColors[Math.floor(Math.random() * newColors.length)];
    });
  }

  destroy() {
    this.isAnimating = false;
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}

// Styled components
const CursorShimmerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
`;

const CursorShimmerCanvasElement = styled.canvas`
  width: 100%;
  height: 100%;
`;

// React component
const CursorShimmer = ({ 
  gap = 12,
  pixelSize = 1.5,
  density = 0.4,
  maxRadius = 200,
  fadeRadius = 150,
  customColors = null,
  enabled = true,
  ...props 
}) => {
  const canvasRef = useRef(null);
  const shimmerCanvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { theme } = useTheme();

  // Get theme-appropriate colors
  const getShimmerColors = useCallback(() => {
    if (customColors) return customColors;
    
    return [
      theme.primary,
      theme.accent,
      `${theme.primary}60`,
      `${theme.accent}60`,
      `${theme.primary}40`,
      `${theme.accent}40`
    ];
  }, [theme, customColors]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize shimmer canvas
  useEffect(() => {
    if (!enabled || !canvasRef.current || dimensions.width === 0 || dimensions.height === 0) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    shimmerCanvasRef.current = new CursorShimmerCanvas(canvas, {
      gap,
      colors: getShimmerColors(),
      pixelSize,
      density,
      maxRadius,
      fadeRadius
    });

    return () => {
      if (shimmerCanvasRef.current) {
        shimmerCanvasRef.current.destroy();
      }
    };
  }, [enabled, dimensions, gap, pixelSize, density, maxRadius, fadeRadius, getShimmerColors]);

  // Update colors when theme changes
  useEffect(() => {
    if (shimmerCanvasRef.current) {
      shimmerCanvasRef.current.updateColors(getShimmerColors());
    }
  }, [getShimmerColors]);

  if (!enabled) {
    return null;
  }

  return (
    <CursorShimmerContainer {...props}>
      <CursorShimmerCanvasElement ref={canvasRef} />
    </CursorShimmerContainer>
  );
};

export default CursorShimmer;
