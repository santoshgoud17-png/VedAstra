export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  type: 'core' | 'topic' | 'concept';
  x: number;
  y: number;
}

export interface MindMapLink {
  source: string;
  target: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  summary: string;
  notes: string;
  formulas?: string;
  flashcards: Flashcard[];
  mindmap: {
    nodes: MindMapNode[];
    links: MindMapLink[];
  };
  quiz: QuizQuestion[];
  assignment: {
    prompt: string;
    starterCode?: string;
    expectedOutput?: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsCount: number;
  image: string;
  lessons: Lesson[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  requiredSkills: { [key: string]: number };
  recommendedProjects: { title: string; difficulty: string; desc: string }[];
  suggestedCompanies: string[];
  internships: string[];
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  skillsImpact: { [key: string]: number };
}

// -------------------------------------------------------------
// DIAGNOSTIC ASSESSMENT DATA
// -------------------------------------------------------------
export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'd1',
    question: 'Choose the correct output of the following pseudocode: let x = 5; function double(val) { return val * 2 }; console.log(double(double(x)));',
    options: ['10', '20', '5', 'Undefined'],
    skillsImpact: { 'Programming': 25, 'Problem Solving': 15 }
  },
  {
    id: 'd2',
    question: 'What is the main purpose of an activation function in a Artificial Neural Network?',
    options: [
      'To normalize input dimensions',
      'To introduce non-linearity, enabling the model to learn complex relationships',
      'To decrease training time and prevent weights from exploding',
      'To load-balance the weights across multiple GPUs'
    ],
    skillsImpact: { 'AI & Machine Learning': 30, 'Problem Solving': 10 }
  },
  {
    id: 'd3',
    question: 'Which architecture is best suited for horizontally scaling a stateful application globally?',
    options: [
      'Single instance server with vertical scaling disk',
      'Microservices deployed across multi-region Kubernetes clusters with distributed DB replication',
      'Monolithic application running on a static cloud VM instance',
      'Serverless function attached to a local read-only cache'
    ],
    skillsImpact: { 'Cloud & DevOps': 30, 'Problem Solving': 20 }
  },
  {
    id: 'd4',
    question: 'How does HTTPS secure browser communications against middleman interceptions?',
    options: [
      'Using symmetric encryption for handshake, and hashing packets during transport',
      'Encrypting data using asymmetric public/private keys during handshake, transitioning to symmetric session keys',
      'Forcing all local routers to sign certificates through local network validation',
      'Compressing the contents to make it unreadable to standard routers'
    ],
    skillsImpact: { 'Security & Systems': 35, 'Programming': 5 }
  },
  {
    id: 'd5',
    question: 'An client complains that a search database query is slow. The database contains 50M rows and searching takes 8.5 seconds. What is your initial optimization?',
    options: [
      'Re-compile the database software with local optimization flags',
      'Analyze the query execution plan and create appropriate Indexes on filtered columns',
      'Add more RAM to the server immediately',
      'Rewrite the database client code in C++ instead of Python'
    ],
    skillsImpact: { 'Problem Solving': 30, 'Programming': 15, 'Cloud & DevOps': 10 }
  }
];

