// ============================================================
// VEDASTRA DEMO DATA — Rich realistic platform content
// ============================================================


// -----------------------------------------------
// TYPES
// -----------------------------------------------
export interface DemoUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'educator' | 'recruiter' | 'admin';
  initials: string;
  title?: string;
  bio?: string;
}

export interface DemoStudent extends DemoUser {
  role: 'student';
  goal: string;
  goalIcon: string;
  streak: number;
  xp: number;
  level: number;
  hoursStudied: number;
  weeklyHours: number;
  certificates: number;
  skills: SkillScore[];
  badges: Badge[];
  enrolledCourses: string[];
  placementProbability: number;
  interviewReadiness: number;
  resumeScore: number;
  leaderboardRank: number;
  weeklyData: number[];
  monthlySkillData: MonthlySkillData[];
}

export interface DemoEducator extends DemoUser {
  role: 'educator';
  totalStudents: number;
  revenue: number;
  followers: number;
  completionRate: number;
  avgRating: number;
  watchHours: number;
  aiNotesRate: number;
  assignmentsCreated: number;
  courses: string[];
  monthlyRevenue: number[];
  monthlyStudents: number[];
}

export interface DemoRecruiter extends DemoUser {
  role: 'recruiter';
  company: string;
  companyLogo: string;
  hiringFor: string;
  openPositions: number;
  interestedStudents: number;
  avgSkillScore: number;
  avgInterviewScore: number;
}

export interface SkillScore { name: string; value: number; color: string; }
export interface Badge { id: string; name: string; icon: string; color: string; earned: Date; }
export interface MonthlySkillData { month: string; programming: number; ai: number; problemSolving: number; }

export interface Course {
  id: string;
  title: string;
  educator: string;
  educatorAvatar: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsCount: number;
  duration: string;
  totalLessons: number;
  image: string;
  description: string;
  tags: string[];
  progress?: number;
  aiGenerated: boolean;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole: string;
  authorInitials: string;
  authorColor: string;
  timeAgo: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  bookmarked: boolean;
  liked: boolean;
  category: 'discussion' | 'showcase' | 'question' | 'hackathon';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
  text: string;
  rating: number;
}

