const { Comment, User } = require("../../db");
const getCommentsByCourse = async (req, res) => {
    try {
        const {courseId} = req.params
        const comments = await Comment.findAll({where: {courseId}});

        if (!comments.length)
            return res
                .status(404)
                .json({ message: "Este curso no tiene comentarios todavía. Sé el primero en comentar!" });
        console.log(comments);
        for (let i = 0 ; i < comments.length ; i++) {
            const userId = comments[i].userId 
            console.log(userId);
            const user = await User.findByPk(userId)
            const userName = user?.userName
            const userPicture = user?.picture
            console.log(userName, userPicture);
            comments[i].userName = userName
            comments[i].userPicture = userPicture
        }
        console.log(comments);

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getCommentsByCourse };
