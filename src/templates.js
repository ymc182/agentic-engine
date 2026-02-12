/**
 * Template generators for agent-first project structure
 * Based on OpenAI's harness engineering principles
 */

export function getAgentsTemplate(projectType) {
	return `# Agent Development Guide

**This file serves as the table of contents for agent development in this repository.**

Humans steer. Agents execute.

## Quick Reference

- **Architecture:** See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Design Principles:** See [DESIGN.md](./DESIGN.md)
- **Security:** See [SECURITY.md](./SECURITY.md)
- **Quality Standards:** See [QUALITY_SCORE.md](./QUALITY_SCORE.md)
- **Reliability:** See [RELIABILITY.md](./RELIABILITY.md)
- **Product Sense:** See [PRODUCT_SENSE.md](./PRODUCT_SENSE.md)
- **Planning:** See [PLANS.md](./PLANS.md)
${projectType === 'fullstack' || projectType === 'frontend' ? '- **Frontend:** See [FRONTEND.md](./FRONTEND.md)\n' : ''}

## Documentation Structure

### Design Documents
Location: \`docs/design-docs/\`

All design decisions and architectural choices are documented here. Before implementing features:
1. Check for existing design docs
2. Create new design docs for significant changes
3. Link to relevant designs in your PRs

See: [docs/design-docs/index.md](./docs/design-docs/index.md)

### Execution Plans
Location: \`docs/exec-plans/\`

Complex work is broken down into execution plans:
- **Active plans:** \`docs/exec-plans/active/\`
- **Completed plans:** \`docs/exec-plans/completed/\`
- **Tech debt tracker:** \`docs/exec-plans/tech-debt-tracker.md\`

See: [PLANS.md](./PLANS.md) for planning guidelines.

### Product Specifications
Location: \`docs/product-specs/\`

Product requirements and feature specifications live here. Before building:
1. Review relevant product specs
2. Ask clarifying questions if specs are incomplete
3. Update specs based on implementation learnings

See: [docs/product-specs/index.md](./docs/product-specs/index.md)

### Reference Documentation
Location: \`docs/references/\`

External library documentation optimized for LLM consumption. When integrating new libraries:
1. Extract key documentation
2. Format for agent readability
3. Store in \`docs/references/[library-name]-llms.txt\`

### Generated Documentation
Location: \`docs/generated/\`

Auto-generated documentation (schemas, API docs, etc.). This directory is maintained by automation.

## Core Principles

1. **Repository is the source of truth** - If it's not in the repo, it doesn't exist to agents
2. **Progressive disclosure** - Start with this file, navigate to deeper sources
3. **Enforce mechanically** - Use linters and tests, not manual review
4. **Agent legibility first** - Optimize for agent reasoning, not just human readability
5. **Continuous cleanup** - Fix patterns as soon as they drift, don't let debt compound

## Workflow

1. **Context gathering:** Read relevant docs before coding
2. **Plan:** Create execution plans for complex work
3. **Implement:** Follow architectural constraints and quality standards
4. **Validate:** Run tests, linters, and validation scripts
5. **Review:** Get agent and human feedback
6. **Iterate:** Respond to feedback, fix issues
7. **Document:** Update design docs and specs based on learnings

## Validation

Before opening PRs, ensure:
- [ ] All tests pass
- [ ] Linters pass
- [ ] Documentation is updated
- [ ] Architectural constraints are satisfied
- [ ] Security guidelines are followed

Run validation: \`npm run validate\` or \`node scripts/validate-structure.js\`

## Getting Help

When stuck:
1. Check [docs/design-docs/core-beliefs.md](./docs/design-docs/core-beliefs.md)
2. Review similar implementations in the codebase
3. Check [docs/exec-plans/tech-debt-tracker.md](./docs/exec-plans/tech-debt-tracker.md) for known issues
4. Ask humans for clarification on requirements

---

*This file is intentionally kept short (~100 lines). For detailed guidance, follow the links above.*
`;
}

export function getArchitectureTemplate(projectType) {
	return `# Architecture Overview

**Top-level map of system domains and package layering.**

## System Domains

This section will be populated as your application grows. Document major domains here (e.g., Auth, Users, Payments, etc.).

### Example Domain: [Domain Name]

**Purpose:** Brief description

**Boundaries:**
- Owns: What this domain is responsible for
- Depends on: What other domains it uses
- Used by: What domains depend on it

**Key files:**
- \`src/[domain]/\` - Main implementation

## Layered Architecture

Within each domain, code follows a strict layering model:

\`\`\`
Types → Config → Repository → Service → Runtime → UI
         ↑
    Providers (cross-cutting concerns)
\`\`\`

### Layer Responsibilities

1. **Types** - Data shapes, interfaces, domain models
2. **Config** - Configuration schemas and defaults
3. **Repository** - Data access layer (database, external APIs)
4. **Service** - Business logic
5. **Runtime** - Application runtime concerns (initialization, shutdown)
6. **UI** - User interface components

### Providers (Cross-cutting)

Cross-cutting concerns enter through explicit Provider interfaces:
- Authentication
- Logging/Telemetry
- Feature flags
- External connectors

### Dependency Rules

✅ **Allowed:** Forward dependencies (Types → Config → Repo → Service → Runtime → UI)
❌ **Forbidden:** Backward dependencies (UI cannot import from Service directly without going through Runtime)

These rules are enforced mechanically via custom linters.

## Technology Choices

${projectType === 'fullstack' ? '### Frontend\n\n[To be determined - document your framework choice]\n\n### Backend\n\n[To be determined - document your framework choice]\n' : projectType === 'frontend' ? '### Frontend\n\n[To be determined - document your framework choice]\n' : '### Backend\n\n[To be determined - document your framework choice]\n'}
### Infrastructure

[Document infrastructure choices as they're made]

## Architectural Constraints

1. **Parsing at boundaries** - All external data must be validated/parsed at system boundaries
2. **No circular dependencies** - Enforce strict DAG structure
3. **Explicit cross-cutting** - Cross-cutting concerns go through Provider interfaces
4. **Testability** - All layers must be independently testable

## Decision Log

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| TBD  | Example  | Why      | Active |

---

*Keep this document updated as architectural decisions are made. Link to detailed design docs for complex changes.*
`;
}

