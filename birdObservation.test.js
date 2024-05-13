const assert = require('assert');
const BirdObservation = require('./birdObservationModel');


describe('BirdObservation', () => {
    describe('#fetchMostCommonBirds', () => {
        it('return an array of 10 common bird names', async function() {
            this.timeout(10000);

            const latitude = 40.7128;
            const longitude = -74.0060;

            const birdObservation = new BirdObservation(latitude, longitude);
            const commonBirds = await birdObservation.fetchMostCommonBirds();

            assert(Array.isArray(commonBirds), 'is an array');
            assert.strictEqual(commonBirds.length, 10, 'length of array is 10');
            commonBirds.forEach(commonBird => {
                assert.strictEqual(typeof commonBird, 'string', 'the name is a string');
            });
        });
    });

    describe('#fetchSpeciesInfo', () => {
        it('return species info and common name', async function() {
            const latitude = 40.7128;
            const longitude = -74.0060;

            const birdObservation = new BirdObservation(latitude, longitude);
            
            //check for House Sparrow, species name housepa
            const speciesInfo = await birdObservation.fetchSpeciesInfo('houspa');
            assert.strictEqual(speciesInfo.hasOwnProperty('species'), true, 'contains "species" property');
            assert.strictEqual(speciesInfo.hasOwnProperty('comName'), true, 'contains "comName" property');
        });
    });

    describe('#fetchBirdImage', () => {
        it('return image URL for a common bird name', async function() {
            const latitude = 40.7128;
            const longitude = -74.0060;
            const birdObservation = new BirdObservation(latitude, longitude);
            //check for house sparrow again
            const imageUrl = await birdObservation.fetchBirdImage('House Sparrow');
            assert.strictEqual(typeof imageUrl, 'string', 'Image URL should be a string');
            assert.strictEqual(imageUrl.startsWith('https://'), true, 'Image URL should start with "https://"');
        });
    });

    describe('#fetchBirdCall', () => {
        
        it('should return a bird call recording URL for a given bird name', async function() {
            this.timeout(10000);

            const latitude = 40.7128;
            const longitude = -74.0060;
            const birdObservation = new BirdObservation(latitude, longitude);
            
            const callUrl = await birdObservation.fetchBirdCall('House Sparrow');

            assert.strictEqual(typeof callUrl, 'string', 'Recording URL should be a string');
            assert.strictEqual(callUrl.startsWith('https://'), true, 'Recording URL should start with "https://"');
        });
    });
});
