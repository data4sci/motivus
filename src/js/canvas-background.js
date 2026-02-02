/**
 * Canvas Background Manager
 * Animated graph-based background with physics simulation and mouse interaction
 */

class CanvasBackgroundManager {
  constructor() {
    // Canvas elements and contexts
    this.canvas1 = null;
    this.canvas2 = null;
    this.ctx1 = null;
    this.ctx2 = null;

    // Graph data
    this.graphs = [];
    this.graphCount = 0;

    // Mouse interaction state
    this.mouse = { x: 0, y: 0, active: false };

    // Animation state
    this.animationFrameId = null;
    this.lastFrameTime = 0;
    this.fpsHistory = [];

    // Performance monitoring
    this.performanceDegradation = false;
    this.glowEnabled = true;

    // Viewport breakpoints - minimal for calm background
    this.breakpoints = {
      small: { max: 768, count: 4 },
      medium: { min: 768, max: 1440, count: 8 },
      large: { min: 1440, count: 12 }
    };

    // Interaction radii - larger and more subtle
    this.attractionRadius = 300;
    this.highlightRadius = 200;

    // Store listeners for cleanup
    this.listeners = {};

    this.init();
  }

  init() {
    // Check for reduced motion preference
    if (Utils.prefersReducedMotion()) {
      console.log('Canvas animation disabled: prefers-reduced-motion');
      return;
    }

    // Check Canvas support
    if (!this.supportsCanvas()) {
      console.warn('Canvas not supported, skipping background animation');
      return;
    }

    // Create canvas elements
    this.createCanvases();

    // Initialize graph system
    this.resizeCanvases();
    this.generateGraphs();

    // Setup event listeners
    this.setupEventListeners();

    // Start animation loop
    this.startAnimationLoop();
  }

  supportsCanvas() {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d'));
  }

  createCanvases() {
    // Create layer 1 (background)
    this.canvas1 = document.getElementById('canvas-layer-1');
    if (!this.canvas1) {
      console.error('Canvas layer 1 not found');
      return;
    }

    // Create layer 2 (foreground)
    this.canvas2 = document.getElementById('canvas-layer-2');
    if (!this.canvas2) {
      console.error('Canvas layer 2 not found');
      return;
    }

    // Get 2D contexts
    this.ctx1 = this.setupCanvas(this.canvas1);
    this.ctx2 = this.setupCanvas(this.canvas2);
  }

  setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Enable anti-aliasing
    ctx.imageSmoothingEnabled = true;

