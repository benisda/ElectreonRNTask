# Important notes :
1. the API you provided sometimes returns the wrong letter, for example, the letter `J` is recognized as `Ј` (Cyrillic) and the letter `o` is recognized as `о` (Cyrillic) and so on.
So sometimes the result is not accurate and the user get a failure message even if the letter is correct.
You can test this by using the following code in a console (Chrome > F12 for example) :
```javascript
console.log("ASCII of a real J letter:",'J'.charCodeAt()) // 74
console.log("ASCII of the letter recognized by the API:",'Ј'.charCodeAt()) // 1032 (Cyrillic)
```

```javascript
console.log("ASCII of a real o letter:",'o'.charCodeAt()) // 74
console.log("ASCII of the letter recognized by the API:",'о'.charCodeAt()) // 1032 (Cyrillic)
```

2. You asked to store the API key securely in the application but there is no way to store the API key securely in a React Native application, because the JavaScript code is not secure and can be easily decompiled and read by anyone.
[Please take a look at this (in second paragraph)](https://reactnative.dev/docs/security#storing-sensitive-info)

Here I see 2 solutions :
**a**. Use a server to make the requests to the API and then send the data to the client. You can then control and check the requests.
**b**. Use a service like Firebase App Check, which can be used to verify that the requests are coming from your app and not from a malicious source.

## How to run the project

1. Clone the repository
```bash
git clone https://github.com/benisda/ElectreonRNTask.git
```

2. Install the dependencies
```bash
cd ElectreonRNTask && npm install
```

3. Run the project

for iOS :
```bash
npm run ios
```
> **_NOTE:_**  You can also run the project on your device using Expo Go app, just scan the QR code that appears in the terminal after running the project.

for Android :
```bash
npm run android
```
> **_NOTE:_**  You can also run the project on your device using Expo Go app, just scan the QR code that appears in the terminal after running the project.
