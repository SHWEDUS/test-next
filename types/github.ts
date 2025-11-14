export interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  html_url: string
  type: string
  score: number
}

export interface GitHubUserDetails extends GitHubUser {
  name: string | null
  bio: string | null
  company: string | null
  location: string | null
  email: string | null
  blog: string
  twitter_username: string | null
  followers: number
  following: number
  public_repos: number
  public_gists: number
}
