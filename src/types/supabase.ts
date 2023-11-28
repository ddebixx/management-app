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
        Relationships: [
          {
            foreignKeyName: "hours_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
      recruitment: {
        Row: {
          application_date: string | null
          full_name: string | null
          id: string
          position: string | null
          status: string
        }
        Insert: {
          application_date?: string | null
          full_name?: string | null
          id?: string
          position?: string | null
          status: string
        }
        Update: {
          application_date?: string | null
          full_name?: string | null
          id?: string
          position?: string | null
          status?: string
        }
        Relationships: []
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
          work_start: string | null
        }
        Insert: {
          contract?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          manager_id?: string | null
          position?: string | null
          role?: string | null
          work_start?: string | null
        }
        Update: {
          contract?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          manager_id?: string | null
          position?: string | null
          role?: string | null
          work_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subordinates_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subordinates_manager_id_fkey"
            columns: ["manager_id"]
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
          },
          {
            foreignKeyName: "tasks_assigned_worker_fkey"
            columns: ["assigned_worker"]
            isOneToOne: false
            referencedRelation: "subordinates"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          email: string
          full_name: string | null
          id: string
          role: string | null
        }
        Insert: {
          email: string
          full_name?: string | null
          id?: string
          role?: string | null
        }
        Update: {
          email?: string
          full_name?: string | null
          id?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
