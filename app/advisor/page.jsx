"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Server,
  Database,
  Cpu,
  Cloud,
  ArrowRight,
  Zap,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";  


export default function AdvisorPage() {
  const { isSignedIn, user } = useAuth();
  const router = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState(50);
  const [traffic, setTraffic] = useState(1000);
  const [techStack, setTechStack] = useState("");
  const [database, setDatabase] = useState("None");
  const [trafficPattern, setTrafficPattern] = useState("Steady");
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = JSON.parse(localStorage.getItem('queryHistory')) || [];
      setHistory(storedHistory);
    }
    setIsVisible(true);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = { query, budget, traffic, techStack, database, trafficPattern };
    try {
      if (!isSignedIn) {
        router.push("/signup");
      } else {
      const res = await axios.post('/api/ai', formData);
      setResponse({ ...res.data, ...formData });
      const newHistory = [...history, { ...formData, timestamp: new Date() }];
      setHistory(newHistory);
      localStorage.setItem('queryHistory', JSON.stringify(newHistory));
      setShowRecommendation(true);
      setFormStep(4); // Move to the final recommendations page
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponse({ error: 'Something went wrong. Try again!' });
      setShowRecommendation(true);
      setFormStep(4);
    }
    setLoading(false);
  };

  console.log("responese", response);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("CloudAdvisor Recommendation", 10, 10);
    doc.setFontSize(12);
    doc.text(`Project: ${query}`, 10, 20);
    doc.text(`Budget: $${budget}`, 10, 30);
    doc.text(`Traffic: ${traffic} users/month`, 10, 40);
    doc.text(`Tech Stack: ${techStack || 'Not specified'}`, 10, 50);
    doc.text(`Database: ${database}`, 10, 60);
    doc.text(`Traffic Pattern: ${trafficPattern}`, 10, 70);
    doc.text("Recommendations:", 10, 80);
    doc.text(response?.recommendation || "No recommendation available", 10, 90, { maxWidth: 180 });
    doc.text("Primary Recommendation:", 10, 110);
    doc.text(`${response?.pricing[0]?.provider} - $${response?.pricing[0]?.cost.toFixed(2)}/month`, 10, 120);
    doc.text("Features:", 10, 130);
    (response?.pricing[0]?.features.split(',').map((feature, i) => doc.text(`• ${feature.trim()}`, 10, 140 + i * 10)));
    doc.save("cloud_advisor_report.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Cloud className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">CloudAdvisor</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container px-4 md:px-6 mx-auto py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              AI-Powered Cloud Service Advisor
            </h1>
            <p className="mt-2 text-slate-600">
              Tell us about your project, and our AI will recommend the best cloud services for your needs.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-10 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="h-0.5 w-full bg-slate-200"></div>
            </div>
            <div className="relative flex justify-between">
              {[1, 2, 3, 4].map((step) => (
                <motion.div
                  key={step}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                  transition={{ duration: 0.5, delay: step * 0.1 }}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                      formStep >= step
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-slate-300 text-slate-500"
                    }`}
                  >
                    {step}
                  </div>
                  <span className="mt-2 text-sm text-slate-600">
                    {step === 1 ? "Project Details" : step === 2 ? "Technical Requirements" : step === 3 ? "Review" : "Results"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {!showRecommendation ? (
            <form onSubmit={handleSubmit}>
              {formStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-slate-200"
                >
                  <h2 className="text-xl font-semibold mb-6 text-slate-900">Project Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="query" className="block text-sm font-medium text-slate-700 mb-1">
                        Describe Your Project
                      </label>
                      <textarea
                        id="query"
                        className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about your project..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-1">
                        Monthly Budget
                      </label>
                      <input
                        type="range"
                        id="budget"
                        min="10"
                        max="1000"
                        step="5"
                        value={budget}
                        onChange={(e) => setBudget(Number.parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">$10</span>
                        <span className="text-sm font-medium text-blue-600">${budget}</span>
                        <span className="text-sm text-slate-500">$1000+</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="traffic" className="block text-sm font-medium text-slate-700 mb-1">
                        Expected Monthly Traffic (users)
                      </label>
                      <input
                        type="number"
                        id="traffic"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 1000"
                        value={traffic}
                        onChange={(e) => setTraffic(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700"
                    >
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {formStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-slate-200"
                >
                  <h2 className="text-xl font-semibold mb-6 text-slate-900">Technical Requirements</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="techStack" className="block text-sm font-medium text-slate-700 mb-1">
                        Tech Stack
                      </label>
                      <div className="relative">
                        <Server className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          id="techStack"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., WordPress, MERN, LAMP"
                          value={techStack}
                          onChange={(e) => setTechStack(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="database" className="block text-sm font-medium text-slate-700 mb-1">
                        Database
                      </label>
                      <div className="relative">
                        <Database className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <select
                          id="database"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                          value={database}
                          onChange={(e) => setDatabase(e.target.value)}
                        >
                          <option value="None">None</option>
                          <option value="MySQL">MySQL</option>
                          <option value="PostgreSQL">PostgreSQL</option>
                          <option value="MongoDB">MongoDB</option>
                          <option value="Redis">Redis</option>
                          <option value="SQLite">SQLite</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="trafficPattern" className="block text-sm font-medium text-slate-700 mb-1">
                        Traffic Pattern
                      </label>
                      <div className="relative">
                        <Cpu className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <select
                          id="trafficPattern"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                          value={trafficPattern}
                          onChange={(e) => setTrafficPattern(e.target.value)}
                        >
                          <option value="Steady">Steady</option>
                          <option value="Spiky">Spiky</option>
                          <option value="Growing">Growing</option>
                          <option value="Seasonal">Seasonal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormStep(3)}
                      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700"
                    >
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {formStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-slate-200"
                >
                  <h2 className="text-xl font-semibold mb-6 text-slate-900">Review Your Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Project Description</h3>
                        <p className="text-slate-900">{query || "Not provided"}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Monthly Budget</h3>
                        <p className="text-slate-900">${budget}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Expected Monthly Traffic</h3>
                        <p className="text-slate-900">{traffic} users</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Tech Stack</h3>
                        <p className="text-slate-900">{techStack || "Not specified"}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Database</h3>
                        <p className="text-slate-900">{database}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Traffic Pattern</h3>
                        <p className="text-slate-900">{trafficPattern}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>Get Recommendations</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {formStep === 4 && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">
                    Your Cloud Recommendations
                  </h2>
                  <p className="text-slate-600 text-center mb-8">
                    Here are the best cloud solutions tailored to your project needs.
                  </p>

                  {response?.error ? (
                    <p className="text-red-500 text-center">{response.error}</p>
                  ) : (
                    <>
                      {/* Primary Recommendation */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-bold text-blue-800">
                              {response?.pricing[0]?.provider || "N/A"}
                            </h3>
                            <p className="text-slate-700">
                              Optimal solution for your {query || "project"} requiring {techStack || "various technologies"} with {traffic} monthly users and {trafficPattern.toLowerCase()} traffic patterns.
                            </p>
                          </div>
                          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                            <span className="text-2xl font-bold text-blue-700">
                              ${response?.pricing[0]?.cost.toFixed(2) || "N/A"}
                            </span>
                            <span className="text-slate-500 ml-1">/month</span>
                          </div>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="bg-white p-5 rounded-lg border border-blue-200 mb-6">
                        <h4 className="font-medium text-blue-800 mb-3">Key Features</h4>
                        <ul className="space-y-2 text-slate-700">
                          {response?.pricing[0]?.features.split(',').map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <svg
                                className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                              <span>{feature.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Why This Works for You */}
                      <div className="bg-white p-5 rounded-lg border border-blue-200 mb-8">
                        <h4 className="font-medium text-blue-800 mb-3">Why This Works for You</h4>
                        <ul className="space-y-2 text-slate-700">
                          <li className="flex items-start">
                            <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                            <span>Perfect for sites with your traffic level of {traffic} users</span>
                          </li>
                          <li className="flex items-start">
                            <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                            <span>Within your budget of ${budget}/month</span>
                          </li>
                          <li className="flex items-start">
                            <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                            <span>Easy to scale as your traffic grows</span>
                          </li>
                          <li className="flex items-start">
                            <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                            <span>Handles your {trafficPattern.toLowerCase()} traffic pattern well</span>
                          </li>
                        </ul>
                      </div>

                      {/* Alternative Options */}
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                        <h4 className="font-medium text-slate-700 mb-4">Alternative Options</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {response?.pricing.slice(1, 3).map((option, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium text-blue-800">{option.provider}</h5>
                                <span className="text-blue-700 font-bold">${option.cost.toFixed(2)}/mo</span>
                              </div>
                              <p className="text-sm text-slate-600">
                                {option.features.includes('SSD') ? 'Good alternative with similar specs, slightly more technical setup' : 'Higher performance but more complex management'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Performance */}
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">Pricing & Performance</h3>
                      <div className="overflow-x-auto mb-8">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="p-3 text-left">Provider</th>
                              <th className="p-3 text-left">Cost</th>
                              <th className="p-3 text-left">Features</th>
                              <th className="p-3 text-left">Uptime</th>
                              <th className="p-3 text-left">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {response?.pricing.map((item, index) => (
                              <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="p-3">{item.provider}</td>
                                <td className="p-3">${item.cost.toFixed(2)}/mo</td>
                                <td className="p-3">{item.features}</td>
                                <td className="p-3">{item.uptime || "99.95%"}</td>
                                <td className="p-3">
                                  <a
                                    href={item.affiliateLink || "#"}
                                    target="_blank"
                                    className="text-blue-500 hover:underline"
                                  >
                                    Sign Up
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Cost Projections */}
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">Cost Projections</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {response?.pricing.map((item, index) => {
                          const yearlyCost = item.cost * 12;
                          const savingsWithCDN = yearlyCost * 0.9; // 10% savings estimate
                          return (
                            <div key={index} className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                              <h4 className="font-medium text-slate-700 mb-2">{item.provider}</h4>
                              <p className="text-slate-900">Yearly: ${yearlyCost.toFixed(2)}</p>
                              <p className="text-slate-900">With CDN: ${savingsWithCDN.toFixed(2)}</p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Detailed Analysis */}
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">Detailed Analysis</h3>
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                        <p className="text-slate-700 whitespace-pre-wrap">{response?.recommendation || "No additional details provided."}</p>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                        <button
                          onClick={downloadPDF}
                          className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-green-700"
                        >
                          Download PDF Report
                        </button>
                        <button
                          onClick={() => {
                            setShowRecommendation(false);
                            setFormStep(1);
                          }}
                          className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                        >
                          Adjust Requirements
                        </button>
                      </div>
                    </>
                  )}

                  {/* Query History */}
                  {history.length > 0 && (
                    <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                      <h2 className="text-xl font-semibold mb-6 text-slate-900">Query History</h2>
                      <ul className="space-y-4">
                        {history.map((item, index) => (
                          <li key={index} className="text-slate-700">
                            <span className="font-medium">{item.query}</span> -{" "}
                            {new Date(item.timestamp).toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}