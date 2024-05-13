# final
LOG PAGE

Description
The log page is designed to fetch information about bird observations based on 
geographical coordinates. It utilizes the eBird API to retrieve recent bird 
sightings in a given area, gets additional information about the bird species 
using the API, and uses additional APIs to fetch bird images and sounds. 

Features
Fetch the users location.
Fetch the most common birds observed in that area.
Retrieve species information such as their common name.
Fetch bird images based on the common name.
Fetch bird calls based on the common name. 

How to run 
Currently, I run this by using a node server with the command
node app.js

Testing
To test the BirdObservation model, run 
mocha BirdObservation.test.js

