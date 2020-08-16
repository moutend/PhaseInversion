import React, {useState, useEffect} from 'react';

import Translate from './i18n/Translate';

import AppNavigation from './containers/AppNavigation';
import PhaseInverter from './containers/PhaseInverter';

export default function App() {
  const repositoryURL: string = 'https://github.com/moutend/AudioWebApp/PhaseInvert/';

  const [isInitialized, setIsInitialized] = useState(false) as [boolean, (a: boolean) => void];
  const [language, setLanguage] = useState('') as [string, (a: string) => void];

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    const defaultLanguage: string = window.location.hash.toString().replace(/^#/, "");

    setLanguage(defaultLanguage);
    setIsInitialized(true);

    if (defaultLanguage !== '') {
      document.title = Translate(defaultLanguage).appName;
    }
  });

  useEffect(() => {
    if (language === '') {
      return;
    }

    const hash: string = window.location.hash.toString();
    const href: string = window.location.href.replace(hash, "");

    window.location.href = (href + "#" + language);
    document.title = Translate(language).appName;
  }, [language]);

  return (
    <div>
      <AppNavigation repositoryURL={repositoryURL} setLanguage={setLanguage} language={language} />
      <PhaseInverter language={language} />
    </div>
  );
}
