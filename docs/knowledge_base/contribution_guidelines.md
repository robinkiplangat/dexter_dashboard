# Dexter Contribution Guidelines

This document outlines the guidelines for contributing to the Dexter project, providing a consistent framework for developers, designers, and other contributors.

## Getting Started

### Repository Structure

The Dexter project follows a standard React + Vite structure:

```
├── src/               # Source code
│   ├── components/    # Reusable UI components
│   ├── context/       # React context providers
│   ├── pages/         # Page components
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles (Tailwind)
├── public/            # Static assets
├── docs/              # Documentation
│   └── knowledge_base/  # Knowledge base docs
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind configuration
└── eslint.config.js   # ESLint configuration
```

### Development Environment Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd dexter
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Start the development server
   ```bash
   pnpm run dev
   ```

## Coding Standards

### JavaScript/React

- Use functional components with hooks
- Follow ES6+ standards
- Implement TypeScript when possible
- Use prop-types for component props validation
- Keep components focused on a single responsibility
- Use meaningful variable and function names

### CSS/Styling

- Use TailwindCSS utility classes for styling
- Follow mobile-first responsive design principles
- Use consistent spacing and sizing based on the design system
- Avoid inline styles except for dynamic values

### Documentation

- Document all components, functions, and complex logic
- Update documentation when making significant changes
- Document APIs using standard format
- Keep the knowledge base up to date with architectural decisions

## Git Workflow

### Branching Strategy

- `main` - Production-ready code
- `dev` - Development branch, main integration branch
- `feature/[feature-name]` - For new features
- `bugfix/[bug-description]` - For bug fixes
- `release/[version]` - For release preparation

### Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

### Pull Requests

- Create pull requests for all changes
- Fill out the PR template completely
- Reference related issues
- Ensure all tests pass
- Obtain at least one review before merging

## Testing Guidelines

### Unit Testing

- Write unit tests for all components and functions
- Aim for high test coverage (at least 80%)
- Test both success and failure scenarios
- Mock external dependencies

### Integration Testing

- Test workflows across multiple components
- Verify API integration works correctly
- Test with realistic data samples

### Manual Testing

- Test on multiple browsers and devices
- Verify responsiveness across screen sizes
- Check for accessibility compliance

## Accessibility Standards

- Follow WCAG 2.1 AA standards
- Ensure keyboard navigation works
- Use semantic HTML elements
- Provide alt text for images
- Ensure sufficient color contrast

## Security Guidelines

- Never commit sensitive information (API keys, credentials)
- Validate all user inputs
- Follow security best practices for authentication
- Implement proper error handling
- Regularly update dependencies

## Performance Considerations

- Optimize component rendering
- Minimize bundle size with code splitting
- Use lazy loading for components and routes
- Optimize images and other assets
- Implement efficient data fetching strategies

## Deployment

- Staging deployments happen automatically from the `dev` branch
- Production deployments require manual approval
- Perform pre-deployment checks (tests, linting, build validation)
- Follow the release checklist for production deployments

## Communication

- Use GitHub issues for bug reports and feature requests
- Use pull requests for code reviews and discussions
- Document major decisions in the knowledge base
- Update the team on progress during regular meetings

## Knowledge Base Maintenance

- Update relevant knowledge base documents when making significant changes
- Create new documents for new features or architectural decisions
- Keep implementation status and roadmap documents up to date
- Follow the established format for consistency

By following these guidelines, we can maintain a high-quality codebase and documentation, ensuring the Dexter project remains maintainable and extensible as it grows.
