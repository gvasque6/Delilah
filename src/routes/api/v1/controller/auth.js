const crypto = require('crypto');
const path = require("path");
const {
    SecurityType,
    User,
} = require(path.join(__dirname, '..', '..', '..', '..', 'services', 'database', 'model', 'index'));
const { checkSchema } = require('express-validator');

// JWT Autenticacion
const jwt = require("jsonwebtoken");

const checkQueryParams = checkSchema({
    username: {
        in: 'query',
        optional: false,
        errorMessage: 'username should be placed as query param'
    },
    password: {
        in: 'query',
        optional: false,
        errorMessage: 'password should be placed as query param'
    }
});

const getUser = async (req, res, next) => {
    const { username, password } = req.query;
    const passwordEncrypted = crypto.createHash('sha512').update(password).digest('hex');

    const user = await User.findOne({
        where: {
            username,
            password: passwordEncrypted
        }
    });

    if (user === null)
        return res.sendStatus(401);

    res.locals.user = user;

    return next();
};

const getToken = async (req, res) => {
    const { id } = res.locals.user;

    if (!id) return res.sendStatus(401);

    // Genera token
    const token = jwt.sign({ id }, process.env.JWT_PASSPHRASE);       // la contraseña se declara en el archivo .env

    return res.status(200).json({ token });
}

const validateToken = async (req, res, next) => {
    try {
        // chequea el token con el metodo bearer
        const [bearer, token] = req.headers.authorization.split(" ");
        if (bearer !== "Bearer") return res.status(401).send("Expected Bearer");

        // chequea si el token es valido
        const { id } = jwt.verify(token, process.env.JWT_PASSPHRASE);     // La contraseña se encuentra en el archivo .env
        if (!id) return res.status(401).send("id missing in token");

        // Chequea si el id es de un administrador
        const user = await User.findOne({
            where: {
                id
            },
            include: SecurityType
        });
        const is_admin = user.SecurityType.type === 'admin';

        // Almacena los resultados en el locals http://expressjs.com/en/api.html#res.locals
        res.locals.user = { id, is_admin };
        req.locals = res.locals; // Se usa en algunas validaciones

        // Todo esta bien!
        return next();
    } catch (e) {
        console.log(e);
        return res.sendStatus(401);
    }
};

const adminAccessOnly = (req, res, next) => {
    if (!res.locals.user.is_admin) return res.sendStatus(401);
    return next();
}


module.exports = {
    adminAccessOnly,
    checkQueryParams,
    getToken,
    getUser,
    validateToken,
};