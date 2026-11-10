import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.studioprodigy.currencyconverter',
  appName: 'Currency Converter',
  webDir: 'dist',
  server: { androidScheme: 'https' }
};
export default config;