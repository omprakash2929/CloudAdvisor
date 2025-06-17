"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Cloud,
  Zap,
  Shield,
  BarChart,
  Server,
  Database
} from "lucide-react"
import CloudBackground from "./componets/cloud-background"
import { motion } from "framer-motion"
import ChatbotAssistant from "./componets/ChatbotAssistant"


export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <CloudBackground />
        
        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-3 py-1 mb-6 text-sm font-medium text-blue-600 bg-blue-50 rounded-full"
            >
              AI-Powered Cloud Infrastructure
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl mb-6"
            >
              The most intelligent
              <span className="block text-blue-600">Cloud Service Advisor</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-2xl mx-auto text-lg text-slate-600 md:text-xl"
            >
              Need more than just cloud provider suggestions? CloudAdvisor is a
              complete suite of AI-powered tools to analyze, recommend, and
              optimize your cloud infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
            >
              <Link
                href="/advisor"
                className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-6 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
              >
                Start building for free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#demo"
                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-6 font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300"
              >
                <svg
                  className="mr-2 h-5 w-5 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15.4 12L10.6 8.8V15.2L15.4 12Z"
                    fill="currentColor"
                  />
                </svg>
                Watch demo
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative mx-auto max-w-5xl"
          >
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/80 to-slate-50/50"></div>

              <div className="relative p-4 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-slate-500 text-sm">
                    CloudAdvisor Recommendation Engine
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3 mb-3">
                        <Server className="h-5 w-5 text-blue-500" />
                        <div className="text-slate-700 font-medium">
                          Project Requirements
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">
                            Project Type
                          </span>
                          <span className="text-sm font-medium">
                            E-commerce Platform
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">
                            Monthly Budget
                          </span>
                          <span className="text-sm font-medium">$150</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">
                            Expected Traffic
                          </span>
                          <span className="text-sm font-medium">
                            25,000 users/month
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">
                            Tech Stack
                          </span>
                          <span className="text-sm font-medium">MERN</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3 mb-3">
                        <Database className="h-5 w-5 text-blue-500" />
                        <div className="text-slate-700 font-medium">
                          Infrastructure Needs
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">
                            Compute
                          </span>
                          <span className="text-sm font-medium">
                            4 vCPUs, 8GB RAM
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">
                            Database
                          </span>
                          <span className="text-sm font-medium">
                            MongoDB Atlas
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">
                            Storage
                          </span>
                          <span className="text-sm font-medium">100GB SSD</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">
                            Scaling
                          </span>
                          <span className="text-sm font-medium">
                            Auto-scaling enabled
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <Cloud className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-blue-700 font-medium">
                        AI Recommendation
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="bg-white/80 p-3 rounded-md border border-blue-100">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-slate-900">
                              AWS Elastic Beanstalk
                            </span>
                            <span className="text-sm font-bold text-blue-600">
                              98% match
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">
                            Perfect for your MERN stack with built-in scaling
                            and load balancing.
                          </p>
                        </div>

                        <div className="bg-white/60 p-3 rounded-md border border-blue-100">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-slate-900">
                              Google App Engine
                            </span>
                            <span className="text-sm font-bold text-blue-600">
                              92% match
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">
                            Great alternative with excellent MongoDB
                            integration.
                          </p>
                        </div>

                        <div className="bg-white/60 p-3 rounded-md border border-blue-100">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-slate-900">
                              Azure App Service
                            </span>
                            <span className="text-sm font-bold text-blue-600">
                              89% match
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">
                            Good option with strong enterprise integration
                            features.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm text-slate-500 mb-2">
                          Estimated monthly cost
                        </div>
                        <div className="text-2xl font-bold text-slate-900">
                          $127.50
                        </div>
                        <div className="text-sm text-green-600">
                          $22.50 under budget
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                      Generated in 2.3 seconds
                    </div>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      View detailed report →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated elements */}
            <motion.div
              className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-blue-100 border border-blue-200"
              initial={{ scale: 0 }}
              animate={{ scale: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.div
              className="absolute top-1/4 -right-8 w-16 h-16 rounded-full bg-indigo-100 border border-indigo-200"
              initial={{ scale: 0 }}
              animate={{ scale: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
            <motion.div
              className="absolute -bottom-8 left-1/3 w-20 h-20 rounded-full bg-sky-100 border border-sky-200"
              initial={{ scale: 0 }}
              animate={{ scale: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Trusted by section */}
      <section className="py-12 border-y border-slate-200 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-slate-500">
              Trusted by fast-growing companies around the world
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {[
              "Amazon",
              "Microsoft",
              "Google",
              "IBM",
              "Oracle",
              "Salesforce"
            ].map(company => (
              <div
                key={company}
                className="text-slate-400 text-lg font-semibold"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              AI-powered cloud infrastructure analysis
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-600">
              Our advanced AI analyzes your project requirements and provides
              tailored cloud service recommendations to optimize performance and
              cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="relative bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Intelligent Matching
              </h3>
              <p className="text-slate-600 mb-4">
                Our AI analyzes your specific requirements and matches them with
                the perfect cloud provider and service tier.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-600">
                    Multi-provider analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-600">
                    Performance-based recommendations
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-600">
                    Tech stack compatibility
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="relative bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Cost Optimization
              </h3>
              <p className="text-slate-600 mb-4">
                Get detailed cost breakdowns and optimization recommendations to
                maximize your cloud budget.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-600">
                    Detailed cost analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-600">
                    Resource right-sizing
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-600">
                    Budget forecasting
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="relative bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Security Analysis
              </h3>
              <p className="text-slate-600 mb-4">
                Get security recommendations and compliance insights for your
                cloud infrastructure.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-600">
                    Compliance assessment
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-600">
                    Security best practices
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-600">
                    Risk assessment
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              How CloudAdvisor works
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-600">
              Get personalized cloud recommendations in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center mb-4 relative">
                <span className="text-blue-600 font-bold">1</span>
                <div className="absolute h-px w-full bg-blue-200 right-0 top-1/2 translate-x-full hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Describe your project
              </h3>
              <p className="text-slate-600">
                Tell us about your project requirements, tech stack, and budget
                constraints.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center mb-4 relative">
                <span className="text-blue-600 font-bold">2</span>
                <div className="absolute h-px w-full bg-blue-200 right-0 top-1/2 translate-x-full hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                AI analysis
              </h3>
              <p className="text-slate-600">
                Our AI analyzes your needs and compares them with all major
                cloud providers.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Get recommendations
              </h3>
              <p className="text-slate-600">
                Receive detailed recommendations with cost breakdowns and setup
                guides.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/advisor"
              className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-6 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
            >
              Try it now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to optimize your cloud infrastructure?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of companies that use CloudAdvisor to make smarter
              cloud decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/advisor"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                Get started for free
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 font-medium text-white shadow-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                Contact sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-bold text-white">
                  CloudAdvisor
                </span>
              </div>
              <p className="text-sm">
                AI-powered cloud infrastructure recommendations to optimize
                performance and cost.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 CloudAdvisor. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-slate-400 hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
