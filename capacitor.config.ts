import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.PI.app',
  appName: 'PI',
  webDir: 'dist/Modernize',
  server: {
    androidScheme: 'https'
  }
};

export default config;
