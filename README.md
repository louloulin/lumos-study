# Lumos Study - AI-Powered Educational Platform

[中文版](./README-ZH.md)

Lumos Study is an AI-powered educational platform designed to help students learn and solve problems across various subjects. The platform leverages advanced AI technologies to provide personalized learning experiences, interactive problem-solving, and comprehensive educational tools.

## Features

### AI Chat Interface
- Real-time conversations with AI tutors
- Context-aware responses with memory capabilities
- Subject-specific expertise
- File and image upload functionality
- Code execution for programming help
- Professional chat interface using @assistant-ui/react
- Markdown formatting support
- Chat history and session management

### Subject-Specific Learning
- Mathematics module with equation recognition
- Science modules (Biology, Chemistry, Physics)
- Humanities modules (History, Literature)
- Language learning tools
- Step-by-step problem solutions

### Advanced Learning Tools
- Image recognition for math problems and text extraction
- Math problem solver with step-by-step solutions
- Text summarization tool with multiple summary types
- Flashcard creation and learning system
- Interactive exercises and simulations

### Performance Optimizations
- Enhanced API calls with retry, timeout, and caching
- Component and image lazy loading
- Touch gesture support for mobile devices
- Responsive design for all screen sizes
- Optimized rendering performance

## Technology Stack

- **Runtime**: Bun
- **Frontend Framework**: Next.js (App Router)
- **UI Components**: Shadcn UI
- **AI Integration**: Mastra
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js / Auth.js
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Chat Interface**: @assistant-ui/react component library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/lumos-study.git
   cd lumos-study
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your API keys and configuration.

4. Run the development server
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Database Setup

1. Set up your database connection in `.env.local`

2. Run Prisma migrations
   ```bash
   pnpm prisma migrate dev
   ```

## Testing

The project includes comprehensive test suites:

```bash
# Run unit tests
pnpm test:unit

# Run integration tests
pnpm test:integration

# Run end-to-end tests
pnpm test:e2e

# Run all tests
pnpm test
```

## Deployment

The application is configured for deployment on Vercel:

```bash
pnpm build
vercel deploy
```

## Project Structure

```
lumos-study/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   ├── (auth)/               # Authentication routes
│   ├── dashboard/            # User dashboard
│   ├── subjects/             # Subject-specific pages
│   ├── chat/                 # AI chat interface
│   ├── tools/                # Educational tools
│   └── layout.tsx            # Root layout
├── components/               # UI components
│   ├── ui/                   # Shadcn UI components
│   ├── features/             # Feature-specific components
│   │   └── chat/             # Chat-related components
│   └── shared/               # Shared components
├── lib/                      # Utility functions
│   ├── utils.ts              # General utilities
│   ├── mastra-client.ts      # Mastra client configuration
│   └── db.ts                 # Database utilities
├── mastra/                   # Mastra configuration
│   ├── agents/               # AI agents
│   ├── tools/                # Custom tools
│   ├── memory/               # Memory configuration
│   └── index.ts              # Mastra initialization
├── public/                   # Static assets
├── styles/                   # Global styles
├── tests/                    # Test suites
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   └── e2e/                  # End-to-end tests
└── docs/                     # Documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Shadcn UI](https://ui.shadcn.com)
- [Mastra](https://docs.mastra.ai)
- [Bun](https://bun.sh)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com)
- [Assistant UI](https://assistant-ui.com)
