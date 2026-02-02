# Product Requirements Document: Animated Graph Landing Page

**Version**: 1.0  
**Last Updated**: 2025-02-02  
**Status**: Draft  

---

## 1. Overview

### 1.1 Purpose

Create a minimalistic landing page with an organic, animated graph-based background that responds to mouse interaction.

### 1.2 Goals

- Deliver a subtle, sophisticated visual experience
- Demonstrate technical craftsmanship through smooth animation
- Maintain excellent performance across devices
- Create memorable first impression without overwhelming content

### 1.3 Non-Goals

- Complex UI elements or navigation
- Mobile touch interactions (desktop-first)
- SEO optimization (pure visual piece)

---

## 2. Technical Requirements

### 2.1 Core Stack

- **HTML5 Canvas API** - native, no dependencies
- **Vanilla JavaScript** (ES6+)
- **CSS3** for layout and typography
- **No frameworks or libraries**

### 2.2 Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation on older browsers (static fallback)
- Minimum: ES6 support

### 2.3 Performance Targets

| Metric | Target |
|--------|--------|
| Frame rate | 60 FPS sustained |
| Time to Interactive | < 1s |
| Canvas init time | < 100ms |
| Memory usage | < 50MB |

---

## 3. Visual Design Specification

### 3.1 Layout Structure

```
┌─────────────────────────────────┐
│  Canvas Layer 1 (background)    │
│  Canvas Layer 2 (foreground)    │
│  ┌───────────────────────────┐  │
│  │      <h1>Lorem ipsum</h1> │  │
│  │                           │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### 3.2 Typography

- **H1 Text**: "Lorem ipsum"
- **Font**: System font stack (SF Pro / Segoe UI / Inter fallback)
- **Size**: `clamp(3rem, 8vw, 6rem)`
- **Weight**: 300 (light)
- **Color**: `rgba(255, 255, 255, 0.95)`
- **Position**: Centered vertically and horizontally
- **Text shadow**: Subtle glow for separation from background

### 3.3 Color Palette

**Minimalistic/Organic theme**

- Background: `#0a0a0a` (near black)
- Layer 1 graphs: `rgba(255, 255, 255, 0.08)` (subtle white)
- Layer 2 graphs: `rgba(255, 255, 255, 0.15)` (slightly more visible)
- Nodes: `2px` radius, same color as edges
- Edges: `1px` width, same opacity as layer
- Highlight glow: `rgba(255, 255, 255, 0.6)` (on proximity)

**Alternative organic palette** (optional)

- Warm tones: `rgba(255, 200, 150, 0.1)` → `rgba(255, 220, 180, 0.25)`

---

## 4. Graph System Specification

### 4.1 Graph Generation

- **Count**: Dynamic based on viewport
  - Small (< 768px): 12 graphs
  - Medium (768-1440px): 24 graphs
  - Large (> 1440px): 40 graphs
- **Nodes per graph**: Random 2-6 vertices
- **Edge connectivity**: 40-70% of possible edges (sparse to semi-connected)
- **Distribution**: 60% in Layer 1, 40% in Layer 2

### 4.2 Graph Properties

```typescript
Node {
  id: string
  x: number (px)
  y: number (px)
  vx: number (px/frame, range: -0.3 to 0.3)
  vy: number (px/frame, range: -0.3 to 0.3)
  mass: number (1.0)
  radius: number (2px)
}

Edge {
  nodeA: Node
  nodeB: Node
  restLength: number (distance at creation)
  stiffness: number (0.01-0.03)
}

Graph {
  nodes: Node[]
  edges: Edge[]
  layer: number (1 or 2)
}
```

### 4.3 Physics Simulation

- **Base drift**: Slow continuous Brownian motion
- **Spring forces**: Gentle edge tension (maintains approximate shape)
- **Boundary behavior**: Wrap-around at viewport edges
- **Damping**: 0.98 (slight friction for organic feel)

---

## 5. Mouse Interaction Design

### 5.1 Interaction Modes

#### Attraction Field

