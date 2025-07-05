import { Folder } from "@models/folder.model";
import { Op } from "sequelize";

export class FolderRepository {
    getAll = ({ parent_id }: { parent_id?: number }) => {
        const where: any = {}

        if (parent_id) {
            where.parent_id = { [Op.eq]: parent_id };
        } else {
            where.parent_id = { [Op.eq]: null };
        }

        return Folder.findAll({
            where,
        });
    }

    getById = (id: number) => Folder.findByPk(id);

    create = (data: {
        name: string;
        parent_id?: number;
        total_child?: number;
    }) => Folder.create(data);

    update = async (
        id: number,
        data: Partial<{
            name: string;
            parent_id: number;
            total_child: number;
        }>
    ) => {
        const folder = await Folder.findByPk(id);
        return folder?.update(data);
    };
}