export interface Notification {
  id: string;
  type: 'quiz' | 'course' | 'certificate' | 'recruiter' | 'assignment' | 'streak' | 'badge';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

// -----------------------------------------------
// DEMO STUDENTS
// -----------------------------------------------
export const DEMO_STUDENTS: DemoStudent[] = [
  {
    id: 's1',
    name: 'Aarav Sharma',
    email: 'aarav@vedaastra.ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    initials: 'AS',
    role: 'student',
    bio: 'Passionate AI enthusiast. Building the future with neural networks and LLMs.',
    goal: 'AI Engineer',
    goalIcon: '🤖',
    streak: 128,
    xp: 18200,
    level: 41,
    hoursStudied: 384,
    weeklyHours: 23,
    certificates: 8,
    leaderboardRank: 3,
    placementProbability: 89,
    interviewReadiness: 83,
    resumeScore: 91,
    skills: [
      { name: 'Programming', value: 92, color: '#7C3AED' },
      { name: 'Machine Learning', value: 84, color: '#0EA5E9' },
      { name: 'AI & LLMs', value: 81, color: '#10B981' },
      { name: 'Communication', value: 74, color: '#F59E0B' },
      { name: 'Cloud & DevOps', value: 61, color: '#EC4899' },
      { name: 'Problem Solving', value: 88, color: '#6366F1' },
    ],
    badges: [
      { id: 'b1', name: 'Top Learner', icon: '🏆', color: '#F59E0B', earned: new Date('2024-06-01') },
      { id: 'b2', name: '100 Day Streak', icon: '🔥', color: '#EF4444', earned: new Date('2024-05-15') },
      { id: 'b3', name: 'AI Explorer', icon: '🤖', color: '#7C3AED', earned: new Date('2024-04-20') },
      { id: 'b4', name: 'Python Master', icon: '🐍', color: '#10B981', earned: new Date('2024-03-10') },
    ],
    enrolledCourses: ['c1', 'c2', 'c3', 'c4'],
    weeklyData: [3, 4, 2, 5, 6, 4, 3],
    monthlySkillData: [
      { month: 'Jan', programming: 65, ai: 45, problemSolving: 60 },
      { month: 'Feb', programming: 70, ai: 55, problemSolving: 68 },
      { month: 'Mar', programming: 78, ai: 63, problemSolving: 74 },
      { month: 'Apr', programming: 82, ai: 70, problemSolving: 79 },
      { month: 'May', programming: 87, ai: 76, problemSolving: 84 },
      { month: 'Jun', programming: 92, ai: 81, problemSolving: 88 },
    ],
  },
  {
    id: 's2',
    name: 'Priya Reddy',
    email: 'priya@vedaastra.ai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    initials: 'PR',
    role: 'student',
    bio: 'Data scientist in training. Love turning messy data into beautiful insights.',
    goal: 'Data Scientist',
    goalIcon: '📊',
    streak: 214,
    xp: 24600,
    level: 52,
    hoursStudied: 510,
    weeklyHours: 28,
    certificates: 12,
    leaderboardRank: 1,
    placementProbability: 85,
    interviewReadiness: 81,
    resumeScore: 88,
    skills: [
      { name: 'Programming', value: 87, color: '#7C3AED' },
      { name: 'Statistics', value: 92, color: '#0EA5E9' },
      { name: 'Python', value: 91, color: '#10B981' },
      { name: 'SQL & Databases', value: 89, color: '#F59E0B' },
      { name: 'Machine Learning', value: 76, color: '#EC4899' },
      { name: 'Communication', value: 80, color: '#6366F1' },
    ],
    badges: [
      { id: 'b5', name: '#1 Leaderboard', icon: '👑', color: '#F59E0B', earned: new Date('2024-06-10') },
      { id: 'b6', name: '200 Day Streak', icon: '⚡', color: '#7C3AED', earned: new Date('2024-05-28') },
      { id: 'b7', name: 'Data Wizard', icon: '🔮', color: '#0EA5E9', earned: new Date('2024-04-05') },
      { id: 'b8', name: 'Python Master', icon: '🐍', color: '#10B981', earned: new Date('2024-02-14') },
    ],
    enrolledCourses: ['c2', 'c5', 'c6', 'c7'],
    weeklyData: [4, 5, 6, 4, 5, 7, 3],
    monthlySkillData: [
      { month: 'Jan', programming: 60, ai: 40, problemSolving: 65 },
      { month: 'Feb', programming: 68, ai: 50, problemSolving: 72 },
      { month: 'Mar', programming: 75, ai: 58, problemSolving: 78 },
      { month: 'Apr', programming: 80, ai: 65, problemSolving: 83 },
      { month: 'May', programming: 84, ai: 70, problemSolving: 87 },
      { month: 'Jun', programming: 87, ai: 76, problemSolving: 92 },
    ],
  },
  {
    id: 's3',
    name: 'John Anderson',
    email: 'john@vedaastra.ai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    initials: 'JA',
    role: 'student',
    bio: 'Cybersecurity enthusiast. CTF competitor and ethical hacker in training.',
    goal: 'Cybersecurity Engineer',
    goalIcon: '🛡️',
    streak: 74,
    xp: 11400,
    level: 28,
    hoursStudied: 245,
    weeklyHours: 16,
    certificates: 5,
    leaderboardRank: 12,
    placementProbability: 82,
    interviewReadiness: 79,
    resumeScore: 76,
    skills: [
      { name: 'Network Security', value: 90, color: '#7C3AED' },
      { name: 'Linux & Systems', value: 81, color: '#0EA5E9' },
      { name: 'Python', value: 73, color: '#10B981' },
      { name: 'Ethical Hacking', value: 84, color: '#F59E0B' },
      { name: 'Cryptography', value: 68, color: '#EC4899' },
      { name: 'Problem Solving', value: 77, color: '#6366F1' },
    ],
    badges: [
      { id: 'b9', name: 'CTF Champion', icon: '🏴‍☠️', color: '#7C3AED', earned: new Date('2024-05-20') },
      { id: 'b10', name: 'Security Pro', icon: '🔐', color: '#0EA5E9', earned: new Date('2024-04-15') },
    ],
    enrolledCourses: ['c8', 'c9'],
    weeklyData: [2, 3, 2, 4, 3, 2, 1],
    monthlySkillData: [
      { month: 'Jan', programming: 55, ai: 30, problemSolving: 58 },
      { month: 'Feb', programming: 60, ai: 35, problemSolving: 63 },
      { month: 'Mar', programming: 65, ai: 40, problemSolving: 68 },
      { month: 'Apr', programming: 69, ai: 44, problemSolving: 72 },
      { month: 'May', programming: 71, ai: 48, problemSolving: 75 },
      { month: 'Jun', programming: 73, ai: 52, problemSolving: 77 },
    ],
  },
];

// -----------------------------------------------
// DEMO EDUCATORS
// -----------------------------------------------
export const DEMO_EDUCATORS: DemoEducator[] = [
  {
    id: 'e1',
    name: 'Dr. Meera Iyer',
    email: 'meera@vedaastra.ai',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    initials: 'MI',
    role: 'educator',
    title: 'AI & ML Researcher | IIT Bombay PhD',
    bio: 'Leading AI educator with 12 years of research experience. Published 40+ papers.',
    totalStudents: 21420,
    revenue: 48700,
    followers: 84000,
    completionRate: 91,
    avgRating: 4.9,
    watchHours: 620000,
    aiNotesRate: 98,
    assignmentsCreated: 84,
    courses: ['c1', 'c3'],
    monthlyRevenue: [3200, 3600, 4100, 3900, 4400, 5000, 4800, 5200, 4700, 5500, 5800, 6200],
    monthlyStudents: [800, 950, 1200, 1100, 1400, 1600, 1500, 1800, 1700, 1900, 2100, 2350],
  },
  {
    id: 'e2',
    name: 'Rahul Verma',
    email: 'rahul@vedaastra.ai',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    initials: 'RV',
    role: 'educator',
    title: 'Senior Full Stack Engineer | ex-Flipkart',
    bio: 'Full stack developer turned educator. Helping 20K+ students land their dream jobs.',
    totalStudents: 18600,
    revenue: 36000,
    followers: 59000,
    completionRate: 93,
    avgRating: 4.8,
    watchHours: 480000,
    aiNotesRate: 95,
    assignmentsCreated: 62,
    courses: ['c2', 'c7'],
    monthlyRevenue: [2800, 2900, 3100, 3000, 3200, 3400, 3300, 3500, 3400, 3600, 3700, 3800],
    monthlyStudents: [700, 750, 820, 800, 880, 940, 920, 990, 970, 1050, 1080, 1100],
  },
];

// -----------------------------------------------
// DEMO RECRUITERS
// -----------------------------------------------
export const DEMO_RECRUITERS: DemoRecruiter[] = [
  {
    id: 'r1',
    name: 'Microsoft Talent',
    email: 'talent@microsoft.com',
    avatar: '',
    initials: 'MS',
    role: 'recruiter',
    company: 'Microsoft',
    companyLogo: '🪟',
    hiringFor: 'AI Engineers',
    openPositions: 24,
    interestedStudents: 124,
    avgSkillScore: 89,
    avgInterviewScore: 87,
  },
  {
    id: 'r2',
    name: 'Google Recruiting',
    email: 'recruiting@google.com',
    avatar: '',
    initials: 'GG',
    role: 'recruiter',
    company: 'Google',
    companyLogo: '🔍',
    hiringFor: 'Software Engineers',
    openPositions: 42,
    interestedStudents: 89,
    avgSkillScore: 92,
    avgInterviewScore: 91,
  },
  {
    id: 'r3',
    name: 'Amazon AWS Careers',
    email: 'careers@amazon.com',
    avatar: '',
    initials: 'AZ',
    role: 'recruiter',
    company: 'Amazon',
    companyLogo: '📦',
    hiringFor: 'Cloud Engineers',
    openPositions: 36,
    interestedStudents: 97,
    avgSkillScore: 86,
    avgInterviewScore: 84,
  },
];

// -----------------------------------------------
// COURSES DATABASE
// -----------------------------------------------
export const DEMO_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Machine Learning Masterclass',
    educator: 'Dr. Meera Iyer',
    educatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80',
    category: 'AI & ML',
    difficulty: 'Advanced',
    rating: 4.9,
    studentsCount: 21420,
    duration: '48 hrs',
    totalLessons: 124,
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    description: 'Master ML from regression to neural networks. Industry-grade projects included.',
    tags: ['Python', 'TensorFlow', 'Deep Learning', 'NLP'],
    progress: 68,
    aiGenerated: true,
  },
  {
    id: 'c2',
    title: 'React Full Stack Bootcamp',
    educator: 'Rahul Verma',
    educatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
    category: 'Web Development',
    difficulty: 'Intermediate',
    rating: 4.8,
    studentsCount: 18600,
    duration: '36 hrs',
    totalLessons: 96,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Build production-ready full stack apps with React, Node.js, and PostgreSQL.',
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    progress: 34,
    aiGenerated: true,
  },
  {
    id: 'c3',
    title: 'AI Engineering with LLMs & RAG',
    educator: 'Dr. Meera Iyer',
    educatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80',
    category: 'AI & ML',
    difficulty: 'Advanced',
    rating: 4.95,
    studentsCount: 9800,
    duration: '52 hrs',
    totalLessons: 140,
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=800&q=80',
    description: 'Build production RAG systems, LLM pipelines, and vector search engines.',
    tags: ['LangChain', 'OpenAI', 'pgvector', 'RAG'],
    progress: 22,
    aiGenerated: true,
  },
  {
    id: 'c4',
    title: 'Python for Data Science',
    educator: 'Dr. Meera Iyer',
    educatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80',
    category: 'Data Science',
    difficulty: 'Beginner',
    rating: 4.7,
    studentsCount: 34500,
    duration: '24 hrs',
    totalLessons: 72,
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80',
    description: 'Complete Python bootcamp for data analysis, visualization, and ML.',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    aiGenerated: true,
  },
  {
    id: 'c5',
    title: 'Statistics for Data Science',
    educator: 'Dr. Meera Iyer',
    educatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80',
    category: 'Data Science',
    difficulty: 'Intermediate',
    rating: 4.8,
    studentsCount: 12300,
    duration: '30 hrs',
    totalLessons: 88,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Bayesian inference, hypothesis testing, and statistical modeling.',
    tags: ['Statistics', 'R', 'Python', 'Probability'],
    aiGenerated: true,
  },
  {
    id: 'c6',
    title: 'SQL & Database Engineering',
    educator: 'Rahul Verma',
    educatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
    category: 'Databases',
    difficulty: 'Intermediate',
    rating: 4.6,
    studentsCount: 15800,
    duration: '20 hrs',
    totalLessons: 60,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    description: 'Master SQL, PostgreSQL, indexing, and query optimization.',
    tags: ['SQL', 'PostgreSQL', 'Database Design', 'Performance'],
    aiGenerated: true,
  },
  {
    id: 'c7',
    title: 'System Design Interviews',
    educator: 'Rahul Verma',
    educatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
    category: 'Career',
    difficulty: 'Advanced',
    rating: 4.9,
    studentsCount: 22100,
    duration: '28 hrs',
    totalLessons: 80,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    description: 'Crack FAANG system design rounds with real-world architecture problems.',
    tags: ['Architecture', 'Scalability', 'Microservices', 'Distributed'],
    aiGenerated: true,
  },
  {
    id: 'c8',
    title: 'Ethical Hacking & Penetration Testing',
    educator: 'Rahul Verma',
    educatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
    category: 'Security',
    difficulty: 'Advanced',
    rating: 4.8,
    studentsCount: 8900,
    duration: '40 hrs',
    totalLessons: 112,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    description: 'Learn offensive and defensive cybersecurity with hands-on CTF labs.',
    tags: ['Kali Linux', 'Metasploit', 'Wireshark', 'Network Security'],
    aiGenerated: true,
  },
  {
    id: 'c9',
    title: 'Network Security Fundamentals',
    educator: 'Dr. Meera Iyer',
    educatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80',
    category: 'Security',
    difficulty: 'Intermediate',
    rating: 4.7,
    studentsCount: 6400,
    duration: '22 hrs',
    totalLessons: 65,
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    description: 'TCP/IP, firewalls, VPNs, intrusion detection, and network forensics.',
    tags: ['TCP/IP', 'Firewalls', 'VPN', 'Intrusion Detection'],
    aiGenerated: true,
  },
  {
    id: 'c10',
    title: 'Kubernetes & Cloud Engineering',
    educator: 'Rahul Verma',
    educatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
    category: 'Cloud & DevOps',
    difficulty: 'Advanced',
    rating: 4.8,
    studentsCount: 11200,
    duration: '38 hrs',
    totalLessons: 102,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Build and orchestrate containerized apps at scale on AWS, GCP, and Azure.',
    tags: ['Kubernetes', 'Docker', 'Terraform', 'AWS'],
    aiGenerated: true,
  },
];

