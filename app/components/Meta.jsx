import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({
  title = 'User Management App',
  description = 'User Management App App by Rudy Nurafif',
  keywords = 'user management, user management app, user table, rudy nurafif, rudy asa nurafif',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

export default Meta;
