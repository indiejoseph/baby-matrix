import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { Board } from '../components';

const IndexPage: NextPage = () => {
  return <Board />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
