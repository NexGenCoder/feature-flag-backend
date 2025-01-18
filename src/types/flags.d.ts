export interface IFlag {
   id: string;
   name: string;
   description: string;
   key: string;
   project_id: string;
   environment_id: string;
   is_active: boolean;
   expires_at: Date | null;
   created_at: string;
   updated_at: string;
   added_by: string;
}
