import { Folder } from '@models/folder.model';
import { FolderService } from '@services/folder.service';
import { Context } from 'elysia';

export class FolderController {
    constructor(private folderSvc: FolderService) { }
    getAll = async ({ query }: Context<{
        query: {
            parent_id?: string;
        }
    }>) => {
        const response: {
            data: Folder[];
            message: string;
            code: number;
        } = {
            data: [],
            message: 'Fetch folder successful',
            code: 200,
        };
        try {
            const folders = await this.folderSvc.getFolders({
                parent_id: query.parent_id ? Number(query.parent_id) : undefined,
            });
            response.data = folders;

        } catch (error) {
            console.log('🚀 ~ FolderController ~ error:', error);
            response.message = 'Failed to fetch folder data';
            response.code = 500;
        }
        return response;
    };

}