// -----------------------------------------------
// COMMUNITY POSTS
// -----------------------------------------------
export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: 'Aarav Sharma',
    authorRole: 'Student • Level 41',
    authorInitials: 'AS',
    authorColor: '#7C3AED',
    timeAgo: '2 hours ago',
    content: 'Just completed the AI Engineering with LLMs course! 🎉 Built a full RAG pipeline that answers questions about my company\'s internal docs. The pgvector integration was smoother than I expected. The AI-generated quiz helped me retain so much more. Highly recommend this learning path for anyone aiming to be an AI engineer!',
    tags: ['RAG', 'LLMs', 'AI Engineering'],
    likes: 124,
    comments: 18,
    shares: 9,
    bookmarked: true,
    liked: true,
    category: 'showcase',
  },
  {
    id: 'p2',
    author: 'Priya Reddy',
    authorRole: 'Student • Level 52',
    authorInitials: 'PR',
    authorColor: '#0EA5E9',
    timeAgo: '5 hours ago',
    content: 'Quick tip for Data Science aspirants: Don\'t skip the Statistics module! I almost did, thinking I knew enough. The Bayesian inference section completely changed how I approach ML model evaluation. My interview scores jumped from 72% to 81% after solidifying these fundamentals. 📊',
    tags: ['DataScience', 'Statistics', 'TipOfTheDay'],
    likes: 89,
    comments: 22,
    shares: 14,
    bookmarked: false,
    liked: false,
    category: 'discussion',
  },
  {
    id: 'p3',
    author: 'John Anderson',
    authorRole: 'Student • Level 28',
    authorInitials: 'JA',
    authorColor: '#10B981',
    timeAgo: '8 hours ago',
    content: 'CTF Challenge completed! 🏴‍☠️ Just solved the "Zero Day Exploit" challenge in the Ethical Hacking lab. The hint system in VedAstra is incredible — it nudges you in the right direction without giving away the answer. Scored 840/1000. Anyone else working on the network forensics module?',
    tags: ['CTF', 'EthicalHacking', 'Cybersecurity'],
    likes: 56,
    comments: 31,
    shares: 5,
    bookmarked: false,
    liked: true,
    category: 'hackathon',
  },
  {
    id: 'p4',
    author: 'Dr. Meera Iyer',
    authorRole: 'Educator • 84K followers',
    authorInitials: 'MI',
    authorColor: '#EC4899',
    timeAgo: '1 day ago',
    content: 'Exciting news! 🚀 Just published the Advanced Transformer Architecture deep dive — 6 new lessons on attention mechanisms, positional encodings, and how GPT-4 architecture differs from BERT. The VedAstra AI automatically generated 120 flashcards and 40 quiz questions. Check it out!',
    tags: ['Transformers', 'GPT4', 'AI Research'],
    likes: 342,
    comments: 67,
    shares: 89,
    bookmarked: true,
    liked: true,
    category: 'showcase',
  },
  {
    id: 'p5',
    author: 'Riya Kapoor',
    authorRole: 'Student • Level 34',
    authorInitials: 'RK',
    authorColor: '#F59E0B',
    timeAgo: '1 day ago',
    content: 'Microsoft recruiter just viewed my profile! 👀 I can see they looked at my Skill Graph and spent 12 minutes on my project portfolio. The AI Resume Score of 88 really helped. VedAstra\'s recruiter connection feature is absolutely game-changing for job seekers.',
    tags: ['Hiring', 'Microsoft', 'CareerWin'],
    likes: 198,
    comments: 44,
    shares: 22,
    bookmarked: false,
    liked: false,
    category: 'discussion',
  },
];

