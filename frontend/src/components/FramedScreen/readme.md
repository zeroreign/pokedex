# Framed Screen

## Known Issues
### Tests
* Test is firing it's own error event instead of relying on fetch for 404 error. This is because of the Test Framework limitation and may change in the futur if a problem occures.
* Props implementation and styles are couples to tests this is ok at this point in time.