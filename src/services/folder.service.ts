import { FolderRepository } from "@repositories/folder.repository";

export class FolderService {
    constructor(private folderRepo: FolderRepository) { }

    getFolders = (params: {
        parent_id?: number;
    }) => this.folderRepo.getAll(params);

    create = (data: {
        name: string;
        parent_id?: number;
    }) => {
        if (data.parent_id) {
            // TODO: update parent
        }
        return this.folderRepo.create(data);
    }
}