export function getDesignTemplate() {
	return `# Design Principles

**Core design beliefs and patterns for this codebase.**

## Philosophy

1. **Simple over clever** - Readable code beats optimized code
2. **Explicit over implicit** - Make behavior obvious
3. **Boring over exciting** - Prefer proven technologies
4. **Strict boundaries** - Enforce constraints mechanically

## Code Organization

### File Structure
- One primary export per file
- Co-locate related code (tests next to implementation)
- Group by domain, not by type

### Naming Conventions
- Verbose and descriptive: \`calculateTotalRevenue()\` not \`calcRev()\`
- Consistent patterns across domains
- No abbreviations unless universally understood

### Comments
- Comment **why**, not **what**
- Explain business logic and constraints
- Document security-critical sections
- Avoid obvious comments

## Error Handling

1. **Fail fast** - Validate inputs early
2. **Explicit errors** - Use typed error objects
3. **Graceful degradation** - Never fail silently
4. **Comprehensive logging** - All errors are logged with context

## Testing Philosophy

1. **Real environments over mocks** - Use Docker for databases, Redis, etc.
2. **Integration tests preferred** - Test real behavior, not mocked behavior
3. **Test the contract** - Focus on behavior, not implementation
4. **Fail meaningfully** - Tests should fail when logic breaks

## Security Principles

1. **Zero trust** - Sanitize all user inputs
2. **Least privilege** - Minimal access rights
3. **No secrets in code** - Use environment variables
4. **Defense in depth** - Multiple layers of security

See [SECURITY.md](./SECURITY.md) for detailed security guidelines.

## Performance Philosophy

1. **Measure before optimizing** - No premature optimization
2. **Optimize for maintainability** - Clear code is fast enough
3. **Scale when needed** - Don't over-engineer for imaginary scale

## Dependencies

1. **Minimize dependencies** - Prefer standard library
2. **Agent-legible libraries** - Choose well-documented, stable libraries
3. **Internalize when needed** - Sometimes it's cheaper to implement than integrate

---

*These principles guide all code written by humans and agents in this repository.*
`;
}

export function getFrontendTemplate() {
	return `# Frontend Development Guide

**Guidelines for building user interfaces in this project.**

## Framework

[Document your chosen framework here - React, Vue, Svelte, etc.]

## Component Architecture

### Component Organization
\`\`\`
components/
├── ui/           # Reusable UI primitives (buttons, inputs, etc.)
├── features/     # Feature-specific components
└── layouts/      # Page layouts and shells
\`\`\`

### Component Guidelines

1. **Single Responsibility** - Each component does one thing well
2. **Props over State** - Prefer passing data down
3. **Composition over Inheritance** - Build complex UIs from simple pieces
4. **Accessibility First** - ARIA labels, keyboard navigation, screen readers

## State Management

[Document state management approach - Context, Redux, Zustand, etc.]

### State Principles
1. **Minimize global state** - Keep state as local as possible
2. **Immutable updates** - Never mutate state directly
3. **Derived state** - Compute from source of truth, don't duplicate

## Styling

[Document styling approach - CSS Modules, Tailwind, Styled Components, etc.]

### Styling Guidelines
1. **Consistent design tokens** - Use variables for colors, spacing, typography
2. **Mobile-first** - Design for small screens first
3. **Performance** - Minimize CSS bundle size

## Data Fetching

[Document data fetching approach - React Query, SWR, GraphQL, etc.]

### Data Fetching Principles
1. **Loading states** - Always show loading UI
2. **Error handling** - Display meaningful error messages
3. **Caching** - Minimize redundant requests
4. **Optimistic updates** - Update UI immediately, rollback on error

## Chrome DevTools Integration

For agent validation, the UI can be:
- Launched per git worktree
- Driven via Chrome DevTools Protocol
- Validated via DOM snapshots and screenshots

Ensure all critical user journeys are testable via automation.

## Performance Budgets

- **Initial Load:** < 3s on 3G
- **Time to Interactive:** < 5s
- **Lighthouse Score:** > 90

## Accessibility Requirements

- **WCAG 2.1 Level AA** compliance
- **Keyboard navigation** for all interactive elements
- **Screen reader** friendly

---

*Update this document as frontend patterns evolve.*
`;
}

export function getPlansTemplate() {
	return `# Planning Guidelines

**How to create and manage execution plans.**

## When to Create a Plan

Create an execution plan when:
1. Work will span multiple PRs
2. Work involves multiple domains or systems
3. Implementation approach needs alignment
4. Work will take > 1 day
5. Work has significant architectural impact

## Plan Types

### Lightweight Plans (< 1 day work)
- Documented in PR description
- No separate plan document needed
- Focus on "what" and "why"

### Execution Plans (> 1 day work)
- Full plan document in \`docs/exec-plans/active/\`
- Detailed implementation steps
- Decision log
- Progress tracking

## Execution Plan Template

See [docs/exec-plans/template.md](./docs/exec-plans/template.md)

## Plan Lifecycle

1. **Draft** - Initial plan created
2. **In Review** - Plan being reviewed by humans/agents
3. **Approved** - Plan approved, ready to execute
4. **In Progress** - Work is happening
5. **Completed** - Work done, plan moved to \`completed/\`

## Plan Structure

### 1. Context
- Why is this work needed?
- What problem does it solve?
- What is the current state?

### 2. Goals
- What are we trying to achieve?
- What are non-goals?
- How will we measure success?

### 3. Approach
- High-level implementation strategy
- Key technical decisions
- Tradeoffs considered

### 4. Implementation Steps
- Ordered list of tasks
- Dependencies between tasks
- Estimated complexity (S/M/L)

### 5. Validation
- How will we know it works?
- What tests need to be written?
- What edge cases to consider?

### 6. Risks
- What could go wrong?
- Mitigation strategies

### 7. Decision Log
- Track decisions made during implementation
- Rationale for changes to original plan

## Tech Debt Tracker

All known technical debt is tracked in [docs/exec-plans/tech-debt-tracker.md](./docs/exec-plans/tech-debt-tracker.md)

### Adding Tech Debt
When you identify tech debt:
1. Document it in the tracker
2. Prioritize (P0/P1/P2/P3)
3. Link to related code
4. Propose resolution approach

### Resolving Tech Debt
When fixing tech debt:
1. Update tracker status
2. Link to PR that resolved it
3. Document learnings

---

*Plans are living documents. Update them as you learn.*
`;
}

export function getProductSenseTemplate() {
	return `# Product Sense

**Product principles and user-facing guidelines.**

## Product Principles

1. **User value first** - Every feature must solve a real user problem
2. **Simple by default** - Hide complexity, expose power
3. **Fast and reliable** - Performance and reliability are features
4. **Accessible to all** - Build for everyone

## User Experience Guidelines

### Core User Flows
[Document your critical user journeys]

Example:
1. **New user onboarding**
   - What do first-time users see?
   - How do we guide them to value?

2. **Core workflow**
   - What is the main user action?
   - How do we make it effortless?

### UX Principles

1. **Immediate feedback** - User actions get instant response
2. **Forgiving** - Easy to undo, hard to break
3. **Consistent** - Same patterns throughout
4. **Predictable** - Users can anticipate behavior

## Feature Development

### Feature Spec Requirements

Every feature needs:
- [ ] User story (who, what, why)
- [ ] Success metrics
- [ ] Acceptance criteria
- [ ] Edge cases identified
- [ ] Failure modes considered

### Product Quality Bar

Before shipping:
- [ ] Works on happy path
- [ ] Handles errors gracefully
- [ ] Has loading states
- [ ] Has empty states
- [ ] Is accessible
- [ ] Is performant
- [ ] Is secure

## Metrics & Analytics

[Document what you measure and why]

### Key Metrics
- **Acquisition:** How users find the product
- **Activation:** How users get to first value
- **Retention:** How often users return
- **Revenue:** How the business makes money (if applicable)

## User Feedback Loop

1. **Collect** - Gather user feedback (support tickets, interviews, analytics)
2. **Synthesize** - Identify patterns and themes
3. **Prioritize** - Decide what to build based on impact
4. **Build** - Implement with quality
5. **Measure** - Track if it solved the problem

---

*Product sense guides what we build and why.*
`;
}

