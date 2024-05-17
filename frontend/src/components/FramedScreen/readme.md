# Framed Screen

## Known Issues
## Node Dependencies
### Next/Image NextJS v14.2.3 for React v18
Solution is to use latest next with React and react-dom v 18.2.0. See @[GitHub Issue](https://github.com/vercel/next.js/issues/65161) Fix current on next@canary v14

### Tests
* Test is firing it's own error event instead of relying on fetch for 404 error. This is because of the Test Framework limitation and may change in the future if a problem occures and relies on next@canary because of a react upgrade **Disabled for now**
* Props implementation and styles are couples to tests this is ok at this point in time.