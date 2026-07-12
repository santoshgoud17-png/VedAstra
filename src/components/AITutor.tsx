import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { AI_LESSON_CONTENT } from '../demoData';
import { useTranslation } from '../i18n';
import { Send, Mic, Paperclip, BookOpen, Zap, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  type?: 'text' | 'code' | 'quiz' | 'flashcard';
}

// Prompt chips — labels translated at render time via useTranslation
const EXAMPLE_PROMPT_DEFS = [
  { icon: '🔮', labelKey: 'tutor.explainTransformers', prompt: 'Explain how the Transformer architecture works in simple terms.' },
  { icon: '📝', labelKey: 'tutor.generateMCQs', prompt: 'Generate 5 multiple choice questions about Attention mechanisms.' },
  { icon: '🌐', labelKey: 'tutor.explainLocal', prompt: 'Explain machine learning in Telugu language.' },
  { icon: '⚡', labelKey: 'tutor.createFlashcards', prompt: 'Create 5 flashcards for the key concepts in Deep Learning.' },
  { icon: '💻', labelKey: 'tutor.debugCode', prompt: 'Generate a Python coding problem about binary trees with solution.' },
  { icon: '📋', labelKey: 'tutor.practiceProblems', prompt: 'Summarize the key points from today\'s lecture on neural networks.' },
];

