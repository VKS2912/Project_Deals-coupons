/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width:{
       '152':'152px','52.8':'52.8px','220':'220px','620':'620px','50':'50px','60':'60px'
      },
      height:{
       '48':'48px','52.8':'52.8px','65':'65px','300':'300px','50':'50px','60':'60px'
      },
      fontSize:{
        '18':'18px',
        '60':'60px',
        '21':'21px',
        '28':'28px',
        '33.6':'33.6px',
        '14':'14px',
        '16':'16px',
        '36':'36px',
        '30':'30px',
        '24':'24px',
        '48':'48px',
        '30':'30px'
      },
       lineHeight: {
        '28':'28px',
        '24.8': '24.8px',
        '72': '72px',
        '30': '30px',
        '32':'32px',
        '20': '20px',
        '48.6':'48.6px',
        '40.5':'40.5px',
        '60':'60px',
        '38':'38px',
        '44':'44px'
      },
        textColor: {
        'white-color': '#FFFFFF',
      },
      borderWidth: {
        '8.8': '8.8px',
        '2':'2px',
        '1.14':'1.14px',
        '1':'1px','10':'10px',
        '0.75':'0.75px'
      },
    },
  },
  plugins: [],
}