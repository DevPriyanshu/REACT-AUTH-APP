
export default function CssBaseline() {
  return {
    MuiCssBaseline: {
      styleOverrides: `
      /* Ref: https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp*/
      /* Scrollbar width */
      ::-webkit-scrollbar {
        width: 8px;
        height:8px;
      }
      /* Scrollbar Track */
      ::-webkit-scrollbar-track {
        background: #e0e0e0;
        border-radius: 4px;
      }
      /* Scrollbar Handle */
      ::-webkit-scrollbar-thumb {
        background: #bdbdbd;
        border-radius: 4px;
      }
      /* Scrollbar Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #9e9e9e;
        border-radius: 4px;
      }
      `,
    },
  };
}
