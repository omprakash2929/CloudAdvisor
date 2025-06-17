"use client";
import React, { useState, useEffect, useRef } from 'react';

const BotIcon = () => <span className="text-xl">🤖</span>;
const UserIcon = () => <span className="text-xl">🧑</span>;

export default function ChatbotAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hey! I’m your Cloud Assistant. Ask me anything ☁️' },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!res.ok) {
        let errorText = 'Something went wrong. 😓';
        try {
          const errorData = await res.json();
          errorText = errorData.error || errorData.message || errorText;
        } catch {}
        setMessages([...newMessages, { role: 'bot', text: errorText }]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const botReply = data.reply || 'Sorry, I couldn’t understand that. Please try again.';
      setMessages([...newMessages, { role: 'bot', text: botReply }]);
    } catch (err) {
      console.error("Chatbot send message error:", err);
      setMessages([...newMessages, { role: 'bot', text: 'Something went wrong. Please check console. 😓' }]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        aria-label="Toggle Chat Assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z" />
        </svg>
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-t-xl flex justify-between items-center">
            <h3 className="font-semibold text-lg">Cloud Assistant</h3>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'bot' && (
                  <div className="flex-shrink-0 bg-gray-200 rounded-full p-1.5">
                    <BotIcon />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-xl break-words whitespace-pre-wrap ${
                    msg.role === 'bot'
                      ? 'bg-gray-100 text-gray-800 rounded-bl-none [&_ul]:mt-2 [&_li]:ml-4'
                      : 'bg-blue-500 text-white rounded-br-none'
                  }`}
                >
                  {msg.role === 'bot' 
                    ? msg.text.split('*').map((part, i) => 
                        i % 2 === 0 
                          ? part.replace(/\n/g, '\n\n')
                          : '\n• ' + part.trim()
                      ).join('')
                    : msg.text
                  }
                </div>

                {msg.role === 'user' && (
                  <div className="flex-shrink-0 bg-blue-500 text-white rounded-full p-1.5">
                    <UserIcon />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start items-center gap-2">
                <div className="flex-shrink-0 bg-gray-200 rounded-full p-1.5">
                  <BotIcon />
                </div>
                <div className="p-3 rounded-xl bg-gray-100 text-gray-800 rounded-bl-none">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">Typing</span>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="flex items-center gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                type="text"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-150
                            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11a1 1 0 112 0v5.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

