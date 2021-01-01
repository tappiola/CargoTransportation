const {User, Role, Company} = require('../models');

exports.index = async (req, res) => {
    const {companyId} = req.query;

    const users = await User.findAll({
            attributes: [ 'id', 'fullName', 'lastName', 'firstName', 'middleName', 'email', 'isActive'],
            include: [
                {
                    model: Role,
					attributes: ['role'],
                    through: { attributes: [] }
                },
				{
                    model: Company,
					attributes: [],
                    where: { id: companyId }
                },
            ],
        }
    );
    res.status(200).json(users);
};