export function getQualityScoreTemplate() {
	return `# Quality Score

**Track quality metrics across domains and architectural layers.**

## Scoring System

Each domain and layer is graded on:
- **Test Coverage:** % of code covered by tests
- **Type Safety:** % of code that is type-checked
- **Documentation:** Are interfaces and behaviors documented?
- **Linting:** Are linting rules passing?
- **Performance:** Meet performance budgets?

### Grades

- **A** - Excellent (90-100%)
- **B** - Good (75-89%)
- **C** - Acceptable (60-74%)
- **D** - Needs Improvement (40-59%)
- **F** - Unacceptable (< 40%)

## Domain Quality

| Domain | Test Coverage | Type Safety | Documentation | Linting | Performance | Overall |
|--------|---------------|-------------|---------------|---------|-------------|---------|
| TBD    | -             | -           | -             | -       | -           | -       |

## Layer Quality

| Layer      | Test Coverage | Type Safety | Documentation | Linting | Overall |
|------------|---------------|-------------|---------------|---------|---------|
| Types      | -             | -           | -             | -       | -       |
| Config     | -             | -           | -             | -       | -       |
| Repository | -             | -           | -             | -       | -       |
| Service    | -             | -           | -             | -       | -       |
| Runtime    | -             | -           | -             | -       | -       |
| UI         | -             | -           | -             | -       | -       |

## Quality Targets

### Minimum Acceptable (Launch)
- Test Coverage: 70%
- Type Safety: 80%
- Documentation: 60%
- Linting: 100%
- Performance: Meets budgets

### Production Ready
- Test Coverage: 85%
- Type Safety: 95%
- Documentation: 80%
- Linting: 100%
- Performance: Exceeds budgets

## Known Quality Gaps

[Track areas that need improvement]

| Gap | Severity | Tracked In | Target Date |
|-----|----------|------------|-------------|
| TBD | P1       | Issue #X   | 2026-XX-XX  |

## Quality Improvement Process

1. **Automated Scanning** - CI runs quality checks on every PR
2. **Quality Reports** - Weekly quality score updates
3. **Improvement Plans** - Create execution plans for quality gaps
4. **Continuous Monitoring** - Track quality trends over time

---

*Quality scores are updated automatically by CI. Manual updates indicate automation gaps.*
`;
}

export function getReliabilityTemplate() {
	return `# Reliability Standards

**Guidelines for building reliable, production-ready systems.**

## Reliability Principles

1. **Fail gracefully** - Degrade functionality, never crash
2. **Observable** - Emit logs, metrics, and traces for all critical paths
3. **Recoverable** - Automatic retry with backoff
4. **Tested** - Integration tests against real infrastructure

## Error Handling

### Error Categories

1. **Expected errors** - User input validation, not found, etc.
   - Return typed error objects
   - Log at INFO level
   - Show user-friendly messages

2. **Unexpected errors** - System failures, network issues, etc.
   - Log at ERROR level with full context
   - Alert on-call if production
   - Retry with exponential backoff

### Error Response Format

All errors should include:
- \`code\` - Machine-readable error code
- \`message\` - Human-readable message
- \`details\` - Additional context (safe for logging)
- \`requestId\` - Trace ID for debugging

## Observability

### Logging

Use structured logging:
\`\`\`javascript
logger.info({
  event: 'user_login',
  userId: '123',
  duration: 45,
  success: true
});
\`\`\`

**Log Levels:**
- **DEBUG** - Detailed debugging (not in production)
- **INFO** - Normal operations
- **WARN** - Potential issues (rate limits, retries)
- **ERROR** - Failures requiring attention

### Metrics

Track:
- **Request latency** (p50, p95, p99)
- **Error rate** (% of failed requests)
- **Throughput** (requests per second)
- **Resource usage** (CPU, memory, database connections)

### Tracing

- Generate trace ID for every request
- Propagate trace ID across services
- Emit spans for all significant operations

## Performance Requirements

### Latency Budgets

| Operation | p50 | p95 | p99 |
|-----------|-----|-----|-----|
| API requests | < 100ms | < 300ms | < 1s |
| Database queries | < 50ms | < 150ms | < 500ms |
| Background jobs | < 5s | < 30s | < 2m |

### Resource Limits

- **Memory** - Monitor heap usage, set max heap size
- **CPU** - Alert on sustained > 70% usage
- **Connections** - Pool and limit database/external connections

## Retry & Circuit Breaker

### Retry Strategy
- Exponential backoff: 100ms, 200ms, 400ms, 800ms
- Max retries: 3
- Jitter: ±25% to prevent thundering herd

### Circuit Breaker
- **Closed** (normal): Requests flow through
- **Open** (failing): Fast-fail without attempting request
- **Half-open** (recovering): Allow limited requests to test recovery

## Deployment Safety

1. **Gradual rollout** - Deploy to small % of traffic first
2. **Health checks** - Automated health endpoint
3. **Rollback plan** - One-click rollback if needed
4. **Database migrations** - Backward-compatible, run before code deploy

## Incident Response

When production issues occur:
1. **Mitigate** - Stop the bleeding (rollback, scale up, etc.)
2. **Investigate** - Use logs, metrics, traces to find root cause
3. **Resolve** - Fix the underlying issue
4. **Document** - Write postmortem (what, why, how to prevent)
5. **Follow-up** - Implement prevention tasks

---

*Reliability is not optional. These standards apply to all production code.*
`;
}

export function getSecurityTemplate() {
	return `# Security Guidelines

**Security principles and practices for this codebase.**

## Security Posture

1. **Zero trust** - Never trust user input
2. **Least privilege** - Minimal access rights
3. **Defense in depth** - Multiple security layers
4. **Secure by default** - Safe defaults, opt-in to dangerous operations

## Input Validation

### Validation Rules

1. **Validate all inputs** - User data, API requests, file uploads, etc.
2. **Whitelist over blacklist** - Define what's allowed, reject everything else
3. **Parse at boundaries** - Validate external data at system entry points
4. **Type safety** - Use schema validation (Zod, Yup, etc.)

### Common Vulnerabilities to Prevent

- **SQL Injection** - Use parameterized queries, never string interpolation
- **XSS** - Escape all user content, use CSP headers
- **CSRF** - Use CSRF tokens for state-changing operations
- **Command Injection** - Never pass user input to shell commands
- **Path Traversal** - Validate file paths, use allowlist for file access

## Authentication & Authorization

### Authentication
- **Password storage** - bcrypt/argon2 with salt
- **Session management** - Secure, httpOnly cookies
- **Token expiry** - Short-lived access tokens, refresh tokens

### Authorization
- **Role-based access control (RBAC)** - Define roles and permissions
- **Principle of least privilege** - Users/services get minimum necessary access
- **Authorization checks** - Verify permissions on every request

## Secrets Management

### Rules
1. **Never commit secrets** - No API keys, passwords, tokens in code
2. **Use environment variables** - Load secrets from env at runtime
3. **Rotate secrets** - Regular rotation schedule
4. **Limit secret scope** - Separate secrets per environment

### .env Files
- \`.env\` - Never commit (add to .gitignore)
- \`.env.example\` - Template without real values (safe to commit)

## Data Protection

### Data Classification
- **Public** - Anyone can see
- **Internal** - Employees only
- **Confidential** - Need-to-know basis
- **Restricted** - Legal/compliance requirements

### Encryption
- **In transit** - TLS 1.3 for all network traffic
- **At rest** - Encrypt sensitive data in database

## API Security

1. **Rate limiting** - Prevent abuse (e.g., 100 req/min per IP)
2. **Input validation** - Validate request bodies, query params, headers
3. **Output encoding** - Prevent XSS in API responses
4. **CORS** - Restrict allowed origins

## Dependency Security

1. **Audit dependencies** - Run \`npm audit\` / \`bun audit\` regularly
2. **Update regularly** - Keep dependencies up to date
3. **Minimal dependencies** - Fewer dependencies = smaller attack surface
4. **Verify integrity** - Use lock files, verify package signatures

## Security Testing

1. **Static analysis** - Linters catch common vulnerabilities
2. **Dependency scanning** - Automated vulnerability scanning in CI
3. **Manual review** - Security-critical code gets human review
4. **Penetration testing** - Regular security audits

## Security Incident Response

If you discover a security vulnerability:
1. **Do not publish** - Keep it private
2. **Assess impact** - How severe is it?
3. **Fix immediately** - Security bugs are P0
4. **Notify users** - If user data was exposed
5. **Postmortem** - How did it happen? How to prevent?

## Security Checklist

Before deploying:
- [ ] All inputs validated
- [ ] No secrets in code
- [ ] Authentication/authorization implemented
- [ ] HTTPS enforced
- [ ] Security headers set (CSP, HSTS, etc.)
- [ ] Rate limiting enabled
- [ ] Dependencies audited
- [ ] Error messages don't leak sensitive info

---

*Security is everyone's responsibility. When in doubt, ask for a security review.*
`;
}