const AI_RESPONSES: Record<string, string> = {
  'Explain how the Transformer architecture works in simple terms.': `## 🔮 Transformer Architecture

A **Transformer** processes your entire input sequence *at once* — unlike older RNNs that read word by word.

### The Core Idea: Attention
Instead of reading left-to-right, the model asks: *"Which words should I pay attention to when understanding this word?"*

**Self-Attention Formula:**
\`\`\`
Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V
\`\`\`

### Main Components:
| Component | Role |
|-----------|------|
| **Encoder** | Reads and understands the input |
| **Decoder** | Generates the output |
| **Multi-Head Attention** | Looks at different aspects simultaneously |
| **Positional Encoding** | Tells the model word order |

### Why It's Revolutionary:
✅ **Parallelizable** — trains 10x faster than RNNs  
✅ **Long-range dependencies** — connects distant words easily  
✅ **Foundation of GPT, BERT, T5, Claude, Gemini**

Would you like me to generate a quiz on this topic? 🎯`,

  'Generate 5 multiple choice questions about Attention mechanisms.': `## 📝 MCQ Quiz: Attention Mechanisms

**Q1.** What does the scaling factor √d_k prevent in attention?
- A) Gradient explosion
- **B) Dot products from becoming too large in high dimensions** ✅
- C) Overfitting
- D) Underfitting

**Q2.** In multi-head attention, what happens to the outputs?
- A) They are averaged
- **B) They are concatenated and projected** ✅
- C) Only the best head is kept
- D) They are summed

**Q3.** What is the role of the Value (V) matrix?
- A) Computes similarity scores
- B) Selects which positions to attend to
- **C) Contains the actual information to aggregate** ✅
- D) Encodes positional information

**Q4.** Positional encodings use which mathematical functions?
- A) Exponential and logarithm
- **B) Sine and cosine** ✅
- C) Polynomial
- D) ReLU

**Q5.** Self-attention has what time complexity with respect to sequence length n?
- **A) O(n²)** ✅
- B) O(n log n)
- C) O(n)
- D) O(n³)

+45 XP for generating this quiz! 🎉`,

  'Explain machine learning in Telugu language.': `## 🌐 మషిన్ లెర్నింగ్ (Machine Learning)

మషిన్ లెర్నింగ్ అనేది కృత్రిమ మేధస్సు (AI) యొక్క ఒక భాగం. దీని ద్వారా కంప్యూటర్లకు ప్రత్యేకంగా కోడింగ్ రాయకుండా, అవి స్వయంగా డేటా నుండి నేర్చుకునేలా చేయవచ్చు.

### ముఖ్యమైన రకాలు:
1. **Supervised Learning (పర్యవేక్షించబడిన అభ్యాసం):** లేబుల్ చేయబడిన డేటాను ఉపయోగించి మోడల్‌కు శిక్షణ ఇవ్వడం. (ఉదా: ఈమెయిల్ స్పామ్ గుర్తింపు)
2. **Unsupervised Learning (పర్యవేక్షించబడని అభ్యాసం):** లేబుల్ లేని డేటాలో దాగి ఉన్న నమూనాలను కనుగొనడం. (ఉదా: కస్టమర్ల సమూహ విభజన)
3. **Reinforcement Learning (పునర్బల అభ్యాసం):** ట్రయల్ మరియు ఎర్రర్ ద్వారా బహుమతులు లేదా జరిమానాల ఆధారంగా నేర్చుకోవడం. (ఉదా: రోబోటిక్స్, ఆటలు)

మరింత సమాచారం కావాలా? నన్ను అడగండి! 🚀`,

  'Create 5 flashcards for the key concepts in Deep Learning.': `## ⚡ Deep Learning Flashcards

ఇక్కడ మీకోసం 5 ముఖ్యమైన ఫ్లాష్‌కార్డ్‌లు సిద్ధంగా ఉన్నాయి:

**కార్డ్ 1. Epoch అంటే ఏమిటి?**
- జవాబు: మొత్తం డేటాసెట్‌ను నెట్‌వర్క్ ద్వారా ఒకసారి పంపించడాన్ని ఒక Epoch అంటారు.

**కార్డ్ 2. Overfitting అంటే ఏమిటి?**
- జవాబు: మోడల్ కేవలం ట్రైనింగ్ డేటాను బట్టీ పట్టి, కొత్త డేటాపై సరిగ్గా పనిచేయకపోవడం.

**కార్డ్ 3. Backpropagation పాత్ర ఏమిటి?**
- జవాబు: గ్రేడియంట్లను లెక్కించి, తప్పులను తగ్గించడానికి నెట్‌వర్క్ బరువులను (Weights) సర్దుబాటు చేయడం.

**కార్డ్ 4. Activation Function ఎందుకు ఉపయోగపడుతుంది?**
- జవాబు: న్యూరల్ నెట్‌వర్క్‌లలో రేఖీయం కాని (Non-linear) గుణాలను ప్రవేశపెట్టడానికి.

**కార్డ్ 5. Learning Rate అంటే ఏమిటి?**
- జవాబు: బరువులను ఎంత వేగంగా లేదా నెమ్మదిగా మార్చాలో నిర్ణయించే నియంత్రణ పరామితి.

ఫ్లాష్‌కార్డ్‌లను బాగా ప్రాక్టీస్ చేయండి! +30 XP 🌟`,

  'Generate a Python coding problem about binary trees with solution.': `## 💻 Coding Challenge: Max Depth of Binary Tree

**సమస్య:** ఒక బైనరీ ట్రీ యొక్క గరిష్ట లోతును (Maximum Depth) కనుగొనే పైథాన్ ఫంక్షన్‌ను వ్రాయండి.

### పైథాన్ కోడ్ సొల్యూషన్:
\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxDepth(root: TreeNode) -> int:
    # బేస్ కేస్: ట్రీ ఖాళీగా ఉంటే లోతు 0
    if not root:
        return 0
    
    # లెఫ్ట్ మరియు రైట్ సబ్‌ట్రీల లోతును కనుగొనడం
    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)
    
    # గరిష్ట లోతుకు 1 జోడించి రిటర్న్ చేయడం
    return max(left_depth, right_depth) + 1
\`\`\`

### సమయ సంక్లిష్టత (Time Complexity):
- **O(N)** - ఇక్కడ N అనేది ట్రీలోని నోడ్ల సంఖ్య. ప్రతి నోడ్‌ను ఒకసారి సందర్శిస్తాము.

ట్రై చేసి చూడండి! +50 XP 🏆`,

  "Summarize the key points from today's lecture on neural networks.": `## 📋 Neural Networks Summary

నేటి ఉపన్యాసంలోని ముఖ్యమైన అంశాల సారాంశం:

1. **న్యూరాన్ల నిర్మాణం:** ఇన్పుట్ పొర (Input Layer), దాగి ఉన్న పొరలు (Hidden Layers) మరియు అవుట్పుట్ పొర (Output Layer).
2. **ఫీడ్-ఫార్వర్డ్ (Feed-forward):** ఇన్పుట్ డేటా ముందు వైపునకు ప్రయాణించి ప్రెడిక్షన్‌ను ఇవ్వడం.
3. **లాస్ కాలిక్యులేషన్ (Loss Calculation):** మోడల్ అంచనాలు మరియు అసలైన విలువల మధ్య గల వ్యత్యాసాన్ని కొలవడం.
4. **ఆప్టిమైజేషన్ (Optimization):** Gradient Descent ద్వారా నష్టాన్ని తగ్గించి కచ్చితత్వాన్ని పెంచడం.

ఈ అంశాలపై ఏవైనా సందేహాలు ఉంటే అడగగలరు! 💡`,

  'Generate Notes': `## 📝 Lesson Notes: Transformer Models
- **Introduction:** Devised by Google in 2017 to handle translation tasks.
- **Key Advantage:** Replaces sequential recurrence (RNN) with parallel attention.
- **Core Component:** Self-attention layer that assigns relational weights to token inputs dynamically.
- **Impact:** Scaled language modeling to billions of parameters, yielding GPT, BERT, Gemini, and Claude.

Notes copied to study desk! +20 XP 🚀`,

  'Create Quiz': `## 📝 Instant Quiz: Self-Attention
1. **Which matrix determines the matching strength?** Query (Q) and Key (K).
2. **What is the mathematical complexity of Self-Attention?** O(n²).
3. **What activates parallel computation?** Removal of Recurrent Neural loops.

Answer these questions in your dashboard to earn +30 XP!`,

  'Explain Formula': `## 🧠 Self-Attention Mathematical Formulation
\`\`\`
Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V
\`\`\`
- **Q (Query):** Represents the target token asking for context.
- **K (Key):** Represents all tokens offering context.
- **V (Value):** Contains the actual token content.
- **√d_k:** Scales the dot product so softmax gradients do not saturate.

Is there any part of this formula you'd like to break down?`,

  'Translate to Hindi': `## 🌐 मशीन लर्निंग (हिन्दी में अनुवाद)
मशीन लर्निंग (ML) आर्टिफिशियल इंटेलिजेंस का एक प्रमुख हिस्सा है। इसके अंतर्गत कंप्यूटर बिना किसी स्पष्ट कोडिंग के, उपलब्ध डेटा का विश्लेषण करके स्वतः नई चीजें सीख सकते हैं।

### प्रमुख प्रकार:
1. **Supervised Learning (सशर्त शिक्षण):** इसमें मॉडल को लेबल किए गए डेटा द्वारा प्रशिक्षित किया जाता है।
2. **Unsupervised Learning (अशर्त शिक्षण):** इसमें बिना लेबल वाले डेटा में छिपे हुए पैटर्नों का पता लगाया जाता है।
3. **Reinforcement Learning:** यह पुरस्कार और दंड प्रणाली के सिद्धांतों पर काम करता है।`,

  default: `I'm analyzing your question and preparing a personalized response...

Based on your current learning path toward **AI Engineering**, here's what I recommend:

1. **Focus on your identified weak areas**: Cloud Architecture (61%) and System Design (55%)
2. **Daily practice**: Spend 30 mins on LeetCode-style problems to improve Problem Solving
3. **Your next milestone**: Complete the "Deep Learning" module to unlock the LLMs chapter

**Quick Tip 💡**: Your learning streak of 128 days shows incredible consistency. Studies show consistent learners retain 3.4x more than binge learners.

What specific topic would you like to explore deeper? I can generate notes, flashcards, quizzes, or coding problems for you! 🚀`,
};

