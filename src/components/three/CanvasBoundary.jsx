import { Component } from 'react'

/**
 * Static, dependency-free stand-in for the 3D scene: same dark backdrop and
 * wordmark, just no WebGL. Shown if canvas creation throws (old browsers,
 * disabled WebGL, some locked-down corporate environments) so the hero
 * degrades gracefully instead of going blank.
 */
function StaticWordmark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]" aria-hidden="true">
      <span className="text-3xl font-black tracking-[0.2em] text-[#e8e8e8] sm:text-4xl">
        HELICORP
      </span>
    </div>
  )
}

export class CanvasBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.warn('[HeroCanvas] falling back to static wordmark:', error)
  }

  render() {
    if (this.state.hasError) return <StaticWordmark />
    return this.props.children
  }
}
