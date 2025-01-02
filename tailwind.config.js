const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", 
            "./src/**/*.{js,ts,jsx,tsx}",
            "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
            'node_modules/flowbite-react/lib/esm/**/*.js',
            flowbite.content(),
            "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
            "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
          ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}