// -----------------------------------------------
// TESTIMONIALS
// -----------------------------------------------
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aarav Sharma',
    role: 'AI Engineer',
    company: 'Google',
    initials: 'AS',
    color: '#7C3AED',
    text: 'VedAstra completely transformed my learning journey. The AI adaptive path identified my exact weak spots in ML theory and built a custom 3-month plan. I went from knowing Python basics to landing an AI Engineer role at Google in just 8 months.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Priya Reddy',
    role: 'Data Scientist',
    company: 'Microsoft',
    initials: 'PR',
    color: '#0EA5E9',
    text: 'The AI-generated quizzes and flashcards after every video are exceptional. I absorbed content 3x faster. The recruiter dashboard helped me connect with Microsoft talent team directly. Best platform investment I\'ve ever made.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Dr. Meera Iyer',
    role: 'ML Researcher & Educator',
    company: 'IIT Bombay',
    initials: 'MI',
    color: '#EC4899',
    text: 'As an educator, VedAstra\'s AI content generation is phenomenal. My 2-hour lecture video automatically becomes 200 flashcards, a 40-question quiz, a detailed mindmap, and structured notes. My students\' completion rate jumped from 67% to 91%.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'John Anderson',
    role: 'Security Engineer',
    company: 'Palo Alto Networks',
    initials: 'JA',
    color: '#10B981',
    text: 'The hands-on CTF labs and real-world hacking scenarios are unmatched. The AI Interview Coach helped me practice technical questions until I felt completely confident. Got 4 offers from security-focused companies.',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Sofia Martinez',
    role: 'Product Manager',
    company: 'Stripe',
    initials: 'SM',
    color: '#F59E0B',
    text: 'I used VedAstra to transition from marketing to product management. The personalized learning path, combined with the community support and AI mentor, made a seemingly impossible career change possible in 5 months.',
    rating: 5,
  },
];

