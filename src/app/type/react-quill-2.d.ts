declare module 'react-quill-2' {
    import * as React from 'react';
  
    interface ReactQuillProps {
      value?: string;
      onChange?: (content: string, delta: any, source: string) => void;
      placeholder?: string;
      modules?: Record<string, any>;
      formats?: string[];
    }
  
    export default class ReactQuill extends React.Component<ReactQuillProps> {}
  }