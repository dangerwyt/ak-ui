import { makeInstaller } from '@ak-ui/utils';
import components from './components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@ak-ui/theme/index.css';

library.add(fas);
const installer = makeInstaller(components);

export * from '@ak-ui/components';
export default installer;