export function getDesignDocTemplate() {
	return `# [Feature/Component Name]

**Status:** [Draft | In Review | Approved | Implemented | Deprecated]
**Author:** [Agent/Human]
**Created:** YYYY-MM-DD
**Last Updated:** YYYY-MM-DD

## Overview

Brief 2-3 sentence summary of what this design document covers.

## Context & Motivation

### Problem Statement
What problem are we solving? Why does it need to be solved?

### Current State
What exists today? What are the pain points?

### Goals
- What are we trying to achieve?
- What does success look like?

### Non-Goals
- What are we explicitly not solving?
- What's out of scope?

## Proposed Design

### High-Level Approach
Describe the solution at a conceptual level.

### Detailed Design

#### Component/Module Structure
\`\`\`
[Diagram or code structure]
\`\`\`

#### Data Models
\`\`\`typescript
// Type definitions, schemas, etc.
\`\`\`

#### API/Interface
\`\`\`typescript
// Public interfaces
\`\`\`

#### Implementation Details
Key technical decisions and how things work internally.

## Alternatives Considered

### Alternative 1: [Name]
**Pros:**
- ...

**Cons:**
- ...

**Why not chosen:** ...

### Alternative 2: [Name]
**Pros:**
- ...

**Cons:**
- ...

**Why not chosen:** ...

## Tradeoffs & Decisions

| Decision | Rationale | Tradeoffs |
|----------|-----------|-----------|
| Example  | Why       | What we gain vs lose |

## Implementation Plan

1. **Phase 1:** ...
2. **Phase 2:** ...
3. **Phase 3:** ...

## Testing Strategy

- **Unit tests:** What will be unit tested?
- **Integration tests:** What will be integration tested?
- **Edge cases:** What edge cases need coverage?

## Security Considerations

- What security implications does this have?
- What mitigations are in place?

## Performance Implications

- What is the performance impact?
- Are there any bottlenecks?
- What monitoring is needed?

## Rollout Plan

- How will this be deployed?
- Is there a gradual rollout strategy?
- What metrics will we track?

## Open Questions

- [ ] Question 1?
- [ ] Question 2?

## References

- [Related design doc](./other-doc.md)
- [External reference](https://example.com)

---

*Update this document as the design evolves during implementation.*
`;
}

export function getExecPlanTemplate() {
	return `# [Feature/Task Name]

**Status:** [Draft | In Review | Approved | In Progress | Completed]
**Owner:** [Agent/Human]
**Created:** YYYY-MM-DD
**Target Completion:** YYYY-MM-DD
**Actual Completion:** YYYY-MM-DD (if completed)

## Context

### What are we building?
Brief description of the feature/task.

### Why are we building it?
User need, business value, or technical requirement.

### Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Approach

### High-Level Strategy
How will we approach this work?

### Key Decisions
| Decision | Rationale | Alternatives Considered |
|----------|-----------|-------------------------|
| Example  | Why       | What else we could do   |

### Dependencies
- **Blocks:** What this work depends on
- **Blocked by:** What depends on this work

## Implementation Tasks

### Phase 1: [Phase Name]
- [ ] Task 1 (Complexity: S/M/L)
- [ ] Task 2 (Complexity: S/M/L)
- [ ] Task 3 (Complexity: S/M/L)

### Phase 2: [Phase Name]
- [ ] Task 1 (Complexity: S/M/L)
- [ ] Task 2 (Complexity: S/M/L)

### Phase 3: [Phase Name]
- [ ] Task 1 (Complexity: S/M/L)

**Complexity Legend:**
- S (Small): < 2 hours
- M (Medium): 2-8 hours
- L (Large): > 8 hours

## Validation Plan

### Testing
- What tests will be written?
- How will we validate correctness?

### Quality Checks
- [ ] Tests pass
- [ ] Linters pass
- [ ] Documentation updated
- [ ] Performance benchmarks met

### Acceptance Criteria
- [ ] Feature works on happy path
- [ ] Error cases handled
- [ ] Edge cases covered
- [ ] Performance meets requirements

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Example risk | Medium | High | How we'll handle it |

## Progress Log

### YYYY-MM-DD
- Started Phase 1
- Completed Task 1
- Discovered issue with X, created tech debt entry

### YYYY-MM-DD
- Completed Phase 1
- Started Phase 2

## Decision Log

### YYYY-MM-DD: [Decision Title]
**Context:** What prompted this decision
**Decision:** What we decided
**Rationale:** Why we made this choice
**Impact:** How this affects the plan

## Learnings

### What Went Well
- ...

### What Could Be Improved
- ...

### What We Learned
- ...

---

*Move to \`docs/exec-plans/completed/\` when finished.*
`;
}

