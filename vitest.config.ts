import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'src/lib/**',
				'node_modules/**',
				'dist/**',
				'src/components/ui',
				'src/hooks',
				'src/contexts',
				'eslint.config.js',
				'postcss.config.js',
				'tailwind.config.ts',
				'vite.config.ts',
				'vitest.config.ts',
				'src/main.tsx',
				'src/vite-env.d.ts',
				'src/App.tsx',
			],
		},
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
