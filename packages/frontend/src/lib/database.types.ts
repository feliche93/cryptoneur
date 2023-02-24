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
      followers: {
        Row: {
          created_at: string | null
          id: number
          is_following: boolean
          is_sent: boolean
          provider_id: number | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_following?: boolean
          is_sent?: boolean
          provider_id?: number | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_following?: boolean
          is_sent?: boolean
          provider_id?: number | null
          username?: string
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
      grant_project_payments: {
        Row: {
          amount_paid_fiat: number
          amount_paid_value: number
          created_at: string | null
          grant_id: number
          id: number
          project_id: number
          transaction_reference: string
        }
        Insert: {
          amount_paid_fiat: number
          amount_paid_value: number
          created_at?: string | null
          grant_id: number
          id?: number
          project_id: number
          transaction_reference: string
        }
        Update: {
          amount_paid_fiat?: number
          amount_paid_value?: number
          created_at?: string | null
          grant_id?: number
          id?: number
          project_id?: number
          transaction_reference?: string
        }
      }
      grant_projects: {
        Row: {
          amount_requested_curency: number | null
          amount_requested_value: number | null
          created_at: string | null
          end_date: string | null
          grant_id: number
          id: number
          last_updated_at: string | null
          project_id: number
          start_date: string | null
        }
        Insert: {
          amount_requested_curency?: number | null
          amount_requested_value?: number | null
          created_at?: string | null
          end_date?: string | null
          grant_id: number
          id?: number
          last_updated_at?: string | null
          project_id: number
          start_date?: string | null
        }
        Update: {
          amount_requested_curency?: number | null
          amount_requested_value?: number | null
          created_at?: string | null
          end_date?: string | null
          grant_id?: number
          id?: number
          last_updated_at?: string | null
          project_id?: number
          start_date?: string | null
        }
      }
      grant_rfps: {
        Row: {
          created_at: string | null
          grant_id: number | null
          id: number
          rfp_id: number | null
        }
        Insert: {
          created_at?: string | null
          grant_id?: number | null
          id?: number
          rfp_id?: number | null
        }
        Update: {
          created_at?: string | null
          grant_id?: number | null
          id?: number
          rfp_id?: number | null
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
          logo: string
          name: string
          slug: string
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
          logo: string
          name: string
          slug: string
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
          logo?: string
          name?: string
          slug?: string
          telegram?: string | null
          twitter?: string | null
          updated_at?: string
          url_application?: string
          url_info?: string | null
          website?: string | null
        }
      }
      nc_evolutions: {
        Row: {
          batch: number | null
          checksum: string | null
          created: string | null
          created_at: string | null
          description: string | null
          id: number
          status: number | null
          title: string
          titleDown: string | null
          updated_at: string | null
        }
        Insert: {
          batch?: number | null
          checksum?: string | null
          created?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          status?: number | null
          title: string
          titleDown?: string | null
          updated_at?: string | null
        }
        Update: {
          batch?: number | null
          checksum?: string | null
          created?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          status?: number | null
          title?: string
          titleDown?: string | null
          updated_at?: string | null
        }
      }
      posts: {
        Row: {
          author_id: string
          created_at: string | null
          id: string
          is_relevant: boolean | null
          media: string | null
          reply_id: number | null
          text: string
        }
        Insert: {
          author_id: string
          created_at?: string | null
          id: string
          is_relevant?: boolean | null
          media?: string | null
          reply_id?: number | null
          text: string
        }
        Update: {
          author_id?: string
          created_at?: string | null
          id?: string
          is_relevant?: boolean | null
          media?: string | null
          reply_id?: number | null
          text?: string
        }
      }
      project_use_cases: {
        Row: {
          created_at: string | null
          id: number
          project_id: number
          use_case_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          project_id: number
          use_case_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          project_id?: number
          use_case_id?: number
        }
      }
      projects: {
        Row: {
          created_at: string | null
          id: number
          last_updated_at: string | null
          logo: string | null
          name: string
          url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          last_updated_at?: string | null
          logo?: string | null
          name: string
          url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          last_updated_at?: string | null
          logo?: string | null
          name?: string
          url?: string | null
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
          is_active: boolean
          limit: number
          name: string | null
          provider_id: number
          query: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_active?: boolean
          limit: number
          name?: string | null
          provider_id: number
          query: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_active?: boolean
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
          is_generated: boolean | null
          reply: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_generated?: boolean | null
          reply: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_generated?: boolean | null
          reply?: string
        }
      }
      rfp_priorities: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
      }
      rfp_statuses: {
        Row: {
          created_at: string | null
          id: number
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          status?: string | null
        }
      }
      rfp_use_cases: {
        Row: {
          created_at: string | null
          id: number
          rfp_id: number
          use_case_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          rfp_id: number
          use_case_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          rfp_id?: number
          use_case_id?: number
        }
      }
      rfps: {
        Row: {
          created_at: string | null
          deadline_at: string | null
          description: string
          funding_maximum: number | null
          funding_maximum_currency: number | null
          funding_minimum: number | null
          funding_minimum_currency: number | null
          id: number
          name: string
          priority_id: number | null
          status_id: number | null
        }
        Insert: {
          created_at?: string | null
          deadline_at?: string | null
          description: string
          funding_maximum?: number | null
          funding_maximum_currency?: number | null
          funding_minimum?: number | null
          funding_minimum_currency?: number | null
          id?: number
          name: string
          priority_id?: number | null
          status_id?: number | null
        }
        Update: {
          created_at?: string | null
          deadline_at?: string | null
          description?: string
          funding_maximum?: number | null
          funding_maximum_currency?: number | null
          funding_minimum?: number | null
          funding_minimum_currency?: number | null
          id?: number
          name?: string
          priority_id?: number | null
          status_id?: number | null
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