// -----------------------------------------------
// NOTIFICATIONS
// -----------------------------------------------
export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'certificate',
    title: 'Certificate Earned! 🎓',
    message: 'You completed "Machine Learning Masterclass" with a score of 94%. Your certificate is ready!',
    time: '10 min ago',
    read: false,
    icon: '🏆',
  },
  {
    id: 'n2',
    type: 'recruiter',
    title: 'Profile Viewed 👀',
    message: 'Microsoft Talent Team viewed your profile and spent 14 minutes reviewing your Skill Graph.',
    time: '1 hour ago',
    read: false,
    icon: '💼',
  },
  {
    id: 'n3',
    type: 'streak',
    title: 'Streak Milestone! 🔥',
    message: 'Incredible! You\'ve maintained a 128-day learning streak. Unlocked the "Iron Will" badge!',
    time: '3 hours ago',
    read: false,
    icon: '🔥',
  },
  {
    id: 'n4',
    type: 'quiz',
    title: 'Quiz Results 📝',
    message: 'You scored 18/20 (90%) on the Transformers Deep Dive quiz. +45 XP gained!',
    time: '5 hours ago',
    read: true,
    icon: '✅',
  },
  {
    id: 'n5',
    type: 'course',
    title: 'New Course Available 🎬',
    message: 'Dr. Meera Iyer published "Advanced Transformer Architecture" — 6 new lessons ready.',
    time: '1 day ago',
    read: true,
    icon: '🎬',
  },
  {
    id: 'n6',
    type: 'assignment',
    title: 'Assignment Due Tomorrow ⏰',
    message: 'Your "Build a RAG Pipeline" assignment is due in 18 hours. Don\'t forget to submit!',
    time: '2 days ago',
    read: true,
    icon: '⏰',
  },
];

// -----------------------------------------------
// LEADERBOARD (Global Top 10)
// -----------------------------------------------
export const LEADERBOARD = [
  { rank: 1,  name: 'Priya Reddy',     initials: 'PR', color: '#0EA5E9', xp: 24600, level: 52, streak: 214 },
  { rank: 2,  name: 'Riya Kapoor',     initials: 'RK', color: '#F59E0B', xp: 21800, level: 47, streak: 189 },
  { rank: 3,  name: 'Aarav Sharma',    initials: 'AS', color: '#7C3AED', xp: 18200, level: 41, streak: 128 },
  { rank: 4,  name: 'Vikram Nair',     initials: 'VN', color: '#10B981', xp: 17400, level: 39, streak: 102 },
  { rank: 5,  name: 'Chen Wei',        initials: 'CW', color: '#EC4899', xp: 16900, level: 38, streak: 97  },
  { rank: 6,  name: 'Aisha Okafor',    initials: 'AO', color: '#6366F1', xp: 15800, level: 36, streak: 84  },
  { rank: 7,  name: 'Diego Silva',     initials: 'DS', color: '#F97316', xp: 14600, level: 34, streak: 76  },
  { rank: 8,  name: 'Yuna Park',       initials: 'YP', color: '#14B8A6', xp: 13900, level: 32, streak: 68  },
  { rank: 9,  name: 'Omar Hassan',     initials: 'OH', color: '#8B5CF6', xp: 12800, level: 30, streak: 61  },
  { rank: 10, name: 'Natasha Ivanova', initials: 'NI', color: '#EF4444', xp: 12100, level: 29, streak: 55  },
];