export function getProductSpecTemplate() {
	return `# [Feature Name]

**Status:** [Draft | In Review | Approved | In Development | Shipped]
**Owner:** [Product/Human]
**Created:** YYYY-MM-DD
**Target Ship:** YYYY-MM-DD

## Overview

One-paragraph summary of what this feature is and why it matters.

## Problem Statement

### User Pain Point
What problem do users have today?

### Evidence
How do we know this is a problem? (User feedback, data, support tickets, etc.)

### Impact
Who is affected? How many users?

## Goals

### User Goals
What does the user want to accomplish?

### Business Goals
What business metric does this move?

### Success Metrics
How will we measure success?
- Metric 1: Target value
- Metric 2: Target value

## User Stories

### Primary User Story
**As a** [type of user]
**I want** [goal]
**So that** [benefit]

### Additional User Stories
- **As a** ... **I want** ... **So that** ...
- **As a** ... **I want** ... **So that** ...

## User Experience

### User Flow
1. User does X
2. System responds with Y
3. User sees Z

### Mockups/Wireframes
[Link to designs or embed images]

### Edge Cases
- What happens if X?
- What if user does Y?

## Requirements

### Functional Requirements
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

### Non-Functional Requirements
- [ ] Performance: < Xms response time
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Security: [Specific security requirements]

### Out of Scope
- Explicitly not included in this version

## Technical Considerations

### Technical Constraints
Any technical limitations or requirements?

### Dependencies
What other systems/features does this depend on?

### Data Requirements
What data do we need to collect/store?

## Acceptance Criteria

- [ ] User can accomplish X
- [ ] Error case Y is handled gracefully
- [ ] Performance meets Z requirement
- [ ] Accessible via keyboard
- [ ] Works on mobile and desktop

## Launch Plan

### Phased Rollout
1. **Phase 1:** Internal testing
2. **Phase 2:** Beta users (X% of traffic)
3. **Phase 3:** General availability

### Monitoring
What metrics/logs will we track post-launch?

### Rollback Plan
How do we turn this off if needed?

## Open Questions

- [ ] Question 1?
- [ ] Question 2?

## References

- [Related product spec](./other-spec.md)
- [User research](link)
- [Design mockups](link)

---

*Update this spec as requirements evolve.*
`;
}

export function getTechDebtTrackerTemplate() {
	return `# Technical Debt Tracker

**Last Updated:** YYYY-MM-DD

## Active Technical Debt

### P0 - Critical (Must Fix)
| Item | Description | Impact | Created | Owner | Tracked In |
|------|-------------|--------|---------|-------|------------|
| TBD  | Description | High   | Date    | Agent/Human | Issue/PR |

### P1 - High Priority (Fix Soon)
| Item | Description | Impact | Created | Owner | Tracked In |
|------|-------------|--------|---------|-------|------------|
| TBD  | Description | Medium | Date    | Agent/Human | Issue/PR |

### P2 - Medium Priority (Plan to Fix)
| Item | Description | Impact | Created | Owner | Tracked In |
|------|-------------|--------|---------|-------|------------|
| TBD  | Description | Low-Medium | Date | Agent/Human | Issue/PR |

### P3 - Low Priority (Nice to Have)
| Item | Description | Impact | Created | Owner | Tracked In |
|------|-------------|--------|---------|-------|------------|
| TBD  | Description | Low    | Date    | Agent/Human | Issue/PR |

## Debt Categories

### Code Quality
- Duplicated code that should be abstracted
- Complex functions that need refactoring
- Missing error handling
- Inconsistent patterns

### Testing
- Missing test coverage
- Flaky tests
- Test infrastructure improvements

### Documentation
- Outdated documentation
- Missing API documentation
- Unclear code comments

### Performance
- Known performance bottlenecks
- Missing performance monitoring
- Unoptimized queries

### Security
- Known security vulnerabilities
- Missing security controls
- Outdated dependencies

### Infrastructure
- Configuration management issues
- Missing monitoring/alerting
- Deployment process improvements

## Resolved Debt (Recent)

| Item | Description | Resolved Date | PR | Learnings |
|------|-------------|---------------|-------|-----------|
| TBD  | What was fixed | YYYY-MM-DD | #123 | What we learned |

## Debt Prevention

### Golden Principles
1. **No duplicate code** - Extract to shared utilities
2. **Parse at boundaries** - Validate all external data
3. **Consistent error handling** - Use standard error patterns
4. **Automated cleanup** - Run cleanup agents weekly

### Automated Checks
- Linters catch common issues
- CI validates documentation freshness
- Dependency audits run daily
- Quality scores tracked weekly

---

*This tracker is maintained by humans and agents. Update when you identify or resolve technical debt.*
`;
}

export function getCoreBeliefsTemplate() {
	return `# Core Beliefs

**Fundamental principles for agent-first development in this repository.**

Last Updated: YYYY-MM-DD

## Agent-First Operating Principles

### 1. Repository is the Source of Truth
**Belief:** If it's not in the repository, it doesn't exist to agents.

**Implications:**
- All knowledge must be versioned in the repository
- Slack discussions must be captured in design docs
- External docs must be extracted to \`docs/references/\`
- Decisions must be documented, not just discussed

### 2. Progressive Disclosure
**Belief:** Give agents a map, not an encyclopedia.

**Implications:**
- AGENTS.md is a table of contents (~100 lines)
- Detailed docs live in \`docs/\` directory
- Links provide navigation, not inline walls of text
- Context grows as needed, not all up-front

### 3. Enforce Mechanically
**Belief:** Linters and tests are better than manual review.

**Implications:**
- Architectural constraints are enforced by custom linters
- Documentation freshness is validated in CI
- Code quality is measured automatically
- Humans review judgment calls, not mechanical issues

### 4. Agent Legibility First
**Belief:** Optimize for agent reasoning, not just human aesthetics.

**Implications:**
- Structure and patterns matter more than style
- Consistency enables pattern recognition
- Explicit is better than implicit
- Documentation explains "why," not "what"

### 5. Continuous Cleanup
**Belief:** Technical debt is like interest—pay it down continuously.

**Implications:**
- Automated cleanup runs regularly
- Bad patterns are fixed as soon as spotted
- Quality scores track drift over time
- "Friday cleanup" is automated, not manual

### 6. Real Environments Over Mocks
**Belief:** Tests should validate real behavior, not mocked behavior.

**Implications:**
- Use Docker for databases, Redis, external services
- Integration tests over unit tests
- Validate actual contracts, not assumptions
- Local dev mirrors production

### 7. Boring Technology Wins
**Belief:** Predictable, well-documented tools are better than exciting new ones.

**Implications:**
- Prefer standard libraries over cutting-edge frameworks
- Choose technologies agents can reason about
- Stability and composability over novelty
- Internalize when external is too opaque

### 8. Strict Boundaries, Flexible Internals
**Belief:** Enforce constraints at boundaries, allow autonomy within them.

**Implications:**
- Layered architecture is non-negotiable
- Within layers, implementation details are flexible
- Cross-cutting concerns go through explicit interfaces
- Dependency directions are enforced, not suggested

### 9. Feedback Loops are Multipliers
**Belief:** Fast, automated feedback enables speed without chaos.

**Implications:**
- CI validates every PR
- Agents can test their own changes
- Chrome DevTools lets agents drive the UI
- Observability stack makes behavior visible

### 10. Documentation is Code
**Belief:** Docs are not second-class citizens—they are part of the system.

**Implications:**
- Docs are versioned with code
- Stale docs break CI
- Documentation gaps are treated as bugs
- Design docs are reviewed like code

## Anti-Patterns to Avoid

### ❌ The "One Big AGENTS.md"
- **Problem:** Crowds out context, impossible to maintain
- **Solution:** AGENTS.md as table of contents, detailed docs in \`docs/\`

### ❌ Relying on External Knowledge
- **Problem:** Agents can't access Slack, Google Docs, or tribal knowledge
- **Solution:** Everything must be in-repo and discoverable

### ❌ Mocking Everything
- **Problem:** Tests pass but real code breaks
- **Solution:** Use Docker for real infrastructure in tests

### ❌ Manual Quality Gates
- **Problem:** Doesn't scale, blocks throughput
- **Solution:** Automate checks, make failures obvious

### ❌ Letting Debt Compound
- **Problem:** Becomes overwhelming, requires painful cleanup
- **Solution:** Continuous automated cleanup, fix patterns early

## Evolution of Beliefs

These beliefs are living principles. As we learn what works and what doesn't, we update them.

### Change Log

| Date | Change | Rationale |
|------|--------|-----------|
| YYYY-MM-DD | Initial beliefs documented | Establish foundation |

---

*These beliefs guide all architectural and process decisions. Challenge them when they don't serve us.*
`;
}

