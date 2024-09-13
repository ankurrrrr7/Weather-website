require('dotenv').config();

// Ensure client ID and secret are defined
const clientid = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientid || !clientSecret) {
    throw new Error("Spotify Client ID or Client Secret is missing. Check your .env file.");
}

// Encode credentials
const credentials = btoa(`${clientid}:${clientSecret}`);

// Function to get Spotify access token
const getToken = async () => {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });

        if (!response.ok) {
            throw new Error(`Error fetching token: ${response.statusText}`);
        }

        const data = await response.json();
        return data.access_token; // Return the access token
    } catch (error) {
        console.error('Error fetching token:', error);
    }
};

// Example usage
getToken().then(token => {
    console.log('Spotify Access Token:', token);
});
