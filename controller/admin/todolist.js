const TodoList = require('../../models/todoList');

const commonMethod = require('../../util/commonUtil');

exports.getTodoLists = (req, res, next) => {
    TodoList.findAll()
    .then( todoLists => {
        commonMethod.checkHasDataAndThrowErr(todoLists);
        commonMethod.setStatusAndJsonData(res, todoLists);
    })
    .catch(err => {
        commonMethod.checkAndSetErrStatus(err);
        next(err);
    })
}

exports.postTodoList = (req, res, next) => {
    const content = req.body.content;
    const status = req.body.status;

    TodoList.create({
        content: content,
        status: status
    }).then( result => {
        res.status(201).json({
            message: "Create Todo success!"
        });
    }).catch(err => {
        commonMethod.checkAndSetErrStatus(err);
        next(err);
    })
}

exports.deleteTodoList = (req, res, next) => {
    const todoId = req.params.id;
    console.log(todoId);
    TodoList.destroy({where:{id:todoId}})
        .then(result => {
            res.status(200).json({
                message:"delete todo success!"
            })
        })
        .catch(err => {
            commonMethod.checkAndSetErrStatus(err);
        });
}