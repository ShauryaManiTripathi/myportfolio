// Shimmer Canvas Component - React wrapper for PixelCanvas
import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../../context/ThemeContext';

// Pixel class for individual shimmer particles
class Pixel {
  constructor(x, y, canvas, options = {}) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.opacity = 0;
    this.targetOpacity = 0;
    this.fadeSpeed = options.fadeSpeed || 0.05;
    this.colors = options.colors || ['#90caf9', '#ff9e80', '#4caf50'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.size = options.size || 2;
  }

  update() {
    // Instant opacity change for immediate effect
    this.opacity = this.targetOpacity;
    
    // Add random blinking/sparkling effect
    if (this.opacity > 0 && Math.random() < 0.1) {
      this.opacity *= Math.random() * 0.5 + 0.5; // Random flicker
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

  fadeIn() {
    this.targetOpacity = Math.random() * 0.9 + 0.1; // Random opacity between 0.1-1
    // Randomly change color for more dynamic effect
    if (Math.random() < 0.3) {
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  }

  fadeOut() {
    this.targetOpacity = 0;
  }
}

// PixelCanvas class for managing the shimmer animation
class PixelCanvas {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.pixels = [];
    this.isAnimating = false;
    this.gap = options.gap || 8;
    this.colors = options.colors || ['#90caf9', '#ff9e80', '#4caf50'];
    this.fadeSpeed = options.fadeSpeed || 0.05;
    this.pixelSize = options.pixelSize || 2;
    this.density = options.density || 0.3; // Percentage of pixels to show
    this.parentElement = options.parentElement || null;
    
    this.initializePixels();
    this.bindEvents();
  }

  initializePixels() {
    this.pixels = [];
    
    for (let x = 0; x < this.canvas.width; x += this.gap) {
      for (let y = 0; y < this.canvas.height; y += this.gap) {
        if (Math.random() < this.density) {
          this.pixels.push(new Pixel(x, y, this.canvas, {
            colors: this.colors,
            fadeSpeed: this.fadeSpeed,
            size: this.pixelSize
          }));
        }
      }
    }
  }

  bindEvents() {
    // Bind to parent element instead of canvas to work with pointer-events: none
    const target = this.parentElement || this.canvas;
    
    this.handleMouseEnter = () => this.startAnimation();
    this.handleMouseLeave = () => this.stopAnimation();
    this.handleFocus = () => this.startAnimation();
    this.handleBlur = () => this.stopAnimation();
    
    target.addEventListener('mouseenter', this.handleMouseEnter);
    target.addEventListener('mouseleave', this.handleMouseLeave);
    target.addEventListener('focus', this.handleFocus);
    target.addEventListener('blur', this.handleBlur);
  }

  startAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      // Instantly fade in all pixels for immediate effect
      this.pixels.forEach(pixel => pixel.fadeIn());
      this.animate();
    }
  }

  stopAnimation() {
    this.isAnimating = false;
    // Instantly fade out all pixels for immediate removal
    this.pixels.forEach(pixel => pixel.fadeOut());
    // Clear the canvas immediately
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animate() {
    if (!this.isAnimating) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.pixels.forEach(pixel => {
      pixel.update();
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
    const target = this.parentElement || this.canvas;
    
    target.removeEventListener('mouseenter', this.handleMouseEnter);
    target.removeEventListener('mouseleave', this.handleMouseLeave);
    target.removeEventListener('focus', this.handleFocus);
    target.removeEventListener('blur', this.handleBlur);
  }
}

// Styled canvas container
const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  border-radius: inherit;
  overflow: hidden;
`;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

// React component wrapper
const ShimmerCanvas = ({ 
  gap = 8, 
  fadeSpeed = 0.05, 
  pixelSize = 2, 
  density = 0.3,
  customColors = null,
  autoStart = false,
  className = '',
  ...props 
}) => {
  const canvasRef = useRef(null);
  const pixelCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { theme } = useTheme();

  // Get theme-appropriate colors
  const getShimmerColors = useCallback(() => {
    if (customColors) return customColors;
    
    return [
      theme.primary,
      theme.accent,
      `${theme.primary}80`,
      `${theme.accent}80`
    ];
  }, [theme, customColors]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.ceil(rect.width),
          height: Math.ceil(rect.height)
        });
      }
    };

    // Initial size
    handleResize();

    // Resize observer
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Initialize PixelCanvas
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Get the parent element (the card container)
    const parentElement = containerRef.current?.parentElement;

    pixelCanvasRef.current = new PixelCanvas(canvas, {
      gap,
      colors: getShimmerColors(),
      fadeSpeed,
      pixelSize,
      density,
      parentElement
    });

    // Auto-start animation if requested
    if (autoStart) {
      setTimeout(() => {
        if (pixelCanvasRef.current) {
          pixelCanvasRef.current.startAnimation();
        }
      }, 100);
    }

    return () => {
      if (pixelCanvasRef.current) {
        pixelCanvasRef.current.destroy();
      }
    };
  }, [dimensions, gap, fadeSpeed, pixelSize, density, getShimmerColors, autoStart]);

  // Update colors when theme changes
  useEffect(() => {
    if (pixelCanvasRef.current) {
      pixelCanvasRef.current.updateColors(getShimmerColors());
    }
  }, [getShimmerColors]);

  return (
    <CanvasContainer ref={containerRef} className={className} {...props}>
      <StyledCanvas ref={canvasRef} />
    </CanvasContainer>
  );
};

export default ShimmerCanvas;
