const bodyParser = require('body-parser')
const Pool = require('pg').Pool
const express = require('express')
const app = express()


const pool = new Pool({
  user: 'msbswsyj',
  host: 'rajje.db.elephantsql.com',
  database: 'msbswsyj',
  password: '5-iN_dPYfQ9lS-fBy9pTfO4JIasK-no5',
  port: 5432,
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})

//=======================================================================


app.post('/users/create', async(request, response) => {
  const { name, age } = request.body

    await pool.query('INSERT INTO users (name, age) VALUES ($1, $2)', [name, age], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added `)
  })
})


app.delete('/delete/:id', async(request, response) => {
  const id = parseInt(request.params.id)

    await pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
})

//============================================================================
app.put('/users/update/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  const { name, age } = request.body

    await pool.query(
    'UPDATE users SET name = $1, age = $2 WHERE id = $3',
    [name, age, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified `)
    }
  )
})

//============================================================================


app.get('/users', async (request, response) => {
    await pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})
  


let PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server listening on port' + PORT)
})