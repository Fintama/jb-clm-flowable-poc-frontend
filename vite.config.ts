import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

//create me a config that makes me want to quit my job


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    global: {}
  }
})
