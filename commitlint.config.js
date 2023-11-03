module.exports = { extends: ['@commitlint/config-conventional'],
prompt: {
	type: {
		description: 'Commit desc',
		enum: {
			feat: {
				description: 'A new feature',
				title: 'Features',
			},
			fix: {
				description: 'A bug fix',
				title: 'Bug Fixes',
			},
		}
	}
}}
