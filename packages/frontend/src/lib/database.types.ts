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
      blockchains: {
        Row: {
          blockchain: string | null
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          blockchain?: string | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          blockchain?: string | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          category: string
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: number
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
          grant: string
          id: number
          logo: string | null
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
          grant: string
          id?: number
          logo?: string | null
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
          grant?: string
          id?: number
          logo?: string | null
          slug?: string | null
          telegram?: string | null
          twitter?: string | null
          updated_at?: string
          url_application?: string
          url_info?: string | null
          website?: string | null
        }
      }
      use_cases: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
          use_case: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
          use_case: string
        }
        Update: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
          use_case?: string
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

