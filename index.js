const knex = require('knex')
const config = require('./knexfile')

const knexInstance = knex({
    ...config,
    log: {
        error(message) {
            console.log(message)
        }
    },
    pool: {
        afterCreate: function (conn, done) {
            console.log('new connection to the db')
            done()
        }
    },
    acquireConnectionTimeout: 1000
})

const promises = [ ...Array(11) ].map(() => {
    // this will run a query for 5 minutes
    return knexInstance.raw(`select pg_sleep(5 * 60)`)
})


Promise.all(promises)
    .then(() => {
        console.log('done!')
    })
    .catch(e => {
        console.error(e)
    })
    .finally(() => {
        knexInstance.destroy()
    })

