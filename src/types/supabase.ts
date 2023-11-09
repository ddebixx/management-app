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
          hours_submitted: boolean | null
          month: number
          year: number
        }
        Insert: {
          hours_submitted?: boolean | null
          month: number
          year: number
        }
        Update: {
          hours_submitted?: boolean | null
          month?: number
          year?: number
        }
        Relationships: []
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
          id: number
          position: string | null
          role: string | null
          work_start: string | null
        }
        Insert: {
          contract?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          position?: string | null
          role?: string | null
          work_start?: string | null
        }
        Update: {
          contract?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          position?: string | null
          role?: string | null
          work_start?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          expiry_date: string | null
          id: number
          task_description: string | null
          task_name: string
        }
        Insert: {
          expiry_date?: string | null
          id?: number
          task_description?: string | null
          task_name: string
        }
        Update: {
          expiry_date?: string | null
          id?: number
          task_description?: string | null
          task_name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          contract: string | null
          email: string
          full_name: string | null
          id: string
          password: string | null
          position: string | null
          role: string | null
          work_start: string | null
        }
        Insert: {
          contract?: string | null
          email: string
          full_name?: string | null
          id?: string
          password?: string | null
          position?: string | null
          role?: string | null
          work_start?: string | null
        }
        Update: {
          contract?: string | null
          email?: string
          full_name?: string | null
          id?: string
          password?: string | null
          position?: string | null
          role?: string | null
          work_start?: string | null
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
