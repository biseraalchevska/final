const LocationModel = require('./locationModel');
const BirdObservationModel = require('./birdObservationModel');
const HTMLView = require('./htmlView');

async function handleRequest(req, res, counters) { 
    res.writeHead(200, { 'Content-Type': 'text/html' });

    try {
        const location = await LocationModel.getUserLocation();

        if (location) {
            const cityCountry = getCityCountryFromAddress(location.reverseGeocodedAddress);
            const { city, country } = cityCountry;

            res.write(HTMLView.renderWelcomeMessage());
            res.write(HTMLView.renderLocation(city, country));

            const birdObservation = new BirdObservationModel(location.lat, location.lng);
            try {
                const commonNames = await birdObservation.fetchMostCommonBirds();

                const commonNamesAndDetails = await Promise.all(commonNames.map(async commonName => {
                    const imageUrl = await birdObservation.fetchBirdImage(commonName);
                    const birdCallUrl = await birdObservation.fetchBirdCall(commonName);
                    return { commonName, imageUrl, birdCallUrl };
                }));

                res.write(HTMLView.renderBirdObservations(commonNamesAndDetails));

                res.write(HTMLView.renderCommentForm(counters)); 
            } catch (error) {
                console.error('Error fetching bird observations with images and sounds:', error.message);
            }
        } else {
            res.write("<br>Unable to fetch user's location");
        }
    } catch (error) {
        console.error('Error fetching user location:', error.message);
    }

    res.end();
}

function getCityCountryFromAddress(address) {
    const cityCountry = {};
    const addressComponents = address.split(',');
    cityCountry.city = addressComponents[1].trim();
    cityCountry.country = addressComponents[addressComponents.length - 1].trim();
    return cityCountry;
}

module.exports = handleRequest;
