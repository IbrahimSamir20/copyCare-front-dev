// src/types/react-i18next.d.ts
import 'react-i18next';
import {resources} from '../locales';

declare module 'react-i18next' {
  type DefaultResources = (typeof resources)['en']['translation'];
  interface Resources extends DefaultResources {}
}