// -------------------------------------------------------------
// COURSE WORK Mock Database
// -------------------------------------------------------------
export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'AI Engineering & Large Language Models',
    description: 'Master the craft of building AI systems, from prompt engineering and fine-tuning to vector search and RAG chains.',
    instructor: 'Dr. Arya Sen, AI Researcher',
    category: 'AI',
    difficulty: 'Advanced',
    rating: 4.9,
    studentsCount: 18450,
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    lessons: [
      {
        id: 'c1-l1',
        title: 'Introduction to Generative AI & LLM Architectures',
        duration: '14:20',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-details-close-up-34316-large.mp4',
        summary: 'An introductory deep dive into transformers, multi-head attention mechanisms, and how Large Language Models generate text. Learn the mathematical intuition behind attention and decoder-only vs. encoder-decoder architectures.',
        notes: `<h3>Core Concepts</h3>
<p>Generative AI leverages neural networks to learn representations of dataset distributions and draw new samples from them. Modern LLMs are based on the <strong>Transformer architecture</strong>, introduced by Vaswani et al. in 2017.</p>
<h4>The Attention Mechanism</h4>
<p>At the center of the Transformer is the self-attention formula. It allows tokens in a sequence to attend to all other tokens, computing a weighted score representing contextual correlation:</p>
<pre>Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V</pre>
<ul>
  <li><strong>Q (Query):</strong> What we are looking for.</li>
  <li><strong>K (Key):</strong> What tokens have to offer.</li>
  <li><strong>V (Value):</strong> The actual information content.</li>
  <li><strong>d_k:</strong> Dimensionality of the keys (used for scale normalization).</li>
</ul>`,
        formulas: 'Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V\nParameters = (d_model * d_k * 3) + ...',
        flashcards: [
          { id: 'f1', question: 'What does RAG stand for?', answer: 'Retrieval-Augmented Generation. It integrates external database documents into an LLM context to prevent hallucinations and access fresh data.' },
          { id: 'f2', question: 'What is the purpose of division by sqrt(d_k) in the self-attention formula?', answer: 'It is a scaling factor. For large dimensions, dot products grow large, pushing softmax into regions with extremely small gradients. Scaling prevents this gradient vanishing issue.' }
        ],
        mindmap: {
          nodes: [
            { id: 'n1', label: 'Transformer', type: 'core', x: 250, y: 150 },
            { id: 'n2', label: 'Self-Attention', type: 'topic', x: 100, y: 80 },
            { id: 'n3', label: 'Positional Encoding', type: 'topic', x: 400, y: 80 },
            { id: 'n4', label: 'Multi-Head Attention', type: 'concept', x: 80, y: 220 },
            { id: 'n5', label: 'Softmax Scaling', type: 'concept', x: 420, y: 220 }
          ],
          links: [
            { source: 'n1', target: 'n2' },
            { source: 'n1', target: 'n3' },
            { source: 'n2', target: 'n4' },
            { source: 'n3', target: 'n5' }
          ]
        },
        quiz: [
          {
            id: 'q1',
            question: 'Which of the following is the standard scaling factor inside the self-attention formula?',
            options: ['Dimensionality of the vocabulary', 'Square root of key dimensionality (d_k)', 'Number of heads in Multi-Head Attention', 'Length of the input sequence context'],
            correctAnswer: 1,
            explanation: 'Dividing by the square root of the key dimension (d_k) scales the dot product to keep gradients stable during training.'
          },
          {
            id: 'q2',
            question: 'What is the primary drawback of using standard self-attention regarding sequence length?',
            options: ['Linear time complexity', 'Exponential space complexity in parameters', 'Quadratic compute complexity O(N^2) relative to sequence length', 'Constant maximum token cutoff'],
            correctAnswer: 2,
            explanation: 'Self-attention requires computing interaction scores between every token pair, leading to O(N^2) time and memory complexity with sequence length N.'
          }
        ],
        assignment: {
          prompt: 'Implement a basic Self-Attention function in PyTorch or Python that takes matrices Q, K, and V and returns the attention weight matrix.',
          starterCode: `import numpy as np

def self_attention(Q, K, V):
    # Write your code here
    # 1. Compute dot product of Q and K transposed
    # 2. Divide by the square root of d_k (dimension of K's last axis)
    # 3. Apply softmax on the last axis
    # 4. Multiply by V
    pass`,
          expectedOutput: 'Output matrix matching shape of Q * V'
        }
      },
      {
        id: 'c1-l2',
        title: 'Building Vector Pipelines & RAG Chains',
        duration: '18:50',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-particles-background-32693-large.mp4',
        summary: 'Understand how chunks, embeddings, vector databases, and semantic search combine to inject dynamic files into LLM queries.',
        notes: `<h3>Retrieval-Augmented Generation (RAG)</h3>
<p>To overcome training data cutoffs and limit hallucination, RAG pipes context from external documents directly to the LLM system prompt.</p>
<h4>Key Steps in the Pipeline:</h4>
<ol>
  <li><strong>Document Splitting:</strong> Parsing text files into manageable paragraphs (chunks) using characters or semantic splits.</li>
  <li><strong>Vector Embeddings:</strong> Encoding chunks into high-dimensional vectors (dense embeddings) using models like OpenAI text-embedding or Cohere.</li>
  <li><strong>Vector Database Storage:</strong> Saving embeddings into databases (e.g. pgvector, Pinecone, Milvus) indexed by algorithms like HNSW (Hierarchical Navigable Small World).</li>
  <li><strong>Query Retrieval:</strong> Embedded user questions search the database using cosine similarity or Euclidean distance, grabbing top-K context results.</li>
</ol>`,
        flashcards: [
          { id: 'f3', question: 'What is cosine similarity?', answer: 'A metric measuring the inner product of two normalized vectors, reflecting their similarity in direction independent of magnitude.' }
        ],
        mindmap: {
          nodes: [
            { id: 'r1', label: 'RAG Chain', type: 'core', x: 250, y: 150 },
            { id: 'r2', label: 'Vector DB', type: 'topic', x: 100, y: 100 },
            { id: 'r3', label: 'Embeddings', type: 'topic', x: 400, y: 100 },
            { id: 'r4', label: 'Chunking', type: 'concept', x: 250, y: 50 }
          ],
          links: [
            { source: 'r1', target: 'r2' },
            { source: 'r1', target: 'r3' },
            { source: 'r3', target: 'r4' }
          ]
        },
        quiz: [
          {
            id: 'q3',
            question: 'Which index algorithm is widely preferred in vector databases for fast approximate nearest neighbor (ANN) searches?',
            options: ['B-Tree Indexing', 'Hierarchical Navigable Small World (HNSW)', 'Red-Black Nodes', 'Hash Table Maps'],
            correctAnswer: 1,
            explanation: 'HNSW is a graph-based indexing algorithm that creates a multi-layered structure for rapid logarithmic vector similarity searches.'
          }
        ],
        assignment: {
          prompt: 'Write a python helper to calculate the Cosine Similarity between two arrays A = [1, 2, 3] and B = [2, 3, 4].',
          starterCode: `import numpy as np

def cosine_similarity(a, b):
    # Compute dot product divided by norms product
    pass`
        }
      }
    ]
  },
  {
    id: 'c2',
    title: 'Full Stack Development with Next.js & GraphQL',
    description: 'Learn modern web engineering: server components, database transactions, caching strategies, and robust deployments.',
    instructor: 'Sarah Jenkins, Lead Tech Architect',
    category: 'Programming',
    difficulty: 'Intermediate',
    rating: 4.8,
    studentsCount: 31200,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    lessons: [
      {
        id: 'c2-l1',
        title: 'Modern Rendering Patterns: SSR, ISR, and React Server Components',
        duration: '12:45',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-40618-large.mp4',
        summary: 'Deep dive into rendering paradigms. Understand the shift from traditional Client-Side Rendering (CSR) to React Server Components (RSC) and how static regeneration optimizes website speed.',
        notes: `<h3>Rendering Architectures</h3>
<p>React Server Components (RSC) allow components to render on the build server or on-demand on the server request, sending pure JSON streams rather than shipping heavy javascript bundles to the browser.</p>
<h4>Paradigms compared:</h4>
<ul>
  <li><strong>CSR:</strong> Client downloads blank HTML, downloads bundle, executes React, pulls API data, renders. Slow initial load, fast subsequent pages.</li>
  <li><strong>SSR (Server-Side Rendering):</strong> Server renders HTML on each request. Fast initial load, high server costs.</li>
  <li><strong>ISR (Incremental Static Regeneration):</strong> Static generation at build time, with background revalidation interval updates. Excellent balance.</li>
</ul>`,
        flashcards: [
          { id: 'f4', question: 'What is hydration in React?', answer: 'The process where React runs client-side to attach event listeners to server-rendered static HTML, making the page interactive.' }
        ],
        mindmap: {
          nodes: [
            { id: 'm1', label: 'Next.js rendering', type: 'core', x: 250, y: 150 },
            { id: 'm2', label: 'React Server Comp', type: 'topic', x: 100, y: 100 },
            { id: 'm3', label: 'Hydration', type: 'concept', x: 400, y: 200 }
          ],
          links: [
            { source: 'm1', target: 'm2' },
            { source: 'm2', target: 'm3' }
          ]
        },
        quiz: [
          {
            id: 'q4',
            question: 'Which Hook must be added at the top of a React file to designate it as a Client Component in Next.js App Router?',
            options: ['useClient', '"use client"', 'import { Client } from "react"', 'setupClient()'],
            correctAnswer: 1,
            explanation: 'The literal string directive `"use client"` at the top of the file flags that the component and its imports should be bundled for client-side execution.'
          }
        ],
        assignment: {
          prompt: 'Write a basic Next.js page component that fetches a list of mock items from a server API and renders them statically with 60 seconds revalidation (ISR).',
          starterCode: `// Implement an async Server Component with fetch revalidation
export default async function Page() {
  // Fetch data with next revalidate flag
}`
        }
      }
    ]
  }
];

