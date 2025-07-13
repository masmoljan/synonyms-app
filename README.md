# WordWave

A fast, in-memory synonyms search app with group merging and transitive relationships.

## Features

- Add words with synonyms
- Bidirectional synonym lookup
- Automatic group merging (transitive relationships)
- Case-insensitive search
- OpenAPI validation

## Tech Stack

- **Node.js**
- **TypeScript**
- **Koa.js**

## Prerequisites
⚠️ **Important**: Set your environment variables before starting the server

Example:
```bash
NODE_ENV=development
PORT=8082
```

Package version requirements:
- Node.js v. ```>=22.9.0```


## Installation

### Server
```bash
npm run install:server
npm run build:server
npm run dev:server
```

## API Endpoints

### Add Synonyms

```
POST /synonyms
{
  "word": "big",
  "synonyms": ["large", "huge"]
}
```

### Search Synonyms

```
GET /synonyms/search?word=big
```

### Health Check

```
GET /synonyms/health
```

## Key Features

**Group Merging**: Connecting existing synonym groups automatically merges them

```
Group A: {big, large}
Group B: {small, tiny}
Add: big → small
Result: {big, large, small, tiny}
```

**Transitive Relationships**: If A→B and B→C, then A→C automatically

```
Add: wash → clean
Add: clean → spotless
Result: wash, clean, spotless are all synonyms
```

## Example Usage

```javascript
// Add synonyms
POST /synonyms { "word": "happy", "synonyms": ["joyful", "glad"] }

// Search
GET /synonyms/search?word=happy
// Returns: ["joyful", "glad"]

// Bidirectional lookup works
GET /synonyms/search?word=joyful
// Returns: ["happy", "glad"]
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

Current test coverage: Core business logic, group merging, transitive relationships
