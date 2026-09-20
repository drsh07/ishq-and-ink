# Ishq & Ink
Love, Forever Inked

## Status
**Version 0.9** - Core functionality works. Known visual bugs, such as with profile icon drop-down. Not suited for web and iOS. Error Handling still in progress.

## About
Ishq & Ink is a place where two people are forever linked and send long, heartfelt letters to each other. Once you send a letter, you cannot read, edit, or delete it, just like real mail.

## Why
In today's society, I feel as if we sometimes do not take the time to appreciate our loved ones. As texting and social media have been the norm for communication for convenience and modifiability, quick and short messages dominate. 

While long, heartfelt messages do get sent, they almost always get lost in the history of conversations in any messaging app and end up fading away, never to be seen again.

Ishq & Ink aims to solve this. It is designed to be a place for you to express your heartfelt emotions towards your significant other, and they can view all your letters in an organized fashion. Once you send a letter, you cannot view, edit, delete it, but your partner can view it, just like real letters.

About the name, **Ishq** means "*love*" in Hindi, and **Ink** represents the permanence of the *letters* and *linkage* between two people.

## Built With:
- React Native / Expo
- Firebase (Auth, Firestore)
- AsyncStorage (for persistence)

## Installation
- For **Android**
  - Go to 'Releases' and download the APK from there to run the release version
- To set up the project on your machine: 
  1. Download [Node.js LTS](https://nodejs.org/en/) (if you haven't already)
  2. Clone the repo
  ```bash
    git clone https://github.com/drsh07/ishq-and-ink.git
    cd ishq-and-ink
  ```
  3. Install dependencies
    ```bash
      npm install
    ```
  4. Start the development server
    ```bash
      npx expo start
    ``` 
  5. Follow the instructions in the terminal. Note that the app is **only tested on Android**. Full functionality cannot be guaranteed on iOS and web. 

## Usage
- To fully experience the app, you will have to pair with another person.
- If you're new, create an account. You will then be redirected to the pairing process where you link your account to your special someone. Follow the steps and scan your partner's QR code (or have them scan yours). Once complete, you will be sent to the main screen.
- To write a letter, just simply start writing in the text box. There is a toolbar with a **Tab** button to indent, a **Clear** button to delete your whole letter, a word counter, and a **Send** button to send your letter once you are done.
- There is a second screen where you can view letters sent to you called the **Inbox**. The letters will be labeled with the date and time that they have been sent, and will be organized by newest first.
- You can edit your name, check out the about screen, or log out by pressing the profile icon at the top right of the screen.

## Known Issues
- The dropdown for the profile icon is custom-built. It does not work like a traditional dropdown though. I will polish it soon.
- The app might not display correctly on all screen sizes.
- No error handling in case letter does not send

## Planned Features
- Push notifications on letter arrival
- Sorting received letters by other means
- Drafts feature, so user can continue writing their letters later

## License
[MIT](LICENSE)