- **Radius**: 250px from cursor
- **Strength**: Inversely proportional to distance

  ```
  force = (1 - distance/radius)² × 0.5
  ```

- **Application**: Pull nodes toward cursor within radius
- **Easing**: Smooth acceleration/deceleration

#### Highlight on Proximity

- **Trigger radius**: 150px from cursor
- **Effect**: Increase opacity
  - Normal: base opacity (0.08 / 0.15)
  - Highlighted: `opacity + 0.4` (max 0.6)
- **Transition**: Smooth fade in/out over 200ms
- **Glow**: Subtle blur on highlighted elements

### 5.2 Performance Optimization

- **Mouse event throttling**: 16ms (60 FPS)
- **Distance calculations**: Spatial hashing for nodes in interaction range only
- **Highlight cache**: Track active highlights to avoid recalculation

---

## 6. Animation System

### 6.1 Update Loop

```
function gameLoop() {
  updatePhysics()      // Apply forces, integrate velocities
  updateMouse()        // Process cursor interaction
  handleBoundaries()   // Wrap or bounce at edges
  render()             // Draw to canvas
  requestAnimationFrame(gameLoop)
}
```

### 6.2 Render Pipeline

1. **Clear canvas** (both layers)
2. **Layer 1**: Draw background graphs
3. **Layer 2**: Draw foreground graphs
4. **Blending**: Destination-over for depth effect

### 6.3 Visual Polish

- **Anti-aliasing**: Enable canvas smoothing
- **Line caps**: Round for organic feel
- **Morphing**: Subtle node size pulsing (0.8x-1.2x over 3-5s)
- **Trail effect** (optional): Slight canvas fade instead of clear (ghosting)

---

## 7. Responsive Design

### 7.1 Viewport Scaling

```javascript
const graphCount = {
  mobile: 12,    // < 768px
  tablet: 24,    // 768-1440px
  desktop: 40    // > 1440px
}
```

### 7.2 Canvas Resize Handling

- Listen to `window.resize` (debounced 200ms)
- Regenerate graphs on breakpoint change
- Scale node positions proportionally
- Maintain aspect ratio

### 7.3 Performance Degradation

- If FPS drops below 45 for >2s, reduce graph count by 25%
- Disable glow effects if FPS < 30
- Static fallback if Canvas unsupported

---

## 8. Implementation Details

### 8.1 File Structure

```
/
├── index.html
├── styles.css
├── canvas-background.js
│   ├── GraphGenerator
│   ├── PhysicsEngine
│   ├── MouseInteraction
│   └── Renderer
└── main.js (initialization)
```

### 8.2 Initialization Sequence

1. DOM Content Loaded
2. Canvas setup (size, context, layers)
3. Generate initial graphs
4. Attach mouse listeners
5. Start animation loop
6. Monitor performance

### 8.3 Code Quality Standards

- ES6+ modern syntax
- Functional where appropriate
- Clear variable naming
- Performance-critical sections commented
- No premature optimization

---

## 9. Success Metrics

### 9.1 Technical KPIs

- [ ] 60 FPS sustained on mid-tier laptop (2020+)
- [ ] < 1s to first frame
- [ ] Smooth mouse interaction (no jank)
- [ ] Scales across viewport sizes

### 9.2 Visual Quality

- [ ] Subtle and non-distracting
- [ ] Organic movement feel
- [ ] Clear text readability
- [ ] Professional aesthetic

### 9.3 User Experience

- [ ] Engaging without being gimmicky
- [ ] Intuitive mouse interaction
- [ ] No motion sickness (slow movement)
- [ ] Memorable impression

---

## 10. Future Enhancements (Out of Scope)

- WebGL acceleration for >100 graphs
- Touch gesture support for mobile
- Color theme customization
- Sound design (ambient tones)
- Particle trails
- Graph clustering algorithms
- Export as video/GIF

---

## 11. Open Questions

- [ ] Should graphs avoid clustering in center?
- [ ] Trail/ghosting effect or clean clear?
- [ ] Node size variation or uniform?
- [ ] Edge thickness variation based on proximity?

---

**Sign-off**: Ready for implementation
