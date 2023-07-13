const { User } = require('../../db');
//__________________________________________________
const signUp = async (req,res) => {
    console.log("controler signup");
    const defaultPicture = "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-24.jpg"
    try {
        // const  = req.body;
        const { email, name, picture } = req.body
        console.log("este es el signup");

        const [newUser, created] = await User.findOrCreate({
            where: {
                email: email
            },
            defaults: {
                picture: !picture ? defaultPicture : picture,
                name: !name ? email : name,
                nickName: !name ? email : name
            }
        })
        console.log(created)
        if (!created) {
            return res.json({message: "Ya existe un usuario con este mail"})
        }
        console.log(newUser)
        return res.status(201).json({message: "El usuario fue creado correctamente"})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { signUp }