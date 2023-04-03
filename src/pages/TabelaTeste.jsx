import * as React from 'react';
import {  Link } from 'react-router-dom';

export default function EnhancedTable() {

  return (
    <div>
        <Link to={{
          pathname: '/teste2',
          state: {
            parametros: 'aasdasd'
          },
        }}>teste</Link>
    </div>
  );
}