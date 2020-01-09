import novelaTheme from '@narative/gatsby-theme-novela/src/gatsby-plugin-theme-ui';

export default {
  ...novelaTheme,
  initialColorMode: `dark`,
  colors: {
    ...novelaTheme.colors,
    primary: '#808080',
    secondary: '#545454',
    accent: '#c0b3ff',
    grey: '#afafaf',
    background: '#fff',
  },
};
