'use client'

import { useState } from 'react'
import { useGitHubSearch } from '@/hooks/useGitHubSearch'
import SearchForm from '@/components/search-form'
import UserCard from '@/components/user-card'
import LoadingSpinner from '@/components/loading-spinner'
import ErrorMessage from '@/components/error-message'
import styles from './page.module.css'

export default function Home() {
  const [query, setQuery] = useState('')
  const { users, loading, error, search } = useGitHubSearch()

  const handleSearch = async () => {
    if (query.trim()) {
      await search(query)
    }
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>GitHub User Search</h1>
        <p className={styles.subtitle}>Find GitHub users and explore their profiles</p>
      </div>

      <SearchForm 
        query={query}
        onChange={handleInputChange}
        onSearch={handleSearch}
        disabled={loading}
      />

      <div className={styles.content}>
        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && users.length === 0 && query && (
          <div className={styles.emptyState}>
            <p>No users found for "{query}"</p>
          </div>
        )}

        {!loading && !error && users.length === 0 && !query && (
          <div className={styles.emptyState}>
            <p>Enter a GitHub login to search</p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className={styles.results}>
            <p className={styles.resultCount}>Found {users.length} user(s)</p>
            <div className={styles.grid}>
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
