module.exports = {
	parser: "babel-eslint",
	env: {
		browser: true,
		es6: true,
	},
	extends: 'airbnb',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		dataLayer: 'readonly',
		Munchkin: 'readonly'
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		"react/jsx-one-expression-per-line": 0,
		"no-console": 0,
		"indent": [2, "space", { "SwitchCase": 1, "VariableDeclarator": 1 }],
		"no-tabs": 1,
		"react/prop-types": 0,
		"react/jsx-indent": [2, "space"],
		"react/jsx-indent-props": [2, "space"],
		"camelcase": 0,
		"arrow-body-style": 0,
		"jsx-a11y/anchor-is-valid": ["error", {
			"aspects": ["invalidHref", "preferButton"]
		}],
		"jsx-a11y/click-events-have-key-events": 0,
		"react/no-array-index-key": 0,
		"max-len": 0,
		"react/no-danger": 0,
		"react/no-did-update-set-state": 0,
		"object-curly-newline": 0,
		"import/prefer-default-export": 0,
		"react/jsx-max-props-per-line": [1, { "maximum": 1 }],
		'no-underscore-dangle': 0,
	},
};
