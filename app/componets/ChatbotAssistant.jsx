"use client"
import React, { useState } from 'react';

export default function ChatbotAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hey! I’m your Cloud Assistant. Ask me anything ☁️' },
  ]);   //Initial message from the bot
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = data.reply || 'Sorry, I couldn’t understand that. Please try again.';
      setMessages([...newMessages, { role: 'bot', text: botReply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'bot', text: 'Something went wrong. 😓' }]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        aria-label="Toggle Chat Assistant"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl p-4 flex flex-col justify-between z-50">
          <div className="max-h-72 overflow-y-auto mb-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md ${
                  msg.role === 'bot' ? 'bg-gray-100 text-left' : 'bg-blue-100 text-right'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
