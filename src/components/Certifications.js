import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Grid, Row, Column, ClickableTile, Tag, Button } from '@carbon/react';
import { Launch } from '@carbon/icons-react';
import coursesData from '../data/courses.json';

const SectionContainer = styled.section`
  padding: 4rem 0;
  background: transparent;
`;

const SectionTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #9c8bff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledClickableTile = styled(ClickableTile)`
  background: rgba(22, 22, 22, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(156, 139, 255, 0.1);
    border-color: rgba(156, 139, 255, 0.4);
    transform: translateY(-5px);
  }

  .cds--tile-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const CourseTitle = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: white;
  line-height: 1.4;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
`;

const DateText = styled.span`
  font-size: 0.875rem;
  color: #c6c6c6;
  font-family: 'Inter', sans-serif;
`;

const Certifications = () => {
  const { courses, allCourses } = coursesData;

  // Sort courses by date (descending)
  const sortedCourses = [...courses].sort((a, b) => {
    return new Date(b.completed) - new Date(a.completed);
  });

  return (
    <SectionContainer>
      <Grid>
        <Row>
          <Column colLg={8} colMd={6} colSm={4}>
            <SectionTitle style={{ textAlign: 'left', marginBottom: '1rem' }}>Certifications & Courses</SectionTitle>
            <p style={{ color: '#c6c6c6', marginBottom: '2.5rem' }}>
              A history of continuous learning and skill development through various platforms.
            </p>
          </Column>
          {allCourses?.certificates?.url && (
            <Column
              colLg={4}
              colMd={2}
              colSm={4}
              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: '2.5rem' }}
            >
              <Button
                kind="ghost"
                href={allCourses.certificates.url}
                target="_blank"
                renderIcon={Launch}
                style={{ color: '#9c8bff' }}
              >
                View Lynda.com Profile
              </Button>
            </Column>
          )}
        </Row>
        <Row condensed>
          {sortedCourses.map((course, index) => (
            <Column key={index} colLg={4} colMd={4} colSm={4} style={{ marginBottom: '1.5rem' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <StyledClickableTile href={course.url} target="_blank" rel="noopener noreferrer">
                  <div style={{ marginBottom: '1rem' }}>
                    <Tag type={course.authority === 'Udemy.com' ? 'teal' : 'purple'} size="sm">
                      {course.authority}
                    </Tag>
                    {course.category && (
                      <Tag type="cool-gray" size="sm">
                        {course.category}
                      </Tag>
                    )}
                  </div>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseMeta>
                    <DateText>{course.completed}</DateText>
                    <Launch style={{ color: '#9c8bff' }} />
                  </CourseMeta>
                </StyledClickableTile>
              </motion.div>
            </Column>
          ))}
        </Row>
      </Grid>
    </SectionContainer>
  );
};

export default Certifications;
