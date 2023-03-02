export interface User {
    e_idx?: number
    e_systemid: string
    e_id: string
    e_pw: string
    e_email: string
    e_name: string
    e_department?: string
    e_instm?: Date
    e_actYn?: "Y" | "N"
    e_delYn?: "Y" | "N"
    t_idx?: number
}
