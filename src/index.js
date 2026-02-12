import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import {
	getAgentsTemplate,
	getArchitectureTemplate,
	getBiomeConfigTemplate,
	getCoreBeliefsTemplate,
	getDesignDocTemplate,
	getDesignTemplate,
	getExecPlanTemplate,
	getFrontendTemplate,
	getGithubWorkflowTemplate,
	getGitignoreTemplate,
	getMarkdownLinkCheckConfig,
	getPlansTemplate,
	getProductSenseTemplate,
	getProductSpecTemplate,
	getQualityScoreTemplate,
	getReadmeTemplate,
	getReliabilityTemplate,
	getSecurityTemplate,
	getTechDebtTrackerTemplate,
	getValidationScriptTemplate,
} from './templates.js';

async function main() {
	console.clear();

	p.intro(pc.bgCyan(pc.black(' agentic-engine ')));

	const project = await p.group(
		{
			path: () =>
				p.text({
					message: 'Where should we create your project?',
					placeholder: './my-agent-project',
					defaultValue: './my-agent-project',
				}),
			projectType: () =>
				p.select({
					message: 'What type of project?',
					options: [
						{ value: 'fullstack', label: 'Full-stack (frontend + backend)' },
						{ value: 'backend', label: 'Backend only' },
						{ value: 'frontend', label: 'Frontend only' },
					],
				}),
			validationLanguage: () =>
				p.select({
					message: 'Validation script language?',
					options: [
						{
							value: 'typescript',
							label: 'TypeScript',
							hint: 'Recommended',
						},
						{ value: 'javascript', label: 'JavaScript' },
					],
				}),
			includeObservability: () =>
				p.confirm({
					message: 'Include observability stack templates?',
					initialValue: true,
				}),
			includeCI: () =>
				p.confirm({
					message: 'Include GitHub Actions workflows?',
					initialValue: true,
				}),
		},
		{
			onCancel: () => {
				p.cancel('Operation cancelled.');
				process.exit(0);
			},
		},
	);

	const s = p.spinner();
	s.start('Creating project structure');

	const projectPath = project.path;

	// Create root directory
	if (!existsSync(projectPath)) {
		mkdirSync(projectPath, { recursive: true });
	}

	// Create directory structure
	const directories = [
		'docs/design-docs',
		'docs/exec-plans/active',
		'docs/exec-plans/completed',
		'docs/product-specs',
		'docs/references',
		'docs/generated',
		'scripts',
	];

	if (project.includeCI) {
		directories.push('.github/workflows');
	}

	for (const dir of directories) {
		mkdirSync(join(projectPath, dir), { recursive: true });
	}

	s.message('Writing documentation templates');

	// Write root documentation files
	writeFileSync(
		join(projectPath, 'AGENTS.md'),
		getAgentsTemplate(project.projectType),
	);
	writeFileSync(
		join(projectPath, 'CLAUDE.md'),
		getAgentsTemplate(project.projectType),
	); // Identical to AGENTS.md
	writeFileSync(
		join(projectPath, 'ARCHITECTURE.md'),
		getArchitectureTemplate(project.projectType),
	);
	writeFileSync(join(projectPath, 'DESIGN.md'), getDesignTemplate());
	writeFileSync(join(projectPath, 'PLANS.md'), getPlansTemplate());
	writeFileSync(
		join(projectPath, 'PRODUCT_SENSE.md'),
		getProductSenseTemplate(),
	);
	writeFileSync(
		join(projectPath, 'QUALITY_SCORE.md'),
		getQualityScoreTemplate(),
	);
	writeFileSync(join(projectPath, 'RELIABILITY.md'), getReliabilityTemplate());
	writeFileSync(join(projectPath, 'SECURITY.md'), getSecurityTemplate());

	if (
		project.projectType === 'fullstack' ||
		project.projectType === 'frontend'
	) {
		writeFileSync(join(projectPath, 'FRONTEND.md'), getFrontendTemplate());
	}

	// Write docs templates
	writeFileSync(
		join(projectPath, 'docs/design-docs/index.md'),
		'# Design Documentation\n\nThis directory contains all design documents and architectural decisions.\n\n## Active Designs\n\n- [Core Beliefs](./core-beliefs.md)\n\n## Template\n\nUse `template.md` as a starting point for new design documents.\n',
	);
	writeFileSync(
		join(projectPath, 'docs/design-docs/core-beliefs.md'),
		getCoreBeliefsTemplate(),
	);
	writeFileSync(
		join(projectPath, 'docs/design-docs/template.md'),
		getDesignDocTemplate(),
	);

	writeFileSync(
		join(projectPath, 'docs/exec-plans/template.md'),
		getExecPlanTemplate(),
	);
	writeFileSync(
		join(projectPath, 'docs/exec-plans/tech-debt-tracker.md'),
		getTechDebtTrackerTemplate(),
	);

	writeFileSync(
		join(projectPath, 'docs/product-specs/index.md'),
		'# Product Specifications\n\nThis directory contains all product specifications and feature requirements.\n\n## Active Specs\n\n- None yet\n\n## Template\n\nUse `template.md` as a starting point for new product specs.\n',
	);
	writeFileSync(
		join(projectPath, 'docs/product-specs/template.md'),
		getProductSpecTemplate(),
	);

	// Write validation script
	s.message('Creating validation tooling');

	const scriptExt = project.validationLanguage === 'typescript' ? 'ts' : 'js';
	writeFileSync(
		join(projectPath, `scripts/validate-structure.${scriptExt}`),
		getValidationScriptTemplate(project.validationLanguage),
	);

	// Add package.json for validation script if TypeScript
	if (project.validationLanguage === 'typescript') {
		const validationPackageJson = {
			name: 'validation-scripts',
			version: '1.0.0',
			type: 'module',
			scripts: {
				validate: 'tsx scripts/validate-structure.ts',
			},
			devDependencies: {
				tsx: '^4.19.2',
			},
		};
		writeFileSync(
			join(projectPath, 'scripts/package.json'),
			JSON.stringify(validationPackageJson, null, 2),
		);
	}

	// Write GitHub Actions workflow
	if (project.includeCI) {
		s.message('Creating CI/CD workflows');
		writeFileSync(
			join(projectPath, '.github/workflows/validate-docs.yml'),
			getGithubWorkflowTemplate(project.validationLanguage),
		);
		writeFileSync(
			join(projectPath, '.github/markdown-link-check-config.json'),
			getMarkdownLinkCheckConfig(),
		);
	}

	// Write .gitignore
	writeFileSync(join(projectPath, '.gitignore'), getGitignoreTemplate());

	// Write biome.json
	writeFileSync(join(projectPath, 'biome.json'), getBiomeConfigTemplate());

	// Write README
	writeFileSync(
		join(projectPath, 'README.md'),
		getReadmeTemplate(project.projectType, project.validationLanguage),
	);

	s.stop('Project created successfully!');

	p.note(
		`${pc.cyan('cd')} ${project.path}\n\n${pc.dim('Next steps:')}\n1. Initialize your application framework (e.g., ${pc.cyan('npm create vite@latest')}, ${pc.cyan('bun create next-app')})\n2. Review and customize ${pc.cyan('AGENTS.md')} and ${pc.cyan('CLAUDE.md')}\n3. Add your first design doc in ${pc.cyan('docs/design-docs/')}\n4. ${project.includeCI ? 'Push to GitHub to activate CI workflows' : 'Set up CI/CD workflows'}\n\n${pc.dim('Validation:')}\n${project.validationLanguage === 'typescript' ? `- Run ${pc.cyan('cd scripts && npm install && npm run validate')}` : `- Run ${pc.cyan('node scripts/validate-structure.js')}`}`,
		'Getting Started',
	);

	p.outro(
		`${pc.green('✓')} Agent harness ready! Start building with AI agents.`,
	);
}

main().catch(console.error);
