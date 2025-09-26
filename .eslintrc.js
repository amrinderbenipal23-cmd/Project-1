module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'plugin:import/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'import'
  ],
  rules: {
    // Code Quality
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'error',
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-return': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-destructuring': ['error', {
      array: true,
      object: true
    }, {
      enforceForRenamedProperties: false
    }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'rest-spread-spacing': 'error',
    'template-curly-spacing': 'error',
    'yield-star-spacing': 'error',

    // Style
    'indent': ['error', 2, { 
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1
    }],
    'quotes': ['error', 'single', { 
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { 
      before: false, 
      after: true 
    }],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'key-spacing': ['error', { 
      beforeColon: false, 
      afterColon: true 
    }],
    'keyword-spacing': ['error', { 
      before: true, 
      after: true 
    }],
    'object-curly-spacing': ['error', 'always'],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always'],

    // Best Practices
    'array-callback-return': 'error',
    'consistent-return': 'error',
    'curly': ['error', 'all'],
    'default-case': 'error',
    'dot-notation': 'error',
    'eqeqeq': ['error', 'always'],
    'no-alert': 'warn',
    'no-caller': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': ['warn', {
      ignore: [0, 1, -1],
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: false
    }],
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': ['error', { 
      props: true 
    }],
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'radix': 'error',
    'wrap-iife': ['error', 'outside'],
    'yoda': 'error',

    // Variables
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true
    }],
    'no-use-before-define': ['error', {
      functions: false,
      classes: true,
      variables: true
    }],

    // Node.js
    'no-process-env': 'warn',
    'no-process-exit': 'error',
    'no-sync': 'warn',

    // ES6
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { 
      before: true, 
      after: true 
    }],
    'constructor-super': 'error',
    'no-class-assign': 'error',
    'no-confusing-arrow': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': 'error',
    'no-new-symbol': 'error',
    'no-restricted-imports': ['error', {
      patterns: [{
        group: ['../*'],
        message: 'Relative imports are not allowed.'
      }]
    }],
    'no-this-before-super': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': ['error', {
      array: true,
      object: true
    }, {
      enforceForRenamedProperties: false
    }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'require-yield': 'error',
    'rest-spread-spacing': 'error',
    'sort-imports': ['error', {
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
    }],
    'template-curly-spacing': 'error',
    'yield-star-spacing': 'error',

    // Import
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-internal-modules': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-relative-parent-imports': 'error',
    'import/export': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-deprecated': 'warn',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unused-modules': 'warn',
    'import/first': 'error',
    'import/exports-last': 'error',
    'import/no-duplicates': 'error',
    'import/no-namespace': 'error',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never'
    }],
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      }
    }],
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 'off',
    'import/no-anonymous-default-export': 'error',
    'import/group-exports': 'error',
    'import/dynamic-import-chunkname': 'error',
    'import/no-import-module-exports': 'error',
    'import/no-relative-packages': 'error',
    'import/no-relative-parent-imports': 'error',
    'import/no-restricted-paths': 'off',
    'import/no-unassigned-import': 'off',
    'import/no-named-default': 'error',
    'import/no-default-export': 'off',
    'import/no-named-export': 'off',
    'import/no-commonjs': 'off',
    'import/no-amd': 'error',
    'import/no-nodejs-modules': 'off',
    'import/unambiguous': 'off',
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-internal-modules': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-relative-parent-imports': 'error',
    'import/export': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-deprecated': 'warn',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unused-modules': 'warn',
    'import/first': 'error',
    'import/exports-last': 'error',
    'import/no-duplicates': 'error',
    'import/no-namespace': 'error',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never'
    }],
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      }
    }],
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 'off',
    'import/no-anonymous-default-export': 'error',
    'import/group-exports': 'error',
    'import/dynamic-import-chunkname': 'error',
    'import/no-import-module-exports': 'error',
    'import/no-relative-packages': 'error',
    'import/no-relative-parent-imports': 'error',
    'import/no-restricted-paths': 'off',
    'import/no-unassigned-import': 'off',
    'import/no-named-default': 'error',
    'import/no-default-export': 'off',
    'import/no-named-export': 'off',
    'import/no-commonjs': 'off',
    'import/no-amd': 'error',
    'import/no-nodejs-modules': 'off',
    'import/unambiguous': 'off'
  },
  overrides: [
    {
      files: ['tests/**/*.js', '**/*.test.js'],
      env: {
        jest: true
      },
      rules: {
        'no-magic-numbers': 'off',
        'import/no-extraneous-dependencies': 'off'
      }
    },
    {
      files: ['*.config.js', '*.config.json'],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json']
      }
    }
  }
};