export const AITutor: React.FC = () => {
  const { activeStudent, addXp } = useApp();
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      content: `Hey ${activeStudent.name}! 👋 I'm **Veda**, your personal AI mentor.\n\nI know you're working toward becoming an **${activeStudent.goal}** with a ${activeStudent.streak}-day streak — incredible dedication! 🔥\n\nI can help you with explanations, quizzes, flashcards, code, summaries, and more. What would you like to explore today?`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const aiText = AI_RESPONSES[text] || AI_RESPONSES['default'];
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: aiText, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
    addXp(15);
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '12px 0 6px', fontFamily: 'Outfit' }}>{line.replace('## ', '')}</h3>;
      if (line.startsWith('### ')) return <h4 key={i} style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', margin: '10px 0 4px' }}>{line.replace('### ', '')}</h4>;
      if (line.startsWith('**') && line.endsWith('**')) {
        const txt = line.slice(2, -2);
        return <p key={i} style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0', fontSize: '0.875rem' }}>{txt}</p>;
      }
      if (line.startsWith('```')) return null;
      if (line.startsWith('|')) {
        return <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: 'var(--bg-tertiary)', padding: '2px 8px', margin: '1px 0', color: 'var(--text-secondary)', borderLeft: '3px solid var(--accent-primary)' }}>{line}</div>;
      }
      if (line.startsWith('- ') || line.startsWith('✅') || line.startsWith('**Q')) {
        return <div key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '3px 0', paddingLeft: line.startsWith('- ') ? 12 : 0, borderLeft: line.startsWith('**B)') ? '2px solid var(--accent-success)' : 'none', paddingRight: 4 }}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code style="background:var(--bg-tertiary);padding:1px 4px;border-radius:3px;font-size:0.8em">$1</code>') }}
        />;
      }
      if (line.startsWith('`') && line.endsWith('`')) {
        return <code key={i} style={{ display: 'block', background: '#1E1E2E', color: '#CDD6F4', padding: '8px 12px', borderRadius: 6, fontSize: '0.82rem', margin: '6px 0', fontFamily: 'monospace', overflowX: 'auto' }}>{line.slice(1, -1)}</code>;
      }
      if (!line.trim()) return <br key={i} />;
      return (
        <p key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '3px 0', lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>').replace(/`(.*?)`/g, '<code style="background:var(--bg-tertiary);padding:1px 4px;border-radius:3px;font-size:0.8em;font-family:monospace">$1</code>') }}
        />
      );
    });
  };

  return (
    <div style={{ display: 'flex', gap: 20, height: 'calc(100vh - 120px)', minHeight: 0 }}>
      {/* ── Chat Panel ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--border-radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', gap: 12, background: 'linear-gradient(135deg, rgba(124,58,237,0.05) 0%, rgba(14,165,233,0.03) 100%)' }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(124,58,237,0.35)' }}>
            <Zap size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, fontFamily: 'Outfit' }}>Veda — Your AI Mentor</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', animation: 'pulse-ring 2s infinite' }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-success)', fontWeight: 600 }}>Online · Personalized for {activeStudent.name}</span>
            </div>
          </div>
          <button className="btn-icon btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setMessages(messages.slice(0, 1))} title="Clear chat">
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', gap: 10, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start', animation: 'fadeInUp 0.3s ease' }}>
              {msg.role === 'ai' && (
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Zap size={14} color="white" />
                </div>
              )}
              {msg.role === 'user' && (
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>
                  {activeStudent.initials}
                </div>
              )}
              <div style={{ maxWidth: '75%' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: msg.role === 'ai' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                  background: msg.role === 'ai' ? 'var(--bg-card)' : 'linear-gradient(135deg, #7C3AED, #0EA5E9)',
                  color: msg.role === 'ai' ? 'var(--text-primary)' : 'white',
                  border: msg.role === 'ai' ? '1px solid var(--border-card)' : 'none',
                  boxShadow: msg.role === 'ai' ? 'var(--shadow-sm)' : '0 4px 16px rgba(124,58,237,0.3)',
                }}>
                  {msg.role === 'ai' ? renderContent(msg.content) : (
                    <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.5 }}>{msg.content}</p>
                  )}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 4, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', animation: 'fadeInUp 0.3s ease' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={14} color="white" />
              </div>
              <div style={{ padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '4px 16px 16px 16px', display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} className="typing-dot" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Example Prompts */}
        <div style={{ padding: '0 16px 8px', display: 'flex', gap: 6, overflowX: 'auto', flexWrap: 'wrap' }}>
          {EXAMPLE_PROMPT_DEFS.map(p => (
            <button key={p.labelKey} onClick={() => sendMessage(p.prompt)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-card)', borderRadius: 20, fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: '0.15s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-card)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              <span>{p.icon}</span> {t(p.labelKey as any)}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-card)', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <button className="btn-icon" style={{ flexShrink: 0 }}>
            <Paperclip size={16} />
          </button>
          <div style={{ flex: 1, background: 'var(--bg-tertiary)', borderRadius: 20, border: '1px solid var(--border-card)', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder={t('tutor.askAnything')}
              rows={1}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: '0.875rem', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}
            />
          </div>
          <button className="btn-icon" style={{ flexShrink: 0 }}>
            <Mic size={16} />
          </button>
          <button onClick={() => sendMessage(input)} className="btn btn-primary" style={{ borderRadius: '50%', width: 40, height: 40, padding: 0, flexShrink: 0 }}>
            <Send size={15} />
          </button>
        </div>
      </div>

      {/* ── Right Sidebar — Flashcards ── */}
      <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Context Card */}
        <div className="chart-container">
          <h3 className="heading-sm" style={{ marginBottom: 12 }}>Current Context</h3>
          <div style={{ padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-sm)', marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
            <BookOpen size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>Machine Learning Masterclass</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Chapter 7: Transformers</div>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <div style={{ marginBottom: 4, fontWeight: 600 }}>Quick Actions:</div>
            {['Generate Notes', 'Create Quiz', 'Explain Formula', 'Translate to Hindi'].map(a => (
              <button key={a} onClick={() => sendMessage(a)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 10px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-secondary)', borderRadius: 'var(--border-radius-xs)', transition: '0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                → {a}
              </button>
            ))}
          </div>
        </div>

        {/* Flashcards */}
        <div className="chart-container" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 className="heading-sm">Flashcards</h3>
            <span className="badge badge-purple">{currentCard + 1}/{AI_LESSON_CONTENT.flashcards.length}</span>
          </div>

          <div
            onClick={() => setCardFlipped(!cardFlipped)}
            style={{ minHeight: 160, background: cardFlipped ? 'linear-gradient(135deg, #7C3AED 0%, #0EA5E9 100%)' : 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-md)', padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', transition: 'all 0.4s ease', border: '1px solid var(--border-card)', gap: 8 }}
          >
            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: cardFlipped ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)' }}>
              {cardFlipped ? 'ANSWER' : `${t('tutor.flipCard').toUpperCase()}`}
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: cardFlipped ? 'white' : 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
              {cardFlipped ? AI_LESSON_CONTENT.flashcards[currentCard].back : AI_LESSON_CONTENT.flashcards[currentCard].front}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => { setCurrentCard(c => Math.max(0, c - 1)); setCardFlipped(false); }}>{t('tutor.prevCard')}</button>
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => { setCurrentCard(c => (c + 1) % AI_LESSON_CONTENT.flashcards.length); setCardFlipped(false); }}>{t('tutor.nextCard')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