// -----------------------------------------------
// DIAGNOSTIC QUESTIONS (20 questions)
// -----------------------------------------------
export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'dq1',
    domain: 'Programming',
    question: 'What is the time complexity of binary search on a sorted array?',
    options: ['O(N)', 'O(log N)', 'O(N²)', 'O(1)'],
    correctIndex: 1,
    skillImpact: { 'Programming': 20, 'Problem Solving': 15 },
  },
  {
    id: 'dq2',
    domain: 'AI & ML',
    question: 'Which activation function is most commonly used in the output layer for binary classification?',
    options: ['ReLU', 'Tanh', 'Sigmoid', 'Softmax'],
    correctIndex: 2,
    skillImpact: { 'AI & ML': 25, 'Problem Solving': 10 },
  },
  {
    id: 'dq3',
    domain: 'Data Science',
    question: 'What does "overfitting" mean in machine learning?',
    options: ['Model performs well on training data but poorly on test data', 'Model performs poorly on all data', 'Model is trained too slowly', 'Model uses too much memory'],
    correctIndex: 0,
    skillImpact: { 'AI & ML': 20, 'Statistics': 15 },
  },
  {
    id: 'dq4',
    domain: 'Cloud',
    question: 'Which Kubernetes object ensures a specified number of pod replicas are always running?',
    options: ['Pod', 'Service', 'ReplicaSet', 'ConfigMap'],
    correctIndex: 2,
    skillImpact: { 'Cloud & DevOps': 30, 'Problem Solving': 10 },
  },
  {
    id: 'dq5',
    domain: 'Security',
    question: 'What is a SQL injection attack?',
    options: ['Exploiting user input to run malicious SQL queries', 'Injecting JavaScript into SQL databases', 'Brute-forcing database passwords', 'Encrypting SQL transactions'],
    correctIndex: 0,
    skillImpact: { 'Security': 30, 'Programming': 10 },
  },
];

// -----------------------------------------------
// AI-GENERATED LESSON CONTENT
// -----------------------------------------------
export const AI_LESSON_CONTENT = {
  notes: `## Transformer Architecture — Key Concepts

### What is a Transformer?
A **Transformer** is a deep learning model architecture that uses **self-attention mechanisms** to process sequential data in parallel, unlike RNNs which process tokens sequentially.

### Core Components
| Component | Purpose |
|-----------|---------|
| Multi-Head Attention | Allows attending to different parts of the sequence |
| Feed-Forward Network | Applies non-linear transformations |
| Positional Encoding | Encodes position information into tokens |
| Layer Normalization | Stabilizes training by normalizing activations |

### The Attention Formula
\`\`\`
Attention(Q, K, V) = softmax((Q · Kᵀ) / √d_k) · V
\`\`\`
Where Q = Queries, K = Keys, V = Values, d_k = key dimension.

### Key Insight 💡
The **scaling factor** (√d_k) prevents the dot product from growing too large in high dimensions, which would push the softmax into regions with extremely small gradients.`,

  flashcards: [
    { front: 'What does "Attention" compute in a Transformer?', back: 'A weighted sum of values (V) based on the similarity between queries (Q) and keys (K), allowing the model to focus on relevant parts of the input.' },
    { front: 'What is "Multi-Head Attention"?', back: 'Running multiple attention operations in parallel, each with different learned projections, then concatenating the results. Allows attending to different representation subspaces.' },
    { front: 'Why use Positional Encodings?', back: 'Since Transformers process all tokens in parallel, positional encodings inject sequential order information using sinusoidal functions of different frequencies.' },
    { front: 'What problem does Layer Normalization solve?', back: 'It stabilizes training by normalizing the activations across the feature dimension, reducing internal covariate shift.' },
  ],

  quiz: [
    {
      question: 'What is the scaling factor used in the attention formula?',
      options: ['√d_model', '√d_k', 'd_k', '1/d_k'],
      correct: 1,
      explanation: 'The scaling factor √d_k prevents dot products from growing too large in high dimensions.',
    },
    {
      question: 'How many attention heads are used in GPT-3 (175B parameters)?',
      options: ['96', '64', '128', '32'],
      correct: 0,
      explanation: 'GPT-3 uses 96 attention heads with d_model of 12,288.',
    },
    {
      question: 'What is the main advantage of Transformers over RNNs?',
      options: ['Use less memory', 'Process sequences in parallel', 'Require less data', 'Train faster on CPUs'],
      correct: 1,
      explanation: 'Transformers process all tokens simultaneously using self-attention, enabling massive parallelization.',
    },
  ],

  mindmap: {
    center: 'Transformer',
    branches: [
      { label: 'Encoder', children: ['Self-Attention', 'Feed Forward', 'Normalization'] },
      { label: 'Decoder', children: ['Masked Attention', 'Cross-Attention', 'Output Projection'] },
      { label: 'Applications', children: ['GPT', 'BERT', 'T5', 'Vision Transformer'] },
    ],
  },

  formulaSheet: [
    { name: 'Self-Attention', formula: 'Attention(Q,K,V) = softmax(QKᵀ/√d_k)V' },
    { name: 'Multi-Head', formula: 'MultiHead(Q,K,V) = Concat(head₁,...,headₕ)W^O' },
    { name: 'Positional Encoding', formula: 'PE(pos,2i) = sin(pos/10000^(2i/d_model))' },
  ],
};

