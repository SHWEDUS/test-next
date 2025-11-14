import { useState, useCallback } from 'react'
import type { GitHubUser } from '@/types/github'

interface UseGitHubSearchReturn {
  users: GitHubUser[]
  loading: boolean
  error: string | null
  search: (query: string) => Promise<void>
}

export function useGitHubSearch(): UseGitHubSearchReturn {
  const [users, setUsers] = useState<GitHubUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setUsers([])
      setError(null)
      return
    }

    try {
      setLoading(true)
      setError(null)
      setUsers([])

      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=30`
      )

      if (!response.ok) {
        if (response.status === 422) {
          setError('Invalid search query')
        } else if (response.status === 403) {
          setError('Rate limit exceeded. Please try again later.')
        } else {
          setError('Failed to fetch users')
        }
        return
      }

      const data = await response.json()
      setUsers(data.items || [])

      if ((data.items || []).length === 0) {
        setError(null)
      }
    } catch (err) {
      setError('An error occurred while searching')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { users, loading, error, search }
}
