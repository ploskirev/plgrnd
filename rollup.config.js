import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import nodeExternals from 'rollup-plugin-node-externals'
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/templates', dest: 'dist' }
      ]
    }),
    nodeExternals(),
    typescript(),
    terser({
      compress: {
        module: true,
      }
    }),
  ]
}
