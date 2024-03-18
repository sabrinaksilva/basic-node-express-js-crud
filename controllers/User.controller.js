
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




exports.findAll = async (request, response) => {
    const {
        query: { filter, filterValue, page, size },
    } = request;

    const pageNumber = parseInt(page || 1)
    const limit = parseInt(size || 5);
    const startIndex = ((page - 1) * limit < 0) ? 0 : (page - 1) * limit;

    const endIndex = page * limit;

    console.log(filter)
    console.log(filterValue)

    let idFilter = (filter && filterValue && (filter == "id")) ? filterValue : undefined
    let usernameFilter = (filter && filterValue && (filter == "username")) ? filterValue : undefined

    const where = {
        offset: startIndex,
        limit: limit
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


    const result = {
        page: pageNumber,
        size: limit,
        totalElements: 0
    };

    if (endIndex < totalCount) {
        result.next = {
            page: page + 1,
            limit: limit,
        };
    }
    if (startIndex > 0) {
        result.previous = {
            page: page - 1,
            limit: limit,
        };
    }


    await User.findAll({ where }).limit(limit).skip(startIndex)
        .then(usersList => {
            result.content = usersList.map(userMapper.modelToDTO)
            result.
            return response
                .status(200)
                .send(result)
        })
        .catch(e => {
            console.log(e);
            const error = new Error("Unexpected error to find users");
            next(error)
        });



};