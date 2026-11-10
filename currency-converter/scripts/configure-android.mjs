import fs from 'node:fs';
import path from 'node:path';

// Replace this with the NEW app-specific AdMob ID before release.
const appId = process.env.ADMOB_APP_ID || 'ca-app-pub-3940256099942544~3347511713';
const manifestPath = path.resolve('android/app/src/main/AndroidManifest.xml');
const stringsPath = path.resolve('android/app/src/main/res/values/strings.xml');

if (!fs.existsSync(manifestPath)) {
  console.error('Android project not found. Run: npx cap add android');
  process.exit(1);
}

let manifest = fs.readFileSync(manifestPath, 'utf8');
if (!manifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
  manifest = manifest.replace(
    /<application([^>]*)>/,
    '<application$1>\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id" />'
  );
}
fs.writeFileSync(manifestPath, manifest);

fs.mkdirSync(path.dirname(stringsPath), { recursive: true });
let strings = fs.existsSync(stringsPath)
  ? fs.readFileSync(stringsPath, 'utf8')
  : '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n</resources>\n';

strings = strings.replace(/<string name="admob_app_id">.*?<\/string>/s, '');
strings = strings.replace(
  '</resources>',
  `    <string name="admob_app_id">${appId}</string>\n</resources>`
);
fs.writeFileSync(stringsPath, strings);
console.log('AdMob app ID configured. Use a dedicated app ID for this app.');
