export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      company: {
        Row: {
          address: string
          bank_account: string | null
          bank_name: string | null
          company_name: string
          nip: string | null
          tel_number: number | null
        }
        Insert: {
          address: string
          bank_account?: string | null
          bank_name?: string | null
          company_name: string
          nip?: string | null
          tel_number?: number | null
        }
        Update: {
          address?: string
          bank_account?: string | null
          bank_name?: string | null
          company_name?: string
          nip?: string | null
          tel_number?: number | null
        }
        Relationships: []
      }
      hours: {
        Row: {
          endTime: string | null
          id: number
          startTime: string | null
          title: string
          userId: string
        }
        Insert: {
          endTime?: string | null
          id?: number
          startTime?: string | null
          title: string
          userId: string
        }
        Update: {
          endTime?: string | null
          id?: number
          startTime?: string | null
          title?: string
          userId?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: Json | null
          created_at: string
          id: number
          title: string | null
          user_id: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: number
          title?: string | null
          user_id?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: number
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      recruitment: {
        Row: {
          application_date: string | null
          email: string | null
          file_path: string | null
          full_name: string | null
          id: number
          manager_id: string | null
          position: string | null
          status: string
        }
        Insert: {
          application_date?: string | null
          email?: string | null
          file_path?: string | null
          full_name?: string | null
          id?: number
          manager_id?: string | null
          position?: string | null
          status: string
        }
        Update: {
          application_date?: string | null
          email?: string | null
          file_path?: string | null
          full_name?: string | null
          id?: number
          manager_id?: string | null
          position?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "recruitment_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subordinates: {
        Row: {
          contract: string | null
          email: string | null
          full_name: string | null
          id: string
          manager_id: string | null
          position: string | null
          role: string | null
        }
        Insert: {
          contract?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          manager_id?: string | null
          position?: string | null
          role?: string | null
        }
        Update: {
          contract?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          manager_id?: string | null
          position?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subordinates_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          assigned_manager: string | null
          assigned_worker: string | null
          assignment_date: string | null
          expiry_date: string | null
          id: number
          manager_name: string | null
          task_description: string | null
          task_name: string
          task_status: string | null
          worker_name: string | null
        }
        Insert: {
          assigned_manager?: string | null
          assigned_worker?: string | null
          assignment_date?: string | null
          expiry_date?: string | null
          id?: number
          manager_name?: string | null
          task_description?: string | null
          task_name: string
          task_status?: string | null
          worker_name?: string | null
        }
        Update: {
          assigned_manager?: string | null
          assigned_worker?: string | null
          assignment_date?: string | null
          expiry_date?: string | null
          id?: number
          manager_name?: string | null
          task_description?: string | null
          task_name?: string
          task_status?: string | null
          worker_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_manager_fkey"
            columns: ["assigned_manager"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          billing_address: Json | null
          email: string
          full_name: string | null
          id: string
          payment_method: Json | null
          role: string | null
        }
        Insert: {
          billing_address?: Json | null
          email: string
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          role?: string | null
        }
        Update: {
          billing_address?: Json | null
          email?: string
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
