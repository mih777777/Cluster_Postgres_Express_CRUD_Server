const Pool = require('pg').Pool
const pool = new Pool({
    user: 'msbswsyj',
    host: 'rajje.db.elephantsql.com',
    database: 'msbswsyj',
    password: '5-iN_dPYfQ9lS-fBy9pTfO4JIasK-no5',
    port: 5432,
  })


module.exports.createUser = async (req, res) => {

    const { name, age } = req.body
    
    const client = await pool.connect()
    
    client.query('INSERT INTO users (name, age) VALUES ($1, $2)', [name, age], (error, results) => {
        if (error) {throw error}
        res.status(201).send(`User added `)
    })
}


module.exports.getAllUsers = async(req, res) => {
    
    const client = await pool.connect()

    client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {throw error}      
        res.status(200).json(results.rows)
    })
}

module.exports.getUserById = async (req,response) => {
    const id = req.params.id
    const client = await pool.connect()
    
    client.query('SELECT * from users WHERE id = $1', [id])
        .then(res => response.send(res.rows[0]))
        .catch(e => console.error(e.stack))
}

  
module.exports.deleteUserById = async (req, res) => {

    const id = parseInt(req.params.id)
    const client = await pool.connect()

    client.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {throw error}
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}
  
module.exports.updateUserById = async (request, response) => {
    
    const id = parseInt(request.params.id)
    const { name, age } = request.body

    const client = await pool.connect()

    client.query(
        'UPDATE users SET name = $1, age = $2 WHERE id = $3',
        [name, age, id],
        (error, results) => {
        if (error) {
            throw error
        }
            response.status(200).send(`User modified `)
        }
    )
}
  