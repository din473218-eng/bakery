import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageCircle, X, Send, Sparkles, ChefHat, Loader } from 'lucide-react';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface LiveChatProps {
  lang: 'en' | 'ar';
}

export default function LiveChat({ lang }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  const textContent = {
    en: {
      title: 'Chef Samaan',
      tagline: 'Master Pastry Chef',
      placeholder: 'Ask about recipes, gift packs...',
      welcomeMsg: 'Hala! Welcome to Tiramisu Sa’af & Ramal. I am Chef Samaan, your virtual pastry guide. How may I sweeten your day?',
      error: 'Chef is preparing more cocoa beans. Please try again in a moment.'
    },
    ar: {
      title: 'الشيف سمعان',
      tagline: 'كبير طهاة البوتيك الفاخر',
      placeholder: 'اسأل عن المكونات، صناديق الهدايا...',
      welcomeMsg: 'هلا بك! أهلاً وسهلاً بك في بوتيك تيراميسو سعف و رمال الفاخر. أنا الشيف سمعان، مرشدك ورفيقك في تذوق أرقى إبداعاتنا اليومية. كيف يمكنني إضفاء الحلاوة على يومك؟',
      error: 'الشيف يجهز بعض حبوب الكاكاو حالياً. يرجى المحاولة بعد لحظة.'
    }
  };

  const t = textContent[lang];

  // Initialize with a welcome message from the chef
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'chef',
          text: t.welcomeMsg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [lang]);

  // Scroll to bottom on updates
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await response.json();
      
      const chefMsg: ChatMessage = {
        id: `chef-msg-${Date.now()}`,
        sender: 'chef',
        text: data.text || t.error,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, chefMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errMsg: ChatMessage = {
        id: `chef-err-${Date.now()}`,
        sender: 'chef',
        text: t.error,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="live-chat-container">
      
      {/* Floating Chat Bubble Icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="gold-gradient-bg hover:opacity-95 text-cream p-4 rounded-full shadow-2xl flex items-center justify-center border border-gold/30 cursor-pointer animate-float"
            id="btn-chat-bubble"
            aria-label="Open Chat with Chef Samaan"
          >
            <ChefHat className="w-6 h-6 text-cream" />
            <span className="absolute -top-1 -left-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chocolate opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-chocolate"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Glassmorphism Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="w-80 sm:w-96 h-[480px] rounded-2xl glass-card luxury-shadow border border-gold/35 flex flex-col overflow-hidden"
            id="live-chat-panel"
          >
            {/* Header */}
            <div className="bg-chocolate text-cream px-5 py-4 border-b border-gold/20 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center border border-gold/20">
                  <ChefHat className="w-5.5 h-5.5 text-cream" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream flex items-center gap-1">
                    {t.title}
                    <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-gold/80 font-medium font-sans">
                    {t.tagline}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-cream/80 hover:text-gold p-1 cursor-pointer transition-colors"
                id="btn-close-chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div
              ref={listRef}
              className="flex-grow p-4 overflow-y-auto space-y-4 bg-cream/15"
              id="chat-messages-container"
            >
              {messages.map((msg) => {
                const isChef = msg.sender === 'chef';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 max-w-[85%] ${isChef ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                  >
                    {isChef && (
                      <div className="w-7 h-7 rounded-full gold-gradient-bg text-cream flex items-center justify-center text-[10px] flex-shrink-0 border border-gold/15">
                        <ChefHat className="w-4.5 h-4.5 text-cream" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <div className={`p-3 rounded-2xl text-xs sm:text-sm font-sans leading-normal shadow-sm ${
                        isChef
                          ? 'bg-white text-darkbrown border border-gold/10 rounded-tl-none'
                          : 'chocolate-gradient-bg text-cream rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                      <p className={`text-[9px] text-darkbrown/40 font-mono ${isChef ? 'text-left' : 'text-right'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5 max-w-[85%] mr-auto">
                  <div className="w-7 h-7 rounded-full gold-gradient-bg text-cream flex items-center justify-center text-[10px] flex-shrink-0 border border-gold/15">
                    <ChefHat className="w-4.5 h-4.5 text-cream" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gold/10 flex items-center gap-1 shadow-sm">
                    <Loader className="w-3.5 h-3.5 text-gold animate-spin" />
                    <span className="text-[11px] text-darkbrown/60 font-sans italic">typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form Footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gold/15 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.placeholder}
                className="flex-grow bg-cream/40 border border-gold/15 rounded-xl px-4 py-2.5 text-xs text-darkbrown focus:outline-none focus:border-gold focus:bg-white font-sans"
                id="chat-text-input"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-chocolate text-cream hover:text-gold p-2.5 rounded-xl transition-all cursor-pointer flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                id="btn-send-chat"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
