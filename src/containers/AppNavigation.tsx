import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';

import LanguagePickerButton from '../components/LanguagePickerButton';

export default function AppNavigation(props: any) {
  return (
    <div>
      <AppBar style={{backgroundColor: '#555'}}>
        <Container maxWidth="sm">
          <Toolbar>
            <LanguagePickerButton style={{marginLeft: '0', marginRight: 'auto'}} setLanguage={props.setLanguage} language={props.language} />
            <Link href={props.repositoryURL} style={{marginLeft: 'auto', marginRight: '0', color: '#FFF'}}>View on GitHub</Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  );
}
