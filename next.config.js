require("dotenv").config();

module.exports = {
    env: {
        MNOMEMIC_PHRASE: process.env.MNOMEMIC_PHRASE,
        INFURA_LINK: process.env.INFURA_LINK
    }
}