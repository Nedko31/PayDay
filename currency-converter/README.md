# Global Currency Converter

Standalone Capacitor Android project. This is a separate folder and does not modify or remove the converter inside PayDay.

## Included
- Fiat currency reference rates from Frankfurter API
- Major crypto prices from CoinGecko API
- Fiat-to-fiat, crypto-to-crypto and fiat-to-crypto conversion using USD as the common reference
- Bottom AdMob banner integration with a hide control
- Separate Android application ID: `com.studioprodigy.currencyconverter`

## Before release: AdMob
Create a **new app** and a **new banner ad unit** in AdMob. Do not reuse the PayDay app ID or PayDay banner unit. Set:
- `ADMOB_APP_ID` in `scripts/configure-android.mjs` (or environment variable)
- `ADMOB_APP_ID` and `ADMOB_BANNER_ID` in `src/main.js`

The current values are deliberate placeholders. The banner is configured in test mode (`isTesting: true`) until the new AdMob units are approved and configured. Never click live ads during testing.

## Build
```bash
npm install
npx cap add android
npm run android:sync
cd android
./gradlew assembleDebug
```

Rates are indicative only. Fiat rates and crypto market prices come from separate providers and may have different update times and availability.
