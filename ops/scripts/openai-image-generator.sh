#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <OpenAI_API_Key> <Prompt>"
    exit 1
fi

OPENAI_API_KEY=$1
prompt=$2
size="1024x1024"

generate_image() {
    local filename=$(echo $prompt | tr ' ' '_')
    local folder_path="$(pwd)/public/images"
    local url="https://api.openai.com/v1/images/generations"

    local response=$(curl -s -X POST $url \
        -H "Authorization: Bearer $OPENAI_API_KEY" \
        -H "Content-Type: application/json" \
        --data "{\"model\":\"dall-e-2\",\"prompt\":\"A surreal image of $prompt\",\"n\":1,\"quality\":\"standard\",\"size\":\"$size\"}")

    if [ $? -ne 0 ]; then
        echo "Error: Failed to make request to OpenAI API."
        exit 1
    fi

    echo "API Response: $response"

    local image_url=$(echo $response | jq -r '.data[0].url')

    if [ -z "$image_url" ] || [ "$image_url" = "null" ]; then
        echo "No valid image URL received."
        exit 1
    fi

    curl -v $image_url -o "${folder_path}/${filename}.png"
    if [ $? -ne 0 ]; then
        echo "Error: Failed to download and save image."
        exit 1
    fi

    echo "Downloading image from URL: $image_url"
    echo "Image saved to ${folder_path}/${filename}.png"
}

generate_image
