import { useState, useEffect, useRef, useCallback } from 'react';
import { useDisclosure, useToast, Box, Spinner, VStack, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { Settings, Zap, ArrowUp, ShieldCheck } from 'lucide-react';
import { getOrCreateVisitorId } from '../utils/visitorId';
import { ChatPaymentModal } from './ChatPaymentModal';
import hushhLogo from './images/Hushhogo.png';

type Message = { role: 'user' | 'assistant'; content: string; timestamp?: string };

interface AccessInfo {
  canChat: boolean;
  needsPayment: boolean;
  accessType: 'free' | 'paid' | 'expired';
  messagesRemaining?: number | 'unlimited';
  messagesUsed?: number;
  totalFreeMessages?: number;
  timeRemaining?: string;
  message?: string;
}

const HushhAvatar = ({ size = 'md', showOnline = false }: { size?: 'sm' | 'md' | 'lg'; showOnline?: boolean }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24'
  };

  return (
    <div className="relative">
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-white shadow-lg border-2 border-[#2B8CEE]/20 flex items-center justify-center`}>
        <img src={hushhLogo} alt="Hushh Assistant" className="w-[85%] h-[85%] object-contain" />
      </div>
      {showOnline && (
        <div className={`absolute ${size === 'lg' ? 'bottom-1 right-1 w-6 h-6' : 'bottom-0 right-0 w-3 h-3'} bg-green-500 border-2 border-white rounded-full`} />
      )}
    </div>
  );
};

export function InvestorChatWidget({ slug, investorName }: { slug: string; investorName: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [accessInfo, setAccessInfo] = useState<AccessInfo | null>(null);
  const [visitorId] = useState(() => getOrCreateVisitorId());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const checkAccess = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-check-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
        },
        body: JSON.stringify({ visitorId, slug }),
      });

      if (res.ok) {
        const data = await res.json();
        setAccessInfo(data);
        return data;
      }
    } catch (err) {
      console.error('Access check error:', err);
    }
    return null;
  }, [visitorId, slug]);

  useEffect(() => {
    const handlePaymentReturn = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentStatus = urlParams.get('payment');
      const sessionId = urlParams.get('session_id');

      if (paymentStatus === 'success' && sessionId) {
        setProcessing(true);
        try {
          const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
            },
            body: JSON.stringify({ sessionId, visitorId, slug }),
          });

          if (res.ok) {
            let attempts = 0;
            const poll = setInterval(async () => {
              const info = await checkAccess();
              if (info?.canChat || attempts > 5) {
                clearInterval(poll);
                setProcessing(false);
                toast({ title: 'Payment Successful!', status: 'success', duration: 5000 });
              }
              attempts++;
            }, 1500);
          }
        } catch (err) {
          console.error(err);
          setProcessing(false);
        }
        window.history.replaceState({}, '', window.location.pathname);
      }
    };

    checkAccess();
    handlePaymentReturn();
  }, [checkAccess, visitorId, slug, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
        },
        body: JSON.stringify({ visitorId, slug }),
      });
      if (res.ok) {
        const data = await res.json();
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      toast({ title: 'Payment Error', status: 'error' });
      setProcessing(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || processing) return;

    if (accessInfo && !accessInfo.canChat) {
      onOpen();
      return;
    }

    const userMsg: Message = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/investor-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
        },
        body: JSON.stringify({
          slug,
          message: text,
          visitorId,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (res.status === 402) {
        setMessages(prev => prev.slice(0, -1));
        setInput(text);
        onOpen();
        return;
      }

      const data = await res.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      await checkAccess();
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const messagesRemaining = typeof accessInfo?.messagesRemaining === 'number'
    ? accessInfo.messagesRemaining
    : (accessInfo?.totalFreeMessages ?? 10) - (accessInfo?.messagesUsed ?? 0);

  return (
    <Box className="flex flex-col w-full h-full bg-white overflow-hidden" minH="calc(100vh - 180px)">
      <header className="flex flex-col bg-white pt-2 pb-2 sticky top-0 z-20 border-b border-slate-100">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-xl font-bold text-slate-900">Hushh Assistant</h1>
          <Settings className="w-5 h-5 text-slate-500 cursor-pointer" />
        </div>
        <div className="px-4 pb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#2B8CEE]/30 bg-[#2B8CEE]/5 text-[#2B8CEE] text-sm font-semibold">
            <Zap className="w-4 h-4" />
            <span>
              {accessInfo?.accessType === 'paid' ? `Unlimited • ${accessInfo.timeRemaining}` : `${messagesRemaining} Free Messages Left`}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10">
            <HushhAvatar size="lg" showOnline />
            <h2 className="font-bold text-[22px] mt-6 text-center">How can I help you?</h2>
            <p className="text-slate-500 text-sm mt-2 text-center max-w-[280px]">
              Ask me anything about {investorName}'s investment strategy.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && <HushhAvatar size="sm" />}
            <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-[#2B8CEE] text-white rounded-tr-none' : 'bg-slate-100 text-slate-900 rounded-tl-none'}`}>
                <ReactMarkdown className="prose prose-sm">{msg.content}</ReactMarkdown>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        {loading && <div className="text-slate-400 text-xs italic ml-12 animate-pulse">Assistant is thinking...</div>}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 border-t border-slate-100 bg-white">
        <div className="flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
            placeholder="Type your message..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2B8CEE] outline-none resize-none min-h-[52px]"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim() || processing}
            className="w-12 h-12 bg-[#2B8CEE] text-white rounded-xl flex items-center justify-center disabled:opacity-50"
          >
            {processing ? <Spinner size="sm" /> : <ArrowUp />}
          </button>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-3 text-slate-400">
          <ShieldCheck size={12} />
          <span className="text-[11px]">Secure, private AI conversation</span>
        </div>
      </footer>

      <ChatPaymentModal isOpen={isOpen} onClose={onClose} onPayment={handlePayment} isProcessing={processing} />
    </Box>
  );
}