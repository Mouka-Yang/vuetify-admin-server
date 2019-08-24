'use strict'

module.exports = app => {
    app.beforeStart(() => {
        require('dotenv').config()
    })
}