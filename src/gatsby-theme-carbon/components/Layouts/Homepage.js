import React from 'react';
import Layout from 'gatsby-theme-carbon/src/components/Layout';
import Main from 'gatsby-theme-carbon/src/components/Main';
import useMetadata from 'gatsby-theme-carbon/src/util/hooks/useMetadata';
import Utils from 'gatsby-theme-carbon/src/components/Utils';
import NextPrevious from 'gatsby-theme-carbon/src/components/NextPrevious';

const Homepage = ({
  children,
  Banner,
  FirstCallout,
  SecondCallout,
  ThirdCallout,
  FourthCallout,
  location,
  pageContext,
}) => {
  const { frontmatter = {}, titleType } = pageContext;
  const { title, description, keywords } = frontmatter;
  const { homepageTheme } = useMetadata();

  return (
    <Layout
      pageTitle={title}
      pageDescription={description}
      pageKeywords={keywords}
      titleType={titleType}
      homepage
      theme={homepageTheme}>
      {Banner}
      {FirstCallout}
      {SecondCallout}
      <Main>{children}</Main>
      {ThirdCallout}
      {FourthCallout}
      <NextPrevious isHomepage location={location} pageContext={pageContext} />
      <Utils />
    </Layout>
  );
};

export default Homepage;
