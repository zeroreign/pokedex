#!/bin/bash

# Define the source and destination directories
REPO_PATH=$(git rev-parse --show-toplevel)
SOURCE_PATH="${REPO_PATH}/backend/src/graphql.schema.types.ts"
FONTEND_COMPONENT_PATH="${REPO_PATH}/frontend/src/components/PokemonAPIProvider/pokemon-api.types.ts"

echo "Begin copying graphql schema types to frontend component PokemonAPIProvider..."

echo "Source path for graphql schema generated types file: $SOURCE_PATH"
if [ ! -f $SOURCE_PATH ]; then
  echo "Error: Source file not found!"
  echo "Please check the generated types file location is $SOURCE_PATH"
  echo "OR"
  echo "Please generate the types file first by running 'npm run generate:types' in the backend directory."
  exit 1
else 
  echo "Source file found continuing..."
fi

echo "Destination path for frontend component PokemonAPIProvider: $FONTEND_COMPONENT_PATH"
if [ -f $FONTEND_COMPONENT_PATH ] ; then
  echo "Found existing types file in front end components checking diff..." 
  if cmp -s "$SOURCE_PATH" "$FONTEND_COMPONENT_PATH"; then
    echo "Files '$SOURCE_PATH' and '$FONTEND_COMPONENT_PATH' match" 
    echo "Skipping copy operation and exit..."
    exit 0;
  else
    echo "Types file found in frontend components but it is different from the source file."
    echo "Continuing with the copy operation overriding destination file $FONTEND_COMPONENT_PATH..."
  fi
fi

echo "Copying file..."
cp "$SOURCE_PATH" "$FONTEND_COMPONENT_PATH"

if [ -f $FONTEND_COMPONENT_PATH ] ; then
  if cmp -s "$SOURCE_PATH" "$FONTEND_COMPONENT_PATH"; then
    echo "Files '$SOURCE_PATH' and '$FONTEND_COMPONENT_PATH' match"
    echo "Types copied successfully to frontend components!"
    exit 0;
  else
  echo "Error: Failed to copy to frontend components!"
  exit 1
  fi
else
  echo "Error: Failed to copy to frontend components!"
  exit 1
fi