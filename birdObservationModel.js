const fetch = require('node-fetch');

class BirdObservation {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    async fetchMostCommonBirds() {
        try {
            const url = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${this.latitude}&lng=${this.longitude}&maxResults=100`;

            const response = await fetch(url, {
                headers: {
                    'X-eBirdApiToken': 'hkffk564p46f'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const speciesCount = {};
            data.forEach(observation => {
                const species = observation.speciesCode;
                speciesCount[species] = (speciesCount[species] || 0) + 1;
            });
            const sortedSpecies = Object.keys(speciesCount).sort((a, b) => speciesCount[b] - speciesCount[a]);

            const top5Species = sortedSpecies.slice(0, 10);

            const commonNames = await Promise.all(top5Species.map(async species => {
                const speciesInfo = await this.fetchSpeciesInfo(species);
                return speciesInfo.comName;
            }));

            return commonNames;
        } catch (error) {
            console.error('Error fetching most common birds:', error.message);
            throw error;
        }
    }

    async fetchSpeciesInfo(speciesCode) {
        try {
            const url = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&locale=en_US&species=${speciesCode}`;

            const response = await fetch(url, {
                headers: {
                    'X-eBirdApiToken': 'hkffk564p46f'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data[0];
        } catch (error) {
            console.error('Error fetching species info:', error.message);
            throw error;
        }
    }

    async fetchBirdImage(commonName) {
        try {
            const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0a78ea08b8e8c9fc68ea252eea8f713e&text=${encodeURIComponent(commonName)}&per_page=1&format=json&nojsoncallback=1`;

            const response = await fetch(flickrUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch image from Flickr API');
            }

            const data = await response.json();
            const photo = data.photos.photo[0];

            const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

            return imageUrl;
        } catch (error) {
            console.error('Error fetching bird image:', error.message);
            throw error;
        }
    }

    async fetchBirdCall(commonName) {
        try {
            const query = encodeURIComponent(commonName);
            const url = `https://xeno-canto.org/api/2/recordings?query=${query}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.numRecordings > 0) {
                const recording = data.recordings[0]; 
                return recording.file;
            } else {
                throw new Error(`No recordings found for ${commonName}`);
            }
        } catch (error) {
            console.error('Error fetching bird call:', error.message);
            throw error;
        }
    }
}

module.exports = BirdObservation;
