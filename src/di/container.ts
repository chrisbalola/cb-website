import { createContainer, InjectionMode } from 'awilix';
import { AppContainer } from './types';
import { registerCoreModule } from '@/core/container';
import { registerSharedModule } from '@/shared/container';

const appContainer: AppContainer = createContainer({
  injectionMode: InjectionMode.PROXY,
  strict: true,
});

registerCoreModule(appContainer);
registerSharedModule(appContainer);

export const container = appContainer;
