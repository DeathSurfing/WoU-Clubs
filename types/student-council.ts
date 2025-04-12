export interface TeamMember {
    id: string
    name: string
    role: string
    department: string
    year: string
    photo?: string
    bio?: string
    quote?: string
    email?: string
    linkedin?: string
    twitter?: string
  }
  
  export interface OrgNode {
    id: string
    name: string
    title: string
    children?: OrgNode[]
  }
  
  