'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './search-form.module.css'

interface SearchFormProps {
  query: string
  onChange: (value: string) => void
  onSearch: () => void
  disabled?: boolean
}

export default function SearchForm({
  query,
  onChange,
  onSearch,
  disabled = false,
}: SearchFormProps) {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  const debounce = useCallback((value: string) => {
    const timer = setTimeout(() => {
      setDebouncedQuery(value)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const cleanup = debounce(query)
    return cleanup
  }, [query, debounce])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      onSearch()
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter GitHub login..."
          className={styles.input}
          disabled={disabled}
        />
      </div>
      <button
        onClick={onSearch}
        disabled={disabled || !query.trim()}
        className={styles.button}
      >
        {disabled ? 'Searching...' : 'Search'}
      </button>
    </div>
  )
}
