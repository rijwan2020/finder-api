import { FolderRepository } from "@repositories/folderRepository";

export class FolderService {
    constructor(private folderRepo: FolderRepository) { }

    getFolders = (params: {
        parent_id?: number;
    }) => {
        return this.folderRepo.getAll(params);
    };
}
