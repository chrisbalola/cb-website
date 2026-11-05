import { CoreDependencies } from '@/core/types';
import { AwilixContainer } from 'awilix';
import { SharedDependencies } from '@/shared/types';

export interface AppDependencies extends CoreDependencies, SharedDependencies {}

export type AppContainer = AwilixContainer<AppDependencies>;
