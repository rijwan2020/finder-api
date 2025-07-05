import { Folder } from "@models/folder.model";
import { FolderRepository } from "@repositories/folder.repository";

export class FolderService {
    constructor(private folderRepo: FolderRepository) { }

    getFolders = (params: {
        parent_id?: number;
    }) => this.folderRepo.getAll(params);

    create = async (data: {
        name: string;
        parent_id?: number;
    }) => {
        console.log('Input:', data);
        const folder = await this.folderRepo.create(data);
        console.log('Created:', folder?.toJSON?.());
        if (data.parent_id) {
            await this.adjustChild(data.parent_id);
        }
        return folder?.toJSON();
    }

    adjustChild = async (id: number, type: string = 'increment') => {
        const folder: Folder | null = await this.folderRepo.getById(id);
        if (folder) {
            const total_child = folder?.toJSON().total_child || 0;
            const payloadUpdate = {
                total_child: type === 'increment' ? total_child + 1 : total_child - 1,
            }
            await this.folderRepo.update(id, payloadUpdate);
        }
        return true;
    }
}