export function getValidationScriptTemplate(language) {
	if (language === 'typescript') {
		return `#!/usr/bin/env tsx
/**
 * Structure Validation Script
 * Validates the agent-first project structure and documentation
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

interface ValidationResult {
	passed: boolean;
	message: string;
}

class StructureValidator {
	private rootDir: string;
	private errors: string[] = [];
	private warnings: string[] = [];

	constructor(rootDir: string = process.cwd()) {
		this.rootDir = rootDir;
	}

	validate(): boolean {
		console.log('🔍 Validating project structure...\\n');

		this.validateRootDocs();
		this.validateDocsStructure();
		this.validateCrossLinks();
		this.validateDocFreshness();

		this.printResults();

		return this.errors.length === 0;
	}

	private validateRootDocs(): void {
		const requiredDocs = [
			'AGENTS.md',
			'CLAUDE.md',
			'ARCHITECTURE.md',
			'DESIGN.md',
			'PLANS.md',
			'PRODUCT_SENSE.md',
			'QUALITY_SCORE.md',
			'RELIABILITY.md',
			'SECURITY.md',
		];

		for (const doc of requiredDocs) {
			if (!existsSync(join(this.rootDir, doc))) {
				this.errors.push(\`Missing required document: \${doc}\`);
			}
		}

		// Validate AGENTS.md and CLAUDE.md are identical
		if (
			existsSync(join(this.rootDir, 'AGENTS.md')) &&
			existsSync(join(this.rootDir, 'CLAUDE.md'))
		) {
			const agentsContent = readFileSync(
				join(this.rootDir, 'AGENTS.md'),
				'utf-8',
			);
			const claudeContent = readFileSync(
				join(this.rootDir, 'CLAUDE.md'),
				'utf-8',
			);

			if (agentsContent !== claudeContent) {
				this.errors.push('AGENTS.md and CLAUDE.md must be identical');
			}
		}

		// Validate AGENTS.md is roughly 100 lines (allow some variance)
		if (existsSync(join(this.rootDir, 'AGENTS.md'))) {
			const agentsContent = readFileSync(
				join(this.rootDir, 'AGENTS.md'),
				'utf-8',
			);
			const lineCount = agentsContent.split('\\n').length;

			if (lineCount > 150) {
				this.warnings.push(
					\`AGENTS.md is \${lineCount} lines (recommended: ~100 lines). Consider moving details to docs/\`,
				);
			}
		}
	}

	private validateDocsStructure(): void {
		const requiredDirs = [
			'docs/design-docs',
			'docs/exec-plans/active',
			'docs/exec-plans/completed',
			'docs/product-specs',
			'docs/references',
			'docs/generated',
		];

		for (const dir of requiredDirs) {
			if (!existsSync(join(this.rootDir, dir))) {
				this.errors.push(\`Missing required directory: \${dir}\`);
			}
		}

		// Validate index files exist
		const requiredIndexes = [
			'docs/design-docs/index.md',
			'docs/product-specs/index.md',
		];

		for (const index of requiredIndexes) {
			if (!existsSync(join(this.rootDir, index))) {
				this.warnings.push(\`Missing index file: \${index}\`);
			}
		}
	}

	private validateCrossLinks(): void {
		// Basic validation: check that referenced files exist
		const agentsPath = join(this.rootDir, 'AGENTS.md');
		if (!existsSync(agentsPath)) return;

		const agentsContent = readFileSync(agentsPath, 'utf-8');
		const linkRegex = /\\[([^\\]]+)\\]\\(([^)]+)\\)/g;
		let match: RegExpExecArray | null;

		while ((match = linkRegex.exec(agentsContent)) !== null) {
			const linkPath = match[2];

			// Skip external links
			if (linkPath.startsWith('http')) continue;

			const fullPath = join(this.rootDir, linkPath);
			if (!existsSync(fullPath)) {
				this.warnings.push(
					\`Broken link in AGENTS.md: \${linkPath}\`,
				);
			}
		}
	}

	private validateDocFreshness(): void {
		// Check that design docs have been updated recently
		const designDocsDir = join(this.rootDir, 'docs/design-docs');
		if (!existsSync(designDocsDir)) return;

		const files = readdirSync(designDocsDir).filter((f) =>
			f.endsWith('.md'),
		);

		if (files.length === 0) {
			this.warnings.push(
				'No design documents found in docs/design-docs/',
			);
			return;
		}

		const now = Date.now();
		const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000;

		for (const file of files) {
			if (file === 'index.md' || file === 'template.md') continue;

			const filePath = join(designDocsDir, file);
			const stats = statSync(filePath);
			const age = now - stats.mtimeMs;

			if (age > sixMonths) {
				this.warnings.push(
					\`Design doc hasn't been updated in 6+ months: \${file}\`,
				);
			}
		}
	}

	private printResults(): void {
		console.log('\\n' + '='.repeat(60));

		if (this.errors.length === 0 && this.warnings.length === 0) {
			console.log('✅ All validation checks passed!');
		} else {
			if (this.errors.length > 0) {
				console.log(\`\\n❌ Errors (\${this.errors.length}):\\n\`);
				for (const error of this.errors) {
					console.log(\`  - \${error}\`);
				}
			}

			if (this.warnings.length > 0) {
				console.log(\`\\n⚠️  Warnings (\${this.warnings.length}):\\n\`);
				for (const warning of this.warnings) {
					console.log(\`  - \${warning}\`);
				}
			}
		}

		console.log('\\n' + '='.repeat(60) + '\\n');
	}
}

// Run validation
const validator = new StructureValidator();
const success = validator.validate();

process.exit(success ? 0 : 1);
`;
	}

	// JavaScript version
	return `#!/usr/bin/env node
/**
 * Structure Validation Script
 * Validates the agent-first project structure and documentation
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

class StructureValidator {
	constructor(rootDir = process.cwd()) {
		this.rootDir = rootDir;
		this.errors = [];
		this.warnings = [];
	}

	validate() {
		console.log('🔍 Validating project structure...\\n');

		this.validateRootDocs();
		this.validateDocsStructure();
		this.validateCrossLinks();
		this.validateDocFreshness();

		this.printResults();

		return this.errors.length === 0;
	}

	validateRootDocs() {
		const requiredDocs = [
			'AGENTS.md',
			'CLAUDE.md',
			'ARCHITECTURE.md',
			'DESIGN.md',
			'PLANS.md',
			'PRODUCT_SENSE.md',
			'QUALITY_SCORE.md',
			'RELIABILITY.md',
			'SECURITY.md',
		];

		for (const doc of requiredDocs) {
			if (!existsSync(join(this.rootDir, doc))) {
				this.errors.push(\`Missing required document: \${doc}\`);
			}
		}

		// Validate AGENTS.md and CLAUDE.md are identical
		if (
			existsSync(join(this.rootDir, 'AGENTS.md')) &&
			existsSync(join(this.rootDir, 'CLAUDE.md'))
		) {
			const agentsContent = readFileSync(
				join(this.rootDir, 'AGENTS.md'),
				'utf-8',
			);
			const claudeContent = readFileSync(
				join(this.rootDir, 'CLAUDE.md'),
				'utf-8',
			);

			if (agentsContent !== claudeContent) {
				this.errors.push('AGENTS.md and CLAUDE.md must be identical');
			}
		}

		// Validate AGENTS.md is roughly 100 lines (allow some variance)
		if (existsSync(join(this.rootDir, 'AGENTS.md'))) {
			const agentsContent = readFileSync(
				join(this.rootDir, 'AGENTS.md'),
				'utf-8',
			);
			const lineCount = agentsContent.split('\\n').length;

			if (lineCount > 150) {
				this.warnings.push(
					\`AGENTS.md is \${lineCount} lines (recommended: ~100 lines). Consider moving details to docs/\`,
				);
			}
		}
	}

	validateDocsStructure() {
		const requiredDirs = [
			'docs/design-docs',
			'docs/exec-plans/active',
			'docs/exec-plans/completed',
			'docs/product-specs',
			'docs/references',
			'docs/generated',
		];

		for (const dir of requiredDirs) {
			if (!existsSync(join(this.rootDir, dir))) {
				this.errors.push(\`Missing required directory: \${dir}\`);
			}
		}

		// Validate index files exist
		const requiredIndexes = [
			'docs/design-docs/index.md',
			'docs/product-specs/index.md',
		];

		for (const index of requiredIndexes) {
			if (!existsSync(join(this.rootDir, index))) {
				this.warnings.push(\`Missing index file: \${index}\`);
			}
		}
	}

	validateCrossLinks() {
		// Basic validation: check that referenced files exist
		const agentsPath = join(this.rootDir, 'AGENTS.md');
		if (!existsSync(agentsPath)) return;

		const agentsContent = readFileSync(agentsPath, 'utf-8');
		const linkRegex = /\\[([^\\]]+)\\]\\(([^)]+)\\)/g;
		let match;

		while ((match = linkRegex.exec(agentsContent)) !== null) {
			const linkPath = match[2];

			// Skip external links
			if (linkPath.startsWith('http')) continue;

			const fullPath = join(this.rootDir, linkPath);
			if (!existsSync(fullPath)) {
				this.warnings.push(
					\`Broken link in AGENTS.md: \${linkPath}\`,
				);
			}
		}
	}

	validateDocFreshness() {
		// Check that design docs have been updated recently
		const designDocsDir = join(this.rootDir, 'docs/design-docs');
		if (!existsSync(designDocsDir)) return;

		const files = readdirSync(designDocsDir).filter((f) =>
			f.endsWith('.md'),
		);

		if (files.length === 0) {
			this.warnings.push(
				'No design documents found in docs/design-docs/',
			);
			return;
		}

		const now = Date.now();
		const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000;

		for (const file of files) {
			if (file === 'index.md' || file === 'template.md') continue;

			const filePath = join(designDocsDir, file);
			const stats = statSync(filePath);
			const age = now - stats.mtimeMs;

			if (age > sixMonths) {
				this.warnings.push(
					\`Design doc hasn't been updated in 6+ months: \${file}\`,
				);
			}
		}
	}

	printResults() {
		console.log('\\n' + '='.repeat(60));

		if (this.errors.length === 0 && this.warnings.length === 0) {
			console.log('✅ All validation checks passed!');
		} else {
			if (this.errors.length > 0) {
				console.log(\`\\n❌ Errors (\${this.errors.length}):\\n\`);
				for (const error of this.errors) {
					console.log(\`  - \${error}\`);
				}
			}

			if (this.warnings.length > 0) {
				console.log(\`\\n⚠️  Warnings (\${this.warnings.length}):\\n\`);
				for (const warning of this.warnings) {
					console.log(\`  - \${warning}\`);
				}
			}
		}

		console.log('\\n' + '='.repeat(60) + '\\n');
	}
}

// Run validation
const validator = new StructureValidator();
const success = validator.validate();

process.exit(success ? 0 : 1);
`;
}

