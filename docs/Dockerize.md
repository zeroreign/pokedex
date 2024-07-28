# Dockerize Pokedex

## Key goals
[] Front-end can run in docker for NextJs
[] Back-end can run in docker for NestJs
[] Build Docker image for Front-end
[] Build Docker image for Back-end
[] Docker compose file for app
[] Local development entire app
[] Local Development Front-end running a image of the back-end
[] VS code Dev containers can attach to running container and execute tests
[] Jest can run without nodeJs installed

## Thoughts
By dockerizing this code base theoretically anyone can clone and start the project in seconds without installing any external dependencies.

The app as a whole should be expected to run on docker containers using docker compose file.

Local development is slightly different. Developers will need to be able to debug their application and  also run tests. As code changes are made hot reload to apply any compiled changes and support the NODE_ENVITONMENT.
The `front-end` and the `back-end` should be agnostic to each other despite being coupled. This means it doesn't need to know how each other is running as a container or being rebuilt and only connect via http ports.

Builds on the other hand are expected to be able to build both front-end and the back-end. However for GitWorkflows to properly work. The following scenarios are required for small release changes.
* File changes in the front-end should only rebuild the front-end image.
* File changes in the back-end should only rebuild the back-end image.
* In the case of when both front-end and back-end code chages are required both images are to be built.
* Adtionally tagging the image version should be taken into consideration.
  * Since only the fron-end really has the dependency at this point in time. It should be able to handle the version of the back-end it requires.
  * The test should be the indicator when the overall stack is healthy.
  * The back-end latest image may possible to re-tag the version to ensure this similarly to how contract testing works.