// -------------------------------------------------------------
// EMPLOYABILITY TRACKER DATA
// -------------------------------------------------------------
export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'ai-eng',
    title: 'AI & Machine Learning Engineer',
    description: 'Design, develop, and deploy neural networks, foundation model pipelines, vector databases, and production-ready intelligent services.',
    requiredSkills: {
      'Programming': 90,
      'AI & Machine Learning': 92,
      'Problem Solving': 85,
      'Cloud & DevOps': 65,
      'Security & Systems': 50
    },
    recommendedProjects: [
      { title: 'Vector-Store Search Assistant', difficulty: 'Intermediate', desc: 'Build a full stack document search engine utilizing pgvector and local LLMs.' },
      { title: 'Custom Transformer from Scratch', difficulty: 'Advanced', desc: 'Write a mini GPT model structure using NumPy or PyTorch, and train it on text Shakespeare.' }
    ],
    suggestedCompanies: ['Google DeepMind', 'OpenAI', 'Anthropic', 'Meta AI', 'Hugging Face'],
    internships: ['AI Research Intern - Microsoft', 'LLM Engineer Co-op - Cohere']
  },
  {
    id: 'swe',
    title: 'Senior Software Engineer (Full Stack)',
    description: 'Architect web architectures, high-concurrency databases, load balancing systems, and elegant UI interfaces.',
    requiredSkills: {
      'Programming': 95,
      'AI & Machine Learning': 50,
      'Problem Solving': 90,
      'Cloud & DevOps': 80,
      'Security & Systems': 75
    },
    recommendedProjects: [
      { title: 'Real-time Canvas Collaboration tool', difficulty: 'Intermediate', desc: 'Multiplayer collaborative layout engine using WebSockets and CRDTs.' },
      { title: 'Distributed Event Broker', difficulty: 'Advanced', desc: 'Create a highly concurrent pub/sub message broker in Go or Rust with TCP sockets.' }
    ],
    suggestedCompanies: ['Stripe', 'Vercel', 'Linear', 'GitHub', 'Netflix'],
    internships: ['Software Engineer Intern - Stripe', 'Frontend Architect Intern - Vercel']
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & Kubernetes Infrastructure Engineer',
    description: 'Manage automated server farms, CI/CD orchestration layers, network architecture, and security policies.',
    requiredSkills: {
      'Programming': 75,
      'AI & Machine Learning': 40,
      'Problem Solving': 80,
      'Cloud & DevOps': 95,
      'Security & Systems': 85
    },
    recommendedProjects: [
      { title: 'Automated Blue-Green Deploy Tool', difficulty: 'Intermediate', desc: 'Scripts utilizing docker and nginx to route live user traffic seamlessly.' },
      { title: 'Terraform Multi-Region Kubernetes Setup', difficulty: 'Advanced', desc: 'Provision redundant AWS clusters, load-balancers, and auto-scalers purely through code.' }
    ],
    suggestedCompanies: ['AWS', 'Google Cloud', 'HashiCorp', 'Red Hat', 'Cloudflare'],
    internships: ['DevOps Associate - Cloudflare', 'Cloud Solutions Intern - AWS']
  }
];

