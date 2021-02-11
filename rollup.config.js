import typescript from 'rollup-plugin-typescript2';


const config = {
    preserveModules: true, // or `false` to bundle as a single file
    input: ['src/index.ts'],
    output: [{ dir: 'dist', format: 'esm', esModule:true, entryFileNames: '[name].mjs' }],
    external: ['jsonpointer'],
    plugins: [typescript({ tsconfig: './tsconfig.rollup.json' })],
};

export default [
  {
      ...config,
      output: [{ dir: 'dist', format: 'esm', esModule:true, entryFileNames: '[name].mjs' }]
  },
  {
    ...config,
    output: [{ dir: 'dist', format: 'cjs', esModule:false, entryFileNames: '[name].js' }]
  }
];