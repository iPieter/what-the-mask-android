<p align="center">
    <img src="res/what-the-mask-logo.png" alt="alternate text" width="60%">
 </p>



## What the mask · iOS Application
_if you're looking for the Android version, you can find it [here »](https://github.com/iPieter/what-the-mask-ios)_

![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)

Where in Flanders is a face mask obligatory? This app warns you when you enter or leave a face mask zone.

Be safe, wear your mask!

## Short description

Where should you where a face mask? Which regulations apply in which regions?
'What the mask' gives a clear overview of the current regulations in Flanders.
When you enter a face mask zone, the app notifies you.

## Future development and contributing

For detailed targets, take a look at the project boards on this repo. Feel free to implement something and send a pull request!

Our technology stack is as follows:

- **Backend**: A simple Django server to serve and edit geosjon files.
- **Frontend**: React.js served with nginx, where we can edit geosjon files and also serves as a landing page.
- **Mobile app**: React Native

## Getting started

First make sure you have installed
- [XCode](https://developer.apple.com/xcode/)
- [Node](https://www.npmjs.com/)
- [Cocoapods](https://cocoapods.org/)

To get up and running quickly, use the following commands:
```
npm install
cd ios
pod install
```

To simulate the application on an iOS device, run in two separate terminals
```
npx react-native start
npx react-native run-ios
```
To run on a connected device, e.g. Max's iPhone: 
```
npx react-native start
npx react-native run-ios --device "Max's iPhone"
```

## Troubleshooting

- Multiple declarations of .ttf file  
  https://stackoverflow.com/questions/50718018/xcode-10-error-multiple-commands-produce

## Some links to useful resources

**React**

- [React Navigation](https://reactnavigation.org/docs/hello-react-navigation)
- **Location and mapping**

- [React native maps](https://github.com/react-native-maps/react-native-maps) ([installation](https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md))

<!-- ## Some useful code snippets

Serve a test geojson file at `http://localhost:8080/test_ghent.geojson`, provided that your python interpreter is python2.

```bash
python -m SimpleHTTPServer 8080
```

## Credits for in legal notice

- point in polygon: https://github.com/substack/point-in-polygon/blob/master/LICENSE -->
