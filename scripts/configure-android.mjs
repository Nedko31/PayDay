import fs from 'node:fs';
import path from 'node:path';

const appId = 'ca-app-pub-7326151414179206~5828675543';
const manifestPath = path.resolve('android/app/src/main/AndroidManifest.xml');
const stringsPath = path.resolve('android/app/src/main/res/values/strings.xml');
if (!fs.existsSync(manifestPath)) {
  console.error('Android project not found. Run: npm run android:add');
  process.exit(1);
}
let manifest = fs.readFileSync(manifestPath, 'utf8');
if (!manifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
  manifest = manifest.replace(/<application([^>]*)>/, `<application$1>\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id" />`);
}
fs.writeFileSync(manifestPath, manifest);
fs.mkdirSync(path.dirname(stringsPath), { recursive: true });
let strings = fs.existsSync(stringsPath) ? fs.readFileSync(stringsPath, 'utf8') : '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n</resources>\n';
if (!strings.includes('name="admob_app_id"')) {
  strings = strings.replace('</resources>', `    <string name="admob_app_id">${appId}</string>\n</resources>`);
}
fs.writeFileSync(stringsPath, strings);
console.log('AdMob App ID configured in AndroidManifest.xml and strings.xml');
