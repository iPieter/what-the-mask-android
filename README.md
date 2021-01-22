<p align="center"> 
    <img src="res/what-the-mask-logo.png" alt="alternate text" width="60%">
 </p>

![Python](https://img.shields.io/badge/python-v3.7+-blue.svg)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)

# Future development and contributing

We focus on implementing an application that notifies users when they walk in (or out) a masked zone in Flanders.

For detailed targets, take a look at the project boards on this repo. Feel free to implement something and send a pull request!

Our technology stack is as follows:

- **Backend**: A simple Django server to serve and edit geosjon files.
- **Frontend**: React.js served with nginx, where we can edit geosjon files and also serves as a landing page.
- **Mobile app**: React Native

## Some links to useful resources

**React**

- [React Navigation](https://reactnavigation.org/docs/hello-react-navigation)
- **Location and mapping**

- [React native maps](https://github.com/react-native-maps/react-native-maps) ([installation](https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md))

## Some useful code snippets

Serve a test geojson file at `http://localhost:8080/test_ghent.geojson`, provided that your python interpreter is python2.

```bash
python -m SimpleHTTPServer 8080
```

## Credits for in legal notice

- point in polygon: https://github.com/substack/point-in-polygon/blob/master/LICENSE
