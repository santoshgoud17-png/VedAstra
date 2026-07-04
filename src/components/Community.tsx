import React, { useState } from 'react';
import { COMMUNITY_POSTS } from '../demoData';
import { Heart, MessageSquare, Share2, Bookmark, Users, TrendingUp } from 'lucide-react';

const TRENDING_TOPICS = [
  { tag: '#AIEngineering', posts: 4820 },
  { tag: '#MachineLearning', posts: 3610 },
  { tag: '#RAGPipelines', posts: 2940 },
  { tag: '#Transformers', posts: 2280 },
  { tag: '#DataScience', posts: 1970 },
  { tag: '#EthicalHacking', posts: 1340 },
  { tag: '#SystemDesign', posts: 1120 },
];

const STUDY_GROUPS = [
  { name: 'LLM Engineers India', emoji: '🤖', members: 2840, active: true },
  { name: 'Data Science Hub', emoji: '📊', members: 3610, active: true },
  { name: 'Security Researchers', emoji: '🛡️', members: 1240, active: false },
  { name: 'React Full Stack Dev', emoji: '⚛️', members: 4920, active: true },
];

export const Community: React.FC = () => {
  const [posts, setPosts] = useState(COMMUNITY_POSTS.map(p => ({ ...p })));
  const [activeFilter, setActiveFilter] = useState<'all' | 'discussion' | 'showcase' | 'hackathon' | 'question'>('all');
  const [newPost, setNewPost] = useState('');

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const toggleBookmark = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, bookmarked: !p.bookmarked } : p));
  };

  const filtered = activeFilter === 'all' ? posts : posts.filter(p => p.category === activeFilter);

  const CATEGORY_COLORS: Record<string, string> = {
    discussion: '#7C3AED', showcase: '#10B981', hackathon: '#F59E0B', question: '#0EA5E9'
  };

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      {/* ── Main Feed ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {['all', 'discussion', 'showcase', 'hackathon', 'question'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f as any)} style={{ padding: '7px 16px', borderRadius: 20, border: `1.5px solid ${activeFilter === f ? 'var(--accent-primary)' : 'var(--border-card)'}`, background: activeFilter === f ? 'rgba(124,58,237,0.08)' : 'var(--bg-card)', color: activeFilter === f ? 'var(--accent-primary)' : 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: '0.15s', textTransform: 'capitalize' }}>
              {f === 'all' ? '🌐 All' : f === 'discussion' ? '💬 Discussion' : f === 'showcase' ? '🚀 Showcase' : f === 'hackathon' ? '🏆 Hackathon' : '❓ Q&A'}
            </button>
          ))}
        </div>

        {/* New Post Composer */}
        <div className="card-flat" style={{ padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>AS</div>
            <div style={{ flex: 1 }}>
              <textarea
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                placeholder="Share your learning progress, ask a question, or showcase a project..."
                rows={2}
                style={{ width: '100%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-card)', borderRadius: 'var(--border-radius-sm)', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none', resize: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.3)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-card)'}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                <button className="btn btn-secondary btn-sm">Add Tags</button>
                <button className="btn btn-primary btn-sm" onClick={() => setNewPost('')}>Post</button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((post, i) => (
            <div key={post.id} className="card-flat" style={{ padding: 20, animation: `fadeInUp 0.4s ease ${i * 0.06}s both` }}>
              {/* Post Header */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: post.authorColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>
                  {post.authorInitials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{post.author}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{post.authorRole}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{post.timeAgo}</span>
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: `${CATEGORY_COLORS[post.category]}15`, color: CATEGORY_COLORS[post.category], border: `1px solid ${CATEGORY_COLORS[post.category]}30`, textTransform: 'capitalize', marginTop: 2, display: 'inline-block' }}>
                    {post.category === 'hackathon' ? '🏆' : post.category === 'showcase' ? '🚀' : post.category === 'question' ? '❓' : '💬'} {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 12 }}>{post.content}</p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-primary)', background: 'rgba(124,58,237,0.07)', padding: '2px 8px', borderRadius: 99 }}>#{tag}</span>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'var(--border-card)', marginBottom: 12 }} />

              {/* Actions */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <button onClick={() => toggleLike(post.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: post.liked ? '#EF4444' : 'var(--text-muted)', transition: '0.15s', padding: '4px 0' }}>
                  <Heart size={15} fill={post.liked ? '#EF4444' : 'none'} color={post.liked ? '#EF4444' : 'currentColor'} /> {post.likes}
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', transition: '0.15s', padding: '4px 0' }}>
                  <MessageSquare size={15} /> {post.comments}
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', transition: '0.15s', padding: '4px 0' }}>
                  <Share2 size={15} /> {post.shares}
                </button>
                <button onClick={() => toggleBookmark(post.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: post.bookmarked ? 'var(--accent-primary)' : 'var(--text-muted)', transition: '0.15s', padding: '4px 0', marginLeft: 'auto' }}>
                  <Bookmark size={15} fill={post.bookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Sidebar ── */}
      <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Trending */}
        <div className="chart-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <TrendingUp size={16} color="var(--accent-primary)" />
            <h3 className="heading-sm" style={{ margin: 0 }}>Trending Topics</h3>
          </div>
          {TRENDING_TOPICS.map((t, i) => (
            <div key={t.tag} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < TRENDING_TOPICS.length - 1 ? '1px solid var(--border-card)' : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{t.tag}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.posts.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Study Groups */}
        <div className="chart-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Users size={16} color="var(--accent-primary)" />
            <h3 className="heading-sm" style={{ margin: 0 }}>Study Groups</h3>
          </div>
          {STUDY_GROUPS.map(g => (
            <div key={g.name} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-card)', cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--border-radius-sm)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{g.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.name}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{g.members.toLocaleString()} members</div>
              </div>
              {g.active && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />}
            </div>
          ))}
          <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: 10 }}>Discover More Groups</button>
        </div>

        {/* Platform Stats */}
        <div className="chart-container" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05) 0%, rgba(14,165,233,0.05) 100%)', border: '1px solid rgba(124,58,237,0.12)' }}>
          <h3 className="heading-sm" style={{ marginBottom: 14 }}>Platform Today</h3>
          {[
            { label: 'Active Learners', value: '12,840', icon: '🌏' },
            { label: 'Lessons Completed', value: '48,200', icon: '✅' },
            { label: 'AI Notes Generated', value: '9,120', icon: '🤖' },
            { label: 'Posts Today', value: '1,640', icon: '💬' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--border-card)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><span>{s.icon}</span>{s.label}</span>
              <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.88rem', color: 'var(--accent-primary)' }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
