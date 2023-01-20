export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName: string
          query: string
          variables: Json
          extensions: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      authors: {
        Row: {
          created_at: string | null
          id: string
          is_following: boolean | null
          provider_id: number
          username: string
        }
        Insert: {
          created_at?: string | null
          id: string
          is_following?: boolean | null
          provider_id: number
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_following?: boolean | null
          provider_id?: number
          username?: string
        }
      }
      blockchains: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
      }
      fiats: {
        Row: {
          created_at: string | null
          id: number
          name: string
          sign: string
          symbol: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          sign: string
          symbol: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          sign?: string
          symbol?: string
        }
      }
      grant_blockchains: {
        Row: {
          blockchain_id: number
          created_at: string | null
          grant_id: number
          id: number
        }
        Insert: {
          blockchain_id: number
          created_at?: string | null
          grant_id: number
          id?: number
        }
        Update: {
          blockchain_id?: number
          created_at?: string | null
          grant_id?: number
          id?: number
        }
      }
      grant_categories: {
        Row: {
          category_id: number
          created_at: string | null
          grant_id: number
          id: number
        }
        Insert: {
          category_id: number
          created_at?: string | null
          grant_id: number
          id?: number
        }
        Update: {
          category_id?: number
          created_at?: string | null
          grant_id?: number
          id?: number
        }
      }
      grant_use_cases: {
        Row: {
          created_at: string | null
          grant_id: number
          id: number
          use_case_id: number
        }
        Insert: {
          created_at?: string | null
          grant_id: number
          id?: number
          use_case_id: number
        }
        Update: {
          created_at?: string | null
          grant_id?: number
          id?: number
          use_case_id?: number
        }
      }
      grants: {
        Row: {
          active: boolean
          content: string
          created_at: string
          description: string | null
          discord: string | null
          funding_maximum: number | null
          funding_maximum_currency: number | null
          funding_minimum: number | null
          funding_minimum_currency: number | null
          github: string | null
          id: number
          logo: string | null
          name: string
          slug: string | null
          telegram: string | null
          twitter: string | null
          updated_at: string
          url_application: string
          url_info: string | null
          website: string | null
        }
        Insert: {
          active: boolean
          content: string
          created_at?: string
          description?: string | null
          discord?: string | null
          funding_maximum?: number | null
          funding_maximum_currency?: number | null
          funding_minimum?: number | null
          funding_minimum_currency?: number | null
          github?: string | null
          id?: number
          logo?: string | null
          name: string
          slug?: string | null
          telegram?: string | null
          twitter?: string | null
          updated_at?: string
          url_application: string
          url_info?: string | null
          website?: string | null
        }
        Update: {
          active?: boolean
          content?: string
          created_at?: string
          description?: string | null
          discord?: string | null
          funding_maximum?: number | null
          funding_maximum_currency?: number | null
          funding_minimum?: number | null
          funding_minimum_currency?: number | null
          github?: string | null
          id?: number
          logo?: string | null
          name?: string
          slug?: string | null
          telegram?: string | null
          twitter?: string | null
          updated_at?: string
          url_application?: string
          url_info?: string | null
          website?: string | null
        }
      }
      posts: {
        Row: {
          author_id: string
          created_at: string | null
          id: string
          is_relevant: boolean | null
          reply_id: number | null
          text: string
        }
        Insert: {
          author_id: string
          created_at?: string | null
          id: string
          is_relevant?: boolean | null
          reply_id?: number | null
          text: string
        }
        Update: {
          author_id?: string
          created_at?: string | null
          id?: string
          is_relevant?: boolean | null
          reply_id?: number | null
          text?: string
        }
      }
      providers: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      queries: {
        Row: {
          created_at: string | null
          id: number
          limit: number
          name: string | null
          provider_id: number
          query: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          limit: number
          name?: string | null
          provider_id: number
          query: string
        }
        Update: {
          created_at?: string | null
          id?: number
          limit?: number
          name?: string | null
          provider_id?: number
          query?: string
        }
      }
      replies: {
        Row: {
          created_at: string | null
          id: number
          reply: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          reply: string
        }
        Update: {
          created_at?: string | null
          id?: number
          reply?: string
        }
      }
      use_cases: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: { name: string }
        Returns: string
      }
      filename: {
        Args: { name: string }
        Returns: string
      }
      foldername: {
        Args: { name: string }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: { size: number; bucket_id: string }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits: number
          levels: number
          offsets: number
          search: string
          sortcolumn: string
          sortorder: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

