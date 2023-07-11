
const { Course } = require("../../db");
const { Op } = require("sequelize");

const getCourseByName = async (req, res) => {
    const {title}= req.query
    console.log()
    console.log(``)
    try {
        const allCourses = await Course.findAll({where: {
            title:{[Op.iLike]: `%${title}%`}}
    });

        if (!allCourses.length) {
            return res.status(404).json({message: "No hay cursos disponibles"})
        };
        return res.json(allCourses);

    } catch (error) {
        return res.status(500).json({message: "Algo salió mal"});
    }
}

module.exports = {getCourseByName};

