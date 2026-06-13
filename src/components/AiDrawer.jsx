import React, { useEffect, useState, useRef } from 'react';

// Extracted from reference.html
const TASKS = {
  add_employee: {
    title: 'Add a new employee',
    intro: "Sure — let's add a new team member. I'll ask a few quick questions. 👇",
    slots: [
      { k: 'n', q: "What's their full name?" },
      { k: 'r', q: "What's their job title?" },
      { k: 'd', q: "Which department are they in?" },
      { k: 'e', q: "What's their work email?", hint: 'e.g. name@24loops.co', optional: true },
      { k: 'st', q: "What's their work setup?", options: [{ label: 'On-site', value: 'active' }, { label: 'Remote', value: 'remote' }] },
    ],
    summary: d => `• **Name:** ${d.n}\n• **Role:** ${d.r}\n• **Department:** ${d.d}\n• **Email:** ${d.e || '—'}\n• **Setup:** ${d.st === 'remote' ? 'Remote' : 'On-site'}`,
    done: d => `✅ Done! **${d.n}** has been added to the team and now appears in the Employees page.`
  },
  request_leave: {
    title: 'Request leave',
    intro: "Happy to file a leave request. A couple of details first. 👇",
    slots: [
      { k: 'who', q: "Who is this leave for?" },
      { k: 'type', q: "What type of leave?", options: ['Annual Leave', 'Sick Leave', 'Personal', 'Remote Day'] },
      { k: 'from', q: "Start date? (e.g. Jun 18)" },
      { k: 'to', q: "End date? (e.g. Jun 20)" },
    ],
    summary: d => `• **Employee:** ${d.who}\n• **Type:** ${d.type}\n• **Dates:** ${d.from} – ${d.to}`,
    done: d => `✅ Leave request for **${d.who}** (${d.type}) submitted and now shows as *Pending* in the Leave page.`
  },
  post_announcement: {
    title: 'Post an announcement',
    intro: "Let's get the word out 📣. Two quick things. 👇",
    slots: [
      { k: 't', q: "What's the announcement title?" },
      { k: 'p', q: "What's the message?" },
    ],
    summary: d => `• **Title:** ${d.t}\n• **Message:** ${d.p}`,
    done: d => `✅ Posted **"${d.t}"** — it's live on the Announcements page now.`
  },
  add_expense: {
    title: 'Log an expense claim',
    intro: "Sure, let's log an expense claim. 👇",
    slots: [
      { k: 'who', q: "Whose claim is this?" },
      { k: 'desc', q: "What's it for?" },
      { k: 'cat', q: "Which category?", options: ['Travel', 'Software', 'Training', 'Marketing', 'Meals'] },
      { k: 'amt', q: "How much? (e.g. $120)" },
    ],
    summary: d => `• **Employee:** ${d.who}\n• **For:** ${d.desc}\n• **Category:** ${d.cat}\n• **Amount:** ${d.amt}`,
    done: d => `✅ Logged a **${d.amt}** ${d.cat} claim for **${d.who}**. It's now pending approval.`
  },
};

function detectIntent(t) {
  t = t.toLowerCase();
  if (/\b(add|create|new|onboard|register|hire)\b.*\b(employee|team ?member|staff|hire|person|people|someone|worker)\b/.test(t) || /\b(new|add)\s+employee\b/.test(t)) return 'add_employee';
  if (/\b(request|book|take|apply|file|log|add)\b.*\b(leave|time ?off|vacation|holiday|day ?off|pto|sick)\b/.test(t)) return 'request_leave';
  if (/\b(post|create|make|draft|send|publish|write)\b.*\b(announcement|notice|update|memo|news)\b/.test(t)) return 'post_announcement';
  if (/\b(add|submit|file|create|log|claim)\b.*\b(expense|claim|reimburse|receipt)\b/.test(t)) return 'add_expense';
  return null;
}

function fmt(t) {
  return t
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.+?)\*/g, '<i>$1</i>')
    .replace(/_(.+?)_/g, '<i>$1</i>')
    .replace(/\n/g, '<br>');
}

