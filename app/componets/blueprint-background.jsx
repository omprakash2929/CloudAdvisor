"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function BlueprintBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 1.2
      drawBlueprint()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Draw blueprint grid and elements
    function drawBlueprint() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = "rgba(248, 250, 252, 0.8)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1

      // Draw vertical lines
      const gridSize = 40
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw dots at intersections
      ctx.fillStyle = "rgba(59, 130, 246, 0.15)"
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw some random blueprint elements
      drawRandomElements()
    }

    function drawRandomElements() {
      // Draw circles
      ctx.strokeStyle = "rgba(59, 130, 246, 0.2)"
      ctx.lineWidth = 1

      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = 20 + Math.random() * 60

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.stroke()

        // Add measurement lines
        if (Math.random() > 0.5) {
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + radius, y)
          ctx.stroke()

          // Add radius text
          ctx.fillStyle = "rgba(59, 130, 246, 0.3)"
          ctx.font = "10px monospace"
          ctx.fillText(`r=${Math.round(radius)}`, x + radius / 2 - 10, y - 5)
        }
      }

      // Draw rectangles
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const width = 40 + Math.random() * 100
        const height = 40 + Math.random() * 100

        ctx.beginPath()
        ctx.rect(x, y, width, height)
        ctx.stroke()

        // Add dashed lines
        if (Math.random() > 0.7) {
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + width, y + height)
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      // Draw connector lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)"
      for (let i = 0; i < 30; i++) {
        const x1 = Math.random() * canvas.width
        const y1 = Math.random() * canvas.height
        const x2 = x1 + (Math.random() - 0.5) * 200
        const y2 = y1 + (Math.random() - 0.5) * 200

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        // Add arrow at the end
        if (Math.random() > 0.7) {
          const angle = Math.atan2(y2 - y1, x2 - x1)
          ctx.beginPath()
          ctx.moveTo(x2, y2)
          ctx.lineTo(
            x2 - 10 * Math.cos(angle - Math.PI / 6),
            y2 - 10 * Math.sin(angle - Math.PI / 6)
          )
          ctx.lineTo(
            x2 - 10 * Math.cos(angle + Math.PI / 6),
            y2 - 10 * Math.sin(angle + Math.PI / 6)
          )
          ctx.closePath()
          ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
          ctx.fill()
        }
      }
    }

    // Animate blueprint elements
    let animationFrameId
    let lastTime = 0
    const interval = 5000 // Redraw every 5 seconds

    const animate = time => {
      if (time - lastTime > interval) {
        drawBlueprint()
        lastTime = time
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </>
  )
}
