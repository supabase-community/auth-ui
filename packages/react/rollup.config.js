import babel from '@rollup/plugin-babel'
import external from 'rollup-plugin-peer-deps-external'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'
// so JS can be rolled with TS
// remove when JS files have been removed
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

console.log('Expected Externals', [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  './src'
])

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: {
    index: 'src/index.tsx',
    auth: 'src/components/Auth/index.tsx'
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    './src'
  ],
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      exports: 'named'
    },
    {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      exports: 'named'
    }
  ],
  plugins: [
    json(),
    external(),
    typescript(),
    // so JS can be rolled with TS
    // remove when JS files have been removed
    nodeResolve({
      ignoreGlobal: false,
      include: ['node_modules/**'],
      extensions
      // skip: keys(EXTERNALS), // <<-- skip: ['react', 'react-dom']
    }),
    commonjs({
      ignoreGlobal: false,
      include: 'node_modules/**'
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions
    }),
    del({ targets: ['dist/*'] })
  ]
}
