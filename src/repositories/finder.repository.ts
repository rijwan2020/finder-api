import { Finder } from "@models/finder.model";
import { Op } from "sequelize";

export class FinderRepository {
    getAll = ({ parent_id }: { parent_id?: number }) => {
        const where: any = {}

        if (parent_id) {
            where.parent_id = { [Op.eq]: parent_id };
        } else {
            where.parent_id = { [Op.eq]: null };
        }

        return Finder.findAll({
            where,
        });
    }

    getById = (id: number) => Finder.findByPk(id);

    create = (data: {
        name: string;
        type: string;
        parent_id?: number;
        total_child?: number;
    }) => Finder.create(data);

    update = async (
        id: number,
        data: Partial<{
            name: string;
            type: string;
            parent_id: number;
            total_child: number;
        }>
    ) => {
        const finder = await Finder.findByPk(id);
        return finder?.update(data);
    };

    delete = async (id: number) => {
        const user = await Finder.findByPk(id);
        return user?.destroy();
    };

    deleteByParentId = async (parentId: number) => {
        return Finder.destroy({
            where: { parent_id: parentId },
        });
    };
}
