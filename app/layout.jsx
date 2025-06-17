import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./componets/Navbar"
import { ClerkProvider } from "@clerk/nextjs"
import ChatbotAssistant from './componets/ChatbotAssistant';
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI-Powered Cloud Service Advisor",
  description:
    "Get personalized cloud hosting recommendations based on your project requirements"
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
         <ChatbotAssistant />
        {children}</body>
    </html>
    </ClerkProvider>
  )
}
