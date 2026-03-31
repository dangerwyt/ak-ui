import { makeInstaller } from '@ak-ui/utils';
import components from './components';
import '@ak-ui/theme/index.css';

const installer = makeInstaller(components);

export * from '@ak-ui/components';
export default installer;