export function getGithubWorkflowTemplate(validationLanguage) {
	const runCommand =
		validationLanguage === 'typescript'
			? 'cd scripts && npm install && npm run validate'
			: 'node scripts/validate-structure.js';

	return `name: Validate Documentation Structure

on:
  pull_request:
    branches: [main, develop]
    paths:
      - 'docs/**'
      - 'AGENTS.md'
      - 'CLAUDE.md'
      - 'ARCHITECTURE.md'
      - '*.md'
  push:
    branches: [main, develop]
  schedule:
    # Run weekly to catch stale documentation
    - cron: '0 0 * * 0'

jobs:
  validate-structure:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run structure validation
        run: ${runCommand}

      - name: Check for broken links
        uses: gaurav-nelson/github-action-markdown-link-check@v1
        with:
          use-quiet-mode: 'yes'
          config-file: '.github/markdown-link-check-config.json'

  check-freshness:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Fetch full history for freshness checks

      - name: Check AGENTS.md and CLAUDE.md are identical
        run: |
          if ! cmp -s AGENTS.md CLAUDE.md; then
            echo "❌ AGENTS.md and CLAUDE.md must be identical"
            exit 1
          fi
          echo "✅ AGENTS.md and CLAUDE.md are identical"

      - name: Validate AGENTS.md size
        run: |
          lines=$(wc -l < AGENTS.md)
          if [ $lines -gt 150 ]; then
            echo "⚠️  AGENTS.md has $lines lines (recommended: ~100)"
            echo "Consider moving details to docs/ directory"
          else
            echo "✅ AGENTS.md size is appropriate ($lines lines)"
          fi
`;
}