// -----------------------------------------------
// ROADMAP NODES (Personalized for Aarav Sharma)
// -----------------------------------------------
export const PERSONALIZED_ROADMAP = [
  { id: 'rm1', label: 'Python Foundations', status: 'completed' as const, category: 'Programming', x: 80, y: 200 },
  { id: 'rm2', label: 'Data Structures', status: 'completed' as const, category: 'Programming', x: 210, y: 200 },
  { id: 'rm3', label: 'ML Fundamentals', status: 'completed' as const, category: 'AI & ML', x: 340, y: 130 },
  { id: 'rm4', label: 'Deep Learning', status: 'unlocked' as const, category: 'AI & ML', x: 470, y: 130 },
  { id: 'rm5', label: 'SQL & Databases', status: 'completed' as const, category: 'Data', x: 340, y: 270 },
  { id: 'rm6', label: 'LLMs & Prompting', status: 'unlocked' as const, category: 'AI & ML', x: 600, y: 130 },
  { id: 'rm7', label: 'Cloud Fundamentals', status: 'locked' as const, category: 'Cloud', x: 600, y: 270 },
  { id: 'rm8', label: 'RAG Pipelines', status: 'locked' as const, category: 'AI & ML', x: 730, y: 200 },
  { id: 'rm9', label: 'AI Engineer Ready', status: 'locked' as const, category: 'Career', x: 860, y: 200 },
];

// -----------------------------------------------
// CAREER READINESS
// -----------------------------------------------
export const CAREER_PROFILES = {
  'AI Engineer': {
    overallReadiness: 84,
    placement: 89,
    resumeScore: 91,
    interviewScore: 83,
    skillGaps: ['Cloud Architecture', 'System Design at Scale', 'Docker & Kubernetes'],
    projectsNeeded: 3,
    internshipSuggestions: ['Google DeepMind', 'Microsoft Research', 'OpenAI'],
    companiesHiring: ['Google', 'Microsoft', 'OpenAI', 'Meta AI', 'Anthropic'],
    skills: [
      { name: 'Machine Learning', current: 84, required: 90 },
      { name: 'Python', current: 92, required: 95 },
      { name: 'Cloud & DevOps', current: 61, required: 80 },
      { name: 'System Design', current: 55, required: 85 },
      { name: 'Communication', current: 74, required: 70 },
    ],
  },
};

// -----------------------------------------------
// LIVE CLASSES
// -----------------------------------------------
export interface LiveClass {
  id: string;
  title: string;
  subject: string;
  subjectIcon: string;
  subjectColor: string;
  teacher: string;
  teacherInitials: string;
  teacherAvatar: string;
  teacherRole: string;
  date: string;
  time: string;
  duration: string;
  status: 'live' | 'upcoming' | 'completed';
  attendees: number;
  maxAttendees: number;
  topicsCovered: string[];
  notes: string;
  aiSummary?: string;
  aiKeyPoints?: string[];
  practiceQuestions?: string[];
  attendanceTracked?: boolean;
  myAttendance?: 'present' | 'absent' | 'late' | null;
  scheduledDaysFromNow: number;
}

