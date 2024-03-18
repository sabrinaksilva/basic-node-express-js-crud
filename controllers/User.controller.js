
const db = require("../database/MySQL.database")
const userMapper = require("../mappers/User.mappers")
const User = db.userModel


exports.create = (req, res) => {
    const { body } = req;
    if (!body || !body.username || !body.resume) {
        res.status(400).send({
            message: "Username and resume (CV) must be provided!"
        });
        return;
    }

    const user = {
        username: body.username,
        resume: body.resume
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(e => {
            console.log(e);
            const error = new Error("Unexpected error to create user");
            next(error)
        });
};




exports.findAll = async (request, response, next) => {
    const {
        query: { filter, filterValue, page, size },
    } = request;



    const pageNumber = parseInt(page || 1)
    const limit = parseInt(size || 5);
    const startIndex = ((page - 1) * limit < 0) ? 0 : (page - 1) * limit;

    const endIndex = page * limit;



    let idFilter = (filter && filterValue && (filter == "id")) ? filterValue : undefined
    let usernameFilter = (filter && filterValue && (filter == "username")) ? filterValue : undefined

    const where = {

    }
    where[db.op.and] = []

    if (idFilter) {
        where[db.op.and].push({
            id: idFilter
        })
    }

    if (usernameFilter) {
        where[db.op.and].push({
            username: {
                [db.op.like]: `%${usernameFilter}%`
            }
        })
    }


    // Calcula o total de páginas


    // if (endIndex < totalElements) {
    //     result.next = {
    //         page: page + 1,
    //         limit: limit,
    //     };
    // }
    // if (startIndex > 0) {
    //     result.previous = {
    //         page: page - 1,
    //         limit: limit,
    //     };
    // }


    // await User.findAll({ where }).limit(limit).skip(startIndex)
    //     .then(usersList => {
    //         result.content = usersList.map(userMapper.modelToDTO)
    //         result.size = result.content.size()
    //         return response
    //             .status(200)
    //             .send(result)
    //     })
    //     .catch(e => {
    //         console.log(e);
    //         const error = new Error("Unexpected error to find users");
    //         next(error)
    //     });


    try {
        const totalCount = await User.count({ where });
        const usersList = await User.findAll({ where, limit: 5, startIndex });
        let totalPages = Math.ceil(totalCount / limit);

        const result = {
            content: usersList.map(userMapper.modelToDTO),
            size: usersList.length,
            totalElements: totalCount,
            totalPages: totalPages,
            page: pageNumber,
            limit: limit
        };

        return response.status(200).send(result);
    } catch (error) {
        console.log(error);
        const err = new Error("Unexpected error while finding users");
        next(err);
    }

};