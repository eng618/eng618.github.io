/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

export const onRenderBody = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();

  // Filter out the IBM Plex preload if it's not being used.
  // This helps improve performance by avoiding a "Preload key requests" warning in Lighthouse.
  const filteredHeadComponents = headComponents.filter((component) => {
    if (
      component.type === 'link' &&
      component.props.rel === 'preload' &&
      component.props.href &&
      (component.props.href.includes('IBM-Plex') || component.props.href.includes('s81c.com'))
    ) {
      return false;
    }
    return true;
  });

  replaceHeadComponents(filteredHeadComponents);
};