export const LIVE_CLASSES: LiveClass[] = [
  {
    id: 'lc1',
    title: 'Transformers & Self-Attention Mechanisms',
    subject: 'Machine Learning',
    subjectIcon: '🤖',
    subjectColor: '#7C3AED',
    teacher: 'Dr. Meera Iyer',
    teacherInitials: 'MI',
    teacherAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    teacherRole: 'AI & ML Researcher',
    date: 'Today',
    time: '6:00 PM',
    duration: '90 min',
    status: 'live',
    attendees: 347,
    maxAttendees: 500,
    topicsCovered: ['Self-Attention', 'Multi-Head Attention', 'Positional Encoding', 'BERT Architecture'],
    notes: 'transformer-architecture-notes.pdf',
    aiSummary: 'This session covers the core building blocks of Transformer models, focusing on the self-attention mechanism that allows models to weigh the importance of different tokens in a sequence.',
    aiKeyPoints: [
      'Attention is All You Need (2017) introduced the Transformer architecture',
      'Self-attention computes relationships between all tokens simultaneously',
      'Multi-head attention allows focus on different representation subspaces',
      'Positional encoding adds sequence order information to embeddings',
      'BERT uses bidirectional transformers for pre-training on large corpora',
    ],
    practiceQuestions: [
      'Explain the difference between self-attention and cross-attention.',
      'Why does the Transformer outperform RNNs on long sequences?',
      'What is the role of the Query, Key, and Value matrices?',
    ],
    attendanceTracked: true,
    myAttendance: 'present',
    scheduledDaysFromNow: 0,
  },
  {
    id: 'lc2',
    title: 'Python Advanced: Async/Await & Concurrency',
    subject: 'Python Programming',
    subjectIcon: '🐍',
    subjectColor: '#10B981',
    teacher: 'Rahul Verma',
    teacherInitials: 'RV',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    teacherRole: 'Senior Full Stack Engineer',
    date: 'Today',
    time: '8:00 PM',
    duration: '60 min',
    status: 'upcoming',
    attendees: 189,
    maxAttendees: 300,
    topicsCovered: ['asyncio', 'async/await syntax', 'Event Loop', 'Coroutines', 'ThreadPoolExecutor'],
    notes: 'python-async-notes.pdf',
    attendanceTracked: false,
    myAttendance: null,
    scheduledDaysFromNow: 0,
  },
  {
    id: 'lc3',
    title: 'Reinforcement Learning: Policy Gradients',
    subject: 'Deep Learning',
    subjectIcon: '🧠',
    subjectColor: '#0EA5E9',
    teacher: 'Dr. Meera Iyer',
    teacherInitials: 'MI',
    teacherAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    teacherRole: 'AI & ML Researcher',
    date: 'Tomorrow',
    time: '5:00 PM',
    duration: '90 min',
    status: 'upcoming',
    attendees: 512,
    maxAttendees: 600,
    topicsCovered: ['REINFORCE Algorithm', 'Value Function Baseline', 'Actor-Critic Methods', 'PPO Overview'],
    notes: 'rl-policy-gradients.pdf',
    attendanceTracked: false,
    myAttendance: null,
    scheduledDaysFromNow: 1,
  },
  {
    id: 'lc4',
    title: 'LLM Fine-Tuning with LoRA & QLoRA',
    subject: 'AI & LLMs',
    subjectIcon: '⚡',
    subjectColor: '#F59E0B',
    teacher: 'Dr. Meera Iyer',
    teacherInitials: 'MI',
    teacherAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    teacherRole: 'AI & ML Researcher',
    date: 'Jul 6',
    time: '4:00 PM',
    duration: '120 min',
    status: 'upcoming',
    attendees: 621,
    maxAttendees: 800,
    topicsCovered: ['LoRA Theory', 'QLoRA 4-bit Quantization', 'Hugging Face PEFT', 'Fine-tuning Llama 3'],
    notes: 'llm-finetuning-notes.pdf',
    attendanceTracked: false,
    myAttendance: null,
    scheduledDaysFromNow: 2,
  },
  {
    id: 'lc5',
    title: 'Neural Networks from Scratch with NumPy',
    subject: 'Deep Learning',
    subjectIcon: '🧠',
    subjectColor: '#0EA5E9',
    teacher: 'Rahul Verma',
    teacherInitials: 'RV',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    teacherRole: 'Senior Full Stack Engineer',
    date: 'Jul 4',
    time: '7:00 PM',
    duration: '90 min',
    status: 'completed',
    attendees: 284,
    maxAttendees: 400,
    topicsCovered: ['Forward Propagation', 'Backpropagation Math', 'Gradient Descent', 'Weight Initialization'],
    notes: 'nn-from-scratch.pdf',
    aiSummary: 'We implemented a complete neural network from scratch using pure NumPy, covering forward propagation, computing the cross-entropy loss, backpropagation through each layer, and updating weights using gradient descent.',
    aiKeyPoints: [
      'Forward pass computes activations layer by layer using matrix multiplication',
      'Backpropagation applies chain rule to compute gradients for each layer',
      'Learning rate controls step size during gradient descent',
      'Weight initialization is crucial to avoid vanishing/exploding gradients',
      'Mini-batch gradient descent balances accuracy and computational cost',
    ],
    practiceQuestions: [
      'Derive the backpropagation equations for a 2-layer network.',
      'Why does ReLU help with the vanishing gradient problem?',
      'Implement a single perceptron using only NumPy.',
    ],
    attendanceTracked: true,
    myAttendance: 'present',
    scheduledDaysFromNow: -1,
  },
  {
    id: 'lc6',
    title: 'Data Science: EDA & Feature Engineering',
    subject: 'Data Science',
    subjectIcon: '📊',
    subjectColor: '#EC4899',
    teacher: 'Rahul Verma',
    teacherInitials: 'RV',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    teacherRole: 'Senior Full Stack Engineer',
    date: 'Jul 3',
    time: '6:00 PM',
    duration: '75 min',
    status: 'completed',
    attendees: 196,
    maxAttendees: 300,
    topicsCovered: ['Pandas EDA', 'Missing Values', 'Feature Scaling', 'One-Hot Encoding', 'Feature Selection'],
    notes: 'eda-feature-engineering.pdf',
    aiSummary: 'This session covered the complete exploratory data analysis pipeline: loading data, handling missing values, visualizing distributions, computing correlations, and applying feature transformations.',
    aiKeyPoints: [
      'EDA reveals hidden patterns, outliers, and data quality issues',
      'Missing value imputation strategies: mean, median, mode, KNN imputer',
      'StandardScaler normalizes features to zero mean and unit variance',
      'One-hot encoding converts categorical variables into binary columns',
      'Feature selection via correlation matrices and importance scores',
    ],
    practiceQuestions: [
      'When should you use MinMaxScaler vs StandardScaler?',
      'How would you handle a feature with 40% missing values?',
      'What is multicollinearity and why is it a problem?',
    ],
    attendanceTracked: true,
    myAttendance: 'absent',
    scheduledDaysFromNow: -2,
  },
];