export function getReadmeTemplate(projectType, validationLanguage) {
	const validateCommand =
		validationLanguage === 'typescript'
			? 'cd scripts && npm install && npm run validate'
			: 'node scripts/validate-structure.js';

	return `# Project Name

**Agent-first development structure for [project description]**

This project uses an agent-first development approach based on [OpenAI's harness engineering principles](https://openai.com/index/harness-engineering/).

## 🏗️ Project Structure

\`\`\`
.
├── AGENTS.md              # Agent development guide (table of contents)
├── CLAUDE.md              # Identical to AGENTS.md (for Claude Code)
├── ARCHITECTURE.md        # System architecture overview
├── DESIGN.md              # Design principles
├── FRONTEND.md            # Frontend guidelines${projectType === 'backend' ? ' (if applicable)' : ''}
├── PLANS.md               # Planning guidelines
├── PRODUCT_SENSE.md       # Product principles
├── QUALITY_SCORE.md       # Quality metrics tracker
├── RELIABILITY.md         # Reliability standards
├── SECURITY.md            # Security guidelines
├── docs/
│   ├── design-docs/       # Design documentation
│   ├── exec-plans/        # Execution plans (active & completed)
│   ├── product-specs/     # Product specifications
│   ├── references/        # External library docs for LLMs
│   └── generated/         # Auto-generated documentation
└── scripts/
    └── validate-structure.${validationLanguage === 'typescript' ? 'ts' : 'js'}  # Structure validation

\`\`\`

## 🚀 Getting Started

### 1. Initialize Your Application Framework

This structure is framework-agnostic. Choose and initialize your preferred framework:

**Frontend:**
\`\`\`bash
# React + Vite
npm create vite@latest

# Next.js
npx create-next-app@latest

# SvelteKit
npm create svelte@latest
\`\`\`

**Backend:**
\`\`\`bash
# Express
npm create express-app

# Fastify
npm init fastify

# NestJS
npm i -g @nestjs/cli && nest new project-name
\`\`\`

### 2. Customize Documentation

1. Review and customize [\`AGENTS.md\`](./AGENTS.md) and [\`CLAUDE.md\`](./CLAUDE.md)
2. Update [\`ARCHITECTURE.md\`](./ARCHITECTURE.md) with your system domains
3. Add your first design doc in [\`docs/design-docs/\`](./docs/design-docs/)
4. Document your tech stack choices

### 3. Validate Structure

Run the validation script to ensure the structure is correct:

\`\`\`bash
${validateCommand}
\`\`\`

## 🤖 Agent Development Workflow

1. **Read Documentation** - Start with [\`AGENTS.md\`](./AGENTS.md) for context
2. **Plan** - Create execution plans for complex work in [\`docs/exec-plans/\`](./docs/exec-plans/)
3. **Design** - Document architectural decisions in [\`docs/design-docs/\`](./docs/design-docs/)
4. **Implement** - Follow architectural constraints and quality standards
5. **Validate** - Run tests and validation scripts
6. **Review** - Get agent and human feedback
7. **Document** - Update docs based on implementation learnings

## 📚 Core Principles

1. **Repository is the source of truth** - If it's not in the repo, it doesn't exist to agents
2. **Progressive disclosure** - AGENTS.md is a map, detailed docs are in \`docs/\`
3. **Enforce mechanically** - Use linters and tests, not just manual review
4. **Agent legibility first** - Optimize for agent reasoning
5. **Continuous cleanup** - Fix drift immediately, don't let debt compound

See [\`docs/design-docs/core-beliefs.md\`](./docs/design-docs/core-beliefs.md) for detailed principles.

## 🔍 Validation

### Structure Validation
\`\`\`bash
${validateCommand}
\`\`\`

### CI/CD
GitHub Actions automatically validate:
- Documentation structure
- Broken links
- AGENTS.md and CLAUDE.md are identical
- Doc freshness

## 📖 Documentation

- **[\`AGENTS.md\`](./AGENTS.md)** - Start here for agent development
- **[\`ARCHITECTURE.md\`](./ARCHITECTURE.md)** - System architecture
- **[\`SECURITY.md\`](./SECURITY.md)** - Security guidelines
- **[\`QUALITY_SCORE.md\`](./QUALITY_SCORE.md)** - Quality metrics
- **[\`docs/design-docs/\`](./docs/design-docs/)** - Design decisions
- **[\`docs/exec-plans/\`](./docs/exec-plans/)** - Execution plans

## 🛠️ Development

[Add your development instructions here]

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build
npm run build
\`\`\`

## 🤝 Contributing

This project is optimized for agent-first development:

1. Review [\`AGENTS.md\`](./AGENTS.md) before contributing
2. Follow architectural constraints in [\`ARCHITECTURE.md\`](./ARCHITECTURE.md)
3. Adhere to security guidelines in [\`SECURITY.md\`](./SECURITY.md)
4. Maintain quality standards in [\`QUALITY_SCORE.md\`](./QUALITY_SCORE.md)

## 📝 License

[Your License Here]

---

**Built with agent-first development principles inspired by [OpenAI's harness engineering](https://openai.com/index/harness-engineering/)**
`;
}

export function getGitignoreTemplate() {
	return `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output

# Production
build/
dist/
*.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Generated files (but keep the directory)
docs/generated/*
!docs/generated/.gitkeep
`;
}

export function getBiomeConfigTemplate() {
	return `{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": ["node_modules", "dist", "build", ".next", "coverage"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noExtraBooleanCast": "error",
        "noMultipleSpacesInRegularExpressionLiterals": "error",
        "noUselessCatch": "error",
        "noWith": "error"
      },
      "correctness": {
        "noConstAssign": "error",
        "noConstantCondition": "error",
        "noEmptyCharacterClassInRegex": "error",
        "noEmptyPattern": "error",
        "noGlobalObjectCalls": "error",
        "noInvalidConstructorSuper": "error",
        "noInvalidNewBuiltin": "error",
        "noNonoctalDecimalEscape": "error",
        "noPrecisionLoss": "error",
        "noSelfAssign": "error",
        "noSetterReturn": "error",
        "noSwitchDeclarations": "error",
        "noUndeclaredVariables": "error",
        "noUnreachable": "error",
        "noUnreachableSuper": "error",
        "noUnsafeFinally": "error",
        "noUnsafeOptionalChaining": "error",
        "noUnusedLabels": "error",
        "noUnusedVariables": "warn",
        "useIsNan": "error",
        "useValidForDirection": "error",
        "useYield": "error"
      },
      "style": {
        "noNamespace": "error",
        "useAsConstAssertion": "error",
        "useBlockStatements": "off",
        "useConsistentArrayType": "off",
        "useForOf": "warn",
        "useShorthandFunctionType": "error"
      },
      "suspicious": {
        "noAsyncPromiseExecutor": "error",
        "noCatchAssign": "error",
        "noClassAssign": "error",
        "noCompareNegZero": "error",
        "noControlCharactersInRegex": "error",
        "noDebugger": "error",
        "noDuplicateCase": "error",
        "noDuplicateClassMembers": "error",
        "noDuplicateObjectKeys": "error",
        "noDuplicateParameters": "error",
        "noEmptyBlockStatements": "error",
        "noExplicitAny": "warn",
        "noExtraNonNullAssertion": "error",
        "noFallthroughSwitchClause": "error",
        "noFunctionAssign": "error",
        "noGlobalAssign": "error",
        "noImportAssign": "error",
        "noMisleadingCharacterClass": "error",
        "noMisleadingInstantiator": "error",
        "noPrototypeBuiltins": "error",
        "noRedeclare": "error",
        "noShadowRestrictedNames": "error",
        "noUnsafeDeclarationMerging": "error",
        "noUnsafeNegation": "error",
        "useGetterReturn": "error",
        "useValidTypeof": "error"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "all",
      "semicolons": "always",
      "arrowParentheses": "always"
    }
  }
}
`;
}

export function getMarkdownLinkCheckConfig() {
	return `{
  "ignorePatterns": [
    {
      "pattern": "^http://localhost"
    },
    {
      "pattern": "^https://localhost"
    }
  ],
  "replacementPatterns": [],
  "httpHeaders": [],
  "timeout": "5s",
  "retryOn429": true,
  "retryCount": 3,
  "fallbackRetryDelay": "5s",
  "aliveStatusCodes": [200, 206]
}
`;
}
