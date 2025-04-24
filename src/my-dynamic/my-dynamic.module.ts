import { DynamicModule, Module } from '@nestjs/common';

export type MyDynamicModuleConfigs = {
    apiKey: string;
    apiUrl: string;
}

export const MY_DYNAMIC_CONFIG = 'MY_DYNAMIC_CONFIG'

@Module({})
export class MyDynamicModule {
    // most common names for a method in a module it's 'register', 'forRoot' and 'forRootAsync'
    static register(configurations: MyDynamicModuleConfigs): DynamicModule {
        // console.log('MyDynamicModuleConfigs', configurations);
        
        return {
            module: MyDynamicModule,
            imports: [],
            providers: [
                {
                    provide: MY_DYNAMIC_CONFIG,
                    useFactory: async () => {
                        return configurations;
                    },
                    // useValue: configurations, // it's the same thing
                }
            ],
            controllers: [],
            exports: [MY_DYNAMIC_CONFIG],
            // global: true, // when imported, will be visible in all modules
        }
    }
}
