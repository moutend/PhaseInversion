import Translation from './Translation';
import enUS from './en-us';
import ja from './ja';

export default function Translate(language: string): Translation {
  switch (language) {
  case 'en-US':
    return enUS;
  case 'ja':
    return ja;
  }

  return enUS;
}
