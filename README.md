# Sustainly - Sustainable Shopping Made Easy

## Overview

Sustainly is a web application that helps users make environmentally conscious shopping decisions by analyzing Amazon products and providing sustainability scores. The application evaluates products across multiple environmental impact categories and suggests more sustainable alternatives.

## Features

- **Product Analysis**: Enter any Amazon product URL to get a detailed sustainability analysis
- **Comprehensive Scoring**: Products are evaluated across multiple categories:
  - Materials and Resources
  - Production Process
  - Packaging
  - End of Life Impact
- **Overall Eco Score**: Get a clear, easy-to-understand sustainability rating
- **Alternative Products**: Discover more sustainable alternatives to your selected product
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for UI components
- React Router for navigation
- React Query for data management

### Backend (Separate Repository)
- AWS Lambda for serverless functions
- AWS CDK for infrastructure
- TypeScript
- Product caching system
- Sustainability scoring algorithm

## Getting Started

### Prerequisites
- Node.js
- pnpm (preferred package manager)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd sustainlyfrontend

# Install dependencies using pnpm
pnpm install

# Start the development server
pnpm dev
```

The application will be available at `http://localhost:5173`

## Development

### Project Structure
```
sustainlyfrontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Page components
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point
└── public/           # Static assets
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests (when implemented)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
