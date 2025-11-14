# GitHub User Search

A modern Next.js application for searching and exploring GitHub user profiles with real-time search capabilities and detailed user information.

## Features

- **User Search**: Search GitHub users by login with instant results
- **Real-time Results**: Debounced search with 500ms delay for optimal performance
- **User Profiles**: Detailed view of individual GitHub user information
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling**: Comprehensive error handling for rate limits and API issues
- **Loading States**: Smooth loading animations during API requests

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Static typing for better code quality
- **React Hooks** - Modern state management (useState, useEffect, useCallback)
- **CSS Modules** - Scoped styling with CSS modules
- **GitHub API** - Public GitHub API for user data (no authentication required)

## Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Install

```bash
# Install dependencies
npm install
# or
yarn install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

### Searching for Users

1. Navigate to the home page
2. Enter a GitHub username or search term in the search field
3. Click "Find" button or wait for the debounced search (500ms)
4. Browse the results

### Viewing User Profile

1. Click on any user card from the search results
2. View detailed information including:
   - Avatar and username
   - Bio and location
   - Company and website
   - Social links (Twitter, GitHub)
   - Repository count and followers/following
   - Account creation date

3. Click "Back to Search" to return to the search page

## Key Components

### useGitHubSearch Hook

Custom React hook that handles:
- API requests to GitHub's search endpoint
- Debounced search logic
- Error handling (rate limits, invalid queries)
- Loading states
- Result caching

```typescript
const { users, loading, error, search } = useGitHubSearch()
await search('shwedus')
```

### SearchForm Component

Handles user input with:
- Text input field
- Search button
- Disabled state during loading
- Query validation

### UserCard Component

Displays each user as a card with:
- Avatar image
- Username as clickable link to profile
- GitHub profile link

### User Profile Page

Shows comprehensive user information:
- Avatar and name
- Bio and company
- Location and email
- Website and Twitter links
- Repository statistics
- Followers and following counts
- Account metadata

## API Integration

The application uses the public GitHub API:

```
GET https://api.github.com/search/users?q={query}&per_page=30
GET https://api.github.com/users/{username}
```



