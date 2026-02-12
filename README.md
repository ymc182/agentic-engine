# create-agent-harness

**Scaffold agent-first project structures for agentic coding**

[![npm version](https://img.shields.io/npm/v/create-agent-harness.svg)](https://www.npmjs.com/package/create-agent-harness)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A CLI tool that creates an optimal project structure for agent-first development, based on [OpenAI's harness engineering principles](https://openai.com/index/harness-engineering/).

## ✨ Features

- 🤖 **Agent-optimized structure** - Repository layout designed for AI agent legibility
- 📚 **Documentation-first** - AGENTS.md/CLAUDE.md as table of contents, detailed docs in `docs/`
- ✅ **Built-in validation** - TypeScript/JavaScript scripts to validate structure and freshness
- 🔄 **CI/CD ready** - GitHub Actions workflows for automated validation
- 🎨 **Framework-agnostic** - Works with any language/framework (React, Next.js, Express, etc.)
- 📦 **Zero dependencies** - Clean project scaffold without bloat

## 🚀 Quick Start

### Using npx (npm)

```bash
npx create-agent-harness
```

### Using bunx (Bun)

```bash
bunx create-agent-harness
```

## 📖 What Gets Created

```
my-agent-project/
├── AGENTS.md              # Agent development guide (~100 lines)
├── CLAUDE.md              # Identical to AGENTS.md
├── ARCHITECTURE.md        # System architecture overview
├── DESIGN.md              # Design principles
├── FRONTEND.md            # Frontend guidelines (optional)
├── PLANS.md               # Planning guidelines
├── PRODUCT_SENSE.md       # Product principles
├── QUALITY_SCORE.md       # Quality metrics tracker
├── RELIABILITY.md         # Reliability standards
├── SECURITY.md            # Security guidelines
├── docs/
│   ├── design-docs/
│   │   ├── index.md
│   │   ├── core-beliefs.md
│   │   └── template.md
│   ├── exec-plans/
│   │   ├── active/
│   │   ├── completed/
│   │   ├── tech-debt-tracker.md
│   │   └── template.md
│   ├── product-specs/
│   │   ├── index.md
│   │   └── template.md
│   ├── references/        # For LLM-optimized library docs
│   └── generated/         # Auto-generated documentation
├── scripts/
│   └── validate-structure.{ts,js}  # Structure validation
├── .github/
│   └── workflows/
│       └── validate-docs.yml       # CI validation
├── biome.json             # Linter/formatter config
└── README.md              # Project README

```

## 🎯 Core Principles

The generated structure follows these harness engineering principles:

1. **Repository as Source of Truth** - Everything must be in-repo and discoverable by agents
2. **Progressive Disclosure** - AGENTS.md is a map (~100 lines), detailed docs live in `docs/`
3. **Mechanical Enforcement** - Linters and CI validate structure, not just humans
4. **Agent Legibility First** - Optimized for agent reasoning and pattern recognition
5. **Continuous Cleanup** - Automated validation catches drift early

## 🛠️ Interactive Setup

When you run the CLI, you'll be prompted for:

1. **Project path** - Where to create the structure
2. **Project type** - Full-stack, Backend, or Frontend
3. **Validation language** - TypeScript or JavaScript
4. **Observability templates** - Include observability stack templates (optional)
5. **CI/CD** - Include GitHub Actions workflows

## 📚 After Creation

### 1. Initialize Your Application Framework

The structure is framework-agnostic. Choose your framework:

**Frontend:**
```bash
cd my-agent-project
npm create vite@latest        # React + Vite
# or
npx create-next-app@latest    # Next.js
# or
npm create svelte@latest      # SvelteKit
```

**Backend:**
```bash
npm create express-app         # Express
# or
npm i -g @nestjs/cli && nest new .  # NestJS
```

### 2. Customize Documentation

- Review and customize `AGENTS.md` and `CLAUDE.md`
- Update `ARCHITECTURE.md` with your system domains
- Document your tech stack choices
- Add your first design doc in `docs/design-docs/`

### 3. Run Validation

```bash
# TypeScript
cd scripts && npm install && npm run validate

# JavaScript
node scripts/validate-structure.js
```

## 🤖 Agent Development Workflow

1. **Context gathering** - Read relevant docs (start with AGENTS.md)
2. **Plan** - Create execution plans for complex work
3. **Design** - Document architectural decisions
4. **Implement** - Follow constraints and quality standards
5. **Validate** - Run tests and validation scripts
6. **Review** - Get agent and human feedback
7. **Document** - Update docs based on learnings

## 📋 What's Included

### Root Documentation

- **AGENTS.md / CLAUDE.md** - Agent development guide (table of contents)
- **ARCHITECTURE.md** - System architecture and layering
- **DESIGN.md** - Design principles and code organization
- **FRONTEND.md** - Frontend guidelines (if applicable)
- **PLANS.md** - Planning and execution plan guidelines
- **PRODUCT_SENSE.md** - Product principles and UX guidelines
- **QUALITY_SCORE.md** - Quality metrics tracker
- **RELIABILITY.md** - Reliability and observability standards
- **SECURITY.md** - Security best practices

### Documentation Structure

- **`docs/design-docs/`** - Design documentation with index and template
- **`docs/exec-plans/`** - Execution plans (active/completed) with template
- **`docs/product-specs/`** - Product specifications with template
- **`docs/references/`** - External library docs optimized for LLMs
- **`docs/generated/`** - Auto-generated documentation

### Tooling

- **Validation script** - Validates structure, cross-links, freshness
- **GitHub Actions** - CI workflow for automated validation
- **Biome config** - Code formatting and linting setup

## 🔍 Validation Features

The validation script checks:

- ✅ Required root docs exist
- ✅ AGENTS.md and CLAUDE.md are identical
- ✅ AGENTS.md is ~100 lines (warns if > 150)
- ✅ Required `docs/` subdirectories exist
- ✅ Cross-links in AGENTS.md are valid
- ✅ Design docs are fresh (warns if > 6 months old)

## 🌟 Why Agent-First?

Traditional project structures are optimized for human developers. Agent-first structures are optimized for **AI agent legibility and autonomous operation**:

- **Progressive disclosure** - Agents start with a map, navigate to details
- **Everything in-repo** - Agents can only see what's versioned
- **Mechanical enforcement** - Constraints are enforced automatically
- **Structured knowledge** - Organized docs enable agent reasoning

Read more: [OpenAI's Harness Engineering](https://openai.com/index/harness-engineering/)

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🔗 Links

- [OpenAI Harness Engineering Article](https://openai.com/index/harness-engineering/)
- [AGENTS.md Specification](https://agents.md/)
- [NPM Package](https://www.npmjs.com/package/create-agent-harness)
- [GitHub Repository](https://github.com/yourusername/create-agent-harness)

## 💡 Tips

1. **Keep AGENTS.md short** - Use it as a table of contents, not an encyclopedia
2. **Document decisions** - Use design docs to capture architectural choices
3. **Enforce mechanically** - Add custom linters for project-specific constraints
4. **Update continuously** - Keep docs fresh, don't let them rot
5. **Agent-legible libraries** - Extract key docs to `docs/references/` for agent consumption

---

**Built for the age of agentic coding** 🤖
