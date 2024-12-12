import os
import requests
import json

# OMDb API configuration
API_KEY = "c3ca3872"  # Replace with your OMDb API key
BASE_URL = "http://www.omdbapi.com/"

# Load the original JSON file
file_path = "movielist.json"
with open(file_path, "r") as file:
    data = json.load(file)

# Create a directory for storing images
output_dir = "images"
os.makedirs(output_dir, exist_ok=True)

# Iterate over movies, fetch real poster URLs, and download posters
for movie in data["movies"]:
    try:
        # Query OMDb API for movie details
        params = {"t": movie["title"], "y": movie["year"], "apikey": API_KEY}
        response = requests.get(BASE_URL, params=params)
        if response.status_code == 200:
            movie_data = response.json()
            if "Poster" in movie_data and movie_data["Poster"] != "N/A":
                original_url = movie_data["Poster"]
                sanitized_title = movie["title"].lower().replace(" ", "_").replace(":", "").replace("-", "_")
                local_filename = os.path.join(output_dir, f"{sanitized_title}.jpg")

                # Download the poster
                poster_response = requests.get(original_url, stream=True)
                if poster_response.status_code == 200:
                    with open(local_filename, "wb") as img_file:
                        for chunk in poster_response.iter_content(1024):
                            img_file.write(chunk)
                    print(f"Downloaded: {movie['title']} -> {local_filename}")
                else:
                    print(f"Failed to download {movie['title']} poster: HTTP {poster_response.status_code}")
            else:
                print(f"Poster not found for {movie['title']}")
        else:
            print(f"Failed to fetch data for {movie['title']}: HTTP {response.status_code}")
    except Exception as e:
        print(f"Error processing {movie['title']}: {e}")

print("Download complete.")
