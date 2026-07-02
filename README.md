# File Metadata Microservice

This is a solution to the freeCodeCamp File Metadata Microservice project.

## Features

- Upload a file using the form
- Receive file metadata as JSON
- Returns original file `name`, MIME `type`, and `size`

## Endpoint

- `POST /api/fileanalyse`

## Example Response

```json
{
  "name": "example.png",
  "type": "image/png",
  "size": 12345
}
```
