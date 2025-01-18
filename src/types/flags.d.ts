export interface IFlag {
   id: string;
   name: string;
   description: string;
   key: string;
   project_id: string;
   environment_id: string;
   is_Active: boolean;
   expires_At: Date | null;
   created_At: string;
   updated_At: string;
   added_by: string;
}
