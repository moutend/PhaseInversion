import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function LanguagePickerButton(props: any) {
  return (
    <div>
      <FormControl>
        <Select native value={props.language}
          onChange={(e) => props.setLanguage(e.target.value)}
          style={{color: '#FFF'}}
          inputProps={{
          name: 'language',
          id: 'language-native-simple',
        }}>
          <option value="en-us">English</option>
          <option value="ja">日本語</option>
        </Select>
      </FormControl>
    </div>
  );
}