export const MOCK_INTERVIEW_QUESTIONS = {
  coding: [
    {
      id: 'i1',
      question: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. (Two Sum)',
      codeTemplate: `def two_sum(nums, target):
    # Write your solution here
    pass`,
      optimalComplexity: 'O(N) time and O(N) space using a Hash Map.'
    },
    {
      id: 'i2',
      question: 'Write a function to verify if a binary tree is a valid Binary Search Tree (BST).',
      codeTemplate: `def is_valid_bst(root):
    # Write your solution here
    pass`,
      optimalComplexity: 'O(N) time and O(H) space recursion.'
    }
  ],
  behavioral: [
    { id: 'ib1', question: 'Tell me about a time you faced a difficult technical disagreement with a team member. How did you resolve it?' },
    { id: 'ib2', question: 'Describe a project that failed. What went wrong, what did you learn, and what would you do differently?' }
  ]
};

// -------------------------------------------------------------
// RESUME TEMPLATES & FEEDBACK TEMPLATES
// -------------------------------------------------------------
export const RESUME_KEYWORDS: { [key: string]: string[] } = {
  'ai-eng': ['PyTorch', 'TensorFlow', 'LLM', 'RAG', 'Vector database', 'HNSW', 'BERT', 'Transformers', 'Embeddings', 'Fine-tuning'],
  'swe': ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL', 'Docker', 'Redis', 'CI/CD', 'REST API'],
  'cloud-devops': ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD', 'Prometheus', 'Grafana', 'Ansible', 'Linux', 'YAML']
};