    return ctx;
  }

  resizeCanvases() {
    if (!this.canvas1 || !this.canvas2) return;

    this.ctx1 = this.setupCanvas(this.canvas1);
    this.ctx2 = this.setupCanvas(this.canvas2);
  }

  // Graph Generation

  determineGraphCount() {
    const width = window.innerWidth;

    if (width < this.breakpoints.small.max) {
      return this.breakpoints.small.count;
    } else if (width < this.breakpoints.medium.max) {
      return this.breakpoints.medium.count;
    } else {
      return this.breakpoints.large.count;
    }
  }

  generateGraphs() {
    this.graphs = [];
    this.graphCount = this.determineGraphCount();

    // Apply performance degradation if needed
    if (this.performanceDegradation) {
      this.graphCount = Math.floor(this.graphCount * 0.75);
    }

    // Layer distribution: 60% layer 1, 40% layer 2
    const layer1Count = Math.round(this.graphCount * 0.6);
    const layer2Count = this.graphCount - layer1Count;

    // Create layer 1 graphs
    for (let i = 0; i < layer1Count; i++) {
      this.graphs.push(this.createGraph(1));
    }

    // Create layer 2 graphs
    for (let i = 0; i < layer2Count; i++) {
      this.graphs.push(this.createGraph(2));
    }
  }

  createGraph(layer) {
    const nodeCount = this.randomInt(2, 4); // 2-4 nodes (reduced)
    const nodes = [];

    // Create nodes with random positions
    const width = this.canvas1.getBoundingClientRect().width;
    const height = this.canvas1.getBoundingClientRect().height;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(this.createNode(width, height));
    }

    // Create edges (40-70% connectivity)
    const edges = [];
    const maxEdges = (nodeCount * (nodeCount - 1)) / 2;
    const connectivity = 0.4 + Math.random() * 0.3; // 40-70%
    const targetEdgeCount = Math.floor(maxEdges * connectivity);

    // Generate all possible edges
    const possibleEdges = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        possibleEdges.push([i, j]);
      }
    }

    // Shuffle and take targetEdgeCount edges
    this.shuffleArray(possibleEdges);
    for (let i = 0; i < Math.min(targetEdgeCount, possibleEdges.length); i++) {
      const [a, b] = possibleEdges[i];
      edges.push(this.createEdge(nodes[a], nodes[b]));
    }

    // Ensure no orphan nodes - every node must have at least one edge
    const nodesWithEdges = new Set();
    edges.forEach(edge => {
      nodesWithEdges.add(edge.nodeA);
      nodesWithEdges.add(edge.nodeB);
    });

    // Connect orphan nodes to a random connected node
    nodes.forEach((node, index) => {
      if (!nodesWithEdges.has(node) && nodes.length > 1) {
        // Find a random node that's not this one
        const otherIndex = (index + 1 + Math.floor(Math.random() * (nodes.length - 1))) % nodes.length;
        edges.push(this.createEdge(node, nodes[otherIndex]));
      }
    });

    return { nodes, edges, layer };
  }

  createNode(width, height) {
    return {
      id: `${Date.now()}-${Math.random()}`,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.575, // -0.2875 to 0.2875 (15% faster initial velocity)
      vy: (Math.random() - 0.5) * 0.575,
      mass: 1.0,
      radius: 3,
      baseRadius: 3,
      pulsePhase: Math.random() * Math.PI * 2, // Random starting phase for morphing
      pulseSpeed: 0.003 + Math.random() * 0.002 // Gentle pulsing (0.003-0.005)
    };
  }

  createEdge(nodeA, nodeB) {
    const restLength = this.distance(nodeA, nodeB);
    const stiffness = 0.002 + Math.random() * 0.004; // 0.002-0.006 (very soft springs)

    return {
      nodeA,
      nodeB,
      restLength,
      stiffness
    };
  }

  // Physics Simulation

  updatePhysics(deltaTime) {
    const width = this.canvas1.getBoundingClientRect().width;
    const height = this.canvas1.getBoundingClientRect().height;

    this.graphs.forEach(graph => {
      graph.nodes.forEach(node => {
        // Reset forces
        let fx = 0;
        let fy = 0;

        // 1. Brownian motion (gentle autonomous drift for natural dynamics)
        fx += (Math.random() - 0.5) * 0.046; // 15% faster
        fy += (Math.random() - 0.5) * 0.046;

        // 2. Spring forces from edges with adaptive rest length
        graph.edges.forEach(edge => {
          if (edge.nodeA === node || edge.nodeB === node) {
            const other = edge.nodeA === node ? edge.nodeB : edge.nodeA;
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0) {
              // Allow rest length to slowly adapt to current distance (prevents glitches)
              const targetRestLength = dist;
              edge.restLength += (targetRestLength - edge.restLength) * 0.01; // Slowly adjust

              const displacement = dist - edge.restLength;
              const force = displacement * edge.stiffness;
              fx += (dx / dist) * force;
              fy += (dy / dist) * force;
            }
          }
        });

        // 3. Mouse attraction
        if (this.mouse.active) {
          const dx = this.mouse.x - node.x;
          const dy = this.mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < this.attractionRadius && dist > 0) {
            const strength = Math.pow(1 - dist / this.attractionRadius, 2) * 0.03; // Extremely subtle magnetism
            fx += (dx / dist) * strength;
            fy += (dy / dist) * strength;
          }
        }

        // Apply forces to velocity
        node.vx += fx;
        node.vy += fy;

        // Apply gentle damping to allow free movement
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Integrate velocity to position
        node.x += node.vx * deltaTime;
        node.y += node.vy * deltaTime;

        // Wrap-around boundaries
        if (node.x < 0) node.x += width;
        if (node.x > width) node.x -= width;
        if (node.y < 0) node.y += height;
        if (node.y > height) node.y -= height;

        // Self-morphing: slowly pulse node size with more visible amplitude
        node.pulsePhase += node.pulseSpeed * deltaTime;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 1.0; // Oscillate ±1.0px
      });
    });
  }

  // Rendering

  render() {
    if (!this.ctx1 || !this.ctx2) return;

    const width = this.canvas1.getBoundingClientRect().width;
    const height = this.canvas1.getBoundingClientRect().height;

    // Clear both canvases
    this.ctx1.clearRect(0, 0, width, height);
    this.ctx2.clearRect(0, 0, width, height);

    // Get theme colors
    const colors = this.getThemeColors();

    // Draw graphs on appropriate layers with lower contrast
    this.graphs.forEach(graph => {
      const ctx = graph.layer === 1 ? this.ctx1 : this.ctx2;
      const baseOpacity = graph.layer === 1 ? 0.04 : 0.08;

      // Check for highlighted nodes (within highlight radius of mouse)
      const highlightedNodes = new Set();
      if (this.mouse.active) {
        graph.nodes.forEach(node => {
          const dist = this.distance(node, this.mouse);
          if (dist < this.highlightRadius) {
            highlightedNodes.add(node);
          }
        });
      }

      // Draw edges (never highlighted - only nodes respond to mouse)
      graph.edges.forEach(edge => {
        this.drawEdge(edge, ctx, colors.graph, baseOpacity, false);
      });

      // Draw nodes
      graph.nodes.forEach(node => {
        const highlighted = highlightedNodes.has(node);
        this.drawNode(node, ctx, colors.graph, baseOpacity, highlighted);
      });
    });
  }

  drawEdge(edge, ctx, color, baseOpacity, highlighted) {
    const opacity = highlighted ? Math.min(baseOpacity + 0.15, 0.25) : baseOpacity;

    ctx.beginPath();
    ctx.moveTo(edge.nodeA.x, edge.nodeA.y);
    ctx.lineTo(edge.nodeB.x, edge.nodeB.y);
    ctx.strokeStyle = this.applyOpacity(color, opacity);
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  drawNode(node, ctx, color, baseOpacity, highlighted) {
    const opacity = highlighted ? Math.min(baseOpacity + 0.2, 0.35) : baseOpacity;

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.applyOpacity(color, opacity);

    // Subtle glow effect for highlighted nodes
    if (highlighted && this.glowEnabled) {
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.applyOpacity(color, 0.3);
    }

    ctx.fill();

    if (highlighted) {
      ctx.shadowBlur = 0;
    }
  }

  getThemeColors() {
    const root = document.documentElement;
    const styles = getComputedStyle(root);

    // Read text color for graphs
    const textColor = styles.getPropertyValue('--color-text').trim();

    return {
      graph: textColor || '#2D2A26'
    };
  }

  applyOpacity(color, opacity) {
    // Convert color to rgba with opacity
    if (color.startsWith('#')) {
      // Hex color
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    } else if (color.startsWith('rgb(')) {
      // rgb() format - add alpha
      return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
    } else if (color.startsWith('rgba(')) {
      // rgba() format - replace alpha
      return color.replace(/[\d.]+\)$/g, `${opacity})`);
    }
    // Fallback
    return `rgba(45, 42, 38, ${opacity})`;
  }

  // Animation Loop

  startAnimationLoop() {
    this.animationLoop(performance.now());
  }

  animationLoop(timestamp) {
    this.animationFrameId = requestAnimationFrame(this.animationLoop.bind(this));

    // Calculate delta time
    const deltaTime = this.lastFrameTime ? (timestamp - this.lastFrameTime) / 16.67 : 1;
    this.lastFrameTime = timestamp;

    // Calculate FPS
    if (deltaTime > 0) {
      const fps = 1000 / (timestamp - (this.lastFrameTime - deltaTime * 16.67));
      this.fpsHistory.push(fps);

      // Keep rolling 60 frame history
      if (this.fpsHistory.length > 60) {
        this.fpsHistory.shift();
      }

      // Check performance every 2 seconds (when history full)
      if (this.fpsHistory.length === 60) {
        this.checkPerformance();
        this.fpsHistory = [];
      }
    }

    // Update and render
    this.updatePhysics(deltaTime);
    this.render();
  }

  checkPerformance() {
    const avgFps = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;

    // Degrade if FPS < 45 sustained
    if (avgFps < 45 && !this.performanceDegradation) {
      console.warn(`Canvas FPS degraded (${avgFps.toFixed(1)} FPS), reducing graph count`);
      this.performanceDegradation = true;
      this.generateGraphs();
    }

    // Disable glow if FPS < 30
    if (avgFps < 30) {
      this.glowEnabled = false;
    }
  }

  // Mouse Interaction

  setupEventListeners() {
    // Mouse tracking (throttled to 16ms = 60fps)
    const throttledMouseMove = Utils.debounce((e) => {
      // Adjust for scroll position since canvas is absolute
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY + window.scrollY;
      this.mouse.active = true;
    }, 16);

    window.addEventListener('mousemove', throttledMouseMove);
    this.listeners.mousemove = throttledMouseMove;

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });
    this.listeners.mouseleave = () => { this.mouse.active = false; };

    // Resize (debounced to 200ms)
    const debouncedResize = Utils.debounce(() => {
      this.handleResize();
    }, 200);

    window.addEventListener('resize', debouncedResize);
    this.listeners.resize = debouncedResize;

    // Theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          this.updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    this.listeners.observer = observer;
  }

  handleResize() {
    const oldGraphCount = this.graphCount;
    const newGraphCount = this.determineGraphCount();

    // Resize canvases
    this.resizeCanvases();

    // Regenerate graphs if breakpoint changed
    if (oldGraphCount !== newGraphCount) {
      this.generateGraphs();
    }
  }

  updateTheme() {
    // Theme colors will be re-read on next render
  }

  // Utility Methods

  distance(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Cleanup

  destroy() {
    // Cancel animation frame
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Remove event listeners
    if (this.listeners.mousemove) {
      window.removeEventListener('mousemove', this.listeners.mousemove);
    }
    if (this.listeners.mouseleave) {
      window.removeEventListener('mouseleave', this.listeners.mouseleave);
    }
    if (this.listeners.resize) {
      window.removeEventListener('resize', this.listeners.resize);
    }
    if (this.listeners.observer) {
      this.listeners.observer.disconnect();
    }

    // Clear canvases
    if (this.canvas1) {
      const width = this.canvas1.getBoundingClientRect().width;
      const height = this.canvas1.getBoundingClientRect().height;
      this.ctx1.clearRect(0, 0, width, height);
    }
    if (this.canvas2) {
      const width = this.canvas2.getBoundingClientRect().width;
      const height = this.canvas2.getBoundingClientRect().height;
      this.ctx2.clearRect(0, 0, width, height);
    }
  }
}

// Initialize on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.canvasBackgroundManager = new CanvasBackgroundManager();
});
