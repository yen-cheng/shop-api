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
    const detail = req.body.detail;
    const type = req.body.type;
    const status = req.body.status;

    TodoList.create({
        content: content,
        detail: detail,
        type: type,
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

exports.editTodoList = (req, res, next) => {
    const todoId = req.params.todoId;
    const newContent = req.body.content;
    const newDetail = req.body.detail;
    const newType = req.body.type;
    const newStatus = req.body.status;

    TodoList.findAll({where: {id: todoId}})
    .then((todos)=>{
        commonMethod.checkHasDataAndThrowErr(todos);
        todos[0].content = newContent;
        todos[0].detail = newDetail;
        todos[0].type = newType;
        todos[0].status = newStatus;
        return todos[0].save();
    })
    .then(res => {
        res.status(200).json({
            message: "Edit Todo success!"
        });
    })
    .catch(err => {
        commonMethod.checkAndSetErrStatus(err);
        next(err);
    });
}

exports.deleteTodoList = (req, res, next) => {
    const todoId = req.params.todoId;
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