const DEFAULT_CHIPS = [
  { label: '➕ Add employee', value: 'Add a new employee' },
  { label: '📅 Request leave', value: 'Request leave' },
  { label: '📣 Post announcement', value: 'Post an announcement' },
  { label: '💡 Summarise this week', value: 'Summarise this week in HR' }
];

export default function AiDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Agent state
  const [agent, setAgent] = useState(null); // { key, step, data }
  
  const msgsRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'bot',
        content: "Hi Carla 👋 I'm <b>Loop AI</b>, your HR agent. I can answer questions <i>and</i> get things done — just tell me what you need, like <b>“add a new employee”</b> or <b>“book leave for Judy”</b>."
      }]);
      setChips(DEFAULT_CHIPS);
    }
  }, [isOpen]);

  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const botSay = (text) => {
    setMessages(prev => [...prev, { role: 'bot', content: fmt(text) }]);
  };

  const startTask = (key, q) => {
    const task = TASKS[key];
    const initialData = {};
    if (key === 'add_employee') {
      const m = q.match(/employee\s+(?:named\s+|called\s+)?([a-z][a-z .'\-]{1,40})/i);
      if (m) {
        const nm = m[1].trim().replace(/\b\w/g, c => c.toUpperCase());
        if (nm.length > 1 && !/^(to|the|a|new)$/i.test(nm)) initialData.n = nm;
      }
    }
    setAgent({ key, step: 0, data: initialData });
    botSay(task.intro);
    askSlot(key, 0, initialData);
  };

  const askSlot = (key, step, data) => {
    const task = TASKS[key];
    let currentStep = step;
    
    while (currentStep < task.slots.length && data[task.slots[currentStep].k] !== undefined) {
      currentStep++;
    }

    if (currentStep >= task.slots.length) {
      setAgent({ key, step: 'confirm', data });
      botSay("Here's what I've got:\n\n" + task.summary(data) + "\n\nShall I save it?");
      setChips([{ label: '✅ Yes, save', value: 'yes' }, { label: '✖ Cancel', value: 'cancel' }]);
      return;
    }

    setAgent({ key, step: currentStep, data });
    const s = task.slots[currentStep];
    botSay(s.q + (s.hint ? `\n_${s.hint}_` : '') + (s.optional ? `\n_(optional — type “skip” to leave blank)_` : ''));
    
    if (s.options) {
      const opts = s.options.map(o => typeof o === 'string' ? { label: o, value: o } : o);
      if (s.optional) opts.push({ label: 'Skip', value: 'skip' });
      setChips(opts);
    } else {
      setChips([]);
    }
  };

  const agentStep = (ans) => {
    const task = TASKS[agent.key];
    const low = ans.toLowerCase().trim();

    if (agent.step === 'confirm') {
      if (/^(y|yes|yep|yeah|sure|ok|okay|confirm|do it|save|go)/.test(low)) {
        const d = agent.data;
        const msg = task.done(d);
        setAgent(null);
        botSay(msg);
        setTimeout(() => setChips(DEFAULT_CHIPS), 400);
      } else if (/^(n|no|cancel|stop|nope)/.test(low)) {
        setAgent(null);
        botSay("Okay, cancelled — nothing was saved. Anything else?");
        setChips(DEFAULT_CHIPS);
      } else {
        botSay("Just tap **Yes, save** to confirm or **Cancel** to discard.");
        setChips([{ label: '✅ Yes, save', value: 'yes' }, { label: '✖ Cancel', value: 'cancel' }]);
      }
      return;
    }

    const s = task.slots[agent.step];
    const newData = { ...agent.data };
    if (!(s.optional && /^skip$/.test(low))) {
      newData[s.k] = ans.trim();
    }
    
    askSlot(agent.key, agent.step + 1, newData);
  };

  const chatAI = (q) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const l = q.toLowerCase();
      let reply = "Got it. I can answer HR questions or take an action for you — try *add a new employee*, *request leave*, *post an announcement*, or *log an expense*.\n\n_(Live AI is unavailable in this preview, so this is a sample reply — the task actions above work fully.)_";
      
      if (l.includes('top perform')) reply = "Your top performers this period:\n\n**1. Judy Abbott** — 314 tasks\n**2. Martin Feeney** — 308\n**3. Ellen Streich** — 289\n\nEllen is trending up fast — worth a promotion chat.";
      else if (l.includes('week') || l.includes('summar')) reply = "**This week at 24 loops**\n\n• Attendance steady at ~90%\n• 3 leave requests pending review\n• Engineering attrition risk up 8% — suggest 1:1s\n• Aria Kapoor (96% fit) ready for an Engineering Manager offer";
      else if (l.includes('job description') || l.includes('jd')) reply = "**Senior Frontend Engineer — 24 loops**\n\nWe're hiring a Senior Frontend Engineer to craft delightful, performant interfaces.\n\n**You'll:** build React apps, mentor engineers, shape our design system.\n**You have:** 5+ yrs frontend, strong JS/TS, an eye for UX.\n\nRemote-friendly · competitive pay.";
      else if (l.includes('leave') || l.includes('policy')) reply = "**Leave policy (summary)**\n\n• 20 annual + 10 sick days/year\n• Request via the Leave tab; manager approves\n• Up to 5 unused annual days roll over\n\nWant me to file a request? Just say *request leave*.";
      
      botSay(reply);
      setChips(DEFAULT_CHIPS);
    }, 600);
  };

  const route = (q) => {
    setMessages(prev => [...prev, { role: 'user', content: fmt(q) }]);
    setChips([]);
    const low = q.toLowerCase().trim();

    if (agent && /^(cancel|stop|nevermind|never mind|forget it|quit)$/.test(low)) {
      setAgent(null);
      botSay("No problem — cancelled. What else can I help with?");
      setChips(DEFAULT_CHIPS);
      return;
    }

    if (agent) {
      agentStep(q);
      return;
    }

    const intent = detectIntent(q);
    if (intent) {
      startTask(intent, q);
      return;
    }

    chatAI(q);
  };

  const sendAI = () => {
    const q = inputValue.trim();
    if (!q) return;
    setInputValue('');
    route(q);
  };

  const handleChipClick = (value) => {
    route(value);
  };

  return (
    <>
      <div 
        className={`ai-drawer-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />
      
      <div className={`ai-drawer ${isOpen ? 'show' : ''}`} id="aiDrawer">
        <div className="ai-dh">
          <div className="row">
            <div className="orb">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>
                <circle cx="12" cy="12" r="3.2"/>
              </svg>
            </div>
            <div>
              <h3>Loop AI</h3>
              <p>Your HR agent · chat to get things done</p>
            </div>
            <button className="close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div className={`ai-task ${agent ? 'show' : ''}`} id="aiTask">
            {agent && (
              <>
                <span className="tdot"></span> 
                Working on: <b>{TASKS[agent.key].title}</b> 
                <span className="tcancel" onClick={() => route('cancel')}>cancel</span>
              </>
            )}
          </div>
        </div>
        
        <div className="ai-msgs" id="aiMsgs" ref={msgsRef}>
          {messages.map((m, i) => (
            <div key={i} className={`ai-msg ${m.role}`} dangerouslySetInnerHTML={{ __html: m.content }} />
          ))}
          {isTyping && (
            <div className="ai-msg bot">
              <div className="typing"><span></span><span></span><span></span></div>
            </div>
          )}
        </div>
        
        <div className="ai-suggest" id="aiSuggest">
          {chips.map((c, i) => (
            <button key={i} onClick={() => handleChipClick(c.value)}>{c.label}</button>
          ))}
        </div>
        
        <div className="ai-input">
          <textarea 
            id="aiText" 
            rows="1" 
            placeholder="Ask about attendance, policies, hiring..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendAI();
              }
            }}
          />
          <button onClick={sendAI}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
