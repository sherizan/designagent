# DesignAgent

A modern Next.js application built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
designagent/
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   │   ├── globals.css   # Global styles with Tailwind directives
│   │   ├── layout.tsx    # Root layout component
│   │   └── page.tsx      # Home page
│   ├── components/       # React components (add your own)
│   │   └── ui/          # shadcn/ui components (auto-generated)
│   ├── lib/             # Utility functions
│   │   └── utils.ts     # Helper utilities (cn, etc.)
│   └── hooks/           # Custom React hooks (create as needed)
├── public/              # Static assets
├── components.json      # shadcn/ui configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# ... etc
```

Browse all available components at [ui.shadcn.com](https://ui.shadcn.com/docs/components/accordion).

## Configuration

### Tailwind CSS

- **Version**: v4 (latest)
- **Config**: `postcss.config.mjs`
- **Styles**: `src/app/globals.css`

### shadcn/ui

- **Style**: New York
- **Base Color**: Neutral
- **CSS Variables**: Enabled
- **Icon Library**: Lucide React

Configuration can be modified in `components.json`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

MIT
