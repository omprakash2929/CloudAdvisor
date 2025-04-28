"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const CloudIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 19H6.5C4.01472 19 2 16.9853 2 14.5C2 12.0147 4.01472 10 6.5 10C6.5 7.23858 8.73858 5 11.5 5C13.8575 5 15.8289 6.64245 16.3555 8.85156C16.5949 8.79584 16.8442 8.76733 17.1006 8.76733C19.2599 8.76733 21 10.5074 21 12.6667C21 14.8259 19.2599 16.566 17.1006 16.566"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const DatabaseIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ServerIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6H18M6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6M9 10H15M9 14H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const StorageIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4H20V16H4V4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 8H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 12H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 16V20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 16V20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CodeIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 18L22 12L16 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 6L2 12L8 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CloudBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 1.2
      drawBackground()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    function drawBackground() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background color
      ctx.fillStyle = "rgba(248, 250, 252, 0.8)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1

      const gridSize = 40
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw dots at intersections
      ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw floating icons
      drawFloatingIcons()
    }

    function drawFloatingIcons() {
      const iconPaths = [
        "M17.5 19H6.5C4.01472 19 2 16.9853 2 14.5C2 12.0147 4.01472 10 6.5 10C6.5 7.23858 8.73858 5 11.5 5C13.8575 5 15.8289 6.64245 16.3555 8.85156C16.5949 8.79584 16.8442 8.76733 17.1006 8.76733C19.2599 8.76733 21 10.5074 21 12.6667C21 14.8259 19.2599 16.566 17.1006 16.566",
        "M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12",
        "M6 6H18M6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6M9 10H15M9 14H15",
        "M4 4H20V16H4V4ZM4 8H20M4 12H20M8 16V20M16 16V20",
        "M16 18L22 12L16 6M8 6L2 12L8 18"
      ]

      const numIcons = 20

      for (let i = 0; i < numIcons; i++) {
        const path = new Path2D(
          iconPaths[Math.floor(Math.random() * iconPaths.length)]
        )
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const scale = 0.5 + Math.random() * 0.5 // Random scale between 0.5 and 1
        const opacity = 0.1 + Math.random() * 0.2

        ctx.save()
        ctx.translate(x, y)
        ctx.scale(scale, scale)
        ctx.globalAlpha = opacity
        ctx.strokeStyle = "rgba(59, 130, 246, 0.5)"
        ctx.lineWidth = 1.5
        ctx.stroke(path)
        ctx.restore()
      }
    }

    let animationFrameId
    const animate = () => {
      drawBackground()
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
